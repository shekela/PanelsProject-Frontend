import { MainProductsInterface } from "src/app/models/mainproducts.model"; 

export const mainProductsComponent: MainProductsInterface = {
    title: 'გააცნეთ ჩვენი პროდუქცია',
    titleText: 'ჩვენ გვეხმარებით ადამიანებს შექმნან მშვიდი სივრცეები ჩვენი სკანდინავიური დიზაინებით. ჩვენი პროდუქცია ცვლის ოთახების გარეგნობას და ხმას, პოზიტიურად მოქმედებს ადამიანების ცხოვრებაზე.',
    products: [
        {
            title: "აკუპანელი | 240 & 300",
            description: "მსოფლიოში პირველი სლატი სასადილო პანელი.",
            backgroundUrl: "https://ccfssflq.photoncache.com/wp-content/uploads/2024/08/Alrum-Brun2-1024x682.jpg",
            buttonText: "შეიტყვეთ აკუპანელი"
        },
        {
            title: "აკუპანელი | 60",
            description: "მინიმალისტური შეხედულება კიდეებით.",
            backgroundUrl: "https://ccfssflq.photoncache.com/wp-content/uploads/2024/09/BO8A1240b-1024x682.png",
            buttonText: "შეიტყვეთ აკუპანელი | 60"
        },
        {
            title: "ალუwood",
            description: "მიეცით თქვენს სახლს უნიკალური, სკანდინავიური ფასადი.",
            backgroundUrl: "https://ccfssflq.photoncache.com/wp-content/uploads/2024/09/aluwood-brown-mads-house-04-683x1024.jpg",
            buttonText: "შეიტყვეთ ალუwood"
        },
        {
            title: "შექმნა",
            description: "პერსონალიზირებული თქვენი სახლი თაროებით, LED განათებით, სამოსის და სხვა ნივთებით.",
            backgroundUrl: "https://ccfssflq.photoncache.com/wp-content/uploads/2024/09/IMG_5591-scaled-1-1024x768.jpeg",
            buttonText: "შეიტყვეთ შექმნა"
        }
    ]
};
