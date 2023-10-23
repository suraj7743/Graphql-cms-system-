import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "../base/base.entity";
import { UserDetailsEntity } from "../user/userDetails.entity";
import path from "path";
import fs from "fs";
import { MediaType } from "../../constants/enums/graphQL.enum";
import { getTempFolderPath, getUploadFolderPath } from "../../utils/path.util";

@Entity({ name: "media" })
export class MediaEntity extends Base {
  @Column({ name: "name", type: "varchar", length: 255 })
  name: string;

  @Column({ name: "mime_type", type: "varchar", length: 50 })
  mimeType: string;

  @Column({ name: "media_type", type: "enum", enum: MediaType })
  type: MediaType;

  @ManyToOne(
    () => UserDetailsEntity,
    (userDetails) => {
      userDetails.citizenshipImage;
      userDetails.profileImage;
    },
    {
      onDelete: "CASCADE",
    }
  )
  userDetails: UserDetailsEntity;

  private path: string;
  transferImageFromTempTOUploadFolder(id: string, type: string) {
    const TEMP_FOLDER_PATH = path.join(getTempFolderPath(), this.name);

    const UPLOAD_FOLDER_PATH = path.join(
      getUploadFolderPath(),
      type.toLowerCase(),
      this.id.toString()
    );
    !fs.existsSync(UPLOAD_FOLDER_PATH) &&
      fs.mkdirSync(UPLOAD_FOLDER_PATH, { recursive: true });

    fs.renameSync(TEMP_FOLDER_PATH, path.join(UPLOAD_FOLDER_PATH, this.name));
  }

  @AfterLoad()
  async loadImagePath() {
    this.path = `${process.env.BASE_URL!}/uploads/${this.type.toLowerCase()}/${
      this.id
    }/${this.name}`;
  }
}
