// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITRC721TokenReceiver {
    function onTRC721Received(
        address _operator,
        address _from,
        uint256 _tokenId,
        bytes memory _data
    ) external returns (bytes4);
}
