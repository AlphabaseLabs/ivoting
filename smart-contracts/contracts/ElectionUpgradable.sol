//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.3;

import "./ElectionInterface.sol";

contract ElectionUpgradable {
    address private guardian;
    address private elecImpl;
    address private elecInterface;
    // initDone ensures that init can be called only once
    bool private initDone;

    /** @notice constructor
     * @param _guardian account address
     */
    constructor(address _guardian) {
        guardian = _guardian;
        initDone = false;
    }

    /** @notice confirms that the caller is the guardian account
     */
    modifier onlyGuardian() {
        require(msg.sender == guardian, "invalid caller");
        _;
    }

    /** @notice executed by guardian. Links interface and implementation contract
        addresses. Can be executed by guardian account only
      * @param _elecInterface election interface contract address
      * @param _elecImpl implementation contract address
      */
    function init(address _elecInterface, address _elecImpl) external onlyGuardian {
        require(!initDone, "can be executed only once");
        elecImpl = _elecImpl;
        elecInterface = _elecInterface;
        _setImpl(elecImpl);
        initDone = true;
    }

    /** @notice function to fetch the guardian account address
     * @return _guardian guardian account address
     */
    function getGuardian() external view returns (address) {
        return guardian;
    }

    /** @notice function to fetch the current implementation address
     * @return election implementation contract address
     */
    function getElecImpl() external view returns (address) {
        return elecImpl;
    }

    /** @notice function to fetch the interface address
     * @return election interface contract address
     */
    function getElecInterface() external view returns (address) {
        return elecInterface;
    }

    /** @notice function to set the election implementation contract address
        in the election interface contract
      * @param _elecImpl election implementation contract address
      */
    function _setImpl(address _elecImpl) private {
        ElectionInterface(elecInterface).setElecImplementation(_elecImpl);
    }
}
