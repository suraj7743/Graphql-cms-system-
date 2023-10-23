import fs, { createWriteStream } from "fs";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import nodePath, { default as path } from "path";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import DotenvConfiguration from "../../config/env.config";
import { MediaType } from "../../constants/enums/graphQL.enum";
import { MediaSchema } from "../../schemas/media/media.schema";
import { Context } from "../../types/context.types";
import MediaConfigurations from "../../config/mediaConfigurations";
import { Upload } from "../../types/upload.type";
import AppError from "../../utils/errors/appError";
import { MediaService } from "../../services/media/media.service";
import { getTempFolderPath, getUploadFolderPath } from "../../utils/path.util";
import { MEDIA_TYPES } from "@apollo/server/dist/esm/ApolloServer";
import authentication from "../../middlewares/auth.middleware";
import { AdminRoles, UserRoles } from "../../constants/enums/role.enum";

@Resolver()
export default class UploadResolver {
  constructor(private readonly mediaService = new MediaService()) {}

  // @UseMiddleware(canAccess(['ADMIN']))
  @Mutation(() => MediaSchema, {
    description: "Uploads a file to the server and saves it to the database",
    nullable: true,
  })
  @UseMiddleware(
    authentication(true, [
      AdminRoles.ADMIN,
      UserRoles.STUDENT,
      UserRoles.TEACHER,
    ])
  )
  async singleUpload(
    @Arg("file", () => GraphQLUpload) file: Upload,
    @Arg("type", () => MediaType) type: MediaType,
    @Ctx() _ctx: Context
  ) {
    // * Create the uploads folder if it doesn't exist
    !fs.existsSync(getUploadFolderPath()) &&
      fs.mkdirSync(getUploadFolderPath(), { recursive: true });
    !fs.existsSync(nodePath.join(getTempFolderPath())) &&
      fs.mkdirSync(nodePath.join(getTempFolderPath()), {
        recursive: true,
      });

    const uploadType: MediaType = type;

    if (!uploadType || !Object.values(MediaType).includes(uploadType)) {
      throw AppError.BadRequest("Invalid upload type");
    }
    if (!file) {
      throw AppError.BadRequest("File not upload");
    }

    const { createReadStream, filename, mimetype, encoding } = file;

    const modifyFileName = `${Date.now()}-${Math.floor(
      1000 + Math.random() * 9000
    )}-${filename}`;

    //    *Check size of file (in bytes)
    const fileSize = await new Promise<number>((resolve, reject) => {
      createReadStream()
        .on("data", (chunk) => {
          resolve(chunk.length);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
    const uploadedExtension = nodePath.extname(filename);

    if (
      !MediaConfigurations[uploadType].supportedExtensions.includes(
        uploadedExtension.split(".")[1]
      )
    ) {
      throw AppError.BadRequest(
        `Invalid file type. Supported types are ${MediaConfigurations[
          uploadType
        ].supportedExtensions.join(", ")}`
      );
    }

    let path2: string;

    if (type === MediaType.LOGO)
      path2 = path.join(
        getUploadFolderPath(),
        MediaType.LOGO.toLowerCase(),
        modifyFileName
      );
    else path2 = path.join(getTempFolderPath(), modifyFileName);

    return new Promise<MediaSchema>((resolve, reject) => {
      return createReadStream()
        .pipe(createWriteStream(path2))
        .on("finish", async () => {
          //* Once the file is written to the disk, we can save the file to the database

          let media,
            data = {
              mimeType: file.mimetype,
              name: modifyFileName,
              type,
            };

          if (type === MediaType.LOGO) {
            media = await this.mediaService.updateLogo(data);
          } else media = await this.mediaService.uploadFile(data);
          // @ts-ignore
          resolve({ ...media });
        })
        .on("error", (error) => {
          reject(error.message);
        });
    });
  }

  @Mutation(() => [MediaSchema], {
    description:
      "Uploads multiple files to the server and saves it to the database",
    nullable: true,
  })
  async multipleUpload(
    @Arg("files", () => [GraphQLUpload]) files: Upload[],
    @Arg("type", () => MediaType) type: MediaType,
    @Ctx() ctx: Context
  ) {
    const uploadedFiles = await Promise.all(files);
    return await Promise.all(
      uploadedFiles.map(
        async (file) => await this.singleUpload(file, type, ctx)
      )
    );
  }
}
