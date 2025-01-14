import { ContactInterface } from "src/app/models/contact.model";
import { CompanyData } from "../company-info";

export const ContactTextData: ContactInterface = {
    titles: ["დაგვიკავშირდით", "სამუშაო საათები", "ჩვენს შესახებ"],
    workingHours: [
        `ორშაბათი: ${CompanyData.mondayTime}`,
        `სამშაბათი: ${CompanyData.tuesdayTime}`,
        `ოთხშაბათი: ${CompanyData.wednesdayTime}`,
        `ხუთშაბათი: ${CompanyData.thursdayTime}`,
        `პარასკევი: ${CompanyData.fridayTime}`,
        `შაბათი: ${CompanyData.saturdayTime}`,
        `კვირა: ${CompanyData.sundayTime}`
    ],
    aboutUs: `${CompanyData.aboutUsKa}`,
    instragramLink: `${CompanyData.instagram}`,
    facebookLink: `${CompanyData.facebook}`,
    email: `${CompanyData.email}`,
    phone: `${CompanyData.mobile}`
};
