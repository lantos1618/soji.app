//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "hardhat/console.sol";


// for chainlink reuqests
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

// for chainlink random
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

error NotOwner();
error NeedMoreGas();
error IllegalAttemptToSetAttributes();

contract SojiNft is ERC721URIStorage, ChainlinkClient {
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
    //     "animation_url": "ipfs://cid"
    // }



    using Counters for Counters.Counter;
    Counters.Counter private s_tokenIds;

    using Chainlink for Chainlink.Request;

    bytes32 private chainlink_jobId;
    uint256 private chainlink_fee;

    // enum Specials {
    //     EPHEMERAL,
    //     STAR,
    //     PLATINUM,
    //     GOLD,
    //     SILVER,
    //     RED,
    //     BlUE 
    // }

    string[] public Rarity = [
        "EPHEMERAL",
        "STAR",
        "PLATINUM",
        "GOLD",
        "SILVER",
        "RED",
        "BLUE"
    ]; 


    string private s_unconfirmedTokenURIString;


    constructor() ERC721("sojiNFT", "SOJI") {}


    // a function that checks a string contains a given string and returns true if it does
    // convert strings to bytes
    // set index i to 0 then check if next window of haystack is same as needle word 
    function contains(string memory haystack, string memory needle)
        public
        pure
        returns (bool)
    {
        // convert strings to bytes
        bytes memory haystackBytes = bytes(haystack);
        bytes memory needleBytes = bytes(needle);

        // if needle is bigger then haystack then it can not have word
        if (needleBytes.length > haystackBytes.length) {
            return false;
        }

        // initialize loop set i to 0 and between haystack and needle to prevent array index overflow
        for (
            uint256 i = 0;
            i <= haystackBytes.length - needleBytes.length;
            i++
        ) {
            bool found = true;
            // check if the word is in the next window of haystack
            for (uint256 j = 0; j < needleBytes.length; j++) {
                if (haystackBytes[i + j] != needleBytes[j]) {
                    found = false;
                    break;
                }
            }
            // return true found the word
            if (found) {
                return true;
            }
        }
        // return false didn't find the word
        return false;
    }

    function randomRarity() internal returns (string memory) {
        string memory rarity = Rarity[0];
        return rarity;
    }

    // mints soji but will generate random special attributes
    function mintSpecialSOJI(
        address owner,
        string memory name,
        string memory description,
        string memory image,
        string memory animation_url,
        string memory tags
    ) public returns (uint256) {
        uint256 newItemId = s_tokenIds.current();
        _safeMint(owner, newItemId);
        s_tokenIds.increment();
        string memory tokenURI;

        // to mint a special soji we need to generate a random special attribute
        // return the tokenURL string
        // then we need to check it agaisnt ipfs
        // then if they are the same we mint a new one
        // we can not add to IPFS from this contract as contracts are ment to be d

        // create tokenURI
        tokenURI = string.concat(
            "{",
            "\"name\":\"",
            name,
            "\",\"description\":\"",
            description,
            "\",\"image\":\"",
            image,
            "\",\"animation_url\":\"",
            animation_url,
            "\",\"tags\":\"",
            tags
            // tags,
            // "\"}"
            
        );

        if (contains(tokenURI, "attributes")) {
            // return error
            revert IllegalAttemptToSetAttributes();
        }

        // create random attributes using chainlink VRF

        string memory i_randomRarity = randomRarity();

        tokenURI = string.concat(
            tokenURI,
            "\",\"attributes\":[{\"trait_type\":\"Rarity\",\"value\": \"",
            i_randomRarity,
            "\"}]",
            "}"
        );

        return newItemId;
    }

    // function getUnconfirmedTokenURIString(uint256 tokenId) public view returns (string memory) {
    //     return s_unconfirmedTokenURIString;
    // }

    // function confirmUnconfirmedTokenURIString(string memory tokenURI) public {
    //     // fetch tokenURI string from chainlink
    //     // check if it is the same as the one we have in memory
    //     // if it is the same then we can set the tokenURI
        // _setTokenURI(newItemId, tokenURI);
    // }

    function getSOJICount() public view returns (uint256 count) {
        return s_tokenIds.current();
    }
}
