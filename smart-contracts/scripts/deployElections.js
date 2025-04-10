const { ethers } = require('hardhat')
async function main() {

    const ElectionUpgradable = await ethers.getContractFactory("ElectionUpgradable");
    const ElectionInterface = await ethers.getContractFactory("ElectionInterface");
    const Party = await ethers.getContractFactory("Party");
    const Voter = await ethers.getContractFactory("Voter");
    const Candidate = await ethers.getContractFactory("Candidate");
    const ElectionImplementation = await ethers.getContractFactory("ElectionImplementation");
    const ElectionAccessControl = await ethers.getContractFactory("ElectionAccessControl");

    // const accessControl = '0xD33bf7c2983f51dBC4abbF21850fA76d652329C8';
    // this.electionContract = await electionContract.deploy(accessControl);
    // console.log(`this.electionContract: ${this.electionContract.address}`);
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


// const { ethers } = require('hardhat')
// async function main() {
//     const accessControl = '0xD33bf7c2983f51dBC4abbF21850fA76d652329C8';
//     const electionContract = await ethers.getContractFactory("Election");
//     this.electionContract = await electionContract.deploy(accessControl);
//     console.log(`this.electionContract: ${this.electionContract.address}`);
// }

// main()
//     .then(() => process.exit(0))
//     .catch(error => {
//         console.error(error);
//         process.exit(1);
//     });


// function sleep(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms))
// }