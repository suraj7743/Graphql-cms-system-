import { buildSchema } from "type-graphql";
import { AdminResolver } from "../resolvers/admin/admin.resolver";
import AnalyticsResolver from "../resolvers/analytics/analytics.resolver";
import AuthResolver from "../resolvers/auth/auth.resolver";
import UploadResolver from "../resolvers/media/media.resolver";
import UserResolver from "../resolvers/user/user.resolver";
import DataDashboardResolver from "../resolvers/data/data.resolver";
// console.log("ok" + __dirname + "/../resolvers/**/*.resolver{.ts,.js}");
export class TypeGraphQL {
  async Schema() {
    return await buildSchema({
      resolvers: [
        AdminResolver,
        AnalyticsResolver,
        AuthResolver,
        UploadResolver,
        UserResolver,
        DataDashboardResolver,
      ],

      dateScalarMode: "isoDate",
      validate: false,
      emitSchemaFile: false,
    });
  }
}
