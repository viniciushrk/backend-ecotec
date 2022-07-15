"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getImage;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getImage(caminho) {
  try {
    const filePath = _path.default.join(__dirname, '..', '..', 'uploads', caminho);

    console.log(__dirname);

    const f = _fs.default.readFileSync(filePath, {
      encoding: 'base64'
    });

    return f ?? null;
  } catch {
    return null;
  }
}