
export interface Product {
    id: string
    name: string
    price: number
    description: string
    image: string
}

export interface User {
    id: string
    name: string
    email: string
    password: string
}

export interface CartItem {
    id: string
    productId: string
    quantity: number
}

export interface Cart {
    id: string
    userId: string
    productId: string
    quantity: number
    items: CartItem[]
}