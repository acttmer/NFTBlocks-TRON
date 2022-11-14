// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ITRC721.sol";

interface ITRC721Enumerable is ITRC721 {
    function totalSupply() external view returns (uint256);

    function tokenOfOwnerByIndex(address owner, uint256 index)
        external
        view
        returns (uint256);

    function tokenByIndex(uint256 index) external view returns (uint256);
}
