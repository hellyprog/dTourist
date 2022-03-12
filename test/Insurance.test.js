const InsuranseStore = artifacts.require("InsuranceStore");
const truffleAssert = require('truffle-assertions');

contract("InsuranceStore", (accounts) => {
    let insuranceStore;

    beforeEach(async() => {
        insuranceStore = await InsuranseStore.deployed();
    });

    describe("Insurance Buying", async() => {
        it("can get Classic plan price after initializaiton", async() => {
            const classicType = 0;

            const price = await insuranceStore.getInsurancePrice(classicType);
            assert.equal(BigInt(price), BigInt(10000000000000000));
        });

        it("can get Premium plan price after initializaiton", async() => {
            const premiumType = 1;

            const price = await insuranceStore.getInsurancePrice(premiumType);
            assert.equal(BigInt(price), BigInt(15000000000000000));
        });

        it("can buy Classis insurance with 20000000000000000 txn value", async() => {
            const classicType = 0;
            
            await truffleAssert.passes(
                insuranceStore.buyInsurance(2, classicType, { from: accounts[0], value: 20000000000000000 })
            );
        });

        it("can buy Premium insurance with 30000000000000000 txn value", async() => {
            const premiumType = 1;

            await truffleAssert.passes(
                insuranceStore.buyInsurance(2, premiumType, { from: accounts[0], value: 30000000000000000 })
            );
        });

        it("cannot buy insurance for less than 1 day", async() => {
            const premiumType = 1;

            await truffleAssert.reverts(
                insuranceStore.buyInsurance(0, premiumType, { from: accounts[0], value: 30000000000000000 })
            );
        });

        it("cannot buy insurance with incorrect price", async() => {
            const premiumType = 1;

            await truffleAssert.reverts(
                insuranceStore.buyInsurance(10, premiumType, { from: accounts[0], value: 30000000000000000 })
            );
        });

        it("can buy Classic insurance and it will have correct expiry date", async() => {
            const classicType = 0;

            await insuranceStore.buyInsurance(2, classicType, { from: accounts[0], value: 20000000000000000 });
            const insurance = await insuranceStore.getInsuranceInfo(accounts[0]);
            const insuranceExpiry = new Date(insurance.expiryDate * 1000);
            const expectedExpiryDate = new Date();
            expectedExpiryDate.setDate(expectedExpiryDate.getDate() + 2);

            assert.equal(insuranceExpiry.getFullYear(), expectedExpiryDate.getFullYear(), "Month date should be the same");
            assert.equal(insuranceExpiry.getDate(), expectedExpiryDate.getDate(), "Month date should be the same");
        });

        it("can buy Premium insurance for less than a week and it will have correct expiry date", async() => {
            const premiumType = 1;

            await insuranceStore.buyInsurance(2, premiumType, { from: accounts[0], value: 30000000000000000 });
            const insurance = await insuranceStore.getInsuranceInfo(accounts[0]);
            const insuranceExpiry = new Date(insurance.expiryDate * 1000);
            const expectedExpiryDate = new Date();
            expectedExpiryDate.setDate(expectedExpiryDate.getDate() + 2);

            assert.equal(insuranceExpiry.getFullYear(), expectedExpiryDate.getFullYear(), "Month date should be the same");
            assert.equal(insuranceExpiry.getDate(), expectedExpiryDate.getDate(), "Month date should be the same");
        });

        it("can buy Premium insurance for more than a week and it will have expiry date prolongated for day", async() => {
            const premiumType = 1;

            await insuranceStore.buyInsurance(7, premiumType, { from: accounts[0], value: 105000000000000000 });
            const insurance = await insuranceStore.getInsuranceInfo(accounts[0]);
            const insuranceExpiry = new Date(insurance.expiryDate * 1000);
            const expectedExpiryDate = new Date();
            expectedExpiryDate.setDate(expectedExpiryDate.getDate() + 8);

            assert.equal(insuranceExpiry.getFullYear(), expectedExpiryDate.getFullYear(), "Month date should be the same");
            assert.equal(insuranceExpiry.getDate(), expectedExpiryDate.getDate(), "Month date should be the same");
        });

        it("can buy insurance and InsurancePurchased event will be emitted", async() => {
            const premiumType = 1;

            const tx = await insuranceStore.buyInsurance(7, premiumType, { from: accounts[0], value: 105000000000000000 });

            truffleAssert.eventEmitted(tx, "InsurancePurchased", (ev) => {
                return ev.success;
            });
        });

        it("can withdraw ether from contact using owner account", async() => {
            const premiumType = 1;
            await insuranceStore.buyInsurance(7, premiumType, { from: accounts[0], value: 105000000000000000 });
            const contractBalance = await web3.eth.getBalance(insuranceStore.address);
            const accountBalanceBeforeWithdraw = await web3.eth.getBalance(accounts[0]);
            const txn = await insuranceStore.withdraw({from: accounts[0]});
            const totalGas = await getTransactionGasCost(txn);
            const accountBalanceAfterWithdraw = await web3.eth.getBalance(accounts[0]);
            assert.equal(BigInt(accountBalanceAfterWithdraw), BigInt(accountBalanceBeforeWithdraw) + BigInt(contractBalance) - BigInt(totalGas));
        });

        it("cannot withdraw ether from contact using not owner account", async() => {
            await truffleAssert.reverts(
                insuranceStore.withdraw({from: accounts[3]})
            );
        });

        it("can change Classic insurance price and InsurancePriceChanged event will be emitted", async() => {
            const classicType = 0;

            const tx = await insuranceStore.setInsurancePrice(classicType, 12000000000000000n);

            truffleAssert.eventEmitted(tx, "InsurancePriceChanged", (ev) => {
                return ev.insuranceType == 0 && ev.newPrice == 12000000000000000n;
            });
        });

        it("can change Premium insurance price and InsurancePriceChanged event will be emitted", async() => {
            const premiumType = 1;

            const tx = await insuranceStore.setInsurancePrice(premiumType, 17000000000000000n);

            truffleAssert.eventEmitted(tx, "InsurancePriceChanged", (ev) => {
                return ev.insuranceType == 1 && ev.newPrice == 17000000000000000n;
            });
        });

        it("can change Classic insurance price and price will be updated in mapping", async() => {
            const classicType = 0;

            const tx = await insuranceStore.setInsurancePrice(classicType, 14000000000000000n);
            const newPrice = await insuranceStore.getInsurancePrice(classicType);

            assert.equal(BigInt(newPrice), 14000000000000000n)
        });
    });
});

async function getTransactionGasCost(txn) {
    const receipt = await web3.eth.getTransactionReceipt(txn["tx"]);
    const gasUsed = receipt.gasUsed;
    const transaction = await web3.eth.getTransaction(txn["tx"]);
    const gasPrice = Number(transaction.gasPrice);

    return BigInt(gasUsed * gasPrice);
}