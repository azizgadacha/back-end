const { ExtractJwt, Strategy  }= require( 'passport-jwt');
const User =require('../model/user');

function  Passport (pass)  {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: process.env.SECRET,
    };

    pass.use(
        new Strategy(opts, async (jwtPayload, done) => {
            try {

                const user = await User.findOne(jwtPayload._doc._id);

                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (err) {
                return done(err, false);
            }
        }),
    );
};
module.exports=Passport