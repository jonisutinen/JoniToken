var JoniTokenSale = artifacts.require("JoniTokenSale")

contract('JoniTokenSale', function(accounts) {
    var tokenSaleInstance;
    var tokenPrice = 100000000000000; // in wei (0.0001 ether)

    it('initializes the contract with the correct values', function() {
        return JoniTokenSale.deployed().then(function(instance) {
            tokenSaleInstance = instance;
            return tokenSaleInstance.address;
        }).then(function(address) {
            assert.notEqual(address, 0x0, 'has contract address');
            return tokenSaleInstance.tokenContract();
        }).then(function(address) {
            assert.notEqual(address, 0x0, 'has token contract address');
            return tokenSaleInstance.tokenPrice();
        }).then(function(price) {
            assert.equal(price, tokenPrice, 'token price is correct');
        });
    });
});