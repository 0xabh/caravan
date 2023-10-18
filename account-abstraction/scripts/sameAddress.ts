import {ethers} from "hardhat"
import "dotenv/config"

async function main() {
    const [ user] = await ethers.getSigners()
    const provider = ethers.providers.getDefaultProvider()
    console.log(provider.network.name)
    const signer = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY as string)
    const address = signer.address
    console.log(address)
    const nonce = await provider.getTransactionCount(address)
    console.log("nonce", nonce)

    // Compile the contracts
    const factoryContract = await ethers.getContractFactory("SimpleAccountFactory");
    const accountContract = await ethers.getContractFactory("SimpleAccount");
    // Deploy the contracts
    const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"; // entry point address
    const factory = await factoryContract.deploy(entryPointAddress, {
        nonce: nonce,
    });
    await factory.deployed();

    console.log("SimpleAccountFactory deployed to:", factory.address);

    const accountAddress = await factory.getAddress(user.address, 0)
    console.log("SimpleAccount deployed to:", accountAddress, "for user", user.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })