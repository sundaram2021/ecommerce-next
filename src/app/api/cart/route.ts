import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs';
import { Product } from "@prisma/client";



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
   console.log('productId : ', productId);
   

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

    const findCart = await prisma.cart.findFirst({
        where: {
            productId
        }
    })

    if(findCart) {
        return NextResponse.json({msg: findCart + " already exist"});
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

export async function GET() {
    try {
      const user = await currentUser();
      if (!user) {
        // User is not authenticated
        return NextResponse.json({ error: "User is not authenticated." }, { status: 401 });
      }
  
      const userEmail = user?.emailAddresses[0]?.emailAddress;
      if (!userEmail) {
        // User's email is not available
        return NextResponse.json({ error: "User's email is not available." }, { status: 400 });
      }
  
      const cartData = await prisma.cart.findMany({
        where: {
          user: {
            email: userEmail
          }
        },
        include: {
          user: true
        }
      });
  
      console.log('cartData : ', cartData);
      
      return NextResponse.json(cartData);
    } catch (error) {
      console.error('Error fetching cart data:', error);
      return NextResponse.json({ error: "An error occurred while fetching cart data." }, { status: 500 });
    }
  }
