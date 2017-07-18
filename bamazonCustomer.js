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
			  	name: "View items for sale",
			  	value : "view"
			  },
			  {
			  	name: "Purchase an item",
			  	value : "purchase"
			  }
	  	]
	} 
	]).then( (data) => {
	if (! data.operation) {
		console.log("An error occured...")
		return;
	}

	if (data.operation === 'view') {
		
		console.log("Available Items:");
		console.log("==============");

		connection.queryAsync("SELECT * FROM products")
			.then( data => data.forEach( item => console.log(`${item.id}: ${item.product_name}: ${item.price}`) ) )
			.then(() => connection.end() );

		}


	if (data.operation === purchase) {
		
	}

	});

