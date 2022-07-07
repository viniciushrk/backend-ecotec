"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ensureAuthenticated;
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("../config/auth"));
var _AppError = _interopRequireDefault(require("../errors/AppError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    console.log('auth', authHeader);
    if (!authHeader) {
        throw new _AppError.default('JWT token is missing', 401);
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
        const { sub } = decoded; // Forçando que o decode é do tipo TokenPayload
        request.user = {
            id: sub
        };
        return next();
    }
    catch (err) {
        throw new _AppError.default('Invalid JWT', 401);
    }
}
