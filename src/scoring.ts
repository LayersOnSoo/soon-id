import { PublicKey } from "@solana/web3.js";
import {
  getTransactionHistory,
  getTokenBalances,
  getAccountInfo,
} from "./solana";
import { ScoreCriteria, WalletScore } from "./types";

// Define multipliers for different score criteria
const SCORE_MULTIPLIERS = {
  transactionCount: 0.5,
  tokenBalance: 0.3,
  smartContractInteractions: 0.1,
  stakingActivities: 0.1,
};

const analyzeWallet = async (publicKey: PublicKey): Promise<ScoreCriteria> => {
  const transactions = await getTransactionHistory(publicKey);
  const tokenBalances = await getTokenBalances(publicKey);
  const accountInfo = await getAccountInfo(publicKey);

  const transactionCount = transactions.length;
  const tokenBalance = tokenBalances.value.length;
  const smartContractInteractions = transactions.filter(
    (tx) => tx.err === null
  ).length;
  const stakingActivities = accountInfo?.value ? 1 : 0;

  // Log the gathered information
  console.log(
    `\n------------------------------------------------------------------------------------------------------------------\n`
  );
  console.log(`\nWallet Address: ${publicKey.toString()}`);
  console.log(`\nTransaction Count: ${transactionCount}`);
  console.log(`\nSmart Contract Interactions: ${smartContractInteractions}`);
  console.log(`\nStaking Activities: ${stakingActivities}`);

  return {
    transactionCount,
    tokenBalance,
    smartContractInteractions,
    stakingActivities,
  };
};

// Function to calculate a score and credibility based on the score criteria
const calculateScore = (
  criteria: ScoreCriteria
): { score: number; credibility: string } => {
  const score =
    criteria.transactionCount * SCORE_MULTIPLIERS.transactionCount +
    criteria.tokenBalance * SCORE_MULTIPLIERS.tokenBalance +
    criteria.smartContractInteractions *
      SCORE_MULTIPLIERS.smartContractInteractions +
    criteria.stakingActivities * SCORE_MULTIPLIERS.stakingActivities;

  let credibility = "Low";
  if (score > 75) {
    credibility = "High";
  } else if (score > 50) {
    credibility = "Medium";
  }

  return { score, credibility };
};

export const getWalletScore = async (
  walletAddress: string
): Promise<{ wallet: string; score: number; credibility: string }> => {
  const publicKey = new PublicKey(walletAddress);
  const criteria = await analyzeWallet(publicKey);
  const { score, credibility } = calculateScore(criteria);
  return { wallet: walletAddress, score, credibility };
};

// Function to get the aggregate score for multiple wallets
export const getAggregateWalletScore = async (
  walletAddresses: string[]
): Promise<WalletScore[]> => {
  const scores = await Promise.all(walletAddresses.map(getWalletScore));

  const aggregateScore =
    scores.reduce((acc, { score }) => acc + score, 0) / scores.length;

  let aggregateCredibility;
  if (aggregateScore > 75) {
    aggregateCredibility = "High";
  } else if (aggregateScore > 50) {
    aggregateCredibility = "Medium";
  } else {
    aggregateCredibility = "Low";
  }

  console.log(
    `\n------------------------------------------------------------------------------------------------------------------\n`
  );
  console.log(`\nAggregate Score:`, aggregateScore);

  if (aggregateCredibility === "Low") {
    console.log(`Aggregate Credibility: ${aggregateCredibility}`.red, `\n`);
  } else if (aggregateCredibility === "Medium") {
    console.log(`Aggregate Credibility: ${aggregateCredibility}`.yellow, `\n`);
  } else {
    console.log(`Aggregate Credibility: ${aggregateCredibility}`.green, `\n`);
  }

  return scores;
};
