//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.14;

// for chainlink random
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

abstract contract VFRContractTest is VRFConsumerBaseV2 {
    enum Specials {
        EPHEMERAL,
        STAR,
        PLATINUM,
        GOLD,
        SILVER,
        RED,
        BlUE
        //  number of specials = 7
    }

    // Chainlink VRF Variables
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    LinkTokenInterface i_linkToken;
    bytes32 i_keyHash;
    uint32 i_callBackGasLimit;
    uint16 i_requestConfermations;
    uint32 i_numberOfWords = 7;

    uint256 public s_requestId;
    uint64 public s_subscriptionId;
    address s_owner;

    constructor (
        address owner,
        address vrfCoordinatorV2,
        address linkTokenContract,
        bytes32 keyHash,
        uint32 callBackGasLimit,
        uint16 requestConfermations
    ) VRFConsumerBaseV2(vrfCoordinatorV2)  {
        s_owner = owner;
        i_vrfCoordinator =  VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_linkToken = LinkTokenInterface(linkTokenContract);
        i_keyHash = keyHash;
        i_callBackGasLimit = callBackGasLimit;
        i_requestConfermations = requestConfermations;

        createNewSubscription();

    }

    // Create a new subscription when the contract is initially deployed.
    function createNewSubscription() private onlyOwner {
        // Create a subscription with a new subscription ID.
        address[] memory consumers = new address[](1);
        consumers[0] = address(this);
        s_subscriptionId = i_vrfCoordinator.createSubscription();
        // Add this contract as a consumer of its own subscription.
        i_vrfCoordinator.addConsumer(s_subscriptionId, consumers[0]);
    }


    function requestRandomWords() external onlyOwner {
        s_requestId = i_vrfCoordinator.requestRandomWords(
            i_keyHash,
            s_subscriptionId,
            i_requestConfermations,
            i_callBackGasLimit,
            i_numberOfWords
        );

    }

    modifier onlyOwner() {
        require(msg.sender == s_owner);
        _;
    }
}
