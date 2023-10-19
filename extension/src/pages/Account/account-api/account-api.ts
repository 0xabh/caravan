import {BigNumber, ethers, Wallet} from 'ethers';
import {SimpleAccount__factory, UserOperationStruct} from '@account-abstraction/contracts';

import {AccountApiParamsType, AccountApiType} from './types';
import {MessageSigningRequest} from '../../Background/redux-slices/signing';
import {TransactionDetailsForUserOp} from '@account-abstraction/sdk/dist/src/TransactionDetailsForUserOp';
import config from '../../../exconfig';
import {SimpleAccountAPI} from '@account-abstraction/sdk';

const FACTORY_ADDRESS = config.factory_address;

/**
 * An implementation of the BaseAccountAPI using the SimpleAccount contract.
 * - contract deployer gets "entrypoint", "owner" addresses and "index" nonce
 * - owner signs requests using normal "Ethereum Signed Message" (ether's signer.signMessage())
 * - nonce method is "nonce()"
 * - execute method is "execFromEntryPoint()"
 */
class SimpleAccountTrampolineAPI
    extends SimpleAccountAPI
    implements AccountApiType {
    /**
     *
     * We create a new private key or use the one provided in the
     * deserializeState and initialize the SimpleAccountAPI
     */
    constructor(params: AccountApiParamsType<{}, { privateKey: string }>) {
        super({
            ...params,
            index: 0,
            owner: params.deserializeState?.privateKey
                ? new ethers.Wallet(params.deserializeState?.privateKey)
                : ethers.Wallet.createRandom(),
            factoryAddress: FACTORY_ADDRESS,
        });
    }

    /**
     *
     * @returns the serialized state of the account that is saved in
     * the secured vault in localstorage and later passed to the
     * constructor in the deserializeState parameter
     */
    serialize = async (): Promise<{ privateKey: string }> => {
        return {
            privateKey: (this.owner as Wallet).privateKey,
        };
    };

    /**
     * Called when the Dapp requests eth_signTypedData
     */
    signMessage = async (
        context: any,
        request?: MessageSigningRequest
    ): Promise<string> => {
        throw new Error('signMessage method not implemented.');
    };

    /**
     * Called after the user is presented with the pre-transaction confirmation screen
     * The context passed to this method is the same as the one passed to the
     * onComplete method of the PreTransactionConfirmationComponent
     */
    async createUnsignedUserOpWithContext(
        info: TransactionDetailsForUserOp,
        preTransactionConfirmationContext?: any
    ): Promise<UserOperationStruct> {
        console.log('createUnsignedUserOpWithContext', info, preTransactionConfirmationContext)
        // console.log(this.provider.getNetwork())
        const nonce = await this.getNonce()
        console.log('nonce', nonce)
        info.nonce = nonce
        return {
            ...(await this.createUnsignedUserOp(info)),
            paymasterAndData: preTransactionConfirmationContext?.paymasterAndData
                ? preTransactionConfirmationContext?.paymasterAndData
                : '0x',
        };
    }

    /**
     * Callled after the user has accepted the transaction on the transaction confirmation screen
     * The context passed to this method is the same as the one passed to the
     * onComplete method of the TransactionConfirmationComponent
     */
    signUserOpWithContext = async (
        userOp: UserOperationStruct,
        postTransactionConfirmationContext: any
    ): Promise<UserOperationStruct> => {
        return this.signUserOp(userOp);
    };

    /**
     * Called after the user swithces networks
     * @param _provider
     */
    switchNetwork = async (_provider: string): Promise<void> => {
        this.provider = new ethers.providers.StaticJsonRpcProvider(_provider);
        await this.getNonce()
    }

    async getNonce(): Promise<BigNumber> {
        if(!this.accountAddress){
        const accountAddress = await this.getAccountAddress()
        this.accountAddress = accountAddress
        }
        console.log(this.accountAddress, this.provider)
        let contract = SimpleAccount__factory.connect(this.accountAddress, this.provider)
        let nonce = ethers.BigNumber.from(0)
        try {
            nonce = await contract.getNonce()
        } catch (e) {
            console.log(e)
        }
        return nonce
    }

    async checkAccountPhantom(): Promise<boolean> {
        const nonce = await this.getNonce()
        return nonce.eq(0)
    }

    async createUnsignedUserOp (info: TransactionDetailsForUserOp): Promise<UserOperationStruct> {
        const {
            callData,
            callGasLimit
        } = await this.encodeUserOpCallDataAndGasLimit(info)
        console.log('callData', callData, 'callGasLimit', callGasLimit)
        const initCode = await this.getInitCode()
        console.log('initcode', initCode)

        const initGas = await this.estimateCreationGas(initCode)
        console.log('initGas', initGas)
        console.log('verificationGasLimit', await this.getVerificationGasLimit())
        const verificationGasLimit = BigNumber.from(await this.getVerificationGasLimit())
            .add(initGas)
        console.log('verificationGasLimit', verificationGasLimit)

        let {
            maxFeePerGas,
            maxPriorityFeePerGas
        } = info
        if (maxFeePerGas == null || maxPriorityFeePerGas == null) {
            const feeData = await this.provider.getFeeData()
            console.log('feeData', feeData)
            if (maxFeePerGas == null) {
                maxFeePerGas = feeData.maxFeePerGas ?? feeData.gasPrice?.mul(ethers.BigNumber.from(130)).div(ethers.BigNumber.from(100))
            }
            if (maxPriorityFeePerGas == null) {
                maxPriorityFeePerGas = feeData.maxPriorityFeePerGas ?? BigNumber.from("1500000000")
            }
        }

        const partialUserOp: any = {
            sender: this.accountAddress ?? await this.getAccountAddress(),
            nonce: info.nonce ?? this.getNonce(),
            initCode,
            callData,
            callGasLimit,
            verificationGasLimit,
            maxFeePerGas,
            maxPriorityFeePerGas,
            paymasterAndData: '0x'
        }
        console.log('partialUserOp', partialUserOp)

        let paymasterAndData: string | undefined
        if (this.paymasterAPI != null) {
            // fill (partial) preVerificationGas (all except the cost of the generated paymasterAndData)
            const userOpForPm = {
                ...partialUserOp,
                preVerificationGas: await this.getPreVerificationGas(partialUserOp)
            }
            console.log('userOpForPm', userOpForPm)
            paymasterAndData = await this.paymasterAPI.getPaymasterAndData(userOpForPm)
            console.log('paymasterAndData', paymasterAndData)
        }
        partialUserOp.paymasterAndData = paymasterAndData ?? '0x'
        const returnObj = {
            ...partialUserOp,
            preVerificationGas: await this.getPreVerificationGas(partialUserOp),
            signature: ''
        }
        console.log('returnObj', returnObj)
        return returnObj
    }
}

export default SimpleAccountTrampolineAPI;
