"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenReset = exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).send({ message: "Authorization failed, token is missing" });
        return;
    }
    req.path;
    (0, jsonwebtoken_1.verify)(token, config_1.JWT_SECRET, (err, payload) => {
        if (err) {
            if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                res.status(401).send({ message: "Token expired" });
            }
            else {
                res.status(401).send({ message: "Invalid token" });
            }
        }
        res.locals.user = payload;
        next();
    });
};
exports.verifyToken = verifyToken;
const verifyTokenReset = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).send({ message: "Authorization failed, token is missing" });
        return;
    }
    (0, jsonwebtoken_1.verify)(token, config_1.JWT_SECRET_FORGOT_PASSWORD, (err, payload) => {
        if (err) {
            if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                res.status(401).send({ message: "Token expired" });
            }
            else {
                res.status(401).send({ message: "Invalid token" });
            }
        }
        res.locals.user = payload;
        next();
    });
};
exports.verifyTokenReset = verifyTokenReset;
