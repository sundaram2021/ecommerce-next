


export interface Product {
    name: string;
    shortDescription: string;
    bestSellingRank: number;
    thumbnailImage: string;
    salePrice: number;
    manufacturer: string;
    url: string;
    type: string;
    image: string;
    customerReviewCount: number;
    shipping: string;
    salePrice_range: string;
    objectID: string;
    categories: string[];
  }
  
  export interface Cart {
    id: number;
    name: string;
    description: string;
    user: User;
    userId: number;
    productId: string;
    price: number;
    img: string;
    qty: number;
  }
  
 export interface User {
    id: number;
    name: string;
    email: string;
    carts: Cart[];
  }