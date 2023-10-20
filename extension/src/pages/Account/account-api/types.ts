import {UserOperationStruct} from '@account-abstraction/contracts';
import {
    BaseAccountAPI,
    BaseApiParams,
} from '@account-abstraction/sdk/dist/src/BaseAccountAPI';
import {TransactionDetailsForUserOp} from '@account-abstraction/sdk/dist/src/TransactionDetailsForUserOp';
import {MessageSigningRequest} from '../../Background/redux-slices/signing';
import {HttpRpcClient} from '@account-abstraction/sdk';
import { Magic } from 'magic-sdk';
import { ethers } from 'ethers';

export abstract class AccountApiType extends BaseAccountAPI {
    abstract serialize: () => Promise<object>;

    abstract createUnsignedUserOpWithContext(
        info: TransactionDetailsForUserOp,
        preTransactionConfirmationContext?: any
    ): Promise<UserOperationStruct>;

    /** sign a message for the use */
    abstract signMessage: (
        request?: MessageSigningRequest,
        context?: any
    ) => Promise<string>;

    abstract signUserOpWithContext(
        userOp: UserOperationStruct,
        postTransactionConfirmationContext?: any
    ): Promise<UserOperationStruct>;

    abstract switchNetwork(
        _provider: string,
        signer: ethers.Signer
    ): Promise<void>;

    abstract reinitialize(signer: ethers.Signer): Promise<this>;
}

export interface AccountApiParamsType<T, S> extends BaseApiParams {
    context?: T;
    deserializeState?: S;
    bundler: HttpRpcClient;
}

export type AccountImplementationType = new (
    params: AccountApiParamsType<any, any>
) => AccountApiType;
