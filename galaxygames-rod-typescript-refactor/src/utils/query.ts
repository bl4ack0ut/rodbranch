import gql from "graphql-tag";

// NOTE: since no gql auto type generation configured atm, we manually have to maintain types for this query too
type IGQLStat = {
  id: string; //  ID!
  colonistsMinted?: number; //  Int
  colonistsBurned?: number; //  Int
  colonistsStaked?: number; //  Int
  colonistStolen?: number; //  Int
  colonistCirculating?: number; //  Int
  piratesMinted?: number; //  Int
  piratesStaked?: number; //  Int
  piratesStolen?: number; //  Int
  rawClaimed?: string; //  BigInt
  rawEonBurned?: string; //  BigInt
  rawCirculating?: string; //  BigInt
  lastClaimedRawTimeStamp?: string; //  BigInt
  eonMinted?: string; //  BigInt
  eonBurned?: string; //  BigInt
  eonCirculating?: string; //  BigInt
  totalEonSupply?: string; //  BigInt
  refiningRaw?: string; //  BigInt
  shardsMinted?: string; //  BigInt
  spearMinted?: string; //  BigInt
  templeMinted?: string; //  BigInt
  riotMinted?: string; //  BigInt
  phantomMinted?: string; //  BigInt
  onsiaMinted?: string; //  BigInt
};
type IGQLUser = {
  id: string; // ID!
  claimedRaw?: string; // BigInt
  claimedEon?: string; // BigInt
};
type IGQLOwner = {
  id: string; // ID!
  balance?: string; // BigInt
};
type IGQLContract = {
  id: string; // ID!
  name?: string; // String
  symbol?: string; // String
  totalSupply?: string; // BigInt
};
type IGQLToken = {
  id: string; // ID!
  number?: string; // String
  name?: string; // String
  isStaked: string; // Boolean!
  isColonist: string; // Boolean!
  isHonors: string; // Boolean!
  honorId: string; // Bigin!
  background?: string; // Bigint
  body?: string; // Bigint
  shirt?: string; // Bigint
  jacket?: string; // Bigint
  jaw?: string; // Bigint
  hair?: string; // Bigint
  eyes?: string; // Bigint
  held?: string; // Bigint
  isPirate: string; // Boolean!
  sky?: string; // Bigint
  cockpit?: string; // Bigint
  base?: string; // Bigint
  engine?: string; // Bigint
  nose?: string; // Bigint
  wing?: string; // Bigint
  weapon1?: string; // Bigint
  weapon2?: string; // Bigint
  fuelIndex?: string; // Bigint
  uri?: string; // String
  owner?: IGQLOwner; // Owner
  user: IGQLUser; // User!
  contract?: IGQLContract; // Contract
};

type IGQLStakes = {
  id: string; // ID!
  value: string; // BigInt!
  owner: IGQLUser; // User!
  token: {
    // Token!
    id: string; // ID!
  };
};

type IGQLRefine = {
  id: string; // ID!
  owner: IGQLUser; // User!
  refinery?: string; // BigInt
  inputTokenId?: string; // BigInt
  outputTokenId?: string; // BigInt
  modifierId?: string; // BigInt
  bonusRate?: string; // BigInt
  burnRate?: string; // BigInt
  refineRate?: string; // BigInt
};

export type IGetQuery = {
  stat?: IGQLStat;
  tokens: IGQLToken[];
  stakes: IGQLStakes[];
  refines: IGQLRefine[];
};

export const QUERY = gql`
  query fetch($wallet: String) {
    stat(id: "ShatteredEON") {
      ...IStat
    }
    tokens(where: { owner: $wallet }, first: 1000, orderBy: id, orderDirection: asc) {
      ...IToken # [Token!]!
    }
    stakes(where: { owner: $wallet }, first: 1000, orderBy: id, orderDirection: asc) {
      ...IStakes # [Stakes]!
    }
    refines(where: { owner: $wallet }, first: 1000, orderBy: id, orderDirection: asc) {
      ...IRefine # [Refine!]!
    }
  }
  fragment IStat on Stat {
    id
    colonistsMinted
    colonistsBurned
    colonistsStaked
    colonistStolen
    colonistCirculating
    piratesMinted
    piratesStaked
    piratesStolen
    rawClaimed
    rawEonBurned
    rawCirculating
    lastClaimedRawTimeStamp
    eonMinted
    eonBurned
    eonCirculating
    totalEonSupply
    refiningRaw
    shardsMinted
    spearMinted
    templeMinted
    riotMinted
    phantomMinted
    onsiaMinted
  }
  fragment IRefine on Refine {
    id # ID!
    owner {
      ...IUser # User!
    }
    refinery # BigInt
    inputTokenId # BigInt
    outputTokenId # BigInt
    modifierId # BigInt
    bonusRate # BigInt
    burnRate # BigInt
    refineRate # BigInt
  }
  fragment IUser on User {
    id # ID!
    claimedRaw # BigInt
    claimedEon # BigInt
  }
  fragment IOwner on Owner {
    id # ID!
    balance # BigInt
  }

  fragment IToken on Token {
    id # ID!
    number # String
    name # String
    isStaked # Boolean!
    isColonist # Boolean!
    isHonors # Boolean!
    honorId # Bigin!
    background # Bigint
    body # Bigint
    shirt # Bigint
    jacket # Bigint
    jaw # Bigint
    hair # Bigint
    eyes # Bigint
    held # Bigint
    isPirate # Boolean!
    sky # Bigint
    cockpit # Bigint
    base # Bigint
    engine # Bigint
    nose # Bigint
    wing # Bigint
    weapon1 # Bigint
    weapon2 # Bigint
    fuelIndex # Bigint
    uri # String
    owner {
      ...IOwner # Owner
    }
    user {
      ...IUser # User!
    }
    contract {
      ...IContract # Contract
    }
    # todo: transfers() staks()
  }

  fragment IContract on Contract {
    id # ID!
    name # String
    symbol # String
    totalSupply # BigInt
  }

  fragment IStakes on Stake {
    id # ID!
    value # BigInt!
    owner {
      ...IUser # User!
    }
    token {
      # Token!
      id # ID!
    }
  }
`;

// TODO: what is woolfOrStake
export const parseGraphObject = (woolfOrStake: any) => {
  if (woolfOrStake.value) {
    return { ...woolfOrStake, ...woolfOrStake.token };
  }
  return woolfOrStake;
};
