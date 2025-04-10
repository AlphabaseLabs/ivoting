//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.3;

import "./ElectionUpgradable.sol";

contract Candidate {
    struct CandidateDetails {
        string name;
        string party_id;
        string candidate_id;
        string ballot_selections_object_id;
        uint256 ballot_selections_sequence_order;
        string electoral_district_id;
        uint256 electoral_sequence_order;
        string vote_variation;
        uint256 votes_allowed;
        bool deleated;
        string meta;
    }

    ElectionUpgradable private elecUpgradable;
    CandidateDetails[] public candidates;
    string[] electoral_districts;

    // takes candidate_id and returns the associated details
    mapping(string => CandidateDetails) candidate;

    // takes electoral_district_id and returns the associated candidates
    mapping(string => CandidateDetails[]) allCandidatesInElectoralDistrict;

    mapping(string => bool) isElectoralDistrictExists;

    mapping(string => uint256) candidateIndex;

    /** @notice confirms that the caller is the address of implementation
        contract
      */
    modifier onlyImplementation() {
        require(msg.sender == elecUpgradable.getElecImpl(), "invalid caller");
        _;
    }

    /// @notice constructor. sets the elections upgradable address
    constructor(address _elecUpgradable) {
        elecUpgradable = ElectionUpgradable(_elecUpgradable);
    }

    function insertCandidates(string calldata _electoral_district_id, CandidateDetails[] calldata candidatesToInsert)
        external
        onlyImplementation
    {
        require(isElectoralDistrictExists[_electoral_district_id] == false, "Electoral District already exits");
        electoral_districts.push(_electoral_district_id);

        for (uint256 a = 0; a < candidatesToInsert.length; a++) {
            _insertCandidate(_electoral_district_id, candidatesToInsert[a]);
        }

        isElectoralDistrictExists[_electoral_district_id] = true;
    }

    function addCandidateInElectoralDistrict(
        string calldata _electoral_district_id,
        CandidateDetails calldata candidateToInsert
    ) external onlyImplementation {
        require(isElectoralDistrictExists[_electoral_district_id] != false, "Electoral District doesnot exits");
        _insertCandidate(_electoral_district_id, candidateToInsert);
    }

    function deleteCandidate(string calldata candidate_id) external onlyImplementation {
        CandidateDetails storage candidateToDelete = candidate[candidate_id];
        candidateToDelete.deleated = true;
        candidate[candidate_id] = candidateToDelete;
        candidates[candidateIndex[candidate_id]] = candidateToDelete;
        allCandidatesInElectoralDistrict[candidateToDelete.electoral_district_id][
            candidateIndex[candidate_id]
        ] = candidateToDelete;
    }

    function getCandidate(string calldata candidate_id) external view returns (CandidateDetails memory) {
        return candidate[candidate_id];
    }

    function getAllCandidates() external view returns (CandidateDetails[] memory) {
        return candidates;
    }

    function getAllElecorialDistrictIds() external view returns (string[] memory) {
        return electoral_districts;
    }

    function getAllCandidatesInElecorialDistrict(string calldata _electoral_district_id)
        external
        view
        returns (CandidateDetails[] memory)
    {
        return allCandidatesInElectoralDistrict[_electoral_district_id];
    }

    function isCandidateDeleted(string calldata candidate_id) external view returns (bool) {
        return candidate[candidate_id].deleated;
    }

    function getTotalNumberOfCandidates() external view returns (uint256) {
        return candidates.length;
    }

    function getTotalNumberOfElecorialDistricts() external view returns (uint256) {
        return electoral_districts.length;
    }

    function _insertCandidate(string calldata _electoral_district_id, CandidateDetails calldata candidatesToInsert)
        internal
    {
        candidateIndex[candidatesToInsert.candidate_id] = candidates.length;
        candidates.push(candidatesToInsert);
        allCandidatesInElectoralDistrict[_electoral_district_id].push(candidatesToInsert);
        candidate[candidatesToInsert.candidate_id] = candidatesToInsert;
    }
}
