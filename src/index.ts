import { getWalletScore, getAggregateWalletScore } from "./scoring";
import readline from "readline";
import gradient from "gradient-string";
import SOONASCIIART from "./ascii";
import colors from "colors";

colors.enable();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const projectName = SOONASCIIART;
console.log(gradient.pastel.multiline(projectName) + "\n");

const promptWalletAddresses = (): Promise<string[]> => {
  return new Promise((resolve) => {
    rl.question("Enter wallet addresses separated by commas: ", (answer) => {
      const walletAddresses = answer
        .split(",")
        .map((address) => address.trim());
      resolve(walletAddresses);
    });
  });
};

(async () => {
  try {
    // Prompt the user for wallet addresses
    const walletAddresses = await promptWalletAddresses();
    rl.close();

    // Check if only one wallet address was provided
    if (walletAddresses.length === 1) {
      const { score, credibility } = await getWalletScore(walletAddresses[0]);
      console.log(`\nThis score is attributed to a single wallet`);
      console.log(`\nWallet Score:`, score, `\n`);
      if (credibility === "Low") {
        console.log(`Credibility: ${credibility}`.red, `\n`);
      } else if (credibility === "Medium") {
        console.log(`Credibility: ${credibility}`.yellow, `\n`);
      } else {
        console.log(`Credibility: ${credibility}`.green, `\n`);
      }

      console.log(
        `------------------------------------------------------------------------------------------------------------------\n`
      );
    } else {
      // Get the aggregate score for multiple wallet addresses
      const aggregateScores = await getAggregateWalletScore(walletAddresses);
      console.log(
        `\nThis score is attributed to ${walletAddresses.length} wallets`
          .underline
      );
      console.log(
        `\nIndividual Wallet Scores:`,
        aggregateScores.map(
          (score) =>
            `${score.wallet}: ${score.score}, Credibility: ${score.credibility}`
        ),
        `\n`
      );
      console.log(
        `\n------------------------------------------------------------------------------------------------------------------\n`
      );
    }
  } catch (error) {
    console.error("Error calculating wallet scores:", error);
    rl.close();
  }
})();
