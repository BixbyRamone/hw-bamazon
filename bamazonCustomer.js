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
			.then( data => data.forEach( item => console.log(`${item.id}: ${item.product_name}: \$${item.price}`) ) )
				.then(() => connection.end() );

		}


	if (data.operation === 'purchase') {

		let itemID = 0;
		let quantityNum = 0;
		let inventory;
		let shoppingCart;
		let itemCost = 0;
		let salestoDate = 0;

		console.log("Available Items:");
		console.log("==============");

		connection.queryAsync("SELECT * FROM products")
			.then( data => data.forEach( item => console.log(`${item.id}: ${item.product_name}: \$${item.price}`) ) )
				.then( () => 
		// console.log("==============")

		inquirer.prompt([
			{
			  name: 'choice',
			  message: '\nEnter the index number of the product that you wish to purchase: ',
			  type: 'input'

			}
	  	]).then( (data) => {
	  		itemID = data.choice;
	  		connection.queryAsync("SELECT * FROM bamazon.products WHERE id = ?", [data.choice])
	  			.then( data => data.forEach( item => {
	  				// console.log(`${item.id}: ${item.product_name}: ${item.price}`) 
	  				inventory = item.stock_quantity;
	  				shoppingCart = item.product_name;
	  				itemCost = item.price;
	  				salestoDate = item.product_sales;
	  				}) )
	  				.then( 
	  						inquirer.prompt([
								{
								  name: 'amount',
								  message: `How many units of ${shoppingCart}(s) do you wish to purchase? `,
								  type: 'input'

								}
						  	]).then( (data) =>{
						  		quantityNum = data.amount;
						  		let newInv = inventory - quantityNum;
						  		let total = itemCost * quantityNum;
						  		salestoDate = salestoDate + total;
						  			if (newInv < 0) {
						  				console.log("Order cannot be processed. Insufficient stock on hand.")
						  					connection.end() ;
						  			} else {

						  		connection.queryAsync("UPDATE bamazon.products SET stock_quantity = ?, product_sales = ? WHERE id = ?", [newInv, salestoDate, itemID])
					  				.then(() => connection.end() );
						  			// .then( connection.queryAsync("SELECT * FROM bamazon.products WHERE id = ?", [data.choice])
						  			console.log(`Thank you for your purchase of ${quantityNum} unit(s) of ${shoppingCart}(s)`)
						  			console.log("That will be a total of $" + total)

						  			}
						  	})
	  					)




	  	})
		)
	}

	});

