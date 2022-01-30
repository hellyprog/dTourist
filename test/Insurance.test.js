const InsuranseStore = artifacts.require("InsuranceStore");

contract("InsuranceStore", (accounts) => {
    let insuranceStore;

    beforeEach(async() => {
        insuranceStore = await InsuranseStore.deployed();
    });

    describe("Insurance Buying", async() => {
        it("can buy an insurance and it will be present in state", async() => {
            await insuranceStore.buyInsurance(2, 1, { from: accounts[0], value: 30000000000000000 });
            const insurance = await insuranceStore.getInsuranceInfo(accounts[0]);

            assert.equal(insurance.insuranceType, 1, "Insurance type should be 1.");

            const insuranceExpiry = new Date(insurance.expiryDate * 1000);
            const expectedExpiryDate = new Date();
            expectedExpiryDate.setDate(expectedExpiryDate.getDate() + 2);

            assert.equal(insuranceExpiry.getDate(), expectedExpiryDate.getDate(), "Month date should be the same");
        });
    });
});