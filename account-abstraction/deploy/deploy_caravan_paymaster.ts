const { ethers } = require('hardhat');

async function main() {
    const verifyingSigner = '0x492E5EA8f02E30D727e412398a14A94164A96d19'; // Replace with your verifying signer address
    const entryPointAddress = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789'; // Replace with your entry point address

    const CaravanPaymaster = await ethers.getContractFactory('CaravanPaymaster');
    const caravanPaymaster = await CaravanPaymaster.deploy(entryPointAddress, verifyingSigner);

    await caravanPaymaster.deployed();

    console.log('CaravanPaymaster deployed to:', caravanPaymaster.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });