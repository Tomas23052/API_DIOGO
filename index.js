// import express
const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));

var cors = require("cors");

app.use(cors());

const db = require("./dbconfig");
// set your preferred server port
const PORT = process.env.PORT || 8081;
// root endpoint response
app.get("/", (req, res) => {
  res.send("Hello, World!");
});


app.post("/create", async(req,res) =>{
    if(!req.body.title || req.body.title ===""){
        res.status(400).send("Insira um artigo");
    }else{
        const option ={
            status: "ok",
            title: req.body.title,
            description: req.body.description,
            image_url: req.body.image_url
        };

        try{
            const response = await db.insert({
                table: "items",
                records: [option],
            });

            res.status(200).send(response);
        }catch(error){
            res.status(500).send(error);
        }
    }
});

app.get("/blogs", async (req,res)=>{
    try{
        const response = await db.query("SELECT * FROM blogs.items");

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

app.post("/edit", async (req, res) => {

    // 2. set the updated todo and specify the todo identifier - hash attribute
  
    const option = {
  
      id: req.body.id,
  
      title: req.body.title,
  
      description: req.body.description,

      image_url: req.body.image_url
  
    };
  
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