//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.3;

import "hardhat/console.sol";
import "./ElectionUpgradable.sol";
import "./ElectionImplementation.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Voter {
    // /////////////////////////////////
    // libraries
    // /////////////////////////////////
    using ECDSA for bytes32;

    // /////////////////////////////////
    // structs
    // /////////////////////////////////

    enum VoterState {
        NOT_REGISTERED,
        REGISTERED,
        BLACK_LISTED
    }

    enum VoteStatus {
        CASTED,
        SPOILED
    }

    struct VoterProfile {
        // hash of voter unique indentity
        bytes32 voter_id;
        // wallet address of the voter
        address voterAddress;
        // hash of seats/constituencies
        bytes32[] elections;
        // number of votes casted by the voter
        uint256 nrOfVotes;
        // status of the voter
        VoterState state;
        // vote details
        Vote[] votes;
    }

    struct Vote {
        VoteStatus voteStatus;
        bytes32 election;
        bytes32 vote_hash;
        string ballot_id;
    }

    // /////////////////////////////////
    // events
    // /////////////////////////////////
    event VoterStatusEvent(address indexed from, bytes32 voter_id, string reason);

    // /////////////////////////////////
    // function modifiers
    // - call internal functions
    // - otherwise Solidity would duplicate
    //   and inline the functions, which costs way more gas
    // /////////////////////////////////

    /** @notice confirms that the caller is the address of implementation
        contract
      */
    modifier onlyImplementation() {
        require(msg.sender == elecUpgradable.getElecImpl(), "invalid caller");
        _;
    }

    /** @notice confirms if the voter state is equal to passed value
     * @param _state enum
     */
    modifier validVoterState(bytes32 _voter_id, VoterState _state) {
        require(getVoterState(_voter_id) == _state, "Invalid voter state");
        _;
    }

    // /////////////////////////////////
    // variables
    // /////////////////////////////////

    VoterProfile[] voterProfile;
    ElectionUpgradable elecUpgradable;
    VoterState constant defaultVoterState = VoterState.NOT_REGISTERED;

    // bytes32 is voter_id
    mapping(bytes32 => VoterProfile) voters;
    // has the voter voted for the seat/constituency
    mapping(bytes32 => mapping(bytes32 => bool)) public hasVoted;
    mapping(bytes32 => Vote[]) votesInElection;

    // /////////////////////////////////
    // constructor
    // /////////////////////////////////
    constructor(ElectionUpgradable _elecUpgradable) {
        elecUpgradable = _elecUpgradable;
    }

    // /////////////////////////////////////////
    // core functions (owner)
    // /////////////////////////////////////////

    function registerVoter(bytes32 _voter_id, bytes32[] memory elections)
        external
        onlyImplementation
        validVoterState(_voter_id, VoterState.NOT_REGISTERED)
    {
        VoterProfile storage vp = voters[_voter_id];

        vp.voter_id = _voter_id;
        vp.elections = elections;
        vp.state = VoterState.REGISTERED;

        voterProfile.push(vp);

        postVoterRegistation(_voter_id, elections, "Voter Registered");
    }

    function reconfigureVoterElections(bytes32 _voter_id, bytes32[] memory elections)
        external
        onlyImplementation
        validVoterState(_voter_id, VoterState.REGISTERED)
    {
        VoterProfile storage vp = voters[_voter_id];

        vp.elections = elections;

        postVoterRegistation(_voter_id, elections, "Voter Elections Reassigned");
    }

    function castVote(
        bytes32 voter_id,
        bytes32 election,
        bytes32 vote_hash,
        string calldata ballot_id,
        bytes calldata signature
    ) external onlyImplementation validVoterState(voter_id, VoterState.REGISTERED) returns (bool) {
        bytes32 singedMsgHash = keccak256(abi.encode(address(this), voter_id, election, vote_hash, ballot_id))
            .toEthSignedMessageHash();
        address signer = singedMsgHash.recover(signature);

        _validateVote(voter_id, election, vote_hash, ballot_id);
        hasVoted[election][voter_id] = true;

        VoterProfile storage vp = voters[voter_id];

        Vote memory v = Vote(VoteStatus.CASTED, election, vote_hash, ballot_id);

        vp.votes.push(v);

        votesInElection[election].push(v);
        return true;
    }

    function postVoterRegistation(
        bytes32 voter_id,
        bytes32[] memory elections,
        string memory _reason
    ) internal {
        emit VoterStatusEvent(msg.sender, voter_id, _reason);
    }

    // /////////////////////////////////
    // getters
    // /////////////////////////////////

    function getVoter(bytes32 voter_id) external view returns (VoterProfile memory) {
        return voters[voter_id];
    }

    function getRegisteredVoters() external view returns (uint256) {
        return voterProfile.length;
    }

    function getVoterState(bytes32 voter_id) public view returns (VoterState) {
        return voters[voter_id].voter_id != bytes32(0) ? voters[voter_id].state : defaultVoterState;
    }

    function getVoterVotes(bytes32 voter_id) external view returns (Vote[] memory votes) {
        return voters[voter_id].votes;
    }

    function getVotesInElection(bytes32 election) external view returns (Vote[] memory votes) {
        return votesInElection[election];
    }

    function _validateVote(
        bytes32 voter_id,
        bytes32 election,
        bytes32 vote_hash,
        string calldata ballot_id
    ) private {
        VoterProfile memory vp = voters[voter_id];
        bool isValidElection = false;
        for (uint256 a = 0; a < vp.elections.length; a++) {
            if (vp.elections[a] == election) {
                isValidElection = true;
                break;
            }
        }

        require(isValidElection, "Election not found");
        require(hasVoted[election][voter_id] == false, "Voter has already voted");
    }
}
