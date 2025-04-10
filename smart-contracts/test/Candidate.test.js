const { expectEvent, expectRevert, constants } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS, ZERO_BYTES32 } = (require('@openzeppelin/test-helpers')).constants;

const { expect } = require('chai');
const web3 = require('web3');

const ElectionUpgradable = artifacts.require('ElectionUpgradable');
const ElectionInterface = artifacts.require('ElectionInterface');

const party = artifacts.require('Party');
const voterContract = artifacts.require('Voter');
const candidate = artifacts.require('Candidate');
const electionContract = artifacts.require('ElectionImplementation');
const eac = artifacts.require('ElectionAccessControl');

const sampleManiFest = require('./sample_manifest.json');
let owner;
let guardian;

contract('Candidate', function (accounts) {
  const [_owner, account1] = accounts;

  owner = _owner;
  guardian = owner;

  beforeEach(async function () {

    this.ElectionUpgradable = await ElectionUpgradable.new(guardian);
    this.ElectionInterface = await ElectionInterface.new(this.ElectionUpgradable.address)

    this.party = await party.new(this.ElectionUpgradable.address, { from: owner });
    this.candidate = await candidate.new(this.ElectionUpgradable.address, { from: owner });
    this.accessControl = await eac.new(owner, { from: owner });
    this.voter = await voterContract.new(this.ElectionUpgradable.address, { from: owner });
    this.election = await electionContract.new(guardian, this.party.address, this.voter.address, this.candidate.address,
      this.ElectionUpgradable.address, this.accessControl.address, { from: owner });

    await this.ElectionUpgradable.init(this.ElectionInterface.address, this.election.address, { from: guardian });
  });

  describe("Register candidates", function () {

    it("Only Owner should be able to register candidates", async function () {

      await insertCandidatesInContract(this.election);

      const getAllCandidates = await this.candidate.getAllCandidates();
      console.log(JSON.stringify(getAllCandidates))

    });

    it("Only Owner should be able to add new candidates in electoral district", async function () {

      await insertCandidatesInContract(this.election);
      const contests = await getContestFromManifest();

      const totalNumberOfElectoralDistricts = await this.candidate.getTotalNumberOfElecorialDistricts();
      const getTotalNumberOfCandidates = await this.candidate.getTotalNumberOfCandidates();

      await this.election.addCandidateInElectoralDistrict(contests[0][0], contests[0][1][0], { from: owner })

      const uTotalNumberOfElectoralDistricts = await this.candidate.getTotalNumberOfElecorialDistricts();
      const uGetTotalNumberOfCandidates = await this.candidate.getTotalNumberOfCandidates();

      expect(uTotalNumberOfElectoralDistricts).to.be.bignumber.equals(totalNumberOfElectoralDistricts);
      expect(uGetTotalNumberOfCandidates).to.be.bignumber.equals((parseInt(getTotalNumberOfCandidates) + 1).toString());

      const getAllCandidates = await this.candidate.getAllCandidates();
      console.log(JSON.stringify(getAllCandidates))

    });

  });


  // describe("Delete candidate", function () {

  //   it("Only Owner should be able to delete candidate", async function () {

  //     await insertCandidatesInContract(this.election);

  //     const candidate_id = "zaryab";

  //     const getCandidate = await this.candidate.getCandidate(candidate_id);
  //     console.log(getCandidate);

  //     await this.election.deleteCandidate(candidate_id, { from: owner });
  //     console.log("\n\n")

  //     const getAllCandidates = await this.candidate.getAllCandidates();
  //     console.log(JSON.stringify(getAllCandidates))

  //   });

  // });
});

async function insertCandidatesInContract(contract) {
  const contests = getContestFromManifest();

  for await (let contest of contests) {
    await contract.insertCandidates(contest[0], contest[1], { from: owner });
  }
}

function getContestFromManifest() {
  let contests = [];
  sampleManiFest.manifest.contests.forEach(contest => {
    let candidatesInContest = [];

    const contestData = [contest.electoral_district_id, contest.sequence_order, contest.vote_variation, contest.votes_allowed];

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

    contests.push([contest.electoral_district_id, candidatesInContest])
  })
  return contests;
}