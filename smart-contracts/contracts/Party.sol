//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.3;

import "./ElectionUpgradable.sol";

contract Party  {
    struct PartyDetails {
        string object_id;
        string name;
        string abbreviation;
        string logo_uri;
        string meta;
    }

    ElectionUpgradable private elecUpgradable;

    PartyDetails[] listOfParties;

    // takes object_id and returns the associated party details
    mapping(string => PartyDetails) party;

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

    function insertParties(PartyDetails[] calldata partiesToInsert) external onlyImplementation {
        for (uint256 a = 0; a < partiesToInsert.length; a++) {
            PartyDetails memory _party = partiesToInsert[a];
            listOfParties.push(_party);
            party[_party.object_id] = partiesToInsert[a];
        }
    }

    function getParty(string calldata object_id) external view returns (PartyDetails memory) {
        return party[object_id];
    }

    function getListOfParties() external view returns (PartyDetails[] memory) {
        return listOfParties;
    }

    function getTotalOfParties() external view returns (uint256) {
        return listOfParties.length;
    }
}
