import { MediaType } from "../constants/enums/graphQL.enum";
import path from "path";
import DotenvConfiguration from "./env.config";

export interface MediaConfig {
  maxFileSize: number;
  supportedExtensions: string[];
}

const MediaConfigurations: { [key in MediaType]: MediaConfig } = {
  [MediaType.PROPOSAL]: {
    maxFileSize: 3 * 1024 * 1024, // *3MB
    supportedExtensions: ["jpg", "jpeg", "png"],
  },
  [MediaType.USER_AVATAR]: {
    maxFileSize: 3 * 1024 * 1024, // *3MB
    supportedExtensions: ["jpg", "jpeg", "png"],
  },
  [MediaType.USER_DOCUMENT]: {
    maxFileSize: 3 * 1024 * 1024, // *3MB
    supportedExtensions: ["jpg", "jpeg", "png"],
  },
  [MediaType.LOGO]: {
    maxFileSize: 3 * 1024 * 1024, // *3MB
    supportedExtensions: ["jpg", "jpeg", "png"],
  },
};

export default MediaConfigurations;
