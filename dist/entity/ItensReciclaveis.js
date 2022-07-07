"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let ItensReciclaveis = (_dec = (0, _typeorm.Entity)("ItensReciclaveis"), _dec2 = (0, _typeorm.ObjectIdColumn)(), _dec3 = Reflect.metadata("design:type", typeof _typeorm.ObjectID === "undefined" ? Object : _typeorm.ObjectID), _dec4 = (0, _typeorm.ObjectIdColumn)(), _dec5 = Reflect.metadata("design:type", typeof _typeorm.ObjectID === "undefined" ? Object : _typeorm.ObjectID), _dec6 = (0, _typeorm.Column)(), _dec7 = Reflect.metadata("design:type", String), _dec8 = (0, _typeorm.Column)(), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.Column)(), _dec11 = Reflect.metadata("design:type", typeof Array === "undefined" ? Object : Array), _dec12 = (0, _typeorm.Column)(), _dec13 = Reflect.metadata("design:type", String), _dec14 = (0, _typeorm.Column)(), _dec15 = Reflect.metadata("design:type", typeof _typeorm.ObjectID === "undefined" ? Object : _typeorm.ObjectID), _dec16 = (0, _typeorm.Column)(), _dec17 = Reflect.metadata("design:type", typeof _typeorm.ObjectID === "undefined" ? Object : _typeorm.ObjectID), _dec18 = (0, _typeorm.Column)(), _dec19 = Reflect.metadata("design:type", Number), _dec20 = (0, _typeorm.Column)(), _dec21 = Reflect.metadata("design:type", Object), _dec22 = (0, _typeorm.CreateDateColumn)(), _dec23 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec24 = (0, _typeorm.UpdateDateColumn)(), _dec25 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = (_class2 = class ItensReciclaveis {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "_id", _descriptor2, this);

    _initializerDefineProperty(this, "nome", _descriptor3, this);

    _initializerDefineProperty(this, "descricao", _descriptor4, this);

    _initializerDefineProperty(this, "itens", _descriptor5, this);

    _initializerDefineProperty(this, "imagem", _descriptor6, this);

    _initializerDefineProperty(this, "user_id", _descriptor7, this);

    _initializerDefineProperty(this, "categoria_id", _descriptor8, this);

    _initializerDefineProperty(this, "preco", _descriptor9, this);

    this.preco_format = void 0;

    _initializerDefineProperty(this, "user", _descriptor10, this);

    _initializerDefineProperty(this, "created_at", _descriptor11, this);

    _initializerDefineProperty(this, "update_at", _descriptor12, this);
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_id", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nome", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "descricao", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "itens", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "imagem", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "user_id", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "categoria_id", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "preco", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "update_at", [_dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
var _default = ItensReciclaveis;
exports.default = _default;