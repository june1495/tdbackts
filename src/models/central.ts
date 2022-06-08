import { getModelForClass } from '@typegoose/typegoose'
import { Product } from './product'
import { User } from './user'

export const ProductModel = getModelForClass(Product)
export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
})
