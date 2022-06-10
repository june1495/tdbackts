/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { UserModel as User } from '../../models/central'
import { Request, Response } from 'express'
import cryptoJs from 'crypto-js'
import jwt from 'jsonwebtoken'

// CREATE TOKEN FUNCTION FOR AUTH
const jwtToken = process.env.JWT_SEC ?? 'jwt'
function createToken(user: any) {
  return jwt.sign({ id: user._id, email: user.email }, jwtToken, {
    expiresIn: 86400,
  })
}

const register = async (req: Request, res: Response) => {
  const { username, email } = req.body
  const secretPass: string = process.env.PASS_SEC ?? 'whatever'

  try {
    let user = await User.findOne({ email })
    if (user !== null) {
      return res.json({
        msg: 'The user already exists',
      })
    }
    user = new User({
      username,
      email,
      password: cryptoJs.AES.encrypt(req.body.password, secretPass).toString(),
    })
    await user.save()
    res.status(200).json({
      id: user._id,
      email: user.email,
    })
  } catch (err) {
    res.status(500).json(err)
  }
}

const login = async (req: Request, res: Response) => {
  const { body } = req

  const secretPass = process.env.PASS_SEC ?? 'whatever'
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user == null) {
      return res.status(400).json({ msg: 'The user does not exists' })
    }

    const hashedPassword = cryptoJs.AES.decrypt(user.password, secretPass)
    const originalPassword = hashedPassword.toString(cryptoJs.enc.Utf8)
    // originalPassword !== body.password &&
    //   res.status(401).json('Wrong credentials')
    if (originalPassword === body.password) {
      res.status(200).json({
        id: user._id,
        name: user.username,
        email: user.email,
        token: createToken(user),
      })
    } else {
      res.status(400).json('email or password incorectr')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
export { register, login }
