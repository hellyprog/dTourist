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
    });
});

async function getTransactionGasCost(txn) {
    let receipt = await web3.eth.getTransactionReceipt(txn["tx"]);
    let gasUsed = receipt.gasUsed;
    let transaction = await web3.eth.getTransaction(txn["tx"]);
    let gasPrice = Number(transaction.gasPrice);

    return BigInt(gasUsed * gasPrice);
}