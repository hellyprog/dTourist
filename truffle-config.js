const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
    contracts_build_directory: path.join(__dirname, "d-tourist-fe/src/assets/contracts"),
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*" // Match any network id
        },
        develop: {
            port: 8545
        },

        rinkeby: {
          provider: () =>
            new HDWalletProvider(
              "prefer retreat require fluid speak deposit pretty base climb record craft joke",
              `https://rinkeby.infura.io/v3/cbfccb482e9948de9fa068c1d2318700`
            ),
          network_id: 4, // Rinkeby's id
          gas: 5500000, // Rinkeby has a lower block limit than mainnet
          confirmations: 2, // # of confs to wait between deployments. (default: 0)
          timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
          skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
        },
    }
};