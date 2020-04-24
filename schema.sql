DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(45) NOT NULL,
product_sales DECIMAL(10,2) DEFAULT 0,
department_name VARCHAR(45) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(10) NOT NULL,
primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DarkSouls 3", "Video Games", 59.99, 200),
  ("DOOM", "Video Games", 59.99, 200),
  ("Steak", "Food&Drink", 24.99, 30),
  ("Suit", "Apparel", 69.99, 10),
  ("Formal Shoes", "Apparel", 49.99, 30),
  ("Formal Pants", "Apparel", 59.99, 30),
  ("John Wick", "Movies", 19.99, 25),
  ("John Wick 2", "Movies", 19.99, 30),
  ("Cookies", "Bakery", 9.99, 35),
  ("Bread", "Bakery", 9.99, 50);    