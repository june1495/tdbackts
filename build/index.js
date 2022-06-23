"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/space-before-function-paren */
const express_1 = __importStar(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./config/passport"));
const auth_1 = __importDefault(require("./routes/auth/auth"));
const product_1 = __importDefault(require("./routes/product/product"));
const pdf_1 = __importDefault(require("./routes/pdf/pdf"));
const app = (0, express_1.default)();
const PORT = 3000;
dotenv_1.default.config();
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const url = (_a = process.env.MONGO_URL) !== null && _a !== void 0 ? _a : 'whate';
mongoose_1.default
    .connect(url)
    .then(() => {
    console.log('Db Connection successfull');
})
    .catch((err) => console.log(err));
// MIDDLEWARES
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use((0, express_1.urlencoded)({ extended: false }));
app.use(express_1.default.json()); // MIDDLEWARE QUE TRANSFORMA LA REQ.BODY A UN JSON
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
// ROUTES
app.use('/api/v1', auth_1.default); // ROUTE FOR AUTH
app.use('/api/v1', product_1.default); // ROUTE FOR PRODUCTS
app.use('/api/v1', pdf_1.default); // ROUTE FOR PDF
// SERVER
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
