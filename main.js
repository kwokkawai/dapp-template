var web3 = new Web3(Web3.givenProvider);
var contractInstance;

console.log("hello");

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(window.abi, "0xa55F41B32aD33f98Cd95d1de7dA4dd314aDd3a35", {from: accounts[0]});
      console.log(contractInstance);
    });

    $("#add_data_button").click(inputData);
});

function inputData(){
  var name = $("#name_input").val();
  var age = $("#age_input").val();
  var height = $("#height_input").val();
  contractInstance.methods.createPerson(name, age, height).send({value: web3.utils.toWei("1", "ether")})
    .on('transactionHash', function(hash){
      console.log("tx hash");
    })
    .on('confirmation', function(confirmationNumber, receipt){
        console.log("conf");
    })
    .on('receipt', function(receipt){
      console.log(receipt);
    });
  }