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
			  	name: "View products for sale",
			  	value : "view"
			  },
			  {
			  	name: "View low inventory",
			  	value : "lowInv"
			  },
			  {
			  	name: "Add to inventory",
			  	value : "addInv"
			  },
			  {
			  	name: "Add new product",
			  	value: "addProd"
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
			.then( data => data.forEach( item => console.log(`ID#: ${item.id}.) Product Name: ${item.product_name}; Retail Price: \$${item.price}; In Stock: ${item.stock_quantity}`) ) )
				.then(() => connection.end() );

		}

	if (data.operation === "lowInv") {

		connection.queryAsync("SELECT * FROM products WHERE stock_quantity < 13")
			.then( data => data.forEach( item => console.log(`ID#: ${item.id}.) Product Name: ${item.product_name}; Retail Price: \$${item.price}; In Stock: ${item.stock_quantity}`) ) )
				.then(() => connection.end() );
	}

	if (data.operation === "addInv") {
		let itemID = 0;
		let inventory = 0;

		connection.queryAsync("SELECT * FROM products")
			.then( data => data.forEach( item => console.log(`ID#: ${item.id}.) Product Name: ${item.product_name}; Retail Price: \$${item.price}; In Stock: ${item.stock_quantity}`) ) )
				.then( () =>
					// console.log("==============")

					inquirer.prompt([
						{
						  name: 'choice',
						  message: '\nEnter the index number of the product that you wish to order: ',
						  type: 'input'

						}
				  	]).then( (data) => {
				  		itemID = data.choice;
				  		connection.queryAsync("SELECT * FROM products WHERE id = ?", [itemID])
				  			.then( data => data.forEach( item => {

				  				inventory = item.stock_quantity;

				  			} ) )
				  			.then(
				  				inquirer.prompt([
				  					{
	  									name: 'amount',
	  									message: 'How many units do you wish to order?',
	  									type: 'input'
	  								}				  					
				  				]).then ( (data) => {
				  					let quantityNum = data.amount;
				  					let newInv = parseInt(inventory) + parseInt(quantityNum);

				  					connection.queryAsync("UPDATE bamazon.products SET stock_quantity = ? WHERE id = ?", [newInv, itemID])
				  						.then( (data) => console.log(`You now have a total of ${newInv} of product #${itemID}`))
				  							.then(() => connection.end() );
				  				})
				  				)
				  	})
				
				  	)


	}
});