import { prop, Ref } from '@typegoose/typegoose'
import { User } from '../user'

export class Product {
  @prop({ required: true })
  public product: string

  @prop({ required: true })
  public category: string

  @prop({ required: true })
  public ubication: string

  @prop({ required: true })
  public price: number

  @prop({ ref: () => User, type: () => String })
  public user: Ref<User, string>
}

// const UserProduct = getModelForClass(Product, {
//   schemaOptions: { timestamps: true },
// })
// export default UserProduct
