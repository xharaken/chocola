const contract_address = "0x92cF0B2511472f823cB67F1B22Db1859175Db0D0";
var contract = null;

window.onload = async () => {
  if (typeof window.ethereum === 'undefined') {
    let div = document.getElementById("error_result");
    div.className = "error";
    div.innerHTML =
        "Error:<br>You need to install Metamask. See https://metamask.io/download.html.";
    return;
  }
  web3 = new Web3(window.ethereum);
  console.log(web3);
  contract = await new web3.eth.Contract(abi, contract_address);
  console.log(contract);
  let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  console.log(accounts);

  document.getElementById("send_button").addEventListener("click", send);
  document.getElementById("check_button").addEventListener("click", check);
  document.getElementById("stalk_button").addEventListener("click", stalk);
};

async function send() {
  let address = document.getElementById("send_address").value;
  let hash = document.getElementById("send_hash").value;
  let giri;
  if (document.getElementById("send_giri_yes").checked) {
    giri = true;
  } else if (document.getElementById("send_giri_no").checked) {
    giri = false;
  }

  try {
    console.log(ethereum.selectedAddress);
    const receipt = await contract.methods.send(address, hash, giri)
          .send({from: ethereum.selectedAddress});
    console.log(receipt);
    let div = document.getElementById("send_result");
    div.className = "success";
    div.innerHTML = "Successfully sent!<br>";
    div.innerHTML += JSON.stringify(receipt);
  } catch (error) {
    console.log(error);
    let div = document.getElementById("send_result");
    div.className = "error";
    div.innerHTML = "Error:<br>";
    div.innerHTML += error.toString();
  }
}

async function check() {
  await getItems(ethereum.selectedAddress, "You",
                 document.getElementById("check_result"));
}

async function stalk() {
  let address = document.getElementById("stalk_address").value;
  await getItems(address, "Your friend",
                 document.getElementById("stalk_result"));
}

async function getItems(address, name, div) {
  try {
    console.log(address);
    div.className = "success";
    const number_of_items =
          await contract.methods.numberOfItems(address).call();
    console.log(number_of_items);
    div.innerHTML = name + " got " + number_of_items + " chocolates!<br>";
    for (let index = 0; index < number_of_items; index++) {
      const ret = await contract.methods.getItem(address, index).call();
      console.log(ret);
      const [sender, hash, giri] = [ret[0], ret[1], ret[2]];
      console.log(sender, hash, giri);
      div.innerHTML +=
          "  from: " + sender + ", hash: " + hash + ", giri: " + giri + "<br>";
    }
  } catch (error) {
    console.log(error);
    let div = document.getElementById("stalk_result");
    div.className = "error";
    div.innerHTML = "Error:<br>";
    div.innerHTML += error.toString();
  }
}
