"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let ItensReciclaveis = class ItensReciclaveis {
    id;
    _id;
    nome;
    descricao;
    itens;
    imagem;
    user_id;
    categoria_id;
    preco;
    preco_format;
    // @OneToOne(() => Anexos, anexo => anexo.id)
    // @JoinColumn()
    // Image: Anexos;
    user;
    created_at;
    update_at;
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], ItensReciclaveis.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], ItensReciclaveis.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ItensReciclaveis.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ItensReciclaveis.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], ItensReciclaveis.prototype, "itens", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ItensReciclaveis.prototype, "imagem", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", typeorm_1.ObjectID)
], ItensReciclaveis.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", typeorm_1.ObjectID)
], ItensReciclaveis.prototype, "categoria_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ItensReciclaveis.prototype, "preco", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], ItensReciclaveis.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ItensReciclaveis.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ItensReciclaveis.prototype, "update_at", void 0);
ItensReciclaveis = __decorate([
    (0, typeorm_1.Entity)("ItensReciclaveis")
], ItensReciclaveis);
exports.default = ItensReciclaveis;
