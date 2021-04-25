const JoniToken = artifacts.require("JoniToken");

module.exports = function (deployer) {
  deployer.deploy(JoniToken, 100000000);
};
