"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPdf = void 0;
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const templatepdf_1 = __importDefault(require("../../utils/templatepdf"));
const html_pdf_1 = __importDefault(require("html-pdf"));
const options = {
    format: 'A4',
    orientation: 'portrait',
};
const createPdf = (req, res) => {
    console.log(req.body);
    const date = new Date().toISOString();
    const datereg = date.slice(0, 13);
    const sec = new Date().getMilliseconds();
    const { product, category, ubication, price, user } = req.body;
    html_pdf_1.default
        .create((0, templatepdf_1.default)(product, category, ubication, price, user), options)
        .toFile(`./src/pdfsgenerated/${datereg}${sec}_test.pdf`, (err, res) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        err && console.log(err);
        return console.log(res);
    });
    return res.json({ filename: `${datereg}${sec}_test.pdf` });
};
exports.createPdf = createPdf;
