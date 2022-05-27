//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

error NotOwner();

contract SojiNft is ERC721URIStorage {
    // Patrick. C example
    // {
    //     "name":"pug",
    //     "description":"An adorable pug pup!",
    //     "image":"ipfs://QmSsYRx3LpDAb1GZQm7zZ1AuHZjfbPkD6J7s9r41xu1mf8",
    //     "attributes":[
    //         {
    //             "trait_type":"Cuteness",
    //             "value":100
    //         }]
    // }

    // Soji data struct
    // {
    //     "name": "darling",
    //     "description": "zerotwo saying darling",
    //     "tags": ["tag"]
    //     "image": "ipfs://cid"
    //     "audio": "ipfs://cid"
    // }

    using Counters for Counters.Counter;
    Counters.Counter private s_tokenIds;

    struct Soji {
        address author;
        address owner;
        address tokenURL;
    }
    mapping(address => mapping(uint256 => Soji)) public s_Sojis;

    constructor() ERC721("sojiNFT", "SOJI") {}

    function mintSOJI(address soji_owner, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newItemId = s_tokenIds.current();
        _safeMint(soji_owner, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}
