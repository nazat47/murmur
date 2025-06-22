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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationProvider = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let PaginationProvider = class PaginationProvider {
    constructor(request) {
        this.request = request;
    }
    async paginateQuery(paginationQuery, repository, findBy, orderBy) {
        const skip = (paginationQuery.page - 1) * paginationQuery.limit;
        const whereClause = findBy
            ? JSON.parse(findBy)
            : {};
        const results = await repository.find({
            where: whereClause,
            skip,
            take: paginationQuery.limit,
            order: orderBy ? JSON.parse(orderBy) : undefined,
        });
        const totalItems = await repository.count({ where: whereClause });
        const totalPages = Math.ceil(totalItems / paginationQuery.limit);
        const next = paginationQuery.page === totalPages
            ? paginationQuery.page
            : paginationQuery.page + 1;
        const prev = paginationQuery.page === 1
            ? paginationQuery.page
            : paginationQuery.page - 1;
        const baseUrl = `${this.request.protocol}://${this.request.headers.host}/`;
        const newUrl = new URL(this.request.url, baseUrl);
        const response = {
            data: results,
            meta: {
                totalItems,
                totalPages,
                currentPage: paginationQuery.page,
                itemsPerPage: paginationQuery.limit,
            },
            links: {
                first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${1}`,
                last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
                current: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
                next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${next}`,
                prev: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${prev}`,
            },
        };
        return response;
    }
};
exports.PaginationProvider = PaginationProvider;
exports.PaginationProvider = PaginationProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object])
], PaginationProvider);
//# sourceMappingURL=pagination.provider.js.map