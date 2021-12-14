# dTourist
Decentralized version of common passport for going abroad.

Purpose of this app is to create system where user can have a passport as wallet address in blockchain. Why?
- History of travels is history of transactions
- Smart-contract validation of country leaving allowance
- Visa & other permissions are distributed in form of tokens of NFTs

# V1.0

Workflow:
- Customs contract is triggered by traveler.
- Contract writes border crossing attempt to store
- Contract checks if traveler is allowed to cross the border using oracle.
- Additionally if visa of similar docs are needed contract checks nft existance (?)
- Depending on txn result (success of failure) traveler is allowed or not to cross the border.

FE part:
- System to login using crypto wallet.
- Initiate border crossing process
- Get a result
