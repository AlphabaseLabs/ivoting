// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

interface IElection {
    enum ElectionState {
        KEY_GENERATION,
        REGISTRATION,
        VOTING,
        TALLYING,
        RESULT
    }

    function getElectionState() external view returns (ElectionState);
}
