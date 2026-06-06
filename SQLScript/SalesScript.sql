CREATE DATABASE sales_analytics;
USE sales_analytics;
select * from sales_data;
-- Total Revenue
SELECT round(SUM(Sales),2) AS total_revenue FROM sales_data;

-- Revenue by Region
SELECT Region, round(SUM(Sales),2) AS revenue
FROM sales_data
GROUP BY Region
ORDER BY revenue DESC;

-- Top 5 Products
SELECT `Product Name`, round(SUM(Sales),2) AS revenue
FROM sales_data
GROUP BY `Product Name`
ORDER BY revenue DESC
LIMIT 5;

-- Monthly Sales Trend
SELECT 
    DATE_FORMAT(`Order Date`, '%Y-%m') AS month,
    SUM(Sales) AS revenue
FROM sales_data
GROUP BY month
ORDER BY month;

-- Category Performance
SELECT Category, round(SUM(Sales),2) AS revenue
FROM sales_data
GROUP BY Category;

-- Rank products by sales within each Category
SELECT `Product Name`, Category, Sales,
       RANK() OVER (PARTITION BY Category ORDER BY Sales DESC) as sales_rank
FROM sales_data;

-- Calculate percentage change in monthly revenue
WITH MonthlySales AS (
    SELECT DATE_FORMAT(`Order Date`, '%Y-%m') AS month, SUM(Sales) AS revenue
    FROM sales_data GROUP BY month
)
SELECT month, revenue, 
       LAG(revenue) OVER (ORDER BY month) as prev_month_revenue
FROM MonthlySales;
