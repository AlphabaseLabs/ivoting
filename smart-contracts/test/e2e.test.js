const { expectEvent, expectRevert, constants } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS, ZERO_BYTES32 } = (require('@openzeppelin/test-helpers')).constants;

const { expect } = require('chai');
const web3 = require('web3');

const eac = artifacts.require('ElectionAccessControl');
const voterContract = artifacts.require('Voter');
const electionContract = artifacts.require('Election');

contract('E2E', function (accounts) {
  const [owner, account1] = accounts;

  before(async function () {
    this.accessControl = await eac.new(owner, { from: owner });
    this.election = await electionContract.new(this.accessControl.address, { from: owner })

    this.voter = await voterContract.new(this.accessControl.address, this.election.address, { from: owner })
    console.log(`this.accessControl: ${this.accessControl.address}`);
    console.log(`this.election: ${this.election.address}`);
    console.log(`this.voter: ${this.voter.address}`);
    console.log(`\n\n`);
  });

  describe("Election", function () {
    beforeEach(async function () {
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