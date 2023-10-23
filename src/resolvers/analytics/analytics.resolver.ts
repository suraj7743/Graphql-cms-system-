import {
  TotalProposalAndBidCountSchema,
  TotalUserSchema,
} from "../../schemas/analytics/analytics.schema";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { AnalyticsService } from "../../services/analytics/analytics.service";

import authentication from "../../middlewares/auth.middleware";
import {
  AdminRoles,
  UserRoles as Role,
  UserRoles,
} from "../../constants/enums/role.enum";
import { Admin } from "typeorm";

@Resolver()
export default class AnalyticsResolver {
  constructor(private readonly analyticsService = new AnalyticsService()) {}

  @Query(() => Number)
  @UseMiddleware(authentication(true, [UserRoles.STUDENT]))
  async getUserProposalCount(@Ctx() ctx: any) {
    const user = ctx.user;
    return await this.analyticsService.getUserProposalCount(user);
  }

  @Query(() => TotalUserSchema)
  @UseMiddleware(authentication(true, [AdminRoles.ADMIN]))
  async getTotalUsersCount() {
    return await this.analyticsService.getTotalUsersCount();
  }

  @Query(() => TotalProposalAndBidCountSchema)
  @UseMiddleware(authentication(true, [AdminRoles.ADMIN]))
  async getTotalProposalAndBidCount() {
    return await this.analyticsService.getTotalProposalAndBidCount();
  }
}
