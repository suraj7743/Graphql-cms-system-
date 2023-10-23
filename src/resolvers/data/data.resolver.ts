import { Arg, Mutation, Query, UseMiddleware } from "type-graphql";
import RequestValidator from "../../middlewares/requestValidator.middleware";
import DataService from "../../services/data/data.service";
import { DashboardDataInput } from "../../validator/data/dashboardDataInput.validator";

import { CommonResponseSchema } from "../../schemas/common/commonResponse.schema";
import {
  SetupDataSchema,
  SetupSchema,
} from "../../schemas/data/setUpData.schema";

export default class SetupDataResolver {
  constructor(private readonly dataService = new DataService()) {}
  //to post setup data
  @Mutation(() => SetupDataSchema)
  @UseMiddleware(RequestValidator.validate(DashboardDataInput))
  async dashboardData(@Arg("data") data: DashboardDataInput) {
    return this.dataService.save(data);
  }
  //to get setup data
  @Query(() => SetupSchema)
  async getSetupData() {
    return this.dataService.get();
  }
  //to delete setup data
  @Mutation(() => CommonResponseSchema)
  async deleteSetupData() {
    return this.dataService.delete();
  }

  //to update data
}
