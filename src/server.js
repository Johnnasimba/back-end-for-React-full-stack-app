const express = require('express');
const bodyParser = require('body-parser')

const articleInfo = {
    'learn-react': {
        upvotes: 0
    },
    'learn-node': {
        upvotes: 0
    },
    'my-thoughts-on-resumes': {
        upvotes:0
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


app.listen(PORT, () => {
    console.log(` Server Listening on Port ${PORT}`)
})