var JoniToken = artifacts.require("JoniToken")

contract('JoniToken', function(accounts) {
    it('sets the total supply upon deployment', function(){
        return JoniToken.deployed().then(function(instance) {
            return instance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1000000');
        })
    })
})