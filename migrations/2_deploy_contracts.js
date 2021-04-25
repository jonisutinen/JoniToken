const JoniToken = artifacts.require("JoniToken");
const JoniTokenSale = artifacts.require("JoniTokenSale");

module.exports = function (deployer) {
  deployer.deploy(JoniToken, 100000000).then(function() {
    var tokenPrice = 100000000000000; // in wei (0.0001 ether)
    return deployer.deploy(JoniTokenSale, JoniToken.address, tokenPrice);
  });
};
