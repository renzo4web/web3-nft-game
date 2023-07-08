/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { YourNFT, YourNFTInterface } from "../../contracts/YourNFT";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "safeMint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600e81526020017f436f64654275736869546f6b656e0000000000000000000000000000000000008152506040518060400160405280600381526020017f4342540000000000000000000000000000000000000000000000000000000000815250816000908051906020019062000096929190620001a6565b508060019080519060200190620000af929190620001a6565b505050620000d2620000c6620000d860201b60201c565b620000e060201b60201c565b620002bb565b600033905090565b6000600b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600b60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b828054620001b49062000285565b90600052602060002090601f016020900481019282620001d8576000855562000224565b82601f10620001f357805160ff191683800117855562000224565b8280016001018555821562000224579182015b828111156200022357825182559160200191906001019062000206565b5b50905062000233919062000237565b5090565b5b808211156200025257600081600090555060010162000238565b5090565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200029e57607f821691505b60208210811415620002b557620002b462000256565b5b50919050565b6136a580620002cb6000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c80636352211e116100b8578063a22cb4651161007c578063a22cb4651461034e578063b88d4fde1461036a578063c87b56dd14610386578063d204c45e146103b6578063e985e9c5146103e6578063f2fde38b1461041657610137565b80636352211e146102a857806370a08231146102d8578063715018a6146103085780638da5cb5b1461031257806395d89b411461033057610137565b806323b872dd116100ff57806323b872dd146101f45780632f745c591461021057806342842e0e1461024057806342966c681461025c5780634f6ccce71461027857610137565b806301ffc9a71461013c57806306fdde031461016c578063081812fc1461018a578063095ea7b3146101ba57806318160ddd146101d6575b600080fd5b61015660048036038101906101519190612424565b610432565b604051610163919061246c565b60405180910390f35b610174610444565b6040516101819190612520565b60405180910390f35b6101a4600480360381019061019f9190612578565b6104d6565b6040516101b191906125e6565b60405180910390f35b6101d460048036038101906101cf919061262d565b61051c565b005b6101de610634565b6040516101eb919061267c565b60405180910390f35b61020e60048036038101906102099190612697565b610641565b005b61022a6004803603810190610225919061262d565b6106a1565b604051610237919061267c565b60405180910390f35b61025a60048036038101906102559190612697565b610746565b005b61027660048036038101906102719190612578565b610766565b005b610292600480360381019061028d9190612578565b6107c2565b60405161029f919061267c565b60405180910390f35b6102c260048036038101906102bd9190612578565b610833565b6040516102cf91906125e6565b60405180910390f35b6102f260048036038101906102ed91906126ea565b6108e5565b6040516102ff919061267c565b60405180910390f35b61031061099d565b005b61031a6109b1565b60405161032791906125e6565b60405180910390f35b6103386109db565b6040516103459190612520565b60405180910390f35b61036860048036038101906103639190612743565b610a6d565b005b610384600480360381019061037f91906128b8565b610a83565b005b6103a0600480360381019061039b9190612578565b610ae5565b6040516103ad9190612520565b60405180910390f35b6103d060048036038101906103cb91906129dc565b610af7565b6040516103dd919061267c565b60405180910390f35b61040060048036038101906103fb9190612a38565b610b2e565b60405161040d919061246c565b60405180910390f35b610430600480360381019061042b91906126ea565b610bc2565b005b600061043d82610c46565b9050919050565b60606000805461045390612aa7565b80601f016020809104026020016040519081016040528092919081815260200182805461047f90612aa7565b80156104cc5780601f106104a1576101008083540402835291602001916104cc565b820191906000526020600020905b8154815290600101906020018083116104af57829003601f168201915b5050505050905090565b60006104e182610cc0565b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600061052782610833565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610598576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161058f90612b4b565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166105b7610d0b565b73ffffffffffffffffffffffffffffffffffffffff1614806105e657506105e5816105e0610d0b565b610b2e565b5b610625576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161061c90612bdd565b60405180910390fd5b61062f8383610d13565b505050565b6000600880549050905090565b61065261064c610d0b565b82610dcc565b610691576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161068890612c6f565b60405180910390fd5b61069c838383610e61565b505050565b60006106ac836108e5565b82106106ed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106e490612d01565b60405180910390fd5b600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002054905092915050565b61076183838360405180602001604052806000815250610a83565b505050565b610777610771610d0b565b82610dcc565b6107b6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107ad90612c6f565b60405180910390fd5b6107bf816110c8565b50565b60006107cc610634565b821061080d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161080490612d93565b60405180910390fd5b6008828154811061082157610820612db3565b5b90600052602060002001549050919050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156108dc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108d390612e2e565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610956576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161094d90612ec0565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6109a56110d4565b6109af6000611152565b565b6000600b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600180546109ea90612aa7565b80601f0160208091040260200160405190810160405280929190818152602001828054610a1690612aa7565b8015610a635780601f10610a3857610100808354040283529160200191610a63565b820191906000526020600020905b815481529060010190602001808311610a4657829003601f168201915b5050505050905090565b610a7f610a78610d0b565b8383611218565b5050565b610a94610a8e610d0b565b83610dcc565b610ad3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aca90612c6f565b60405180910390fd5b610adf84848484611385565b50505050565b6060610af0826113e1565b9050919050565b600080610b04600c6114f4565b9050610b10600c611502565b610b1a8482611518565b610b248184611536565b8091505092915050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b610bca6110d4565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610c3a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c3190612f52565b60405180910390fd5b610c4381611152565b50565b60007f780e9d63000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610cb95750610cb8826115aa565b5b9050919050565b610cc98161168c565b610d08576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cff90612e2e565b60405180910390fd5b50565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610d8683610833565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610dd883610833565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610e1a5750610e198185610b2e565b5b80610e5857508373ffffffffffffffffffffffffffffffffffffffff16610e40846104d6565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16610e8182610833565b73ffffffffffffffffffffffffffffffffffffffff1614610ed7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ece90612fe4565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610f47576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f3e90613076565b60405180910390fd5b610f528383836116f8565b610f5d600082610d13565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610fad91906130c5565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461100491906130f9565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46110c3838383611708565b505050565b6110d18161170d565b50565b6110dc610d0b565b73ffffffffffffffffffffffffffffffffffffffff166110fa6109b1565b73ffffffffffffffffffffffffffffffffffffffff1614611150576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111479061319b565b60405180910390fd5b565b6000600b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600b60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611287576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161127e90613207565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051611378919061246c565b60405180910390a3505050565b611390848484610e61565b61139c84848484611760565b6113db576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113d290613299565b60405180910390fd5b50505050565b60606113ec82610cc0565b6000600a6000848152602001908152602001600020805461140c90612aa7565b80601f016020809104026020016040519081016040528092919081815260200182805461143890612aa7565b80156114855780601f1061145a57610100808354040283529160200191611485565b820191906000526020600020905b81548152906001019060200180831161146857829003601f168201915b5050505050905060006114966118f7565b90506000815114156114ac5781925050506114ef565b6000825111156114e15780826040516020016114c99291906132f5565b604051602081830303815290604052925050506114ef565b6114ea8461190e565b925050505b919050565b600081600001549050919050565b6001816000016000828254019250508190555050565b611532828260405180602001604052806000815250611976565b5050565b61153f8261168c565b61157e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115759061338b565b60405180910390fd5b80600a600084815260200190815260200160002090805190602001906115a59291906122d5565b505050565b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061167557507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806116855750611684826119d1565b5b9050919050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b611703838383611a3b565b505050565b505050565b61171681611b4f565b6000600a6000838152602001908152602001600020805461173690612aa7565b90501461175d57600a6000828152602001908152602001600020600061175c919061235b565b5b50565b60006117818473ffffffffffffffffffffffffffffffffffffffff16611c6c565b156118ea578373ffffffffffffffffffffffffffffffffffffffff1663150b7a026117aa610d0b565b8786866040518563ffffffff1660e01b81526004016117cc9493929190613400565b602060405180830381600087803b1580156117e657600080fd5b505af192505050801561181757506040513d601f19601f820116820180604052508101906118149190613461565b60015b61189a573d8060008114611847576040519150601f19603f3d011682016040523d82523d6000602084013e61184c565b606091505b50600081511415611892576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161188990613299565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149150506118ef565b600190505b949350505050565b606060405180602001604052806000815250905090565b606061191982610cc0565b60006119236118f7565b90506000815111611943576040518060200160405280600081525061196e565b8061194d84611c8f565b60405160200161195e9291906132f5565b6040516020818303038152906040525b915050919050565b6119808383611df0565b61198d6000848484611760565b6119cc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119c390613299565b60405180910390fd5b505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b611a46838383611fca565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611a8957611a8481611fcf565b611ac8565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614611ac757611ac68382612018565b5b5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611b0b57611b0681612185565b611b4a565b8273ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614611b4957611b488282612256565b5b5b505050565b6000611b5a82610833565b9050611b68816000846116f8565b611b73600083610d13565b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611bc391906130c5565b925050819055506002600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905581600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611c6881600084611708565b5050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b60606000821415611cd7576040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509050611deb565b600082905060005b60008214611d09578080611cf29061348e565b915050600a82611d029190613506565b9150611cdf565b60008167ffffffffffffffff811115611d2557611d2461278d565b5b6040519080825280601f01601f191660200182016040528015611d575781602001600182028036833780820191505090505b5090505b60008514611de457600182611d7091906130c5565b9150600a85611d7f9190613537565b6030611d8b91906130f9565b60f81b818381518110611da157611da0612db3565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a85611ddd9190613506565b9450611d5b565b8093505050505b919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611e60576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e57906135b4565b60405180910390fd5b611e698161168c565b15611ea9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ea090613620565b60405180910390fd5b611eb5600083836116f8565b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611f0591906130f9565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611fc660008383611708565b5050565b505050565b6008805490506009600083815260200190815260200160002081905550600881908060018154018082558091505060019003906000526020600020016000909190919091505550565b60006001612025846108e5565b61202f91906130c5565b9050600060076000848152602001908152602001600020549050818114612114576000600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002054905080600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002081905550816007600083815260200190815260200160002081905550505b6007600084815260200190815260200160002060009055600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008381526020019081526020016000206000905550505050565b6000600160088054905061219991906130c5565b90506000600960008481526020019081526020016000205490506000600883815481106121c9576121c8612db3565b5b9060005260206000200154905080600883815481106121eb576121ea612db3565b5b90600052602060002001819055508160096000838152602001908152602001600020819055506009600085815260200190815260200160002060009055600880548061223a57612239613640565b5b6001900381819060005260206000200160009055905550505050565b6000612261836108e5565b905081600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002081905550806007600084815260200190815260200160002081905550505050565b8280546122e190612aa7565b90600052602060002090601f016020900481019282612303576000855561234a565b82601f1061231c57805160ff191683800117855561234a565b8280016001018555821561234a579182015b8281111561234957825182559160200191906001019061232e565b5b509050612357919061239b565b5090565b50805461236790612aa7565b6000825580601f106123795750612398565b601f016020900490600052602060002090810190612397919061239b565b5b50565b5b808211156123b457600081600090555060010161239c565b5090565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b612401816123cc565b811461240c57600080fd5b50565b60008135905061241e816123f8565b92915050565b60006020828403121561243a576124396123c2565b5b60006124488482850161240f565b91505092915050565b60008115159050919050565b61246681612451565b82525050565b6000602082019050612481600083018461245d565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156124c15780820151818401526020810190506124a6565b838111156124d0576000848401525b50505050565b6000601f19601f8301169050919050565b60006124f282612487565b6124fc8185612492565b935061250c8185602086016124a3565b612515816124d6565b840191505092915050565b6000602082019050818103600083015261253a81846124e7565b905092915050565b6000819050919050565b61255581612542565b811461256057600080fd5b50565b6000813590506125728161254c565b92915050565b60006020828403121561258e5761258d6123c2565b5b600061259c84828501612563565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006125d0826125a5565b9050919050565b6125e0816125c5565b82525050565b60006020820190506125fb60008301846125d7565b92915050565b61260a816125c5565b811461261557600080fd5b50565b60008135905061262781612601565b92915050565b60008060408385031215612644576126436123c2565b5b600061265285828601612618565b925050602061266385828601612563565b9150509250929050565b61267681612542565b82525050565b6000602082019050612691600083018461266d565b92915050565b6000806000606084860312156126b0576126af6123c2565b5b60006126be86828701612618565b93505060206126cf86828701612618565b92505060406126e086828701612563565b9150509250925092565b600060208284031215612700576126ff6123c2565b5b600061270e84828501612618565b91505092915050565b61272081612451565b811461272b57600080fd5b50565b60008135905061273d81612717565b92915050565b6000806040838503121561275a576127596123c2565b5b600061276885828601612618565b92505060206127798582860161272e565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6127c5826124d6565b810181811067ffffffffffffffff821117156127e4576127e361278d565b5b80604052505050565b60006127f76123b8565b905061280382826127bc565b919050565b600067ffffffffffffffff8211156128235761282261278d565b5b61282c826124d6565b9050602081019050919050565b82818337600083830152505050565b600061285b61285684612808565b6127ed565b90508281526020810184848401111561287757612876612788565b5b612882848285612839565b509392505050565b600082601f83011261289f5761289e612783565b5b81356128af848260208601612848565b91505092915050565b600080600080608085870312156128d2576128d16123c2565b5b60006128e087828801612618565b94505060206128f187828801612618565b935050604061290287828801612563565b925050606085013567ffffffffffffffff811115612923576129226123c7565b5b61292f8782880161288a565b91505092959194509250565b600067ffffffffffffffff8211156129565761295561278d565b5b61295f826124d6565b9050602081019050919050565b600061297f61297a8461293b565b6127ed565b90508281526020810184848401111561299b5761299a612788565b5b6129a6848285612839565b509392505050565b600082601f8301126129c3576129c2612783565b5b81356129d384826020860161296c565b91505092915050565b600080604083850312156129f3576129f26123c2565b5b6000612a0185828601612618565b925050602083013567ffffffffffffffff811115612a2257612a216123c7565b5b612a2e858286016129ae565b9150509250929050565b60008060408385031215612a4f57612a4e6123c2565b5b6000612a5d85828601612618565b9250506020612a6e85828601612618565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680612abf57607f821691505b60208210811415612ad357612ad2612a78565b5b50919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b6000612b35602183612492565b9150612b4082612ad9565b604082019050919050565b60006020820190508181036000830152612b6481612b28565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c0000602082015250565b6000612bc7603e83612492565b9150612bd282612b6b565b604082019050919050565b60006020820190508181036000830152612bf681612bba565b9050919050565b7f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560008201527f72206e6f7220617070726f766564000000000000000000000000000000000000602082015250565b6000612c59602e83612492565b9150612c6482612bfd565b604082019050919050565b60006020820190508181036000830152612c8881612c4c565b9050919050565b7f455243373231456e756d657261626c653a206f776e657220696e646578206f7560008201527f74206f6620626f756e6473000000000000000000000000000000000000000000602082015250565b6000612ceb602b83612492565b9150612cf682612c8f565b604082019050919050565b60006020820190508181036000830152612d1a81612cde565b9050919050565b7f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60008201527f7574206f6620626f756e64730000000000000000000000000000000000000000602082015250565b6000612d7d602c83612492565b9150612d8882612d21565b604082019050919050565b60006020820190508181036000830152612dac81612d70565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4552433732313a20696e76616c696420746f6b656e2049440000000000000000600082015250565b6000612e18601883612492565b9150612e2382612de2565b602082019050919050565b60006020820190508181036000830152612e4781612e0b565b9050919050565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b6000612eaa602983612492565b9150612eb582612e4e565b604082019050919050565b60006020820190508181036000830152612ed981612e9d565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000612f3c602683612492565b9150612f4782612ee0565b604082019050919050565b60006020820190508181036000830152612f6b81612f2f565b9050919050565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b6000612fce602583612492565b9150612fd982612f72565b604082019050919050565b60006020820190508181036000830152612ffd81612fc1565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000613060602483612492565b915061306b82613004565b604082019050919050565b6000602082019050818103600083015261308f81613053565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006130d082612542565b91506130db83612542565b9250828210156130ee576130ed613096565b5b828203905092915050565b600061310482612542565b915061310f83612542565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561314457613143613096565b5b828201905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000613185602083612492565b91506131908261314f565b602082019050919050565b600060208201905081810360008301526131b481613178565b9050919050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b60006131f1601983612492565b91506131fc826131bb565b602082019050919050565b60006020820190508181036000830152613220816131e4565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b6000613283603283612492565b915061328e82613227565b604082019050919050565b600060208201905081810360008301526132b281613276565b9050919050565b600081905092915050565b60006132cf82612487565b6132d981856132b9565b93506132e98185602086016124a3565b80840191505092915050565b600061330182856132c4565b915061330d82846132c4565b91508190509392505050565b7f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60008201527f6578697374656e7420746f6b656e000000000000000000000000000000000000602082015250565b6000613375602e83612492565b915061338082613319565b604082019050919050565b600060208201905081810360008301526133a481613368565b9050919050565b600081519050919050565b600082825260208201905092915050565b60006133d2826133ab565b6133dc81856133b6565b93506133ec8185602086016124a3565b6133f5816124d6565b840191505092915050565b600060808201905061341560008301876125d7565b61342260208301866125d7565b61342f604083018561266d565b818103606083015261344181846133c7565b905095945050505050565b60008151905061345b816123f8565b92915050565b600060208284031215613477576134766123c2565b5b60006134858482850161344c565b91505092915050565b600061349982612542565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156134cc576134cb613096565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061351182612542565b915061351c83612542565b92508261352c5761352b6134d7565b5b828204905092915050565b600061354282612542565b915061354d83612542565b92508261355d5761355c6134d7565b5b828206905092915050565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b600061359e602083612492565b91506135a982613568565b602082019050919050565b600060208201905081810360008301526135cd81613591565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b600061360a601c83612492565b9150613615826135d4565b602082019050919050565b60006020820190508181036000830152613639816135fd565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfea264697066735822122068442680ebabbe38051bcf81bdae6a15c8613b0730099bb1fcfc6ed8fd97b18e64736f6c63430008090033";

type YourNFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: YourNFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class YourNFT__factory extends ContractFactory {
  constructor(...args: YourNFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<YourNFT> {
    return super.deploy(overrides || {}) as Promise<YourNFT>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): YourNFT {
    return super.attach(address) as YourNFT;
  }
  override connect(signer: Signer): YourNFT__factory {
    return super.connect(signer) as YourNFT__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): YourNFTInterface {
    return new utils.Interface(_abi) as YourNFTInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): YourNFT {
    return new Contract(address, _abi, signerOrProvider) as YourNFT;
  }
}
