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

connection.connect(function(err) {
    if (err) {
      console.error("error connecting");
      return;
    }
    console.log("connected as id " + connection.threadId);
    });