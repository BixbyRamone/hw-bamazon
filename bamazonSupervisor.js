var mysql = require('mysql');
var inquirer = require('inquirer');

const Promises = require('bluebird');
Promises.promisifyAll(require("mysql/lib/Connection").prototype);
Promises.promisifyAll(require("mysql/lib/Pool").prototype);


var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "bamazon"
});

inquirer.prompt([
	{
	  name: 'operation',
	  message: 'What would you like to do?',
	  type: 'list',
	  choices: [
			  {
			  	name: "View sales by department",
			  	value : "view"
			  },
			  {
			  	name: "Create new department",
			  	value : "lowInv"
			  }			 
	  	]
	} 
	])