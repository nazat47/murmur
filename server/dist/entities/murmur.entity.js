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
exports.Murmur = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Murmur = class Murmur {
};
exports.Murmur = Murmur;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Murmur.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: "varchar",
        length: 100,
    }),
    __metadata("design:type", String)
], Murmur.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: "text",
    }),
    __metadata("design:type", String)
], Murmur.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.murmurs, {
        eager: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", user_entity_1.User)
], Murmur.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, { cascade: true, eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Murmur.prototype, "likedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Murmur.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Murmur.prototype, "updatedAt", void 0);
exports.Murmur = Murmur = __decorate([
    (0, typeorm_1.Entity)()
], Murmur);
//# sourceMappingURL=murmur.entity.js.map