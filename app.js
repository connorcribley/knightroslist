const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require ('ejs-mate');
const methodOverride = require('method-override');
const University = require('./models/university');

mongoose.connect('mongodb://127.0.0.1:27017/yelpiversity')
// .then(() => {
//     console.log("Mongo connection open")
// })
// .catch(err => {
//     console.log("Mongo connection error")
//     console.log(err)
// })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/universities', async (req, res) => {
    const universities = await University.find({});
    res.render('universities/index', { universities });
});

app.get('/universities/new', (req, res) => {
    res.render('universities/new');
});

app.post('/universities', async (req, res) => {
    const university = new University(req.body.university);
    await university.save();
    res.redirect(`universities/${university._id}`);
});

app.get('/universities/:id', async (req, res) => {
    const university = await University.findById(req.params.id);
    res.render('universities/show', { university });
});

app.get('/universities/:id/edit', async (req, res) => {
    const university = await University.findById(req.params.id);
    res.render('universities/edit', { university });
});

app.put('/universities/:id', async (req, res) => {
    const id = req.params.id;
    const university = await University.findByIdAndUpdate(id, { ...req.body.university })
    res.redirect(`/universities/${university._id}`);
});

app.delete('/universities/:id', async (req, res) => {
    const id = req.params.id;
    await University.findByIdAndDelete(id);
    res.redirect('/universities')
})

app.listen(3000, () => {
    console.log('Serving port 3000');
});