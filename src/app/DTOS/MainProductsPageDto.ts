import { mainProductSectionsDto } from "./mainProductSectionsDto";
import { productsDto } from "./productsDto";

export interface MainProductsPageDto{
    mainProductSections: mainProductSectionsDto[],
    products: productsDto[]
  }