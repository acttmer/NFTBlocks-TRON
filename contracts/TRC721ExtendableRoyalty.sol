// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ITRC721ExtendableRoyalty.sol";
import "./TRC721Enumerable.sol";

contract TRC721ExtendableRoyalty is TRC721Enumerable, ITRC721ExtendableRoyalty {
    mapping(uint256 => string) _tokenURIs;
    mapping(uint256 => uint256) _royaltyValues;
    mapping(uint256 => Dependency[]) _dependencies;

    constructor(string memory name_, string memory symbol_)
        TRC721(name_, symbol_)
    {}

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            interfaceId == type(ITRC721ExtendableRoyalty).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        _requireMinted(tokenId);

        return _tokenURIs[tokenId];
    }

    function dependenciesOf(uint256 tokenId)
        public
        view
        override
        returns (Dependency[] memory)
    {
        _requireMinted(tokenId);

        return _dependencies[tokenId];
    }

    function royaltiesOf(uint256 tokenId)
        public
        view
        override
        returns (Royalty[] memory)
    {
        _requireMinted(tokenId);

        Royalty[] memory _royalties;
        Royalty memory _royalty;

        _royalty.receiver = _ownerOf(tokenId);
        _royalty.value = _royaltyValues[tokenId];

        _royalties = new Royalty[](1);
        _royalties[0] = _royalty;

        Dependency[] memory _deps = dependenciesOf(tokenId);

        for (uint256 i = 0; i < _deps.length; i++) {
            Royalty[] memory _depRoyalties = ITRC721ExtendableRoyalty(
                _deps[i].tokenAddress
            ).royaltiesOf(tokenId);

            _royalties = _concat(_royalties, _depRoyalties);
        }

        return _royalties;
    }

    function mint(
        address to,
        string memory tokenURI_,
        uint256 royaltyValue_,
        Dependency[] memory dependencies_
    ) public returns (uint256) {
        uint256 tokenId = totalSupply() + 1;

        _safeMint(to, tokenId);

        _tokenURIs[tokenId] = tokenURI_;
        _royaltyValues[tokenId] = royaltyValue_;

        for (uint256 i = 0; i < dependencies_.length; i++) {
            _dependencies[tokenId].push(dependencies_[i]);
        }

        return tokenId;
    }

    function _concat(Royalty[] memory a, Royalty[] memory b)
        internal
        pure
        returns (Royalty[] memory)
    {
        Royalty[] memory returnArr = new Royalty[](a.length + b.length);

        uint256 i = 0;
        for (; i < a.length; i++) {
            returnArr[i] = a[i];
        }

        uint256 j = 0;
        while (j < b.length) {
            returnArr[i++] = b[j++];
        }

        return returnArr;
    }
}
