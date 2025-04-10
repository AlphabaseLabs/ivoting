const { ethers } = require('hardhat')

async function main() {
    const owners = [
        "0xB718B92bD16C5958F5ff2b1eD11120Bc21CCC618",
        "0x3F3048dc6FEcCD5D6EF36590A6cC0a2a816C7A0B",
        "0xf0694e36b8f0Fd4c664518be882134c5ed135D72",
        "0xd11Cc4894B5673dD9CB330a02cC2a2358A3bb12e"
    ]
    const confirmations = 3;
    const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");

    this.multiSigWallet = await MultiSigWallet.deploy(owners, confirmations);
    console.log(`this.multiSigWallet: ${this.multiSigWallet.address}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
