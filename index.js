const express = require('express')
const  append  = require('express/lib/response')
const session = require('express-session')
const dotenv = require('dotenv');
const passport = require('passport');
const app = express()

dotenv.config();

app.use(session({secret:'cat'}));

app.use(passport.initialize())
app.use(passport.session())

require('./auth');

app.get('/auth/google',
  passport.authenticate('google',{scope:['email','profile']})
)

app.get('/auth/failure',(req,res)=>{
    res.send('something went wrong...')
})

app.get('/google/callback',
    passport.authenticate('google',{
        successRedirect:'/protected',
        failureRedirect:'/auth/failure',
    }
));

app.get('/',(req,res)=>{
    res.send('<a href="/auth/google"> Authenticate with google</a>')
})

app.get('/upload',(req,res)=>{
    res.sendFile(__dirname + '/views/upload.html')
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


function isLoggedIn(req,res,next){
    req.user? next(): res.sendStatus(401)

}