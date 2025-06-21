import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IActiveUser } from "../interfaces/active-user.interface";
import { REQUEST_KEY } from "../constants/user.constants";

export const ActiveUser = createParamDecorator(
  (field: keyof IActiveUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: IActiveUser = request[REQUEST_KEY];
    return field ? user?.[field] : user;
  }
);
