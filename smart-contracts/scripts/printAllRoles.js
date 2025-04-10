const { ethers } = require('hardhat')


async function main() {

    const ACCESSCONTROL = '0x5b1869D9A4C187F2EAa108f3062412ecf0526b24';
    const accessControl = await ethers.getContractFactory("ElectionAccessControl");
    this.accessControl = await accessControl.attach(ACCESSCONTROL);
    
    console.log(`ACCESSCONTROL=${this.accessControl.address}`);
    console.log('\n');

    const [
        REGISTRATION_ROLE,
        BALLOT_OPEN_ROLE,
        BALLOT_CLOSE_ROLE,
        ADMIN_LOGIN_ROLE
    ] = await Promise.all([
        this.accessControl.REGISTRATION_ROLE(),
        this.accessControl.BALLOT_OPEN_ROLE(),
        this.accessControl.BALLOT_CLOSE_ROLE(),
        this.accessControl.ADMIN_LOGIN_ROLE(),
    ])

    console.log('REGISTRATION_ROLE: ', REGISTRATION_ROLE);
    console.log('BALLOT_OPEN_ROLE: ', BALLOT_OPEN_ROLE);
    console.log('BALLOT_CLOSE_ROLE: ', BALLOT_CLOSE_ROLE);
    console.log('ADMIN_LOGIN_ROLE: ', ADMIN_LOGIN_ROLE);

    console.log('\nScript completed');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });