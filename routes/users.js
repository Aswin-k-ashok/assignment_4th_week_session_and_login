var express = require('express');
const { render } = require('../app');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  if(req.session.user){
    res.render('user/home',{user:req.session.user})
  }else{
    res.redirect('/login')
    

  }
  
});
router.get('/login', function(req, res) {
  if(req.session.user){
    res.redirect('/')
  }else{

    res.render('user/login',{err:req.session.err})
    req.session.err=null
  }
  
});
function isValid(formData){
  var response = {}
  const email=formData.email
  const password=formData.password
  const user = {email:"hello@hey.com",password:"asdf"}
  if(email==user.email && password==user.password){
    response.user=user
    response.status=true
  }else{
    response.user=null
    response.status=false
  }
  return response
}

router.post('/login', function(req, res) {

  const response=isValid(req.body)
  if(response.status==true){
    req.session.user=response.user
    req.session.isLogged=true
    res.redirect('/')
  }else{
    req.session.user=null
    req.session.isLogged=false
    req.session.err="invalid user"
    res.redirect('/login')
  }
  
});

router.get('/logout',function(req,res){
  req.session.user=null
  req.session.isLogged=false
  res.redirect('/login')
})



module.exports = router;
