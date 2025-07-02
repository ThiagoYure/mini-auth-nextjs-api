import { IDD } from "./IDD";

export type Country = {
  name: { common: string; official: string; nativeName: string };
  translations: string;
  cca2: string;
  idd: IDD;
  postalCode: {
    format: string;
    regex: string;
  };
};
