const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const userRoutes = require('./backend/routes/userRoutes')
var util = require('util')
var dbconnect = require('./backend/db/connect');

dbconnect.connect();

app.use(express.static('frontend'))
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   

app.get('/', (req, res) => res.redirect('/pages/index.html'));

app.get('/pages/:pagename', function(req, res){
    res.sendFile(util.format("%s/frontend/htmls/%s", __dirname, req.params.pagename));
})

app.use('/api/users', userRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))