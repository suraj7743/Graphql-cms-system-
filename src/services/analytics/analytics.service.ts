import { USER_TYPE, User } from "../../entities/user/user.entity";
import AppDataSource from "../../config/database.config";

import { Not } from "typeorm";

export class AnalyticsService {
  constructor(private readonly userRepo = AppDataSource.getRepository(User)) {}

  async getTotalUsersCount() {
    let [_, entCount] = await this.userRepo.findAndCount({
      where: {
        userType: USER_TYPE.ENTREPRENEUR,
      },
    });

    let [__, investorCount] = await this.userRepo.findAndCount({
      where: {
        userType: USER_TYPE.INVESTOR,
      },
    });
    return {
      entCount,
      investorCount,
      total: Number(entCount) + Number(investorCount),
    };
  }
}
