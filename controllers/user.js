const {User} = require('../models/user');
const {v4: uuidv4} = require('uuid');
const {setUser} = require('../service/auth');

async function handelUserSignup(req,res){

  const { username, password } = req.body;


  await User.create({ 
    username, 
    password 
  });

  //since working with ejs
  return res.redirect("/")

}
async function handelUserSignin(req,res){

  const { username, password } = req.body;

  const user = await User.findOne({ 
    username,
    password
  });


  if(!user){
    return res.status(400).render('signin', {
      error: 'Invalid username or password',
    });
  }

  const sessionId = uuidv4();
  setUser(sessionId, user);

  res.cookie('uid', sessionId);


  // since working with ejs
  return res.redirect("/")

}


module.exports = {
  handelUserSignup,
  handelUserSignin
};