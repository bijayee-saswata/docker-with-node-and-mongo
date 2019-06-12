const express = require('express');
const mongoose = require('mongoose');
const bodyparse = require('body-parser');
const mongodb = require('mongodb');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('./public'));
var parser = bodyparse.urlencoded({extended: false});


mongoose.connect('mongodb://uid:ups@ds259253.mlab.com:59253/docker')
.then(() => console.log("database connected"))
.catch(err => console.log(err));

const schema =new  mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    date : {
        type: Date,
        default: Date.now
    }
});

var name = mongoose.model('item', schema);


app.get('/', (req,res) => {
    name.find()
        .then(items => res.render('index', {items}))
        .catch(err => res.status(404).json({msg: 'No items found'}));
        
    });
    

app.post('/item/add', parser , (req,res) => {
    const newItem = new name({
        name: req.body.name
    });
    newItem.save().then(items => res.redirect('/'));
})

app.listen(3000, () => console.log("server running.."));
