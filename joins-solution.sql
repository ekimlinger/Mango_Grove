Tasks:
--1 .Get all customers and their addresses.
SELECT * FROM customers INNER JOIN addresses on customers.id = addresses.customer_id;

--2 .Get all orders and their line items.
SELECT * FROM orders INNER JOIN line_items on orders.id = line_items.order_id;

--3. Which warehouses have cheetos?
SELECT warehouse FROM products JOIN warehouse_product ON products.id = warehouse_product.product_id
JOIN warehouse ON warehouse_product.warehouse_id = warehouse.id WHERE products.description = 'cheetos';

--4. Which warehouses have diet pepsi?
SELECT warehouse FROM products JOIN warehouse_product ON products.id = warehouse_product.product_id
JOIN warehouse ON warehouse_product.warehouse_id = warehouse.id WHERE products.description = 'diet pepsi';

--5. Get the number of orders for each customer. NOTE: It is OK if those without orders are not included in results.
SELECT orders.order_date, customers.first_name,customers.last_name FROM orders
INNER JOIN addresses ON orders.address_id = addresses.id
INNER JOIN customers ON addresses.customer_id = customers.id;

--6. How many customers do we have?
SELECT customers.id FROM customers ORDER BY "id"
DESC
LIMIT 1;

--7. How many products do we carry?
SELECT SUM(quantity) FROM line_items;

--8. What is the total available on-hand quantity of diet pepsi?
SELECT SUM(warehouse_product.on_hand) FROM products JOIN warehouse_product ON products.id = warehouse_product.product_id
JOIN warehouse ON warehouse_product.warehouse_id = warehouse.id WHERE products.description = 'diet pepsi';
