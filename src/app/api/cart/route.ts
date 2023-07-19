import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs';


interface Cart {
    id: number;
    name: string;
    user: User;
    userId: number;
    productId: string;
    price: number;
    description: string;
    img: string;
    qty: number;
  }
  
 interface User {
    id: number;
    name: string;
    email: string;
    carts?: Cart[];
  }


export async function POST(req: Request, res: Response)  {
   const {name, description, productId, user, price, username, img, qty} = await req.json();
   console.log('img : ', img);

    const findUser = await prisma.user.findUnique({
        where: {
            email: user
        }
    })

    if(!findUser) {
        await prisma.user.create({
            data: {
                name: username,
                email: user,
            }
        });
    }
 
   const cartData:Cart = await prisma.cart.create({
         data: {
                name,
                description,
                productId,
                user: {
                    connect: {
                        email: user
                    }
                },
                price,
                img,
                qty
            },
            include: {
                user: true
            }
    });

    return NextResponse.json(cartData);
   
}

export async function GET()  {
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0].emailAddress;
    console.log('userEmail : ', userEmail);
    
    // console.log('user : ', user);
    
    const cartData = await prisma.cart.findMany({
        where: {
            user: {
                email: userEmail as string
            }
        },
        include: {
            user: true
        }
    });

    console.log('cartData : ', cartData);
    

    return NextResponse.json(cartData);
   
}
