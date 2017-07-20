-- CREATE SCHEMA IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS departments(
	id INTEGER AUTO_INCREMENT,
	product_name VARCHAR(50),
    department_name VARCHAR(30),
    price DECIMAL(11),
    stock_quantity INTEGER(11),
    PRIMARY KEY(id)
);

INSERT INTO products(
	product_name,
    department_name,
    price,
    stock_quantity
    )
VALUES (
	"beans",
    "edibles",
    1.69,
    578
    );
    
INSERT INTO products(
	product_name,
    department_name,
    price,
    stock_quantity
    )
VALUES (
	"smart phone",
    "electronics",
    799.99,
    112
    );
    
INSERT INTO products(
	product_name,
    department_name,
    price,
    stock_quantity
    )
VALUES (
	"cat food",
    "pet supplies",
    0.55,
    654
    );
    
INSERT INTO products(
	product_name,
    department_name,
    price,
    stock_quantity
    )
VALUES (
	"dog food",
    "pet supplies",
    44.49,
    50
    );
    
INSERT INTO products(
	product_name,
    department_name,
    price,
    stock_quantity
    )
VALUES (
	"lamp",
    "house ware",
    33.99,
    65
    );

INSERT INTO products(
	product_name,
    department_name,
    price,
    stock_quantity
    )
VALUES (
	"fidget spinner",
    "junk",
    22.00,
    837
    );
    
INSERT INTO products(
	product_name,
    department_name,
    price,
    stock_quantity
    )
VALUES (
	"computer",
    "electronics",
    788.99,
    284
    );
INSERT INTO products(
	product_name,
    department_name,
    price,
    stock_quantity
    )
VALUES (
	"Watership Down",
    "books",
    7.99,
    67
    );

INSERT INTO products(
	product_name,
    department_name,
    price,
    stock_quantity
    )
VALUES (
	"Guns Germs and Steel",
    "books",
    24.99,
    88
    );
    
INSERT INTO products(
	product_name,
    department_name,
    price,
    stock_quantity
    )
VALUES (
	"tacos",
    "edibles",
    3.99,
    365
    );
