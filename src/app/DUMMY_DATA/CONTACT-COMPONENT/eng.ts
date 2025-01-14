import { ContactInterface } from "src/app/models/contact.model";
import { CompanyData } from "../company-info";

export const ContactTextData: ContactInterface = {
    titles: ["Contact us", "Working hours", "About us"],
    workingHours: [
        `Monday: ${CompanyData.mondayTime}`,
        `Tuesday: ${CompanyData.mondayTime}`,
        `Wednesday: ${CompanyData.mondayTime}`,
        `Thursday: ${CompanyData.mondayTime}`,
        `Friday: ${CompanyData.mondayTime}`,
        `Saturday: ${CompanyData.mondayTime}`,
        `Sunday: ${CompanyData.mondayTime}`
    ],
    aboutUs: `${CompanyData.aboutUsEn}`,
    instragramLink: `${CompanyData.instagram}`,
    facebookLink: `${CompanyData.facebook}`,
    email: `${CompanyData.email}`,
    phone: `${CompanyData.mobile}`
}