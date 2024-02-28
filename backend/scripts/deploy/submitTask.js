const hre = require("hardhat");

async function main() {
  const AVAX_USD_FEED_ADDRESS = "0x5498bb86bc934c8d34fda08e81d444153d0d06ad";

  const userProfileAddress = "0x8a814de34f94b830d4009b9f6191a0e990a447f6";

  // Get the Points smart contract
  const submitTaskContract = await hre.ethers.getContractFactory(
    "VerxioSubmitTask"
  );

  console.log("\n========= Deploying submitTask Contract ============ \n");
  // Deploy it
  const submitTask = await submitTaskContract.deploy();
  await submitTask.waitForDeployment();

  // Display the contract address
  console.log(
    `submitTask deployed to: ${submitTask.target}, on Avalanche Fuji (C-Chain)`
  );
}

// Hardhat recommends this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
