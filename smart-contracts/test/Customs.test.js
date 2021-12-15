const Customs = artifacts.require("Customs");

contract("Customs", (accounts) => {
    let customs;
    let expectedDate;

    before(async() => {
        customs = await Customs.deployed();
    });

    describe("crossing a border and retrieving account address", async() => {
        before("cross a border using accounts[0]", async() => {
            await customs.crossBorder(accounts[1], accounts[2], 1639604150, { from: accounts[0] });
            expectedDate = 1639604150;
        });

        it("can fetch trips of a person by person address", async() => {
            const trips = await customs.getValueAtHistoryMapping(accounts[0]);
            console.log(trips);
            assert.equal(trips[0].date, expectedDate, "The date of the trip should be 1639604150.");
        });
    });
});