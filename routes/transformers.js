var express = require('express');
const transformersModel = require('../models/transformersModel');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    var transformers = await transformersModel.find();
    // res.render(transformers); 
    res.render('transformers/index', {transformers : transformers})
});

router.get('/detail/:id', async(req, res) => {
    var id = req.params.id;
    var transformers = await transformersModel.findById(id);
    res.render('transformers/detail', {
        transformers : transformers
    })
})

router.get('/delete/:id', async(req, res) => {
    var id = req.params.id;
    await transformersModel.findByIdAndDelete(id);
    console.log('Delete transformers successed!');
    res.redirect('/transformers');
})

//hiển thị form (GET)
router.get('/add', (req, res) =>{
    //render ra file: views/employee/add.hbs
    res.render('transformers/add')
})

//hiển thị dữ liệu từ form (POST)
router.post('/add', async(req, res) => {
    var transformers = req.body;
    await transformersModel.create(transformers);
    console.log('Add transformers successed');
    res.redirect('/transformers')
})

router.get('/edit/:id', async(req, res) => {
    var id = req.params.id;
    var transformers = await transformersModel.findById(id);
    res.render('transformers/edit', {
        transformers : transformers
    })
})

//hiển thị dữ liệu từ form (POST)
router.post('/edit/:id', async(req, res) => {
    var id = req.params.id;
    var transformers = req.body;
    await transformersModel.findByIdAndUpdate(id, transformers);
    console.log('Update successed');
    res.redirect('/transformers');
})

module.exports = router;
