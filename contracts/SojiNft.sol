//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;



import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";




error NotOwner();


contract SojiNft is ERC721URIStorage, Ownable {

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
    string public s_contract_owner;

    struct Soji {
        address author;
        address owner;
        address tokenURL;
    }
    mapping(address => mapping(uint256 => Soji)) private s_Sojis;


    constructor() ERC721URIStorage("SOJI"){
        s_contract_owner = msg.sender;
    }

    transferOwnerContract(address new_contract_owner) {
        // if we want to transfer the ownership of the contract
        if(s_contract_owner != msg.sender) {
            revert NotOwner();
        }
        s_contract_owner = new_contract_owner
    }

    mintSOJI(address soji_owner, string memory tokenURL) public returns(uint256) {
        uint256 newSojiId = s_tokenIds.current();

        _safeMint(soji_owner, _tokenURL);
        s_tokenCounter - s_tokenCounter + 1;
        _setTokenURI(newItemId, tokenURI)
        ;
        return newSojiId;
    }

    /////////////////////
    // Getter Functions //
    /////////////////////

    function getSojis()
        external
        view
        returns (s_Sojis memory)
    {
        return s_Sojis;
    }
}