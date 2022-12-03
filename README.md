# Members Only
![Project Preview](/public/images/express-members-only.png)
[**LIVE version**](https://express-members-only.onrender.com)


This project is part of [TheOdinProject](https://www.theodinproject.com/lessons/nodejs-members-only). The goal is to learn more about the backend and how user authentication works with user accounts that have different permissions.

To achieve this I used **NodeJS** and **Express** for the backend, **MongoDB (NoSQL)** for the database, **EJS** as the view engine and **TailwindCSS** to display the content in the frontend. For authentication I used **PassportJS** with **"Local" strategy**.

This **CRUD** application mimics a messaging app with a *Cyberpunk Theme* with different user types.
- LogIn and SignUp forms validate for existing email address, wrong email and password. 
- Logged in user can add and delete their own messages. They can update their profile, the VIP or admin status and also delete the account with all messages that belong to that account.
- Not logged in user can read messages but username and date are hidden.
- Logged in user that have the status "VIP" or are "Admin" can see who wrote the message and when. Furthermore admins can delete all messages.
- Routes that require a logged in user are protected by authentication.


Please add your own database connection string and environment secrets in the **env** file and rename it to *.env*.

Use this command to start the Dev-Server:
```
npm run serverstart
```

Start TailwindCSS watcher:
```
npm run tailwind
```

## Project setup
```
npm install
```

### Compiles and minifies for production
```
npm run build
```
