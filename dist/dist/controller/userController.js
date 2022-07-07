"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createUserServicec = _interopRequireDefault(require("../services/createUserServicec"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = {
    async create(request, response) {
        const { nome, email, senha, telefone } = request.body;
        await _createUserServicec.default.execute({
            nome: nome,
            email: email,
            senha: senha,
            telefone: telefone
        });
        return response.json({
            message: "Usuário criado com sucesso."
        });
    }
};
exports.default = _default;
