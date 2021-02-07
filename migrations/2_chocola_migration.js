const Migrations = artifacts.require("Migrations");
const Chocola = artifacts.require("Chocola");

module.exports = function (deployer) {
  deployer.deploy(Chocola);
};
