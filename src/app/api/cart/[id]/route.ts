import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
// define a patch route that updates the cart and if type from the body is increase then increase the qty and if type is decrease then decrease the qty but  not less than 1
export async function PATCH(req: Request, res: Response)  {
    const { id, type } = await req.json();
    console.log('id : ', id);
    console.log('type : ', type);
    
    const cartData = await prisma.cart.findUnique({
        where: {
            productId: id as string
        }
    });

    console.log('cartData : ', cartData);
    
    if(type === 'increase') {
        await prisma.cart.update({
            where: {
                productId: id as string
            },
            data: {
                qty: cartData?.qty as number + 1
            }
        });
    } else if(type === 'decrease') {
        if(cartData?.qty as number > 1) {
            await prisma.cart.update({
                where: {
                    productId: id as string
                },
                data: {
                    qty: cartData?.qty as number - 1
                }
            });
        }
    }

    return NextResponse.json(cartData);
   
}

// make a delete route that deletes the cart item from the cart table on the basis of productId getting from req.json()
export async function DELETE(req: Request,{params}: {params: {id: string}})  {
    const { id: productId } = params;
    console.log('id : ', productId);
    
    const cartData = await prisma.cart.delete({
        where: {
            productId
        }
    });

    return NextResponse.json(cartData);
   
}