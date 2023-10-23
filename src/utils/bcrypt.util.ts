import bcrypt from "bcryptjs";

class BcryptService {
  async hash(secret: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(secret, salt);
  }

  async compare(secret: string, hashedSecret: string): Promise<boolean> {
    return bcrypt.compare(secret, hashedSecret);
  }
}

export default BcryptService;
