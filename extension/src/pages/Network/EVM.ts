import { MagicNetwork } from './MagicNetwork';
import { Network } from './supported-networks';
import { ethers } from 'ethers';

// The EVM (Ethereum Virtual Machine) class extends the abstract MagicNetwork class
export class EVM extends MagicNetwork {
  provider?: ethers.providers.Provider;

  // The network for this class instance
  public network: Network;

  constructor(network: Network) {
    super();

    // Setting the network type
    this.network = network;

    // Calling the initialize method from MagicNetwork
    this.initialize();
  }

  // Asynchronous method to initialize the Web3 instance
  async initializeWeb3(): Promise<void> {
    const provider = await this.magic?.wallet.getProvider(); // Get the provider from the magic
    const magicProvider = new ethers.providers.Web3Provider(provider); // Initializing the Web3 instance
    this.provider = magicProvider;
    const signer = magicProvider.getSigner(); // Get the signer from the provider
    this.setSigner(signer); // Set the signer in the MagicNetwork class
  }

  // Method to fetch the balance of a user in EVM based blockchain
  public async fetchBalance(userPublicKey: string): Promise<number> {
    if (!this.provider) {
      // If the Web3 instance is not initialized yet, initialize it
      await this.initializeWeb3();
    }

    if (!this.provider) {
      throw new Error('Ethers instance is not initialized yet.');
    }

    // Get the raw balance from the EVM blockchain
    const balance = await this.provider.getBalance(userPublicKey);

    // Convert the raw balance from Wei (smallest unit in Ethereum) to Ether and limit to 7 decimal places
    const balanceInEth = ethers.utils.formatEther(balance).substring(0, 7);
    return parseFloat(balanceInEth);
  }

  public getSigner() {
    return this.signer;
  }

  public setSigner(signer: ethers.Signer) {
    this.signer = signer;
  }
}
