import { CaravanPaymaster__factory } from "../typechain";

const { ethers } = require('hardhat');

async function main() {
    // const verifyingSigner = '0x492E5EA8f02E30D727e412398a14A94164A96d19'; // Replace with your verifying signer address
    // const entryPointAddress = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789'; // Replace with your entry point address

    // const CaravanPaymaster = await ethers.getContractFactory('CaravanPaymaster');
    // const caravanPaymaster = await CaravanPaymaster.deploy(entryPointAddress, verifyingSigner);

    // await caravanPaymaster.deployed();

    // console.log('CaravanPaymaster deployed to:', caravanPaymaster.address);
    const address = "0x0cC3D5BfAa0eF5217Ec5f2Fa2F85d5AE2eb518E4"
    const paymaster = CaravanPaymaster__factory.connect(address, (await ethers.getSigners())[0])
    const tx = await paymaster.deposit({ value: ethers.utils.parseEther("12") })
    await tx.wait()
    console.log("done")
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });