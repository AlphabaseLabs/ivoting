const { ethers } = require('hardhat')
async function main() {
    const owner = '0xD33bf7c2983f51dBC4abbF21850fA76d652329C8';
    const vac = await ethers.getContractFactory("ElectionAccessControl");
    this.accessControl = await vac.deploy(owner);
    console.log(`this.accessControl: ${this.accessControl.address}`);
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