📝 Tasky – Task Management Web App
Tasky is a powerful, full-stack task management web application built with modern technologies including React, TypeScript, Material UI, Node.js, Prisma, Zod, and PostgreSQL. Designed for individuals and teams, Tasky makes it simple to manage tasks, groups, and collaboration — all in a sleek, responsive interface.

🚀 Features
✅ Tasks
Create, update, and delete tasks

Assign tasks to groups

Track deadlines and task progress

👥 Groups
Create and manage multiple groups

Add or remove members from a group

Group-specific task management

👤 User Profile
Update user profile info (name, email, etc.)

Seamless authentication & session handling

🧰 Tech Stack
🖥️ Frontend
React with TypeScript – For fast and type-safe UI development

Material UI (MUI) – For responsive, accessible, and modern UI components

React Query – Data fetching and caching for a better UX

Axios – Handling API requests

React Router – Client-side routing

🛠️ Backend
Node.js with TypeScript – For scalable server-side development

Express.js – Lightweight API routing

Zod – Request/response schema validation

Prisma ORM – Elegant database access with type safety

PostgreSQL – Relational database for data persistence

📁 Project Structure
bash
Copy
Edit
tasky/
├── client/       # React Frontend
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── ...
├── server/       # Node.js Backend
│   ├── routes/
│   ├── controllers/
│   ├── prisma/
│   └── ...
├── prisma/       # Prisma schema and migrations
├── .env
└── README.md


💡 Getting Started
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/tasky.git
cd tasky
2. Setup Environment Variables
Create .env files in both client/ and server/ folders with appropriate values.

3. Install Dependencies
Frontend:

bash
Copy
Edit
cd client
npm install
Backend:

bash
Copy
Edit
cd ../server
npm install
4. Setup the Database
Make sure PostgreSQL is running, then run:

bash
Copy
Edit
npx prisma migrate dev --name init
5. Run the App
Start both frontend and backend servers:

bash
Copy
Edit
# In /client
npm run dev

# In /server
npm run dev

🧪 Future Improvements
Real-time updates with WebSockets

Notification system

Drag-and-drop task prioritization

Role-based access for group members

🧑‍💻 Author
Nathan Amudavi
LinkedIn: https://www.linkedin.com/in/nathan-amudavi-b206602a6/·  GitHubTasky App
