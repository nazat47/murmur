"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveUser = void 0;
const common_1 = require("@nestjs/common");
const user_constants_1 = require("../constants/user.constants");
exports.ActiveUser = (0, common_1.createParamDecorator)((field, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request[user_constants_1.REQUEST_KEY];
    return field ? user?.[field] : user;
});
//# sourceMappingURL=active-user.decorator.js.map