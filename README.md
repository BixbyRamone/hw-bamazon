# hw-bamazon

Bamazon is composed of two completed .js files, one work-in-progress .js file and some .sql files.

by running bamazoncustomer you can view available items and their prices, or purchase items.

by running bamazonmanager, you can view all items, price, dept, and inventory. You can also add inventory, add new products, and view any items that inventory is 12 or lower

bamazonsupervisor was started, but no functionality was implemented.

either customer.js or manager.js can be run through node, providing functionality suited for someone in that specific role.

running customer.js  will give the user the options to either view inventory, or purchas an item. Either way the inventory is displayed, but in the latter selection, they can input the number of the item they would like. It the prompts them for a quantity. Attempts to purchase quantities greater than what is listed for the inventory won't be processed.

running manager.js  prompts the user with the options to view inventory, view low inventory (items with 12 or less left in stock), add to inventory, or add new items. Adding new items allows for stock and price to be set.

