var express = require('express');
const ironmanModel = require('../models/ironmanModel');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    var ironman = await ironmanModel.find();
    // res.render(ironman); 
    res.render('ironman/index', {ironman : ironman})
});

router.get('/detail/:id', async(req, res) => {
    var id = req.params.id;
    var ironman = await ironmanModel.findById(id);
    res.render('ironman/detail', {
        ironman : ironman
    })
})

router.get('/delete/:id', async(req, res) => {
    var id = req.params.id;
    await ironmanModel.findByIdAndDelete(id);
    console.log('Delete ironman successed!');
    res.redirect('/ironman');
})

//hiển thị form (GET)
router.get('/add', (req, res) =>{
    //render ra file: views/employee/add.hbs
    res.render('ironman/add')
})

//hiển thị dữ liệu từ form (POST)
router.post('/add', async(req, res) => {
    var ironman = req.body;
    await ironmanModel.create(ironman);
    console.log('Add ironman successed');
    res.redirect('/ironman')
})

router.get('/edit/:id', async(req, res) => {
    var id = req.params.id;
    var ironman = await ironmanModel.findById(id);
    res.render('ironman/edit', {
        ironman : ironman
    })
})

//hiển thị dữ liệu từ form (POST)
router.post('/edit/:id', async(req, res) => {
    var id = req.params.id;
    var ironman = req.body;
    await ironmanModel.findByIdAndUpdate(id, ironman);
    console.log('Update successed');
    res.redirect('/ironman');

})

module.exports = router;
