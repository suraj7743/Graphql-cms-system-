import AppDataSource from "../../config/database.config";
import { USER_STATUS, User } from "../../entities/user/user.entity";
import { RegisterUserInput } from "../../validator/user/registerUser.validator";
import { UserDetailsEntity as UserDetails } from "../../entities/user/userDetails.entity";
import BcryptService from "../../utils/bcrypt.util";
import AppError from "../../utils/errors/appError";
import { StatusCodes } from "../../constants/statusCodes";
import { ChangeUserPasswordInput } from "../../validator/user/changePassword.validator";
import sendMailUtil from "../../utils/email.util";
import { FinalizeProposalBidInput } from "../../validator/proposal/finalizeProposalBid.validator";
import { MediaEntity } from "../../entities/media/media.entity";
import DotenvConfiguration from "../../config/env.config";
import { EMAIL_TEMPLATE, EmailService } from "../email/email.service";
import { In } from "typeorm";

export class UserService {
  constructor(
    private readonly userRepo = AppDataSource.getRepository(User),
    private readonly mediaRepo = AppDataSource.getRepository(MediaEntity),
    private readonly userDetailRepo = AppDataSource.getRepository(UserDetails),
    private readonly bcryptUtil = new BcryptService()
  ) {}

  async changePassword(body: ChangeUserPasswordInput, user: User) {
    const userInfo = await this.userRepo.findOne({
      where: { id: user.id },
    });

    if (!userInfo) throw new AppError("User not found", StatusCodes.NOT_FOUND);
    const isPasswordMatch = await this.bcryptUtil.compare(
      body.oldPassword,
      userInfo.password
    );

    if (!isPasswordMatch)
      throw new AppError("Old password is incorrect", StatusCodes.UNAUTHORIZED);

    userInfo.password = await this.bcryptUtil.hash(body.newPassword);
    const response = await this.userRepo.save(userInfo);
    console.log("user", response);

    return response;
  }

  async getUserInfo(u: User) {
    console.log("hii");
    const user = await this.userRepo.findOne({
      where: { id: u.id },
      select: {
        password: false,
      },
      relations: ["userDetails"],
    });

    if (!user) throw new Error("user not found");
    console.log("user", user);

    const [citizenshipImageMedia, profileImageMedia] =
      await this.mediaRepo.find({
        where: {
          id: In([
            user.userDetails.citizenshipImage,
            user.userDetails.profileImage,
          ]),
        },
      });

    // @ts-ignore
    user.userDetails.citizenshipImage = citizenshipImageMedia;
    // @ts-ignore
    user.userDetails.profileImage = profileImageMedia;

    return user;
  }

  async create(body: RegisterUserInput) {
    const user = await this.userRepo.findOne({
      where: { email: body.email },
    });
    if (user)
      throw new AppError("Email already exists", StatusCodes.UNAUTHORIZED);
    const newUser = new User();
    newUser.email = body.email;
    newUser.password = await this.bcryptUtil.hash(body.password);
    newUser.userType = body.userType;
    newUser.userStatus = USER_STATUS.UNDER_REVIEW;

    const userDetails = new UserDetails();
    userDetails.firstName = body.firstName;
    userDetails.middleName = body.middleName;
    userDetails.lastName = body.lastName;

    const media = await this.mediaRepo.findOne({
      where: {
        id: body.media_id,
      },
    });

    if (!media) throw new Error("Provided media ID does not exist");
    userDetails.citizenshipImage = body.media_id;

    newUser.userDetails = userDetails;
    const d = await this.userRepo.save(newUser);
    new EmailService(EMAIL_TEMPLATE.USER_REGISTER, d).sendEmail();
    return d;
  }
}
