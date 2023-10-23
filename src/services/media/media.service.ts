import fs from "fs";
import { MediaEntity } from "../../entities/media/media.entity";
import { MediaInput } from "../../validator/media/media.validator";
import AppError from "../../utils/errors/appError";
import AppDataSource from "../../config/database.config";
import { DataEntity, DataType } from "../../entities/data/data.entity";
const util = require("util");

const renameAsync = util.promisify(fs.rename);

async function renameFile(sourceFilePath: string, targetFilePath: string) {
  try {
    await renameAsync(sourceFilePath, targetFilePath);
    console.log("File renamed successfully.");
  } catch (error) {
    console.error("Error renaming file:", error);
  }
}
export class MediaService {
  constructor(
    private readonly mediaRepository = AppDataSource.getRepository(MediaEntity),
    private readonly dataRepository = AppDataSource.getRepository(DataEntity)
  ) {}

  async uploadFile(data: MediaInput, id?: string) {
    const newMedia = await this.mediaRepository
      .create({
        mimeType: data.mimeType,
        name: data.name,
        type: data.type,
      })
      .save();

    newMedia.transferImageFromTempTOUploadFolder(newMedia.id, newMedia.type);

    return newMedia;
  }

  // Deletes the given media by ID;
  async delete(id: string) {
    const media = await this.mediaRepository.findOne({
      where: {
        id,
      },
    });

    if (!media) {
      throw AppError.NotFound("Media not found");
    }
    return await this.mediaRepository.softDelete(id);
  }

  async updateLogo(data: MediaInput) {
    const findMedia = await this.dataRepository.findOne({
      where: { typeValue: DataType.LOGO },
    });
    let media;
    if (findMedia) {
      media = await this.dataRepository.save({
        id: findMedia.id,
        typeValue: DataType.LOGO,
        value: data,
      });
    } else {
      media = await this.dataRepository
        .create({
          typeValue: DataType.LOGO,
          value: data,
        })
        .save();
    }
    const jsonData = JSON.parse(JSON.stringify(media.value));

    return {
      ...media,
      name: jsonData.name,
      type: jsonData.type,
      mimeType: jsonData.mimeType,
      path: `${process.env.BASE_URL!}/uploads/${jsonData.type.toLowerCase()}/${
        jsonData.name
      }`,
    };
  }

  // get Media
  //  LOGO, CAROUSEL

  // update Carousel.
}
