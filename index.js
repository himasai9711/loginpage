const express = require('express')
const  append  = require('express/lib/response')
const session = require('express-session')
const dotenv = require('dotenv');
const passport = require('passport');
const app = express()
app.use(session({secret:'cat'}));

app.use(passport.initialize())
app.use(passport.session())

require('./auth');
dotenv.config();
function isLoggedIn(req,res,next){
    req.user? next(): res.sendStatus(401)

}


app.get('/',(req,res)=>{
    res.send('<a href="/auth/google"> Authenticate with google</a>')
})
app.get('/auth/google',
  passport.authenticate('google',{scope:['email','profile']})
)
app.get('/google/callback',
passport.authenticate('google',{
    successRedirect:'/protected',
    failureRedirect:'/auth/failure',
})
);
app.get('/auth/failure',(req,res)=>{
    res.send('something went wrong...')
})

app.get('/protected',isLoggedIn,(req,res)=>{
    res.send(`hello ${req.user.displayName}`);
})
app.get('/logout',(req,res)=>{
    req.logout();
    req.session.destroy();
    res.send('goodbyee...');
})
app.listen(process.env.PORT,()=>console.log(`Your port is ${process.env.PORT}`))