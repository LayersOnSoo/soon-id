# SOO NETWORK On-Chain Scoring Module

## Introduction

This module analyzes the on-chain footprint of Solana wallet accounts to derive a credibility score based on various criteria such as transaction history, token balances, smart contract interactions, and staking activities.

## Demo

These screenshots demonstrate the module in action, showcasing both the analysis of multiple wallet addresses and a single wallet address.

## Setup

1. Clone the repository: `git clone https://github.com/EmekaManuel/soon-onchain-analysis.git](https://github.com/LayersOnSoo/soon-id.git`
2. cd `<repository-directory>`
3. Install dependencies: `npm install`
4. Run the project: `npm start`

## Usage

The module calculates the score and credibility of wallets based on the following criteria:

1. `Transaction history`: Analyzes the frequency and types of transactions.
2. `Token balances`: Evaluates the diversity and amounts of tokens held.
3. `Smart contract interactions`: Assesses engagements with smart contracts.
4. `Staking activities`: Determines participation in staking and related activities.

## Dependencies: Utilizes the following dependencies:

- `@solana/web3.js`: Library for interacting with the Solana blockchain.
- `typescript`: TypeScript language compiler.
- `ts-node & nodemon`: Tools for TypeScript execution and monitoring.
- `readline`: Handles user input for wallet addresses.
- `gradient-string`: Enhances the visual output with ASCII art styling.

## Algorithms and Methods Used

The scoring module employs the following methods for on-chain analysis:

- `Weighted Scoring`: Calculates scores using predefined multipliers for different criteria (transaction count, token balance, smart contract interactions, staking activities).
- `Data Normalization`: Normalizes data to ensure fair comparison across different metrics.
- `Error Handling`: Implements robust error handling to manage exceptions during data retrieval and analysis.

## Score Calculation:

The score for each wallet is calculated using predefined multipliers for each criterion:
Note: These multiplier values can be changed to suit your standard

- `transactionCount`: Weighted at 0.5
- `tokenBalance`: Weighted at 0.3
- `smartContractInteractions`: Weighted at 0.1
- `stakingActivities`: Weighted at 0.1

## Main Features

- `Visually appealing command line interface`: Enhances user experience with styled ASCII art and colored console output.
- `Single Address Score Analysis`: Calculates and displays the score and credibility for a single wallet address.
- `Multiple Addresses Score Analysis`: Computes aggregate scores and credibility for multiple wallet addresses entered via comma-separated input.
- `Error Handling`: Implements robust error handling to manage exceptions during score calculations, ensuring informative error messages are displayed when issues arise.

This script enables users to interactively input wallet addresses, retrieve scores, and gain insights into the on-chain activities associated with the provided wallets on the Solana blockchain.

## Methods for Data Aggregation, Storage, and Presentation

Data aggregation, storage, and presentation methods include:

- `Aggregation`: Aggregates data from the Solana blockchain using Solana Web3.js library and APIs.
- `Storage`: Stores aggregated data in memory during runtime; no persistent storage is required.
- `Presentation`: Presents scores and credibility levels in a visually appealing command line interface with ASCII art styling and colored output.

## API Endpoints

- `getTransactionHistory(publicKey: PublicKey)`: Retrieves transaction history for a given wallet.
- `getTokenBalances(publicKey: PublicKey)`: Retrieves token balances associated with a wallet.
- `getAccountInfo(publicKey: PublicKey)`: Retrieves account information, including staking activities.

These endpoints interact with the Solana blockchain to gather necessary on-chain data for scoring wallets.
