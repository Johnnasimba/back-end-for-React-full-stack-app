const express = require('express');
const bodyParser = require('body-parser')

const articleInfo = {
    'learn-react': {
        upvotes: 0,
        comments: []
    },
    'learn-node': {
        upvotes: 0,
        comments:[]
    },
    'my-thoughts-on-resumes': {
        upvotes: 0,
        comments: []
    }
}



const app = express();
const PORT = 8000;
app.use(bodyParser.json())
app.post('/api/articles/:name/upvote', (req, res) => {
    const articleName = req.params.name
    const newUpvotes = articleInfo[articleName].upvotes += 1;
    res.status(200).send(`${articleName} now has ${newUpvotes} upvotes`)
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