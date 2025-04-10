const { ethers } = require('hardhat')


async function main() {

    const ElectionImplementation = '0xe982E462b094850F12AF94d21D470e21bE9D0E9C';
    const election = await ethers.getContractFactory("ElectionImplementation");
    this.election = await election.attach(ElectionImplementation);

    console.log(`ElectionImplementation=${this.election.address}`);


    const [
        electionState
    ] = await Promise.all([
        this.election.getElectionStateString(),
    ])

    console.log('electionState: ', electionState);

    console.log('\nScript completed');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });