
# EpiPool-Tech1

This aim of this project is to provide a database, backend and frontend for the students of Epitech during the 1st year pool.

To launch the project you have to do: 

```docker-compose up --build -d```

It will launch all the app. By default you have the backend running port **3000**, the frontend port **5173** and the database **8081**.

**Backend**

Use NodeJs, express. You can find the documentation generated by swagger on this route

```http://localhost/api/docs```

For security reason we recommand that you comment the register route in the authRouter.js

```router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    check('name', 'Name is required').not().isEmpty(),
  ],
  register
);
```

**Frontend**

Use VueJs as well as Vite.

**Database**

You have to put the sql schema at the root of the repository

**.Env**

You have to create a .env file at the root of the repository.

```MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
PMA_HOST=
PMA_USER=
PMA_PASSWORD=
DB_HOST=
DB_DIALECT=
JWT_SECRET=
POSITION_AVAILABLE=
```
You can change the value as you like

