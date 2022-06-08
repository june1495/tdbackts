import { prop, Ref } from '@typegoose/typegoose'
import { Product } from '../product'
export class User {
  @prop({ required: true })
  public username: string

  @prop({ required: true })
  public password: string

  @prop({ required: true, unique: true })
  public email: string

  @prop({ ref: () => Product })
  public products: Array<Ref<Product>>
}

// const UserModel = getModelForClass(UserClass, {
//   schemaOptions: { timestamps: true },
// })
// export default UserModel
