var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


var connection = mysql.createConnection({
host:"localhost",
port:3306,

user:"root",

password:"0525",
database:"bamazon"
});

connection.connect(function(err){
  if(err) throw err;
  loadInv();
});

//loading inventory
function loadInv(){
  connection.query("SELECT * FROM products", function(err,res){
    if(err) throw err;

    console.table(res);

    productSearch(res);
  });
}

//customer product search by ID
function productSearch(inv){
inquirer
  .prompt([
    {
      type: "input",
      name: "choice",
      message: "What is the ID of what you'd like to purchase?",
    }
  ])
  .then(function(val){
    var custID = parseInt(val.choice);
    var product = checkInv(custID,inv);

    //prompt for quantity
    if(product) {
      promptCustQuantity(product);
    }
    else {
      console.log("\nItem out of stock or not in Inventory.");
      loadInv();
    }
  });
}

function promptCustQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like?",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      
      checkIfShouldExit(val.quantity);
      var quantity = parseInt(val.quantity);

      // If not enough, it'll reload product function
      if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity");
        loadProducts();
      }
      else {
        // Run a purchase program if all goes well
        makePurchase(product, quantity);
      }
    });
}

// Purchase the desired quanity of the desired item
function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ?, product_sales = product_sales + ? WHERE item_id = ?",
    [quantity, product.price * quantity, product.item_id],
    function(err, res) {
      // Let the user know the purchase was successful, re-run loadProducts
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
      loadProducts();
    }
  );
}

// Check to see if the product the user chose exists in the inventory
function checkInv(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      // If a matching product is found, return the product
      return inventory[i];
    }
  }
  // Otherwise return null
  return null;
}

// Check to see if the user wants to quit the program
function checkIfShouldExit(choice) {
  if (choice.toLowerCase() === "q") {
    
    console.log("Goodbye!");
    process.exit(0);
  }
}