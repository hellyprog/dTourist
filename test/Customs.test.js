const Customs = artifacts.require("Customs");

contract("Customs", (accounts) => {
    let customs;

    before(async() => {
        customs = await Customs.deployed();
    });

    describe("crossing a border and retrieving account trip", async() => {
        before("cross a border using accounts[0]", async() => {
            await customs.crossBorder("Lviv", "Ukraine", "Berlin", "Germany", { from: accounts[0] });
        });

        it("can fetch trips of a person by person address", async() => {
            const trips = await customs.getValueAtHistoryMapping(accounts[0]);
            assert.equal(trips[0].from.name, "Lviv", "The from city should be 'Lviv'.");
        });
    });
});