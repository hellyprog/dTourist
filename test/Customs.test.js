const Customs = artifacts.require("Customs");
const InsuranseStore = artifacts.require("InsuranceStore");
const truffleAssert = require('truffle-assertions');

contract("Customs", (accounts) => {
    let customs;
    let insuranceStore;

    beforeEach(async() => {
        customs = await Customs.deployed();
        insuranceStore = await InsuranseStore.deployed();
    });

    describe("Border Crossing", async() => {
        it("can cross the border from Lviv to Berlin with insurance", async() => {
            await insuranceStore.buyInsurance(2, 1, { from: accounts[0], value: 30000000000000000 });
            let tx = await customs.crossBorder("Lviv", "Ukraine", "Berlin", "Germany", { from: accounts[0] });

            truffleAssert.eventEmitted(tx, "TravelerDataProcessed", (ev) => {
                return ev.success == true && ev.trip.from.name === "Lviv" && ev.trip.to.name === "Berlin";
            });
        });

        it("cannot cross the border from Lviv to Berlin without insurance", async() => {
            let tx = await customs.crossBorder("Lviv", "Ukraine", "Berlin", "Germany", { from: accounts[1] });

            truffleAssert.eventEmitted(tx, "TravelerDataProcessed", (ev) => {
                return ev.success == false && ev.trip.from.name === "Lviv" && ev.trip.to.name === "Berlin";
            });
        });
    });
});