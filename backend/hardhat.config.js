require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const FORK_FUJI = true;
const FORK_MAINNET = false;
let forkingData = undefined;

if (FORK_MAINNET) {
  forkingData = {
    url: "https://api.avax.network/ext/bc/C/rpcc",
  };
}
if (FORK_FUJI) {
  forkingData = {
    url: "https://avalanche-fuji-c-chain.publicnode.com",
  };
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    fuji: {
      url: "https://avalanche-fuji-c-chain.publicnode.com",
      chainId: 43113,
      accounts: [process.env.PRIVATE_KEY], // we use a .env file to hide our wallets private key
    },
    mainnet: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.SNOWTRACE_API_KEY, // we use an .env file to hide our Snowtrace API KEY
  },
};

// npx hardhat verify <contract address> <arguments> --network <network>

// $ npx hardhat run scripts/deploy.js --network fuji

// npx hardhat verify 0x5d7005b3A59c991454aA4889c6E6780283e17eC2 --network fuji

// UserProfile= 0x8a814de34f94B830d4009B9f6191a0E990a447F6

// https://testnet.snowtrace.io/address/0x8a814de34f94B830d4009B9f6191a0E990a447F6#code

// submitTask = 0x9Ae6B30C05c0Cdb8Fe4e56445d3C1EE9E3243211,

// https://testnet.snowtrace.io/address/0x9Ae6B30C05c0Cdb8Fe4e56445d3C1EE9E3243211/contract/43113/readContract?chainId=43113
