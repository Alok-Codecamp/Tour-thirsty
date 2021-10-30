const express = require('express');
const { MongoClient } = require('mongodb');
const cors=require('cors')
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mrwnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
    try{
        await client.connect();
        console.log("database connected successfully");

        const database=client.db("Tour-thirsty");
        const packageCollection=database.collection("package");
         
        app.get('/packages',async(req,res)=>{
          const cursor=packageCollection.find({});
          const packages=await cursor.toArray();
          res.send(packages)
        })    
      app.get('/packages/:id',async(req,res)=>{
        const id=req.params.id;
        console.log(id);
      })

    } 
    finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})