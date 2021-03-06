/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { UserModel as User } from '../../models/central'
const getAllUsers = async (_req: any, res: any) => {
  try {
    const getUsers = await User.find({}).sort({ date: -1 }).select('-__V')
    res.status(200).json(getUsers)
  } catch (error) {
    console.log(error)
  }
}

export { getAllUsers }
