const path = require('path')
const express = require('express')

const app = express()

app.set('view engine', 'hbs')
const publicDirectoryPath = path.join(__dirname, '..', 'public')

app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index')
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is 29. It feels like 25',
        location: 'Alexandria, Egypt'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})