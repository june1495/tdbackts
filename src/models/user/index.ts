import { prop, getModelForClass } from '@typegoose/typegoose'

export class UserClass {
  @prop({ required: true })
  username: string

  @prop({ required: true })
  password: string

  @prop({ required: true, unique: true })
  email: string
}

const UserModel = getModelForClass(UserClass, {
  schemaOptions: { timestamps: true },
})
export default UserModel
