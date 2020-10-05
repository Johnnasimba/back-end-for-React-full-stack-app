const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;



/* const url = "mongodb+srv://JOHN:0995816060@cluster0.bfy6i.mongodb.net/Articles?retryWrites=true&w=majority";


MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    console.log("you are connected to the database");
    const query = db.db('Articles')
    query.collection("articleList").find({}).toArray( (err, result)=> {
        if (err) throw err;
        console.log(result);
        db.close();
    })
   
  }); */






const app = express();
const PORT = 8000;
app.use(bodyParser.json())


app.get('/api/articles/:name', async (req, res) => {
    try {
    const url = "mongodb+srv://JOHN:0995816060@cluster0.bfy6i.mongodb.net/Articles?retryWrites=true&w=majority";

    const articleName = req.params.name
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

        
    const query = client.db('Articles')
    const articleInfo = await query.collection("articleList").findOne({ name: articleName })
    res.status(200).json(articleInfo);
    client.close();  
    } catch (error) {
        res.status(500).json({message: 'Error connecting to db', error})
    }
        

})



app.post('/api/articles/:name/upvote', async (req, res) => {

    try {
    const url = "mongodb+srv://JOHN:0995816060@cluster0.bfy6i.mongodb.net/Articles?retryWrites=true&w=majority";
    const articleName = req.params.name
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });        
    const db = client.db('Articles') 
    const articleInfo = await db.collection("articleList").findOne({ name: articleName });
    await db.collection("articleList").updateOne({ name: articleName },
        {
            '$set': {
                upvotes: articleInfo.upvotes + 1,
            },
        });
    const updatedArticleInfo = await db.collection("articleList").findOne({ name: articleName });
    res.status(200).json(updatedArticleInfo);

    client.close();
        
    } catch (error) {
        res.status(500).json({message: 'Error connecting to db', error}) 
        console.log(error);
    }
    
})



app.post('/api/articles/:name/add-comment', (req, res) => {
    const { name, text } = req.body
    const articleName = req.params.name
    articleInfo[articleName].comments.push({ name, text });
    res.status(200).send(articleInfo[articleName])

}) 


app.listen(PORT, () => {
    console.log(` Server Listening on Port ${PORT}`)
})