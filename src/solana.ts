import { TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import { Connection, PublicKey } from "@solana/web3.js";

// Create a connection to the SOON DEVNET cluster
export const connection = new Connection(
  "https://rpc.testnet.soo.network/rpc", // soo.network RPC endpoint
  "confirmed" // Commitment level
);

// Constants for Metaplex Metadata Program
const METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s" // Standard for Solana NFTs
);

export const getTransactionHistory = async (publicKey: PublicKey) => {
  try {
    const transactions = await connection.getSignaturesForAddress(publicKey, {
      limit: 100,
    });
    return transactions;
  } catch (error: any) {
    if (error.message.includes("Method not found")) {
      console.error("The RPC endpoint does not support this method.");
    } else {
      console.error("Error fetching transaction history:", error);
    }
    throw error;
  }
};

export const getTokenBalances = async (publicKey: PublicKey) => {
  const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
    programId: TOKEN_PROGRAM_ID,
  });
  return tokenAccounts;
};

export const getAccountInfo = async (publicKey: PublicKey) => {
  const accountInfo = await connection.getParsedAccountInfo(publicKey);
  return accountInfo;
};

export const getNFTs = async (publicKey: PublicKey, connection: Connection) => {
  try {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      { programId: TOKEN_PROGRAM_ID }
    );

    const nftAccounts = tokenAccounts.value.filter((account) => {
      const amount = account.account.data.parsed.info.tokenAmount;
      return amount.decimals === 0 && amount.uiAmount === 1; // Indicates an NFT
    });

    const nftMetadata = await Promise.all(
      nftAccounts.map(async (nft) => {
        const mintAddress = nft.account.data.parsed.info.mint;
        const metadataAddress = (
          await PublicKey.findProgramAddress(
            [
              Buffer.from("metadata"),
              METADATA_PROGRAM_ID.toBuffer(),
              new PublicKey(mintAddress).toBuffer(),
            ],
            METADATA_PROGRAM_ID
          )
        )[0];
        const metadata = await connection.getAccountInfo(metadataAddress);
        return metadata; // Metadata should be parsed for real usage
      })
    );

    return nftMetadata.filter((data) => data !== null);
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    throw error;
  }
};
