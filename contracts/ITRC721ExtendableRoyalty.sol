// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ITRC721.sol";

interface ITRC721ExtendableRoyalty is ITRC721 {
    struct Dependency {
        address tokenAddress;
        uint256 tokenId;
    }

    struct Royalty {
        address receiver;
        uint256 value;
    }

    function dependenciesOf(uint256 tokenId)
        external
        view
        returns (Dependency[] memory);

    function royaltiesOf(uint256 tokenId)
        external
        view
        returns (Royalty[] memory);
}
