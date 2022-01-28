const Customs = artifacts.require("Customs");
const InsuranseStore = artifacts.require("InsuranceStore");

contract("Customs", (accounts) => {
    let customs;
    let insuranceStore;

    before(async() => {
        customs = await Customs.deployed();
        insuranceStore = await InsuranseStore.deployed();
        await insuranceStore.buyInsurance(2, 1, { from: accounts[0], value: 30000000000000000 });
        await customs.crossBorder("Lviv", "Ukraine", "Berlin", "Germany", { from: accounts[0] });
    });

    describe("Border Crossing", async() => {
        it("can fetch the first trip from Lviv to Berlin", async() => {
            const trips = await customs.getValueAtHistoryMapping(accounts[0]);
            assert.equal(trips[0].from.name, "Lviv", "The from city should be 'Lviv'.");
            assert.equal(trips[0].to.name, "Berlin", "The to city should be 'Berlin'.");
        });
    });
});