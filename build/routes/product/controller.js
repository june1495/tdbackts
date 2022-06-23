"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.deleteById = exports.updateById = exports.getProducts = exports.createProduct = void 0;
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const central_1 = require("../../models/central");
// import mongoose from 'mongoose'
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield central_1.ProductModel.findById(req.params.id);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { body } = req;
    // console.log(req.headers)
    const userId = req.headers.user;
    const newProduct = new central_1.ProductModel(Object.assign(Object.assign({}, body), { user: userId }));
    const user = yield central_1.UserModel.findById(userId);
    try {
        const savedProduct = yield newProduct.save();
        yield ((_a = user === null || user === void 0 ? void 0 : user.products) === null || _a === void 0 ? void 0 : _a.push(newProduct));
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(200).json(savedProduct);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers.user;
    try {
        const data = yield central_1.UserModel.findById(userId).select('-__v').populate('products');
        // console.log(data?.products)
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getProducts = getProducts;
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const updatedProduct = yield central_1.ProductModel.findByIdAndUpdate(req.params.id, {
            $set: body,
        }, { new: true });
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateById = updateById;
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.headers;
    try {
        const product = yield central_1.ProductModel.findByIdAndDelete(id);
        const userId = (_b = product === null || product === void 0 ? void 0 : product.user) === null || _b === void 0 ? void 0 : _b.toString();
        yield central_1.UserModel.findOneAndUpdate({ _id: userId }, {
            $pull: {
                products: id,
            },
        }, { new: true });
        res.status(200).json('deleted');
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.deleteById = deleteById;
