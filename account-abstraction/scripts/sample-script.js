// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')
const {ethers} = require("ethers");

async function main () {
    const entryPointAddress = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789';

// Define the constructor ABI
    const constructorAbi = [
        {
            type: 'address',
            name: 'entryPointAddress',
            value: entryPointAddress,
        },
    ];

    const constructorArgs = ethers.utils.defaultAbiCoder.encode(
        [{name: "entryPointAddress", type: "address"}],
        [entryPointAddress]
    );
    console.log(constructorArgs);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
