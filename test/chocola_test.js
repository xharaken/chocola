const Chocola = artifacts.require("Chocola");

contract("chocola", function (accounts) {
  it("Chocola test", async function () {
    let chocola = await Chocola.deployed();
    assert.equal(await chocola.numberOfItems(accounts[0]), 0);
    await chocola.send(accounts[4], 1, false, {from: accounts[0]});
    await chocola.send(accounts[4], 2, false, {from: accounts[1]});
    await chocola.send(accounts[4], 3, true, {from: accounts[2]});
    assert.equal(await chocola.numberOfItems(accounts[4]), 3);
    array_equal(
        await chocola.getItem(accounts[4], 0), [accounts[0], 1, false]);
    array_equal(
        await chocola.getItem(accounts[4], 1), [accounts[1], 2, false]);
    array_equal(
        await chocola.getItem(accounts[4], 2), [accounts[2], 3, true]);

    await chocola.send(accounts[5], 4, false, {from: accounts[0]});
    await chocola.send(accounts[5], 5, true, {from: accounts[1]});
    assert.equal(await chocola.numberOfItems(accounts[5]), 2);
    array_equal(
        await chocola.getItem(accounts[5], 0), [accounts[0], 4, false]);
    array_equal(
        await chocola.getItem(accounts[5], 1), [accounts[1], 5, true]);

    await chocola.send(accounts[5], 6, false, {from: accounts[1]});
    assert.equal(await chocola.numberOfItems(accounts[5]), 2);
    array_equal(
        await chocola.getItem(accounts[5], 1), [accounts[1], 6, false]);

    await chocola.send(accounts[5], 7, true, {from: accounts[2]});
    assert.equal(await chocola.numberOfItems(accounts[5]), 3);
    array_equal(
        await chocola.getItem(accounts[5], 2), [accounts[2], 7, true]);
  });
});

function array_equal(a, b){
  if (a.length != b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] != b[i]) {
      return false;
    }
  }
  return true;
}
