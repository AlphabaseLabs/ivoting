//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.3;

import "./Party.sol";
import "./Voter.sol";
import "./Candidate.sol";
import "./ElectionUpgradable.sol";
import "./ElectionAccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ElectionImplementation is Ownable {
    // /////////////////////////////////
    // structs
    // /////////////////////////////////
    enum ElectionState {
        KEY_GENERATION,
        REGISTRATION,
        VOTING,
        TALLYING,
        RESULT
    }

    // /////////////////////////////////
    // events
    // /////////////////////////////////
    event SystemStatusEvent(address indexed from, bool success, string reason);

    // /////////////////////////////////
    // function modifiers
    // - call internal functions
    // - otherwise Solidity would duplicate
    //   and inline the functions, which costs way more gas
    // /////////////////////////////////

    /** @notice confirms if the `msg.sender` has the mentioned roele
     * @param role hash of the role
     */
    modifier hasRole(bytes32 role) {
        require(AccessControl.hasRole(role, msg.sender), "Role not found");
        _;
    }

    /** @notice confirms if the voting state is equal to passed value
     * @param _state enum
     */
    modifier validElectionState(ElectionState _state) {
        require(electionState == _state, "Invalid voting state");
        _;
    }

    modifier onlyIfPubKeySet() {
        isPubKeySet();
        _;
    }

    function isPubKeySet() internal view {
        require(IS_PUBKEY_SET == true, "Public Key is not set.");
    }

    // /////////////////////////////////
    // variables
    // /////////////////////////////////
    bytes private publicKey;
    bool private IS_PUBKEY_SET;
    ElectionState public electionState;

    Party public party;
    Voter public voter;
    Candidate public candidate;
    ElectionUpgradable public elecUpgradable;
    ElectionAccessControl public AccessControl;

    // /////////////////////////////////
    // constructor
    // /////////////////////////////////
    constructor(
        address _owner,
        Party _party,
        Voter _voter,
        Candidate _candidate,
        ElectionUpgradable _elecUpgradable,
        ElectionAccessControl _accessControl
    ) {
        party = _party;
        voter = _voter;
        candidate = _candidate;
        AccessControl = _accessControl;
        elecUpgradable = _elecUpgradable;
        electionState = ElectionState.REGISTRATION;
        transferOwnership(_owner);
    }

    // /////////////////////////////////////////
    // VOTING AUTHORITY core functions (owner)
    // /////////////////////////////////////////

    function setPublicKey(bytes calldata _publicKey) external onlyOwner {
        // public key can only be generated once
        require(!IS_PUBKEY_SET, "The public key is already set.");

        // set the public key
        publicKey = _publicKey;

        IS_PUBKEY_SET = true;
    }

    // open the Ballot and change into state VOTING
    //onlyIfPubKeySet onlyIfSysParamsSet
    function openBallot() external onlyOwner {
        require(electionState == ElectionState.REGISTRATION, "Need state REGISTRATION.");
        electionState = ElectionState.VOTING;
    }

    function startTallying() external onlyOwner {
        require(electionState == ElectionState.VOTING, "Need state VOTING.");
        electionState = ElectionState.TALLYING;
    }

    function publishResults() external onlyOwner {
        require(electionState == ElectionState.TALLYING, "Need state TALLYING.");
        electionState = ElectionState.RESULT;
    }

    function insertParties(Party.PartyDetails[] calldata partiesToInsert) external {
        party.insertParties(partiesToInsert);
    }

    function insertCandidates(
        string calldata _electoral_district_id,
        Candidate.CandidateDetails[] calldata candidatesToInsert
    ) external {
        candidate.insertCandidates(_electoral_district_id, candidatesToInsert);
    }

    function addCandidateInElectoralDistrict(
        string calldata _electoral_district_id,
        Candidate.CandidateDetails calldata candidateToInsert
    ) external {
        candidate.addCandidateInElectoralDistrict(_electoral_district_id, candidateToInsert);
    }

    function deleteCandidate(string calldata candidate_id) external {
        candidate.deleteCandidate(candidate_id);
    }

    function registerVoter(bytes32 _voter_id, bytes32[] memory elections)
        external
        validElectionState(ElectionState.REGISTRATION)
        hasRole(AccessControl.REGISTRATION_ROLE())
    {
        voter.registerVoter(_voter_id, elections);
    }

    function reconfigureVoterElections(bytes32 _voter_id, bytes32[] memory elections)
        external
        validElectionState(ElectionState.REGISTRATION)
        hasRole(AccessControl.REGISTRATION_ROLE())
    {
        voter.reconfigureVoterElections(_voter_id, elections);
    }

    function castVote(
        bytes32 voter_id,
        bytes32 election,
        bytes32 vote_hash,
        string calldata ballot_id,
        bytes calldata signature
    ) external validElectionState(ElectionState.VOTING) returns (bool) {
        voter.castVote(voter_id, election, vote_hash, ballot_id, signature);
    }

    // /////////////////////////////////
    // getters
    // /////////////////////////////////

    // get combined public key of the system
    function getPublicKey() public view onlyIfPubKeySet returns (bytes memory) {
        return publicKey;
    }

    function getElectionState() public view returns (ElectionState) {
        return electionState;
    }

    function getElectionStateString() public view returns (string memory) {
        if (electionState == ElectionState.KEY_GENERATION) {
            return "KEY_GENERATION";
        }

        if (electionState == ElectionState.REGISTRATION) {
            return "REGISTRATION";
        }

        if (electionState == ElectionState.VOTING) {
            return "VOTING";
        }

        if (electionState == ElectionState.TALLYING) {
            return "TALLYING";
        }

        if (electionState == ElectionState.RESULT) {
            return "RESULT";
        }
    }

    function getAllCandidatesInElecorialDistrict(string calldata _electoral_district_id)
        external
        view
        returns (Candidate.CandidateDetails[] memory)
    {
        return candidate.getAllCandidatesInElecorialDistrict(_electoral_district_id);
    }

    function isCandidateDeleted(string calldata candidate_id) external view returns (bool) {
        return candidate.isCandidateDeleted(candidate_id);
    }

    function getParty(string calldata object_id) external view returns (Party.PartyDetails memory) {
        return party.getParty(object_id);
    }

    function getVoter(bytes32 _voter_id) external view returns (Voter.VoterProfile memory) {
        return voter.getVoter(_voter_id);
    }

    function getRegisteredVoters() external view returns (uint256) {
        return voter.getRegisteredVoters();
    }

    function getVoterState(bytes32 _voter_id) public view returns (Voter.VoterState) {
        return voter.getVoterState(_voter_id);
    }
}
