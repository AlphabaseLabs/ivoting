export const electionAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "contract Party",
        name: "_party",
        type: "address",
      },
      {
        internalType: "contract Voter",
        name: "_voter",
        type: "address",
      },
      {
        internalType: "contract Candidate",
        name: "_candidate",
        type: "address",
      },
      {
        internalType: "contract ElectionUpgradable",
        name: "_elecUpgradable",
        type: "address",
      },
      {
        internalType: "contract ElectionAccessControl",
        name: "_accessControl",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
        indexed: false,
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "SystemStatusEvent",
    type: "event",
  },
  {
    inputs: [],
    name: "AccessControl",
    outputs: [
      {
        internalType: "contract ElectionAccessControl",
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
        internalType: "string",
        name: "_electoral_district_id",
        type: "string",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "party_id",
            type: "string",
          },
          {
            internalType: "string",
            name: "candidate_id",
            type: "string",
          },
          {
            internalType: "string",
            name: "ballot_selections_object_id",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "ballot_selections_sequence_order",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "electoral_district_id",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "electoral_sequence_order",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "vote_variation",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "votes_allowed",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "deleated",
            type: "bool",
          },
          {
            internalType: "string",
            name: "meta",
            type: "string",
          },
        ],
        internalType: "struct Candidate.CandidateDetails",
        name: "candidateToInsert",
        type: "tuple",
      },
    ],
    name: "addCandidateInElectoralDistrict",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "candidate",
    outputs: [
      {
        internalType: "contract Candidate",
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
        internalType: "bytes32",
        name: "voter_id",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "election",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "vote_hash",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "ballot_id",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "castVote",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "candidate_id",
        type: "string",
      },
    ],
    name: "deleteCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "elecUpgradable",
    outputs: [
      {
        internalType: "contract ElectionUpgradable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "electionState",
    outputs: [
      {
        internalType: "enum ElectionImplementation.ElectionState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_electoral_district_id",
        type: "string",
      },
    ],
    name: "getAllCandidatesInElecorialDistrict",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "party_id",
            type: "string",
          },
          {
            internalType: "string",
            name: "candidate_id",
            type: "string",
          },
          {
            internalType: "string",
            name: "ballot_selections_object_id",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "ballot_selections_sequence_order",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "electoral_district_id",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "electoral_sequence_order",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "vote_variation",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "votes_allowed",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "deleated",
            type: "bool",
          },
          {
            internalType: "string",
            name: "meta",
            type: "string",
          },
        ],
        internalType: "struct Candidate.CandidateDetails[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getElectionState",
    outputs: [
      {
        internalType: "enum ElectionImplementation.ElectionState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getElectionStateString",
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
        internalType: "string",
        name: "object_id",
        type: "string",
      },
    ],
    name: "getParty",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "object_id",
            type: "string",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "abbreviation",
            type: "string",
          },
          {
            internalType: "string",
            name: "logo_uri",
            type: "string",
          },
          {
            internalType: "string",
            name: "meta",
            type: "string",
          },
        ],
        internalType: "struct Party.PartyDetails",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPublicKey",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRegisteredVoters",
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
        internalType: "bytes32",
        name: "_voter_id",
        type: "bytes32",
      },
    ],
    name: "getVoter",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "voter_id",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "voterAddress",
            type: "address",
          },
          {
            internalType: "bytes32[]",
            name: "elections",
            type: "bytes32[]",
          },
          {
            internalType: "uint256",
            name: "nrOfVotes",
            type: "uint256",
          },
          {
            internalType: "enum Voter.VoterState",
            name: "state",
            type: "uint8",
          },
          {
            components: [
              {
                internalType: "enum Voter.VoteStatus",
                name: "voteStatus",
                type: "uint8",
              },
              {
                internalType: "bytes32",
                name: "election",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "vote_hash",
                type: "bytes32",
              },
              {
                internalType: "string",
                name: "ballot_id",
                type: "string",
              },
            ],
            internalType: "struct Voter.Vote[]",
            name: "votes",
            type: "tuple[]",
          },
        ],
        internalType: "struct Voter.VoterProfile",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_voter_id",
        type: "bytes32",
      },
    ],
    name: "getVoterState",
    outputs: [
      {
        internalType: "enum Voter.VoterState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_electoral_district_id",
        type: "string",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "party_id",
            type: "string",
          },
          {
            internalType: "string",
            name: "candidate_id",
            type: "string",
          },
          {
            internalType: "string",
            name: "ballot_selections_object_id",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "ballot_selections_sequence_order",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "electoral_district_id",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "electoral_sequence_order",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "vote_variation",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "votes_allowed",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "deleated",
            type: "bool",
          },
          {
            internalType: "string",
            name: "meta",
            type: "string",
          },
        ],
        internalType: "struct Candidate.CandidateDetails[]",
        name: "candidatesToInsert",
        type: "tuple[]",
      },
    ],
    name: "insertCandidates",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "object_id",
            type: "string",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "abbreviation",
            type: "string",
          },
          {
            internalType: "string",
            name: "logo_uri",
            type: "string",
          },
          {
            internalType: "string",
            name: "meta",
            type: "string",
          },
        ],
        internalType: "struct Party.PartyDetails[]",
        name: "partiesToInsert",
        type: "tuple[]",
      },
    ],
    name: "insertParties",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "candidate_id",
        type: "string",
      },
    ],
    name: "isCandidateDeleted",
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
    name: "openBallot",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "party",
    outputs: [
      {
        internalType: "contract Party",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "publishResults",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_voter_id",
        type: "bytes32",
      },
      {
        internalType: "bytes32[]",
        name: "elections",
        type: "bytes32[]",
      },
    ],
    name: "reconfigureVoterElections",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_voter_id",
        type: "bytes32",
      },
      {
        internalType: "bytes32[]",
        name: "elections",
        type: "bytes32[]",
      },
    ],
    name: "registerVoter",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "bytes",
        name: "_publicKey",
        type: "bytes",
      },
    ],
    name: "setPublicKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startTallying",
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
  {
    inputs: [],
    name: "voter",
    outputs: [
      {
        internalType: "contract Voter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
