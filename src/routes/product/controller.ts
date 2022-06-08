/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ProductModel as Product,
  UserModel as User,
} from '../../models/central'
import { Request, Response } from 'express'

const createProduct = async (req: Request, res: Response) => {
  const { body } = req
  const userId: any = req.user
  const newProduct = new Product({ ...body, user: userId._id })
  const user = await User.findById(userId._id)

  try {
    const savedProduct = await newProduct.save()
    await user?.products.push(newProduct)
    await user?.save()
    res.status(200).json(savedProduct)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getProductById = async (req: Request, res: Response) => {
  const userId: any = req.user
  try {
    const data = await User.findById(userId._id)
      .select('-__v')
      .populate('products')
    res.json({ data })
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
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json('deleted')
  } catch (error) {
    res.status(500).json(error)
  }
}

export { createProduct, getProductById, updateById, deleteById }
