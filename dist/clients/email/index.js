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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var db_1 = require("../db");
var transporter = nodemailer_1.default.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "6b850f9676967a",
        pass: "7d02ac79d2d01d",
    },
});
// async..await is not allowed in global scope, must use a wrapper
function sendEmail(emailProps) {
    return __awaiter(this, void 0, void 0, function () {
        var token, user, info, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 12, , 13]);
                    token = Math.floor(Math.random() * 1000 + 1000);
                    return [4 /*yield*/, db_1.prismaClient.user.findUnique({
                            where: { email: emailProps.email },
                        })];
                case 1:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 6];
                    if (!(emailProps.emailType === "verification")) return [3 /*break*/, 3];
                    return [4 /*yield*/, db_1.prismaClient.verification.update({
                            where: { email: emailProps.email },
                            data: {
                                verifyEmailToken: token,
                            },
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, db_1.prismaClient.verification.update({
                        where: { email: emailProps.email },
                        data: { forgotPasswordToken: token },
                    })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 10];
                case 6:
                    if (!(emailProps.emailType === "verification")) return [3 /*break*/, 8];
                    return [4 /*yield*/, db_1.prismaClient.verification.create({
                            data: {
                                email: emailProps.email,
                                verifyEmailToken: token,
                            },
                        })];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, db_1.prismaClient.verification.create({
                        data: {
                            email: emailProps.email,
                            forgotPasswordToken: token,
                        },
                    })];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [4 /*yield*/, transporter.sendMail({
                        from: '"Fred Foo 👻" <foo@example.com>',
                        to: emailProps.email,
                        subject: "".concat(emailProps.emailType === "verification"
                            ? "Email verification"
                            : "Reset your password"),
                        text: "".concat(emailProps.emailType === "verification"
                            ? "Verify your email"
                            : "Reset you password"),
                        html: "<h1> ".concat("".concat(emailProps.emailType === "verification"
                            ? "your verification token is:"
                            : "Reset password token:"), " ").concat(token, " </h1>"), // html body
                    })];
                case 11:
                    info = _a.sent();
                    console.log("Message sent: %s", info.messageId);
                    return [2 /*return*/, true];
                case 12:
                    e_1 = _a.sent();
                    console.log(e_1.message);
                    return [2 /*return*/, false];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.sendEmail = sendEmail;
