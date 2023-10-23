import AppDataSource from "../../config/database.config";
import { DataEntity, DataType } from "../../entities/data/data.entity";
import AppError from "../../utils/errors/appError";
import { DashboardDataInput } from "../../validator/data/dashboardDataInput.validator";

export default class DataService {
  constructor(
    private readonly DataRepository = AppDataSource.getRepository(DataEntity)
  ) {}
  async save(data: DashboardDataInput) {
    const checkDataExists = await this.DataRepository.findOne({
      where: { typeValue: DataType.SETUP },
    });

    if (checkDataExists) {
      const new_data = this.DataRepository.save({
        id: checkDataExists.id,
        typeValue: data.typeValue,
        value: data.value,
      });
      return new_data;
    }
    const new_data = new DataEntity();
    new_data.typeValue = data.typeValue;
    new_data.value = data.value;
    return await this.DataRepository.save(new_data);
  }

  async get() {
    try {
      const data = await this.DataRepository.findOne({
        where: { typeValue: DataType.SETUP },
      });

      const logoData = await this.DataRepository.findOne({
        where: { typeValue: DataType.LOGO },
      });
      let jsonData = null;
      if (logoData) {
        jsonData = JSON.parse(JSON.stringify(logoData));
      }
      jsonData.value.path = `${process.env
        .BASE_URL!}/uploads/${jsonData.value.type.toLowerCase()}/${
        jsonData.value.name
      }`;

      return {
        setup: {
          ...data,
        },
        logo: jsonData,
      };
    } catch (error) {
      throw new Error(`this is error ${error}`);
    }
  }

  async delete() {
    const deleteData = await this.DataRepository.delete({
      typeValue: DataType.SETUP,
    });
    if (deleteData) {
      return {
        message: "Item deleted",
        status: "success",
      };
    } else {
      return {
        message: "Query error ",
        status: "failure",
      };
    }
  }
}
