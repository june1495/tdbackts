"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.ProductModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const product_1 = require("./product");
const user_1 = require("./user");
exports.ProductModel = (0, typegoose_1.getModelForClass)(product_1.Product);
exports.UserModel = (0, typegoose_1.getModelForClass)(user_1.User, {
    schemaOptions: { timestamps: true },
});
