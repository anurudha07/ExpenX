# ExpenX

Expense Tracker App built with the MERN stack.

# Description

ExpenX is a mobile‑responsive personal finance dashboard designed to help you monitor and manage your income and expenses. With secure JWT‑based authentication, interactive charts, and comprehensive reporting, ExpenX provides a seamless user experience across devices.

# Features

User Authentication

Secure signup & login using JWT tokens

Dashboard Overview

Summary cards for Total Balance, Income, and Expenses

Income Management

Add, view, delete, and export income sources to Excel

Expense Management

Add, view, delete, and export expenses with category‑based tracking

Interactive Charts

Bar, Pie, and Line charts for visualizing financial trends

Recent Transactions

Quick‑access panel displaying the latest records

Reports

Download full income & expense data in Excel format

Responsive UI

Optimized for desktop, tablet, and mobile screens

Intuitive Navigation

Sidebar menu for easy access to Dashboard, Income, Expenses, and Logout

Delete on Hover

Hover over items to reveal delete buttons for quick removal

# Tech Stack

Frontend: React.js, styled‑components, Chart.js (or Recharts)

Backend: Node.js, Express.js

Database: MongoDB with Mongoose ODM

Authentication: JSON Web Tokens (JWT), bcrypt

Reporting: SheetJS for Excel export

Deployment: Render (or Heroku)

# Installation

Clone the repository

git clone https://github.com/anurudha07/ExpenX.git
cd ExpenX

Install dependencies

cd backend && npm install
cd ../frontend && npm install

Configure environment variables

Create a .env file in the server folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
PORT=5000

Run the application

# In one terminal (backend)
cd backend && npm run dev

# In another terminal (frontend)
cd frontend && npm run dev

AccessOpen http://localhost:3000 in your browser.

# Usage

Sign up or log in with your credentials.

Navigate through the sidebar to add/view income and expenses.

View your dashboard summary and interactive charts.

Export data as Excel reports.

Hover over any transaction card to delete entries.

Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

# License

This project is licensed under the MIT License.

# Contact

Priya – anurudhs567@gmail.com
Project Link: https://github.com/anurudha07/ExpenX
