var express = require('express');
const ironmanModel = require('../models/ironmanModel');
const transformersModel = require('../models/transformersModel');
const adminpageModel = require('../models/adminpageModel');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    var ironman = await ironmanModel.find();
    var transformers = await transformersModel.find();
    res.render('adminpage/index', { ironman : ironman, transformers: transformers  })
    // var combinedData = await adminpageModel.find();
    // res.render('adminpage/index', {combinedData: combinedData})
});

router.get('/detail/:id', async (req, res) => {
    var id = req.params.id;
    var ironman = await ironmanModel.findById(id);
    var transformers = await transformersModel.findById(id);

    res.render('adminpage/detail', {
        ironman: ironman,
        transformers: transformers
    })
})

router.get('/delete/:id', async (req, res) => {
    var id = req.params.id;
    await adminpageModel.findByIdAndDelete(id);
    console.log('Delete adminpage successed!');
    res.redirect('/adminpage');
})

//hiển thị form (GET)
router.get('/add', (req, res) => {
    //render ra file: views/employee/add.hbs
    res.render('adminpage/add')
})

//hiển thị dữ liệu từ form (POST)
router.post('/add', async (req, res) => {
    // var adminpage = req.body;
    // await adminpageModel.create(adminpage);

    var ironman = req.body;
    var transformers = req.body;

    await ironmanModel.create(ironman);
    await transformersModel.create(transformers);

    console.log('Added New Products Successfully');
    res.redirect('/adminpage')
})

router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    // var adminpage = await adminpageModel.findById(id);
    // res.render('adminpage/edit', { adminpage: adminpage })

    var ironman = await ironmanModel.findById(id);
    var transformers = await transformersModel.findById(id);

    console.log('Successfully Edited Product Information');
    res.render('adminpage/edit', { ironman: ironman, transformers: transformers })
})

router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    // var adminpage = req.body;
    // await adminpageModel.findByIdAndUpdate(id, adminpage);

    var ironman = await ironmanModel.findById(id);
    var transformers = await transformersModel.findById(id);
    await ironmanModel.findByIdAndUpdate(id, ironman);
    await transformersModel.findByIdAndUpdate(id, transformers);

    console.log('Updated Product Information Successfully!');
    res.redirect('/adminpage');
})

router.post('/search', async (req, res) => {
    var keyword = req.body.name;
    //relative search
    // var adminpages = await adminpageModel.find({ name: new RegExp(keyword, "i") });
    var ironman = await ironmanModel.find({ name: new RegExp(keyword, "i") });
    var transformers = await transformersModel.find({ name: new RegExp(keyword, "i") });
    res.render('adminpage/index', { ironman: ironman, transformers: transformers });
})

router.get('/nameasc', async (req, res) => {
    //1: ascending,  -1: descending
    // var adminpages = await adminpageModel.find().sort({ name: 1 });

    var ironman = await ironmanModel.find().sort({ name: 1 });
    var transformers = await transformersModel.find().sort({ name: 1 });

    res.render('adminpage/index', { ironman: ironman, transformers: transformers });
})

router.get('/namedesc', async (req, res) => {
    // var adminpages = await adminpageModel.find().sort({ name: -1 });

    var ironman = await ironmanModel.find().sort({ name: -1 });
    var transformers = await transformersModel.find().sort({ name: -1 });

    res.render('adminpage/index', { ironman: ironman, transformers: transformers });
})

module.exports = router;