const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const web3 = require('web3');

const ElectionUpgradable = artifacts.require('ElectionUpgradable');
const ElectionInterface = artifacts.require('ElectionInterface');
const eac = artifacts.require('ElectionAccessControl');

const party = artifacts.require('Party');
const voterContract = artifacts.require('Voter');
const MultiSigWallet = artifacts.require('MultiSigWallet');
const candidate = artifacts.require('Candidate');
const electionImplementation = artifacts.require('ElectionImplementation');

const samplePublicKey = '0x41DF72CF54FC9B9ABA97115E8302F63D7E533043BAC94CD9409835947DE76B25F04CD7775E36832173AD7EA9E3541E7F95275749C7DDC9C44147B9629CC0093006D0EF3B9EA6DE293FB2427FF0E83D6EFE086112D73DB4F8FF7E23F6DD060ED361C9F1E5E5C85A7799E61E71C6A683A9D657E34EA43821057E30E115CB87828C27E297227035810E9D05067C094CE15E919716FCF9FE557F6232B84921C605C2F975F162C1AD3DFD454E08FB6278B6E18CDF902FF30D3C44650D615D891052A2E4503273EA5222D93A7AC0B18C5602CAC7B2BD735B1332320056615E49E898C39659257DDB1D661C814CE454C807AB9FD50F2E3E313897BAEA18055C0373E843A0A5AEE3D01EA96762A7897534DD2E723BE36376819411A41A34D74792DC2561601C9B3A87F8AF465AF9C9F502C585C15B9421671E60CF65B20DDD9431F62E1AC017280AE8E5D0E3394971A6FA7CF01325F3AD703AA209ED4C9A572810B0BA271FA625A3CFAE18313E9F1AF91688AE903BC88B345E700957FFD42D518DE72245ACDE91BA46CBAEC904FFA0BDFD25993D9C9C7CF03425D56CFC7856383424A70A78828C62F852CF36C596DC06B935390F1DB56D2D51A218D9A22F8AF9043FDE2C5F7437357B8E9887D8CB37C8D7A64554A7D2B469AC3949433E1B9372AFBF3B43ED55553FE24BA42789E89206CD9265BF33102B261CD374FE7C0C9ADCF9BF9B09';

contract('Election', function (accounts) {
  const [owner, account1] = accounts;
  const guardian = owner;
  beforeEach(async function () {


    this.MultiSigWallet = await MultiSigWallet.new([owner, account1], 2);
    this.ElectionUpgradable = await ElectionUpgradable.new(guardian);
    this.ElectionInterface = await ElectionInterface.new(this.ElectionUpgradable.address)
    this.accessControl = await eac.new(owner, { from: owner });

    this.party = await party.new(this.ElectionUpgradable.address, { from: owner });
    this.candidate = await candidate.new(this.ElectionUpgradable.address, { from: owner });
    this.voter = await voterContract.new(this.ElectionUpgradable.address, { from: owner })

    this.election = await electionImplementation.new(this.MultiSigWallet.address, this.party.address, this.voter.address, this.candidate.address,
      this.ElectionUpgradable.address, this.accessControl.address, { from: owner });

    await this.ElectionUpgradable.init(this.ElectionInterface.address, this.election.address, { from: guardian });

  });

  describe("Registration", function () {

    it("Election Contract state should be REGISTRATION", async function () {
      expect(await this.election.getElectionStateString()).equals('REGISTRATION');
    });

  });

  describe("Public Key", function () {

    it("Public Key can't be get if its not set", async function () {
      await expectRevert(this.election.getPublicKey(), 'Public Key is not set.');
    });

    it("Non owner can't set Public Key", async function () {
      await expectRevert(this.election.setPublicKey(samplePublicKey, { from: account1 }), 'Ownable: caller is not the owner');
    });

    it("Owner can set Public Key", async function () {
      const setPublicKeyFn = this.election.contract.methods.setPublicKey(samplePublicKey).encodeABI();
      await this.MultiSigWallet.submitTransaction(this.election.address, "0", setPublicKeyFn, { from: owner })
      const receipt = await this.MultiSigWallet.confirmTransaction("0", { from: account1 });
    });

    it("Public key can't be set again once set", async function () {
      const setPublicKeyFn = this.election.contract.methods.setPublicKey(samplePublicKey).encodeABI();
      await this.MultiSigWallet.submitTransaction(this.election.address, "0", setPublicKeyFn, { from: owner })
      await this.MultiSigWallet.confirmTransaction("0", { from: account1 });

      await this.MultiSigWallet.submitTransaction(this.election.address, "0", setPublicKeyFn, { from: owner })
      const receipt = await this.MultiSigWallet.confirmTransaction("1", { from: account1 });

      expectEvent(receipt, 'ExecutionFailure');
    });

    it("Public key can be retrieved once set", async function () {
      const setPublicKeyFn = this.election.contract.methods.setPublicKey(samplePublicKey).encodeABI();
      await this.MultiSigWallet.submitTransaction(this.election.address, "0", setPublicKeyFn, { from: owner })
      await this.MultiSigWallet.confirmTransaction("0", { from: account1 });

      const publicKey = await this.election.getPublicKey();
      expect(publicKey.toUpperCase()).to.equal(samplePublicKey.toUpperCase())
    });
  });

  describe("Open Voting", function () {

    it("getElectionStateString should return current state REGISTRATION", async function () {
      const currentState = await this.election.getElectionStateString();
      console.log(currentState)
      expect(currentState).to.equals('REGISTRATION')
    });

    it("Non owner can't call openBallot", async function () {
      await expectRevert(this.election.openBallot({ from: account1 }), 'Ownable: caller is not the owner');
    });

    it("Owner can set Public Key", async function () {
      const fn = this.election.contract.methods.openBallot().encodeABI();
      await this.MultiSigWallet.submitTransaction(this.election.address, "0", fn, { from: owner })
      const receipt = await this.MultiSigWallet.confirmTransaction("0", { from: account1 });
      const currentState = await this.election.getElectionStateString();
      console.log(currentState)
      expect(currentState).to.equals('VOTING')

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