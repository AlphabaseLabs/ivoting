//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.3;

import "./ElectionImplementation.sol";
import "./ElectionUpgradable.sol";

contract ElectionInterface {
    ElectionImplementation private elecImplementation;
    ElectionUpgradable private elecUpgradeable;
    address private elecImplUpgradeable;

    /** @notice confirms that the caller is the address of upgradable
        contract
      */
    modifier onlyUpgradeable() {
        require(msg.sender == elecImplUpgradeable, "invalid caller");
        _;
    }

    /** @notice constructor
     * @param _elecImplUpgradeable elections upgradable contract address
     */
    constructor(address _elecImplUpgradeable) public {
        elecImplUpgradeable = _elecImplUpgradeable;
    }

    /** @notice sets the election implementation contract address
        can be called from upgradable contract only
      * @param _elecImplementation election implementation contract address
      */
    function setElecImplementation(address _elecImplementation) external onlyUpgradeable {
        // elecImplementation = ElectionImplementation(_elecImplementation);
    }

    /** @notice returns the address of elections implementation contract
     * @return elections implementation contract address
     */
    function getElectionssImpl() external view returns (ElectionImplementation) {
        return elecImplementation;
    }
}
