/// ENVVAR
// - CI:                output gas report to file instead of stdout
// - COVERAGE:          enable coverage report
// - ENABLE_GAS_REPORT: enable gas report
// - COMPILE_MODE:      production modes enables optimizations (default: development)
// - COMPILE_VERSION:   compiler version (default: 0.8.3)
// - COINMARKETCAP:     coinmarkercat api key for USD value in gas report

const fs = require('fs');
const path = require('path');
const argv = require('yargs/yargs')()
  .env('')
  .options({
    ci: {
      type: 'boolean',
      default: false,
    },
    coverage: {
      type: 'boolean',
      default: false,
    },
    gas: {
      alias: 'enableGasReport',
      type: 'boolean',
      default: false,
    },
    mode: {
      alias: 'compileMode',
      type: 'string',
      choices: ['production', 'development'],
      default: 'development',
    },
    compiler: {
      alias: 'compileVersion',
      type: 'string',
      default: '0.8.3',
    },
    coinmarketcap: {
      alias: 'coinmarketcapApiKey',
      type: 'string',
    },
  }).argv;

require('@nomiclabs/hardhat-truffle5');
require("@nomiclabs/hardhat-waffle");

if (argv.enableGasReport) {
  require('hardhat-gas-reporter');
}

for (const f of fs.readdirSync(path.join(__dirname, 'hardhat'))) {
  require(path.join(__dirname, 'hardhat', f));
}

const withOptimizations = argv.enableGasReport || argv.compileMode === 'production';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: argv.compiler,
        settings: {
          optimizer: {
            enabled: withOptimizations,
            runs: 200,
          },
        },
      },
      {
        version: '0.4.15',
        settings: {
          optimizer: {
            enabled: withOptimizations,
            runs: 200,
          },
        },
      }
    ]
  },
  networks: {
    hardhat: {
      blockGasLimit: 10000000,
      allowUnlimitedContractSize: !withOptimizations,
    },
    development: {
      gasPrice: 0,
      blockGasLimit: 0x1fffffffffffff,
      url: `http://localhost:8545`,
    },
    testchain: {
      gasPrice: 0,
      blockGasLimit: 0x1fffffffffffff,
      url: `http://207.180.208.127:8545`,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/1e3003948f3a468d840f4de2cabd01d0`,
      accounts: ['0xa7edf98d7406537a9850db2a4cdb64f2146ceea1a6f23bf5ef05a5dd3543cfa1']
    }

  },
  gasReporter: {
    currency: 'USD',
    outputFile: argv.ci ? 'gas-report.txt' : undefined,
    coinmarketcap: argv.coinmarketcap,
  },
};

if (argv.coverage) {
  require('solidity-coverage');
  module.exports.networks.hardhat.initialBaseFeePerGas = 0;
}
