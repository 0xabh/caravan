import { SDKBase } from '@magic-sdk/provider';
import { Network, formattedNetwork } from './supported-networks';
import { Magic } from 'magic-sdk';
import { ethers } from 'ethers';

// Publishable API Key for Magic Auth
const magicKey = 'pk_live_EA03A4194F30EB04';

// Abstract class to handle magic network-specific operations
export abstract class MagicNetwork {
  public magic: SDKBase | null = null;
  public abstract network: Network;
  public abstract signer?: ethers.Signer;

  // Method to initialize Magic instance based on network type
  protected initialize(): void {
    let magic = new Magic(magicKey, {
      network: formattedNetwork(this.network),
    });
    this.magic = magic;
  }

  // Static method to create MagicNetwork instance based on network type
  public static create(network: Network): MagicNetwork {
    const { EVM } = require('./EVM');
    const evm = new EVM(network);
    evm.initializeWeb3();
    return evm;
  }

  // Abstract method to fetch balance, implementation would be network-specific
  public abstract fetchBalance(userPublicKey: string): Promise<number>;

  // Method to login with OTP using Magic SDK
  public async loginWithOTP(email: string): Promise<void> {
    console.log(this.magic)
    await this.magic?.auth.loginWithEmailOTP({ email });
    const loggedIn = await this.magic?.user.isLoggedIn();
    console.log(loggedIn, this.magic?.rpcProvider)
    const signer = new ethers.providers.Web3Provider(this.magic?.rpcProvider!).getSigner();
    console.log("signer", signer)
    this.setSigner(signer);
  }

  // Method to logout using Magic SDK
  public async logout() {
    return await this.magic?.user.logout();
  }

  // Method to check if user is logged in using Magic SDK
  public async isLoggedIn() {
    return await this.magic?.user.isLoggedIn();
  }

  // Method to get user information using Magic SDK
  public async getInfo() {
    return await this.magic?.user.getInfo();
  }

  public abstract getSigner(): ethers.Signer | undefined;

  public abstract setSigner(signer: ethers.Signer): void;
}
