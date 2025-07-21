ExpenX
ExpenX is a lightweight and mobile-responsive expense tracker app built using the MERN stack. It allows users to manage income and expenses, visualize trends through charts, and generate downloadable reports — all in a secure and intuitive interface.

🚀 Features
User Authentication – Secure JWT-based login & signup

Dashboard – View total balance, income, and expenses

Income & Expense Management – Add, view, delete, and export records

Interactive Charts – Visualize trends with bar, pie, and line charts

Excel Reports – Export data with a single click

Responsive UI – Seamless experience across devices

🛠 Tech Stack
Frontend: React.js, styled-components, Chart.js

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Authentication: JWT, bcrypt

Excel Export: SheetJS

🔧 Installation
bash
Copy
Edit
# Clone the repo
git clone https://github.com/anurudha07/ExpenX.git
cd ExpenX

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
Setup Environment
Create .env in the backend folder:

ini
Copy
Edit
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
PORT=5000
Run App
bash
Copy
Edit
# In one terminal
cd backend && npm run dev

# In another terminal
cd frontend && npm run dev
Open http://localhost:3000 in your browser.

📬 Contact
Author: Anurudha Sarkar
Email: anurudhs567@gmail.com
Project: GitHub Repo
Live App: ExpenX on Render
