require("dotenv").config()
const express = require("express")
const app = express()
const mysql = require("mysql")
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT
const port = process.env.PORT
const bcrypt = require("bcrypt")
const cors = require("cors");
// ...

app.use(cors());
console.log(process.env.PORT)
app.listen(port, 
()=> console.log(`Server Started on port ${port}...`))
app.use(express.json())
const db = mysql.createPool({
   connectionLimit: 100,
   host: DB_HOST,
   user: DB_USER,
   password: "",
   database: DB_DATABASE,
   port: DB_PORT
})
db.getConnection( (err, connection)=> {
   if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
})

//middleware to read req.body.<params>
//CREATE USER
app.post("/createUser", async (req,res) => {
const user = req.body.name;
const hashedPassword = await bcrypt.hash(req.body.password,10);
db.getConnection( async (err, connection) => {
 if (err) throw (err)
 const sqlSearch = "SELECT * FROM usersDB.userTable WHERE user = ?"
 const search_query = mysql.format(sqlSearch,[user])
 const sqlInsert = "INSERT INTO usersDB.userTable VALUES (0,?,?)"
 const insert_query = mysql.format(sqlInsert,[user, hashedPassword])
 // ? will be replaced by values
 // ?? will be replaced by string
 await connection.query (search_query, async (err, result) => {
  if (err) throw (err)
  console.log("------> Search Results")
  console.log(result.length)
  if (result.length != 0) {
   connection.release()
   console.log("------> User already exists")
   res.sendStatus(409) 
  } 
  else {
   await connection.query (insert_query, (err, result)=> {
   connection.release()
   if (err) throw (err)
   console.log ("--------> Created new User")
   console.log(result.insertId)
   res.sendStatus(201)
  })
 }
}) //end of connection.query()
}) //end of db.getConnection()
}) //end of app.post()

//LOGIN (AUTHENTICATE USER)
app.post("/login", (req, res)=> {
    const user = req.body.name
    const password = req.body.password
    db.getConnection ( async (err, connection)=> {
     if (err) throw (err)
     const sqlSearch = "Select * from userTable where user = ?"
     const search_query = mysql.format(sqlSearch,[user])
     await connection.query (search_query, async (err, result) => {
      connection.release()
      
      if (err) throw (err)
      if (result.length == 0) {
       console.log("--------> User does not exist")
       res.sendStatus(404)
      } 
      else {
         const hashedPassword = result[0].password
         //get the hashedPassword from result
        if (await bcrypt.compare(password, hashedPassword)) {
        console.log("---------> Login Successful")
        res.send(`${user} is logged in!`)
        } 
        else {
        console.log("---------> Password Incorrect")
        res.send("Password incorrect!")
        } //end of bcrypt.compare()
      }//end of User exists i.e. results.length==0
     }) //end of connection.query()
    }) //end of db.connection()
    }) //end of app.post()
    // UPDATE USER
    app.put("/updateUser", async (req, res) => {
        const newPassword = req.body.password;
        const userName = req.body.user;
      
        db.getConnection(async (err, connection) => {
          if (err) throw err;
      
          // Check if the user exists
          const searchQuery = "SELECT * FROM usersDB.userTable WHERE User = ?";
          const searchParams = [userName];
      
          await connection.query(searchQuery, searchParams, async (err, result) => {
            if (err) throw err;
      
            if (result.length === 0) {
              connection.release();
              console.log("User does not exist");
              res.sendStatus(404);
            } else {
              // Update password
              const hashedPassword = await bcrypt.hash(newPassword, 10);
      
              const updateQuery = "UPDATE usersDB.userTable SET password = ? WHERE User = ?";
              const updateParams = [hashedPassword, userName];
      
              await connection.query(updateQuery, updateParams, (err, result) => {
                connection.release();
      
                if (err) throw err;
      
                console.log("Password updated successfully");
                res.sendStatus(200);
              });
            }
          });
        });
      });