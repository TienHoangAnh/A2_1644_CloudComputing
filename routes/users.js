var express = require('express');
const userModel = require('../models/userModel');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/detail/:id', async (req, res) => {
  var id = req.params.id;
  var user = await userModel.findById(id);
  res.render('user/detail', {
      user: user
  })
})

router.get('/delete/:id', async (req, res) => {
  var id = req.params.id;
  await userModel.findByIdAndDelete(id);
  console.log('Delete user successed!');
  res.redirect('/user');
})

//hiển thị form (GET)
router.get('user/signup', (req, res) => {
  //render ra file: views/employee/add.hbs
  res.render('user/signup')
})

//hiển thị dữ liệu từ form (POST)
router.post('/add', async (req, res) => {
  var user = req.body;
  await userModel.create(user);
  console.log('Add user successed');
  res.redirect('/user')
})

router.get('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var user = await userModel.findById(id);
  res.render('user/edit', {
      user: user
  })
})

//hiển thị dữ liệu từ form (POST)
router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var user = req.body;
  await userModel.findByIdAndUpdate(id, user);
  console.log('Update successed');
  res.redirect('/user');
})

router.post('/search', async (req, res) => {
  var keyword = req.body.name;
  //relative search
  var users = await userModel.find({ name: new RegExp(keyword, "i") });
  res.render('user/index', { users: users });
})

router.get('/nameasc', async (req, res) => {
  //1: ascending,  -1: descending
  var users = await userModel.find().sort({ name: 1 });
  res.render('user/index', { users: users });
})

router.get('/namedesc', async (req, res) => {
  var users = await userModel.find().sort({ name: -1 });
  res.render('user/index', { users: users });
})

module.exports = router;
