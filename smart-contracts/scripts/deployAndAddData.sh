echo "deploying contract"
npx hardhat --network testchain run scripts/deployContracts.js
echo "inserting parties"
npx hardhat --network testchain run scripts/insertParties.js
echo "inserting candidates"
npx hardhat --network testchain run scripts/insertCandidates.js
