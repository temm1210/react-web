var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('config/index');
var Member = require('models/Member');

module.exports = function(passport) {
   
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secretKey;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        const { data:username } = jwt_payload;

        Member.findOne({username}, (err, user) => {
            console.log('user:',user)
            if(err) return done(err, false);
            if(user) done(null,user);
            else done(null,false);
        });    
    }));
}