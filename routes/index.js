var express = require('express');
const userModel = require('../models/userModel');
const ironmanModel = require('../models/ironmanModel');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
  // res.redirect('/student')
});

router.get('/', async (req, res, next) => {
  var ironman = await ironmanModel.find();
  // res.render(ironman); 
  res.render('../index', {ironman : ironman})
});


router.get('/login', function (req, res, next) {
  res.render('user/login');
  // res.redirect('/student')
});

router.get('/signup', function (req, res, next) {
  res.render('user/signup');
});

//hiển thị dữ liệu từ form (POST)
router.post('/user/signup', async (req, res) => {
  const user = req.body;
  
  // Kiểm tra xem các trường thông tin đã được nhập hay chưa
  if (!user.fname || !user.lname || !user.username || !user.password || !user.confirmPassword) {
    res.send("<script>alert('Vui lòng nhập đủ thông tin đăng ký');history.back();</script>");
    return;
  }

  // Kiểm tra xác nhận mật khẩu
  if (user.password !== user.confirmPassword) {
    res.send("<script>alert('Mật khẩu và xác nhận mật khẩu không khớp');history.back();</script>");
    return;
  }

  // Tiến hành tạo tài khoản nếu thông tin hợp lệ
  await userModel.create(user);
  console.log('Sign up successed');
  res.redirect('/login');
});

router.post('/', async (req, res) => {
  // Lấy dữ liệu từ form login
  const username = req.body.username;
  const password = req.body.password;

  // Lấy dữ liệu từ db
  const users = await userModel.find();
  let login = false;
  

  //cách 1
  // var login = await userModel.findOne({
  //   username: req.body.username,
  //   password: req.body.password
  // })

  //cách 2
  for (let i = 0; i < users.length; i++) {
    if (username === users[i].username && password === users[i].password) {
      login = true;
      if (username === "admin") {
        // Nếu đăng nhập bằng tài khoản admin và mật khẩu đúng, chuyển đến trang quản lý của admin
        res.redirect('adminpage');
      } else {
        // Ngược lại, chuyển đến trang khách hàng
        res.redirect('/');
      }
      break;
    }
  }

  if (!login) {
    res.send("<script>alert('Sai tài khoản hoặc mật khẩu');history.back();</script>");
  }
});

module.exports = router;
