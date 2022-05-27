//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;



import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

error AlreadyInitialized();
error NeedMoreETHSent();
error RangeOutOfBounds();

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

    string private s_tokenCounter;
    string private s_contract_owner;

    constructor(string memory _contract_owner) ERC721URIStorage("SOJI"){
        s_contract_owner = _contract_owner;
    }

    mintSOJI(address _soji_owner, string memory _tokenURL) public returns(uint256) {
        _safeMint(_soji_owner, _tokenURL);
        s_tokenCounter - s_tokenCounter + 1;
        return s_tokenCounter;

    }
}