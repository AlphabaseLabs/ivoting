const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = (require('@openzeppelin/test-helpers')).constants;

const { expect } = require('chai');
const web3 = require('web3');

const ElectionUpgradable = artifacts.require('ElectionUpgradable');
const ElectionInterface = artifacts.require('ElectionInterface');

const party = artifacts.require('Party');
const voterContract = artifacts.require('Voter');
const candidate = artifacts.require('Candidate');
const electionContract = artifacts.require('ElectionImplementation');
const eac = artifacts.require('ElectionAccessControl');

let owner;
let guardian;

contract('Voter', function (accounts) {
  const [_owner, account1] = accounts;

  owner = _owner;
  guardian = owner;

  before(async function () {

    this.ElectionUpgradable = await ElectionUpgradable.new(guardian);
    this.ElectionInterface = await ElectionInterface.new(this.ElectionUpgradable.address)

    this.accessControl = await eac.new(owner, { from: owner });
    this.party = await party.new(this.ElectionUpgradable.address, { from: owner });
    this.candidate = await candidate.new(this.ElectionUpgradable.address, { from: owner });
    this.voter = await voterContract.new(this.ElectionUpgradable.address, { from: owner })
    this.election = await electionContract.new(guardian, this.party.address, this.voter.address, this.candidate.address,
      this.ElectionUpgradable.address, this.accessControl.address, { from: owner });


    await this.ElectionUpgradable.init(this.ElectionInterface.address, this.election.address, { from: guardian });
  });

  describe("Registration", function () {

    beforeEach(async function () {
    });

    it("REGISTRATION role is required to register a voter", async function () {
      await expectRevert(this.election.registerVoter(voter_id(), elections(), { from: account1 }), 'Role not found')
    });

    it("Default Voter state is NOT_REGISTERED", async function () {
      expect(await this.voter.getVoterState(voter_id())).to.be.bignumber.equals('0');
    });

    it("Voter Registration should be done by a REGISTRATION role holder ", async function () {
      const registeredVoters = await this.voter.getRegisteredVoters();
      expect(registeredVoters).to.be.bignumber.equals('0')

      const receipt = await this.election.registerVoter(voter_id(), elections(), { from: owner })
      // expectEvent(receipt, 'VoterStatusEvent', {
      //   from: owner,
      //   voter_id: voter_id(),
      //   reason: 'Voter Registered'
      // })
    });

    it("Voter state should be REGISTERED", async function () {
      expect(await this.voter.getVoterState(voter_id())).to.be.bignumber.equals('1');
    });

    it("getVoter should return valid data", async function () {
      const _voter = await this.voter.getVoter(voter_id());
      expect(_voter[0]).equals(voter_id());
      expect(_voter[1]).equals(ZERO_ADDRESS);
      expect(_voter[2]).eql(elections());
      expect(_voter[3]).to.be.bignumber.equals("0");
      expect(_voter[4]).to.be.bignumber.equals("1");
      expect(_voter[5]).to.eql([]);
    });

    it("Registerd voters count is increased", async function () {
      const registeredVoters = await this.voter.getRegisteredVoters();
      expect(registeredVoters).to.be.bignumber.equals('1')
    });

    it("Same Voter cannot be registered again", async function () {
      await expectRevert(this.election.registerVoter(voter_id(), elections(), { from: owner }), 'Invalid voter state')
    });
  });

  describe("Re Assignment of Elections", function () {

    it("REGISTRATION role is required to update voter elections", async function () {
      await expectRevert(this.election.reconfigureVoterElections(voter_id(), elections(), { from: account1 }), 'Role not found')
    });

    it("Voter State should be REGISTERED", async function () {
      expect(await this.voter.getVoterState(voter_id())).to.be.bignumber.equals('1');
    });

    it("Voters elections can be re-assigned by a REGISTRATION role holder", async function () {
      const receipt = await this.election.reconfigureVoterElections(voter_id(), elections(['NA3','NA4']), { from: owner })
      // expectEvent(receipt, 'VoterStatusEvent', {
      //   from: owner,
      //   voter_id: voter_id(),
      //   reason: 'Voter Elections Reassigned'
      // })
    });

    it("Registered voters count should remain same", async function () {
      const registeredVoters = await this.voter.getRegisteredVoters();
      expect(registeredVoters).to.be.bignumber.equals('1')
    });

    it("getVoter should retuen updated data", async function () {
      const _voter = await this.voter.getVoter(voter_id());

      expect(_voter[0]).equals(voter_id());
      expect(_voter[1]).equals(ZERO_ADDRESS);
      expect(_voter[2]).eql(elections(['NA3','NA4']));
      expect(_voter[3]).to.be.bignumber.equals("0");
      expect(_voter[4]).to.be.bignumber.equals("1");
      expect(_voter[5]).to.eql([]);
    });

    it("reconfigureVoterElections function should not be callable on voters that are not registered", async function () {
      await expectRevert(this.election.reconfigureVoterElections(voter_id('hi'), elections(['NA3', 'NA4']), { from: owner }), 'Invalid voter state')
    });
  })

  describe("Cast Vote", function () {

    it("Should reject vote if election state is not VOTING", async function () {
      await expectRevert(this.election.castVote(
        voter_id(),
        web3.utils.sha3("NA3"),
        web3.utils.sha3("vote hash"),
        'ballot-id',
        '0xbceab59162da5e511fb9c37fda207d443d05e438e5c843c57b2d5628580ce9216ffa0335834d8bb63d86fb42a8dd4d18f41bc3a301546e2c47aa1041c3a182371b'
      ), 'Invalid voting state');
    });


    it("Cast vote", async function () {
      await this.election.openBallot({ from: guardian });

      const vote1 = await this.election.castVote(
        voter_id(),
        web3.utils.sha3("NA3"),
        web3.utils.sha3("vote hash"),
        'ballot-id',
        '0xbceab59162da5e511fb9c37fda207d443d05e438e5c843c57b2d5628580ce9216ffa0335834d8bb63d86fb42a8dd4d18f41bc3a301546e2c47aa1041c3a182371b'
      );

      const vote2 = await this.election.castVote(
        voter_id(),
        web3.utils.sha3("NA4"),
        web3.utils.sha3("vote hash"),
        'ballot-id',
        '0xbceab59162da5e511fb9c37fda207d443d05e438e5c843c57b2d5628580ce9216ffa0335834d8bb63d86fb42a8dd4d18f41bc3a301546e2c47aa1041c3a182371b'
      )
    });

    it("getVoterVotes should return votes", async function () {
      const votes = await this.voter.getVoterVotes(voter_id());
      console.log(votes)
    });

    it("getVotesInElection should return votes", async function () {
      const votes = await this.voter.getVotesInElection(web3.utils.sha3("NA3"));
      console.log(votes)
    });

    it("Should reject vote if it is casted again", async function () {
      await expectRevert(this.election.castVote(
        voter_id(),
        web3.utils.sha3("NA3"),
        web3.utils.sha3("vote hash"),
        'ballot-id',
        '0xbceab59162da5e511fb9c37fda207d443d05e438e5c843c57b2d5628580ce9216ffa0335834d8bb63d86fb42a8dd4d18f41bc3a301546e2c47aa1041c3a182371b'
      ), 'Voter has already voted');
    });

    it("Voter should not be able to vote in an unassigned election", async function () {
      await expectRevert(this.election.castVote(
        voter_id(),
        web3.utils.sha3("NA3"),
        web3.utils.sha3("vote hash"),
        'ballot-id',
        '0xbceab59162da5e511fb9c37fda207d443d05e438e5c843c57b2d5628580ce9216ffa0335834d8bb63d86fb42a8dd4d18f41bc3a301546e2c47aa1041c3a182371b'
      ), 'Election not found');
    });

    it("Voting should not happen if election state is TALLYING", async function () {
      await this.election.startTallying({ from: guardian });
      await expectRevert(this.election.castVote(
        voter_id(),
        web3.utils.sha3("NA3"),
        web3.utils.sha3("vote hash"),
        'ballot-id',
        '0xbceab59162da5e511fb9c37fda207d443d05e438e5c843c57b2d5628580ce9216ffa0335834d8bb63d86fb42a8dd4d18f41bc3a301546e2c47aa1041c3a182371b'
      ), 'Invalid voting state');
    });
    it("Voting should not happen if election state is RESULTS", async function () {
      await this.election.publishResults({ from: guardian });
      await expectRevert(this.election.castVote(
        voter_id(),
        web3.utils.sha3("NA3"),
        web3.utils.sha3("vote hash"),
        'ballot-id',
        '0xbceab59162da5e511fb9c37fda207d443d05e438e5c843c57b2d5628580ce9216ffa0335834d8bb63d86fb42a8dd4d18f41bc3a301546e2c47aa1041c3a182371b'
      ), 'Invalid voting state');
    });
  })
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