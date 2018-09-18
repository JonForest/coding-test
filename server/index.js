const express = require('express')
const fs = require('fs')
const { getTopWords } = require('./utils/tags')
const app = express()
const rootPostDir = './server/assets/posts'


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/post/:slug', function (req, res) {
  const contents = fs.readFileSync(`${rootPostDir}/${req.params.slug}.md`, 'utf8')
  const sections = contents.split('===').filter(item => !!item)
  res.json({
    post: {
      content: sections[1],
      tags: getTopWords(sections[1])
    }
  })
})

app.get('/posts', function (req, res) {
  const files = fs.readdirSync(rootPostDir, 'utf8')
  const posts = files.map(fileName => {
    const contents = fs.readFileSync(`${rootPostDir}/${fileName}`, 'utf8')
    const headerBlock = contents.split('===').filter(item => !!item)[0]
    const pairs = headerBlock.split('\n').filter(item => !!item)

    return {
      title: pairs[0].split(':')[1].trim(),
      slug: pairs[2].split(':')[1].trim()
    }
  })
  res.json(posts)
})
 
app.listen(3000, function () {
  console.log('Dev app listening on port 3000!');
})