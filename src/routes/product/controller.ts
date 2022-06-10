/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ProductModel as Product,
  UserModel as User,
} from '../../models/central'
import { Request, Response } from 'express'

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json(error)
  }
}

const createProduct = async (req: Request, res: Response) => {
  const { body } = req
  // console.log(req.headers)
  const userId: any = req.headers.user
  const newProduct = new Product({ ...body, user: userId })
  const user = await User.findById(userId)

  try {
    const savedProduct = await newProduct.save()
    await user?.products.push(newProduct)
    await user?.save()
    res.status(200).json(savedProduct)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getProducts = async (req: Request, res: Response) => {
  const userId: any = req.headers.user
  try {
    const data = await User.findById(userId).select('-__v').populate('products')
    // console.log(data?.products)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}

const updateById = async (req: Request, res: Response) => {
  const { body } = req

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: body,
      },
      { new: true },
    )
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteById = async (req: Request, res: Response) => {
  const id = req.headers.id
  // const userId = req.headers.userid
  try {
    await Product.findByIdAndDelete(id)
    // const user = await User.findById(userId)
    // const ans = await user?.products
    // await user?.products.splice(0)
    // await user?.save()
    // console.log(user)
    // console.log(user?.products.indexOf(id))
    res.status(200).json('deleted')
  } catch (error) {
    res.status(500).json(error)
  }
}

export { createProduct, getProducts, updateById, deleteById, getProductById }
