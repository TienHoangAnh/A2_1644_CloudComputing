var express = require('express');
const adminpageModel = require('../models/adminpageModel');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    var adminpages = await adminpageModel.find();
    // res.render(adminpages); 
    res.render('adminpage/index', { adminpages: adminpages })
});

router.get('/detail/:id', async (req, res) => {
    var id = req.params.id;
    var adminpage = await adminpageModel.findById(id);
    res.render('adminpage/detail', {
        adminpage: adminpage
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
    var adminpage = req.body;
    await adminpageModel.create(adminpage);
    console.log('Add adminpage successed');
    res.redirect('/adminpage')
})

router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var adminpage = await adminpageModel.findById(id);
    res.render('adminpage/edit', {
        adminpage: adminpage
    })
})

//hiển thị dữ liệu từ form (POST)
router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var adminpage = req.body;
    await adminpageModel.findByIdAndUpdate(id, adminpage);
    console.log('Update successed');
    res.redirect('/adminpage');
})

router.post('/search', async (req, res) => {
    var keyword = req.body.name;
    //relative search
    var adminpages = await adminpageModel.find({ name: new RegExp(keyword, "i") });
    res.render('adminpage/index', { adminpages: adminpages });
})

router.get('/nameasc', async (req, res) => {
    //1: ascending,  -1: descending
    var adminpages = await adminpageModel.find().sort({ name: 1 });
    res.render('adminpage/index', { adminpages: adminpages });
})

router.get('/namedesc', async (req, res) => {
    var adminpages = await adminpageModel.find().sort({ name: -1 });
    res.render('adminpage/index', { adminpages: adminpages });
})
module.exports = router;
