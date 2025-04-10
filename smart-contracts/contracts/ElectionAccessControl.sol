// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract ElectionAccessControl is AccessControlEnumerable {
    bytes32 public constant REGISTRATION_ROLE = keccak256("REGISTRATION_ROLE");
    bytes32 public constant BALLOT_OPEN_ROLE = keccak256("BALLOT_OPEN_ROLE");
    bytes32 public constant BALLOT_CLOSE_ROLE = keccak256("BALLOT_CLOSE_ROLE");
    bytes32 public constant ADMIN_LOGIN_ROLE = keccak256("ADMIN_LOGIN_ROLE");

    constructor(address owner) {
        _setupRole(DEFAULT_ADMIN_ROLE, owner);
        _setupRole(REGISTRATION_ROLE, owner);
        _setupRole(BALLOT_OPEN_ROLE, owner);
        _setupRole(BALLOT_CLOSE_ROLE, owner);
        _setupRole(ADMIN_LOGIN_ROLE, owner);
    }
}