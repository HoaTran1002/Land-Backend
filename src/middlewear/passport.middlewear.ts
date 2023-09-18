import passport from 'passport'
import passportGoogle from 'passport-google-oauth20'
import { env } from '~/config/env'
const GoogleStrategy = passportGoogle.Strategy
console.log('100000')
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const s = 2
        console.log(s)
        console.log('Access token:', accessToken)
        console.log('Refresh token:', refreshToken)
        console.log('Profile:', profile)
        console.log('2')
        // Trong phần này, bạn có thể xử lý thông tin profile và lưu nó vào cơ sở dữ liệu nếu cần.
        // Ví dụ:
        // const user = await User.findOne({ googleId: profile.id });
        // if (!user) {
        //   const newUser = new User({
        //     googleId: profile.id,
        //     name: profile.displayName,
        //   });
        //   await newUser.save();
        // }

        // Gọi done() để hoàn tất quá trình xác thực
        done(null, profile)
      } catch (error: any) {
        done(error, false)
      }
    }
  )
)

export default passport
