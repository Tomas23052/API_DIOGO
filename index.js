// import express
const express = require("express");
var bodyParser = require("body-parser");
const app = express();

var jsonParser = bodyParser.json()

var urlencoderParser = bodyParser.urlencoded({extended: false})

var cors = require("cors");

app.use(cors());

const db = require("./dbconfig");
// set your preferred server port
const PORT = process.env.PORT || 8081;
// root endpoint response
app.get("/", (req, res) => {
  res.send("Hello, World!");
});


// 1. create your post route that handles creating new todo item

app.post("/add",jsonParser, async (req, res) => {

  // 2. retrieve the todo from req.body

  // 3. Validate the todo to nsure the user does not submit an empty form

  
  if (req.body.title === "") {

    res.status(400).send("Todo is required");
    
    } else {
    // 4. prepare the todo in an object

    const option = {

      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url

    };

    console.log([option])

    // 5. ensure to catch the error using try/catch

    try {

      // 6. if the todo is not empty

      const response = await db.insert({

        table: "items",

        records: [option],

      });

      // 7. notify the frontend or sender with the success response

      res.status(200).send(response);

    } catch (error) {

      // 7. notify the frontend or sender with the error response

      res.status(500).send(error);

    }

    }

});

// just a notification in the console

app.get("/blogs", async (req,res)=>{
    try{
        const response = await db.query("SELECT * FROM blogs.items  ORDER BY __createdtime__ DESC");

        res.status(200).send(response);
    }catch(error){
        res.status(500).send("Alguma coisa correu mal");
    }
});

app.get("/blogs/few", async (req,res)=>{
  try{
      const response = await db.query("SELECT TOP 5 * FROM blogs.items ORDER BY __createdtime__ DESC");

      res.status(200).send(response);
  }catch(error){
      res.status(500).send("Alguma coisa correu mal");
  }
});

app.get("/blogs/:blog_id", async (req,res)=>{
    try{

        const { blog_id} = req.params

        const response = await db.query(`SELECT * FROM blogs.items WHERE id ='${blog_id}'`);

        res.status(200).send(response);
    }catch(error){
        res.status(500).send("Alguma coisa correu mal");
    }
});
// 1. route to update a todo

app.post("/edit",jsonParser, async (req, res) => {

    // 2. set the updated todo and specify the todo identifier - hash attribute
  
    const option = {
  
      id: req.body.id,
  
      title: req.body.title,
  
      description: req.body.description,

      image_url: req.body.image_url
  
    };
  

    console.log([option])
    // 3. use try/catch to control errors
  
    try {
  
      // 4. send the updated todo
  
      const response = await db.update({
  
        table: "items",
  
        records: [option],
  
      });
  
      // 5. send success message to the frontend
  
      res.status(200).send(response);
  
    } catch (error) {
  
      // 5. send error message to the frontend
  
      res.status(500).send(error);
  
    }
  
  });

  // 1. route to delete a todo using its id

app.post("/delete/:blog_id", async (req, res) => {

    // 2. get the id from the url parameter
  
    const { blog_id } = req.params;
  
    // 3. use try/catch to control errors
  
    try {
  
      // 4. Send a delete request to the database
  
      const response = await db.delete({
  
        table: "items",
  
        hashValues: [blog_id],
  
      });
  
      // 5. send success message to the frontend
  
      res.status(200).send(response);
  
    } catch (error) {
  
      // 5. send error message to the frontend
  
      res.status(500).send(error);
  
    }
  
  });


app.listen(PORT, () => {
  console.log(`Your server ⚡ is running 🏃‍♂️ on ${PORT}`);
});