// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

interface IVoterAccessControl {
    /**
     * @dev Returns `true` if `account` has been granted `role`.
     */
    function hasRole(bytes32 role, address account)
        external
        view
        returns (bool);
}