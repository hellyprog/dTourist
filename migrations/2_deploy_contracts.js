var Customs = artifacts.require("./Customs");
var Insurance = artifacts.require("./InsuranceStore");

module.exports = async (deployer, network, accounts) => {
    deployer.deploy(Insurance).then(() => {
        return deployer.deploy(Customs, Insurance.address);
    })
};