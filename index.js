const express = require('express');
const { MongoClient, Db } = require('mongodb');
const ObjectId=require('mongodb').ObjectId;
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
        const bookingCollection=database.collection('booking');
         
        app.get('/packages',async(req,res)=>{
          const cursor=packageCollection.find({});
          const packages=await cursor.toArray();
          res.send(packages)
        })    
      app.get('/packages/:id',async(req,res)=>{
        // console.log(req.params.id)
        const packageId=req.params.id;
        const query={_id:ObjectId(packageId)}
        const result=await packageCollection.findOne(query);
        console.log("package get",result)
        res.json(result)
      })
      app.get('/booking',async(req,res)=>{
        const coursor=bookingCollection.find({})
        const result=await coursor.toArray();
        res.send(result);
      })

      app.post('/booking',async( req,res)=>{
        const bookingInfo=req.body;
        const result=await bookingCollection.insertOne(bookingInfo);
        console.log("added successful",result)  
        // console.log(bookingInfo)
        res.json(result);
       })
      app.post('/packages',async( req,res)=>{
        const newpackage=req.body;
        const result=await packageCollection.insertOne(newpackage);
        console.log("added successful",result)  
        // console.log(bookingInfo)
        res.json(result);
       })
      
       app.delete('/packages/:id',async(req,res)=>{
        const id=req.params.id;
        console.log(id);
        const query={_id:ObjectId(id)}
        const result=await packageCollection.deleteOne(query);
        console.log("deleting user with id",result);
        res.json(result);
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
  console.log(`Example app listening at Port:${port}`)
})