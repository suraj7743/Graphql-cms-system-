import AppDataSource from "../../config/database.config";
import { USER_STATUS, User } from "../../entities/user/user.entity";
import { UserDetailsEntity as UserDetails } from "../../entities/user/userDetails.entity";
import BcryptService from "../../utils/bcrypt.util";
import sendMailUtil from "../../utils/email.util";
import { AcceptReject } from "../../constants/enums/graphQL.enum";
import DotenvConfiguration from "../../config/env.config";
import { MediaEntity } from "../../entities/media/media.entity";

export class AdminService {
  constructor(
    private readonly userRepo = AppDataSource.getRepository(User),
    private readonly mediaRepo = AppDataSource.getRepository(MediaEntity),
    private readonly userDetailRepo = AppDataSource.getRepository(UserDetails),
    private readonly bcryptUtil = new BcryptService()
  ) {}

  async getToBeApprovedUserList() {
    // let response = await this.userRepo.find({
    //   where: { userStatus: USER_STATUS.UNDER_REVIEW },
    //   relations: ["userDetails"],
    // });

    let response = await this.userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.userDetails", "userDetails")
      .where("user.user_status=:v", { v: USER_STATUS.UNDER_REVIEW })
      .getMany();

    // append media too.

    for (let r of response) {
      let m = await this.mediaRepo.findOne({
        where: {
          id: r.userDetails?.citizenshipImage,
        },
      });
      // @ts-ignore
      r.medias = [m];
    }

    console.log("response", response);
    return response;
  }
}
