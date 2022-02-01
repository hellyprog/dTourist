const InsuranseStore = artifacts.require("InsuranceStore");
const truffleAssert = require('truffle-assertions');

contract("InsuranceStore", (accounts) => {
    let insuranceStore;

    beforeEach(async() => {
        insuranceStore = await InsuranseStore.deployed();
    });

    describe("Insurance Buying", async() => {
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
    });
});