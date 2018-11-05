const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const questionRouter = require('routes/questionRoute');
const upload = require('routes/upload');
const auth = require('routes/auth');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blog",{useNewUrlParser: true}).then(() => {
    console.log('mongoDB connected')
}).catch((e) => {
    console.error(e);
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/images',express.static('../images'))

app.use(express.static(path.join(__dirname, '../../front-end/build')));
app.use('/question', questionRouter);
app.use('/upload', upload);
app.use('/auth', auth)

app.listen(5000, () => {
    console.log('5000 port listening')
})