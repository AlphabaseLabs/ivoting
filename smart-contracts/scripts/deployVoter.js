const { ethers } = require('hardhat')
async function main() {
    const accessControl = '0xD33bf7c2983f51dBC4abbF21850fA76d652329C8';
    const voter = await ethers.getContractFactory("Voter");
    this.voter = await voter.deploy(accessControl);
    console.log(`this.voter: ${this.voter.address}`);
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