import { MainProductsInterface } from "src/app/models/mainproducts.model"; 

export const mainProductsComponent: MainProductsInterface = {
    title: 'Изучите наши продукты',
    titleText: 'Мы помогаем людям создавать спокойные пространства с помощью наших скандинавских дизайнов. Наши продукты меняют внешний вид и звук помещений, оказывая положительное влияние на жизнь людей.',
    products: [
        {
            title: "Акупанель | 240 & 300",
            description: "Первый в мире панель с полосками.",
            backgroundUrl: "https://ccfssflq.photoncache.com/wp-content/uploads/2024/08/Alrum-Brun2-1024x682.jpg",
            buttonText: "Изучите Акупанель"
        },
        {
            title: "Акупанель | 60",
            description: "Минималистичный вид с краями.",
            backgroundUrl: "https://ccfssflq.photoncache.com/wp-content/uploads/2024/09/BO8A1240b-1024x682.png",
            buttonText: "Изучите Акупанель | 60"
        },
        {
            title: "АлуВуд",
            description: "Дайте вашему дому уникальный, скандинавский фасад.",
            backgroundUrl: "https://ccfssflq.photoncache.com/wp-content/uploads/2024/09/aluwood-brown-mads-house-04-683x1024.jpg",
            buttonText: "Изучите АлуВуд"
        },
        {
            title: "СОЗДАТЬ",
            description: "Персонализируйте свой дом с полками, светодиодами, вешалками и другими предметами.",
            backgroundUrl: "https://ccfssflq.photoncache.com/wp-content/uploads/2024/09/IMG_5591-scaled-1-1024x768.jpeg",
            buttonText: "Изучите СОЗДАТЬ"
        }
    ]
};
