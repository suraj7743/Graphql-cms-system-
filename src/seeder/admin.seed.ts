import BcryptService from "../utils/bcrypt.util";
import AppDataSource from "../config/database.config";
import { Admins } from "../constants/admin.constant";
import { Admin } from "../entities/admin/admin.entity";
import Print from "../utils/Print";

const adminRepository = AppDataSource.getRepository(Admin);
const args = process.argv[2];
if (!args) {
  throw new Error("Please provide an argument");
}

const bcryptUtil = new BcryptService();
AppDataSource.initialize()
  .then(async () => {
    if (args === "add") {
      for (const i of Admins) {
        const admin = await adminRepository.findOne({
          where: {
            email: i.email,
          },
        });

        if (admin) {
          // TODO: Update existing admin details
          continue;
        } else {
          const admin = adminRepository.create({
            ...i,
            password: await bcryptUtil.hash(i.password),
          });

          const adminResult = await adminRepository.save(admin);
        }
      }
    } else if (args === "remove") {
      console.log("inside remove");
      removeAllAdmin();
    } else {
      Print.error("Please provide an argument");
    }
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    // *Finish the process
    Print.info("Seeding completed");
    AppDataSource.destroy();
    process.exit(0);
  });

const removeAllAdmin = async () => {
  try {
    await adminRepository.createQueryBuilder().delete().execute();
  } catch (error: any) {
    process.exit(1);
  }
  Print.info("Admin Removed");
};
