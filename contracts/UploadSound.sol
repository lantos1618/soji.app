//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract UploadSound {
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
    string private soundLink;
    string private emojiLink;
    string private sojiName;

    constructor(string memory _soundLink, string memory _emojiLink, string memory _sojiName){
        soundLink = _soundLink;
        emojiLink = _emojiLink;
        sojiName = _sojiName;

    }
}