
# Food Bank Inventory Management System

This is a full-stack application designed to help manage a food bank's inventory. It features a backend connected to MongoDB and a frontend interface to add and manage items across various categories.

---

## Instructions & Requirements to Run the Application

### Requirements

- **Node.js** must be installed on your computer  
- Download a code editor such as **Visual Studio Code**

---

## Backend Setup

1. Open **Visual Studio Code**
2. Change directories to the backend folder:
   ```bash
   cd {ProjectTitle}/backend
   ```
3. Make sure dependencies are installed:
   ```bash
   npm install
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
5. You should see the following messages in the terminal:
   ```
   App is listening to port: ___
   App is connected to MongoDB
   ```

> **Note**: You must have a [MongoDB](https://www.mongodb.com/) account.  
> After creating a cluster and database, update the `config.js` file in the `backend` folder with your MongoDB connection string:
> ```js
> export const MONGO_URL = "your-mongodb-connection-string-here";
> ```

---

## Frontend Setup

1. Change directories to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Make sure dependencies are installed:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. The terminal will show a message like:
   ```
   Local: http://localhost:5173
   ```
5. Click on or visit the local URL to view the application in your browser.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- React
- Vite
