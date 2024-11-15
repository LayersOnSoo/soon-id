import { TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import { Connection, PublicKey } from "@solana/web3.js";

// Create a connection to the SOON DEVNET cluster
const connection = new Connection(
  "https://rpc.devnet.soo.network/rpc", // soo.network RPC endpoint
  "confirmed" // Commitment level
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
