const { ethers } = require('hardhat')

const sampleManiFest = require('../test/sample_manifest.json');


async function main() {

    const CANDIDATECONTRACT = '0xD833215cBcc3f914bD1C9ece3EE7BF8B14f841bb';
    const candidate = await ethers.getContractFactory("Candidate");
    this.candidate = await candidate.attach(CANDIDATECONTRACT);

    const ElectionImplementation = '0xe982E462b094850F12AF94d21D470e21bE9D0E9C';
    const election = await ethers.getContractFactory("ElectionImplementation");
    this.election = await election.attach(ElectionImplementation);

    console.log(`CANDIDATECONTRACT=${this.candidate.address}`);
    console.log(`ElectionImplementation=${this.election.address}`);
    console.log('\n');

    await insertCandidatesInContract(this.election);

    const getAllCandidates = await this.candidate.getAllCandidates();
    console.log(getAllCandidates)

    console.log('\nScript completed');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

async function insertCandidatesInContract(contract) {
    const contests = getContestFromManifest();


    for await (let contest of contests) {
        await contract.insertCandidates(contest[0], contest[1]);
    }
}

function getContestFromManifest() {
    let contests = [];
    sampleManiFest.manifest.contests.forEach(contest => {
        let candidatesInContest = [];

        const contestData = [contest.object_id, contest.sequence_order, contest.vote_variation, contest.votes_allowed];

        contest.ballot_selections.map(_ballot_selections => {

            const _candidate = sampleManiFest.manifest.candidates.find(candidateData => {
                return candidateData.object_id == _ballot_selections.candidate_id;
            })

            if (_candidate) {
                const name = _candidate.name.text.find(nameWrtToLanguage => {
                    if (nameWrtToLanguage.language == 'en')
                        return nameWrtToLanguage.value;
                })
                candidatesInContest.push([
                    name.value,
                    _candidate.party_id,
                    _ballot_selections.candidate_id,
                    _ballot_selections.object_id,
                    _ballot_selections.sequence_order,
                    ...contestData,
                    false,
                    '{}'
                ])
            }
        })

        contests.push([contest.object_id, candidatesInContest])
    })
    return contests;
}