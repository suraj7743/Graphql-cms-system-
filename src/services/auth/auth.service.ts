import { AdminRoles, Role } from "../../constants/enums/role.enum";
import { Admin } from "../../entities/admin/admin.entity";
import AppDataSource from "../../config/database.config";
import { LoginUserInput } from "../../validator/auth/loginUser.validator";
import BcryptService from "../../utils/bcrypt.util";
import { USER_STATUS, User } from "../../entities/user/user.entity";
import Token, { TokenStatus } from "../../entities/security/token.entity";
import JWTUtil from "../../utils/jwt.util";
import DotenvConfiguration from "../../config/env.config";

export class AuthService {
  constructor(
    private readonly userRepo = AppDataSource.getRepository(User),
    private readonly adminRepo = AppDataSource.getRepository(Admin),
    private readonly tokenRepo = AppDataSource.getRepository(Token),
    private readonly bcryptUtil = new BcryptService() // private read // only userDetailRepo = AppDataSource.getRepository(UserDetails)
  ) {}

  async loginUser(data: LoginUserInput) {
    let user = await this.userRepo.findOne({
      where: { email: data.email },
    });
    console.log("user", user);
    if (!user) throw new Error("Invalid Credentials");

    const isPasswordMatched = await this.bcryptUtil.compare(
      data.password,
      user.password
    );
    if (!isPasswordMatched) throw new Error("Invalid Credentials");
    // Check if the user account is active or not.
    if (user.userStatus === USER_STATUS.UNDER_REVIEW)
      throw new Error(
        "Your account is under review. Please wait until approval from Admin."
      );

    // Delete all other token of the user and create new token of the user.
    await this.tokenRepo.delete({
      user: {
        id: user.id,
      },
    });

    const token = new Token();
    token.user = user;
    token.token = JWTUtil.sign(
      {
        id: user.id,
        email: user.email,
        user_type: user.userType,
        role: Role.USER,
      },
      DotenvConfiguration.JWT_SECRET,
      {
        expiresIn: DotenvConfiguration.TOKEN_EXPIRES_IN,
      }
    );
    token.expiresAt = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);
    token.status = TokenStatus.ACTIVE;
    await this.tokenRepo.save(token);

    user.tokens = [token];

    return { user, token: token.token };
  }

  // For Admin Login

  async loginAdmin(data: LoginUserInput) {
    let admin = await this.adminRepo.findOne({
      where: { email: data.email },
    });
    console.log("admin", admin);
    if (!admin) throw new Error("Invalid Credentials");

    const isPasswordMatched = await this.bcryptUtil.compare(
      data.password,
      admin.password
    );
    if (!isPasswordMatched) throw new Error("Invalid Credentials");

    // Delete all other token of the admin and create new token of the admin.
    await this.tokenRepo.delete({
      admin: {
        id: admin.id,
      },
    });

    const token = new Token();
    token.admin = admin;
    token.token = JWTUtil.sign(
      {
        id: admin.id,
        email: admin.email,
        role: AdminRoles.ADMIN,
      },
      DotenvConfiguration.JWT_SECRET,
      {
        expiresIn: DotenvConfiguration.TOKEN_EXPIRES_IN,
      }
    );
    token.expiresAt = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);
    token.status = TokenStatus.ACTIVE;
    await this.tokenRepo.save(token);

    admin.tokens = [token];

    return { admin, token: token.token };
  }
}
