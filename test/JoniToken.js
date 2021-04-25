var JoniToken = artifacts.require("JoniToken")

contract('JoniToken', function(accounts) {
    var tokenInstance;

    it('initializes the contract with correct values', function() {
        return JoniToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name) {
            assert.equal(name, 'Joni Token', 'has correct name')
            return tokenInstance.symbol();
        }).then(function(symbol) {
            assert.equal(symbol, 'JONI', 'has correct symbol')
            return tokenInstance.standard();
        }).then(function(standard) {
            assert.equal(standard, 'Joni Token v1.0', 'has correct standard')
        })
    })

    it('allocates the initial supply upon deployment', function(){
        return JoniToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1000000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance) {
            assert.equal(adminBalance.toNumber(), 1000000, 'it allocates initial supply to admin account')
        })
    })

    it('transfers token ownership', function() {
        return JoniToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], 9999999999999999999);
        }).then(assert.fail).catch(function(error) {
            //console.log(error);
            assert(error.message.indexOf('overflow') >= 0, 'error reason must contain overflow');
            return tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] });
        }).then(function(success) {
            assert.equal(success, true, 'it return true');
            return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] });
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers on event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the sender account');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the receiver account');
            assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 250000, 'adds amount to receiver account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 750000, 'deducts amount of from sender account')
        });
    })
})