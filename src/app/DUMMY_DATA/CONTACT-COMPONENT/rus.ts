import { ContactInterface } from "src/app/models/contact.model";
import { CompanyData } from "../company-info";

export const ContactTextData: ContactInterface = {
    titles: ["Свяжитесь с нами", "Часы работы", "О нас"],
    workingHours: [
        `Понедельник: ${CompanyData.mondayTime}`,
        `Вторник: ${CompanyData.tuesdayTime}`,
        `Среда: ${CompanyData.wednesdayTime}`,
        `Четверг: ${CompanyData.thursdayTime}`,
        `Пятница: ${CompanyData.fridayTime}`,
        `Суббота: ${CompanyData.saturdayTime}`,
        `Воскресенье: ${CompanyData.sundayTime}`
    ],
    aboutUs: `${CompanyData.aboutUsRu}`,
    instragramLink: `${CompanyData.instagram}`,
    facebookLink: `${CompanyData.facebook}`,
    email: `${CompanyData.email}`,
    phone: `${CompanyData.mobile}`
};
