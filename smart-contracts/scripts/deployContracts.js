const { ethers } = require('hardhat')
async function main() {

    // MULTISIG

    const owners = [
	"0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"
    ]

    const confirmations = 1;
    const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");

    this.MultiSigWallet = await MultiSigWallet.deploy(owners, confirmations);
    console.log(`MultiSigWallet: ${this.MultiSigWallet.address}`);


    // ACCESSCONTROL

    const owner = guardian = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1';
    const eac = await ethers.getContractFactory("ElectionAccessControl");
    this.AccessControl = await eac.deploy(owner);
    console.log(`AccessControl: ${this.AccessControl.address}`);

    const ElectionUpgradable = await ethers.getContractFactory("ElectionUpgradable");
    const ElectionInterface = await ethers.getContractFactory("ElectionInterface");
    const Party = await ethers.getContractFactory("Party");
    const Voter = await ethers.getContractFactory("Voter");
    const Candidate = await ethers.getContractFactory("Candidate");
    const ElectionImplementation = await ethers.getContractFactory("ElectionImplementation");


    this.ElectionUpgradable = await ElectionUpgradable.deploy(guardian);
    this.ElectionInterface = await ElectionInterface.deploy(this.ElectionUpgradable.address)

    this.Party = await Party.deploy(this.ElectionUpgradable.address);
    this.Candidate = await Candidate.deploy(this.ElectionUpgradable.address);
    this.Voter = await Voter.deploy(this.ElectionUpgradable.address)

    this.ElectionImplementation = await ElectionImplementation.deploy(this.MultiSigWallet.address, this.Party.address, this.Voter.address, this.Candidate.address,
        this.ElectionUpgradable.address, this.AccessControl.address);

    await this.ElectionUpgradable.init(this.ElectionInterface.address, this.ElectionImplementation.address);


    console.log(`Voter: ${this.Voter.address}`);
    console.log(`Party: ${this.Party.address}`);
    console.log(`Candidate: ${this.Candidate.address}`);
    console.log(`ElectionImplementation: ${this.ElectionImplementation.address}`);
    console.log(`ElectionUpgradable: ${this.ElectionUpgradable.address}`);
    console.log(`ElectionInterface: ${this.ElectionInterface.address}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });


function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
