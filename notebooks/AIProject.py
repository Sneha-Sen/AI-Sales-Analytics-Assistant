import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns

df= pd.read_csv("SalesData.csv")
print(df.head())
#Number of rows
print(df.shape)
#Column names
print(df.columns)
#Missing values
print(df.isnull().sum())
#Data types
print(df.info())

#Data cleaning

df["Order Date"] = pd.to_datetime(df["Order Date"], format="%d-%m-%Y")
df["Ship Date"] = pd.to_datetime(df["Ship Date"], format="%d-%m-%Y")
print(df.info())

print(df[df["Postal Code"].isna()])
df = df.dropna()

print(df.duplicated().sum())
df = df.drop_duplicates()

#Feature Engineering

#Order Year
df["Order Year"] = df["Order Date"].dt.year
#Order Month
df["Order Month"] = df["Order Date"].dt.month_name()
#Shipping Days
df["Shipping Days"] = (
    df["Ship Date"] - df["Order Date"]
).dt.days

#Exploratory Data Analysis

#Total Revenue
total_sales = df["Sales"].sum()
#Average Order Value
avg_sales = df["Sales"].mean()
#Average shipping days
avg_shipping_days=df["Shipping Days"].mean()
#Top Region
top_region = df.groupby("Region")["Sales"].sum().idxmax()
#Top State
top_state = df.groupby("State")["Sales"].sum().idxmax()
#Top Category
top_category = df.groupby("Category")["Sales"].sum().idxmax()
#Top Product
top_product = df.groupby("Product Name")["Sales"].sum().idxmax()
# Lowest performing region
lowest_region = (df.groupby("Region")["Sales"].sum().idxmin())
# Lowest category
lowest_category = (df.groupby("Category")["Sales"].sum().idxmin())
# Total Orders
total_orders = len(df)
# Unique Customers
unique_customers = df["Customer ID"].nunique()
# Unique Products
unique_products = df["Product Name"].nunique()


#Monthly Sales Trend
monthly_sales = (
    df.groupby(df["Order Date"].dt.to_period("M"))
    ["Sales"]
    .sum()
)
monthly_sales.plot()
plt.show()

#Sales by region
region_sales = (
    df.groupby("Region")["Sales"]
    .sum()
    .sort_values()
)
region_sales.plot(kind='bar')
plt.show()

#Category Performance
Sales_by_category=df.groupby("Category")["Sales"].sum()
Sales_by_category.plot(kind='bar')
plt.show()

summary = f"""

Business Performance Summary

Total Revenue: {total_sales:,.2f}

Total Orders: {total_orders}

Unique Customers: {unique_customers}

Unique Products: {unique_products}

Average Order Value: {avg_sales:,.2f}

Average Shipping Days: {avg_shipping_days:.2f}

Top Region: {top_region}

Lowest Performing Region: {lowest_region}

Top State: {top_state}

Top Category: {top_category}

Lowest Category: {lowest_category}

Top Product: {top_product}

"""
print(summary)

df.to_csv("clean_sales_data.csv", index=False)
print(df)
