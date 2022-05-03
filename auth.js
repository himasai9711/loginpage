const  Passport  = require('passport');
const serializeUser = require('passport/lib');
const dotenv = require('dotenv');
dotenv.config();

var GOOGLE_CLIENT_ID='998050338194-gvs4fu3d1gj4iesc48i2defutskgk43p.apps.googleusercontent.com'

const GoogleStrategy = require('passport-google-oauth2').Strategy;
Passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:500/google/callback",
    passReqToCallback: true
},
function(request,accessToken,refreshToken,profile,done){

        return done(null,profile)

}
));
Passport.serializeUser(function(user,done){
    done(null,user);
})
Passport.deserializeUser(function(user,done){
    done(null,user);
})



// console.log(`Your port is ${process.env.PORT}`); // undefined
