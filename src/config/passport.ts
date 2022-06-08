/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import { UserModel as User } from '../models/central'
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'jwt',
}

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findById(payload.id)

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (user) {
      return done(null, user)
    }
    return done(null, false)
  } catch (error) {
    console.log(error)
  }
})
