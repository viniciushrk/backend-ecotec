"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../middleware/ensureAuthenticated"));

var _itensReciclaveisController = _interopRequireDefault(require("../controller/itensReciclaveisController"));

var _storage = _interopRequireDefault(require("../config/storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const itensReciclaveisRouter = (0, _express.Router)();
itensReciclaveisRouter.get('/', _itensReciclaveisController.default.all);
itensReciclaveisRouter.get('/:id', _itensReciclaveisController.default.get); // itensReciclaveisRouter.get('/filter', itensReciclaveisController.getByDescriptionOrUser)

itensReciclaveisRouter.patch('/:path', _itensReciclaveisController.default.patchImage);
itensReciclaveisRouter.use(_ensureAuthenticated.default);
itensReciclaveisRouter.post('/:id', _storage.default.single("imagem"), _itensReciclaveisController.default.uploadImage);
itensReciclaveisRouter.post('/', _itensReciclaveisController.default.store);
itensReciclaveisRouter.delete('/:id', _itensReciclaveisController.default.delete);
var _default = itensReciclaveisRouter;
exports.default = _default;