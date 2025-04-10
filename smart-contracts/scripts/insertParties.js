const { ethers } = require('hardhat')

const sampleManiFest = require('../test/sample_manifest.json');


async function main() {

    const PARTY = '0xC89Ce4735882C9F0f0FE26686c53074E09B0D550';
    const Party = await ethers.getContractFactory("Party");
    this.Party = await Party.attach(PARTY);

    const election = await ethers.getContractFactory("ElectionImplementation");
    const ElectionImplementation = '0xe982E462b094850F12AF94d21D470e21bE9D0E9C';
    this.election = await election.attach(ElectionImplementation);

    console.log(`ElectionImplementation=${this.election.address}`);
    console.log(`PARTY=${this.Party.address}`);
    console.log('\n');

    let parties = [];
    for await (let _party of sampleManiFest.manifest.parties) {
        const name = _party.name.text.find(data => {
            if (data.language == 'en')
                return data.value;
        })

        parties.push([_party.object_id, name.value, _party.abbreviation, _party.logo_uri, "{}"]);
    }
    console.log(`Total parites: `, parties.length)
    // await this.election.insertParties(parties);

    const _parties = splitIntoChunk(parties, 20);
    for (let _party of _parties) {
        console.log(`Inserting parites: `, _party.length)
        const resp = await this.election.insertParties(_party);
    }
    const getAllParties = await this.Party.getListOfParties();
    console.log(getAllParties);
    console.log('\nScript completed');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

function splitIntoChunk(arr, chunk) {
    let resp = [];
    for (i = 0; i < arr.length; i += chunk) {
        let tempArray;
        tempArray = arr.slice(i, i + chunk);
        resp.push(tempArray)
        // console.log(tempArray);
    }

    return resp;
}