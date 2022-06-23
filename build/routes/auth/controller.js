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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const central_1 = require("../../models/central");
const crypto_js_1 = __importDefault(require("crypto-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// CREATE TOKEN FUNCTION FOR AUTH
const jwtToken = (_a = process.env.JWT_SEC) !== null && _a !== void 0 ? _a : 'jwt';
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, jwtToken, {
        expiresIn: 86400,
    });
}
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { username, email } = req.body;
    const secretPass = (_b = process.env.PASS_SEC) !== null && _b !== void 0 ? _b : 'whatever';
    try {
        let user = yield central_1.UserModel.findOne({ email });
        if (user !== null) {
            return res.json({
                msg: 'The user already exists',
            });
        }
        user = new central_1.UserModel({
            username,
            email,
            password: crypto_js_1.default.AES.encrypt(req.body.password, secretPass).toString(),
        });
        yield user.save();
        res.status(200).json({
            id: user._id,
            email: user.email,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { body } = req;
    const secretPass = (_c = process.env.PASS_SEC) !== null && _c !== void 0 ? _c : 'whatever';
    try {
        const user = yield central_1.UserModel.findOne({ email: req.body.email });
        if (user == null) {
            return res.status(400).json({ msg: 'The user does not exists' });
        }
        const hashedPassword = crypto_js_1.default.AES.decrypt(user.password, secretPass);
        const originalPassword = hashedPassword.toString(crypto_js_1.default.enc.Utf8);
        // originalPassword !== body.password &&
        //   res.status(401).json('Wrong credentials')
        if (originalPassword === body.password) {
            res.status(200).json({
                id: user._id,
                name: user.username,
                email: user.email,
                token: createToken(user),
            });
        }
        else {
            res.status(400).json('email or password incorectr');
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.login = login;
