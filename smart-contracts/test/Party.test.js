const web3 = require('web3');

const ElectionUpgradable = artifacts.require('ElectionUpgradable');
const ElectionInterface = artifacts.require('ElectionInterface');

const party = artifacts.require('Party');
const voterContract = artifacts.require('Voter');
const candidate = artifacts.require('Candidate');
const electionContract = artifacts.require('ElectionImplementation');
const eac = artifacts.require('ElectionAccessControl');

const sampleManiFest = require('./sample_manifest.json');

contract('Party', function (accounts) {
  const [owner, account1] = accounts;
  const guardian = owner;

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

  describe("Register parties", function () {

    it("Only Owner should be able to register parties", async function () {
      let parties = [];
      for await (let _party of sampleManiFest.manifest.parties) {
        const name = _party.name.text.find(data => {
          if (data.language == 'en')
            return data.value;
        })

        parties.push([_party.object_id, name.value, _party.abbreviation, _party.logo_uri, "{}"]);
      }
      await this.election.insertParties(parties, { from: owner });

      const getAllParties = await this.party.getListOfParties();
      console.log(getAllParties);
    });
  });
});

function elections(seats = []) {
  return [hash(seats[0] || 'NA1'), hash(seats[1] || 'NA2')]
}

function voter_id(id) {
  return hash(id || '38303-1223238-5')
}

function hash(value) {
  return web3.utils.keccak256(value)
}