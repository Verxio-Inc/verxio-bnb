const hre = require("hardhat");

async function main() {
  const userProfileContract = await hre.ethers.getContractFactory(
    "VerxioUserProfile"
  );

  console.log("\n========= Deploying UserProfile Contract ============ \n");
  // Deploy it
  const userProfile = await userProfileContract.deploy();
  await userProfile.waitForDeployment();

  // Display the contract address
  console.log(
    `VerxioUserProfile deployed to: ${userProfile.target}, on Avalanche Fuji (C-Chain)`
  );
}

// Hardhat recommends this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
