import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import UserCartItemsContent from './cartItemsContent'

const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {

    const TotalCartAmount =
        cartItems && cartItems.length > 0
            ? cartItems.reduce((sum, currentItem) =>
                sum + (currentItem?.salePrice > 0
                    ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity, 0
            ) : 0

    return (
        <>
            <SheetContent className="sm:max-w-md ">
                <SheetHeader>
                    <SheetTitle className='text-2xl font-bold'>Your Cart</SheetTitle>
                </SheetHeader>
                <div className="px-4 overflow-y-scroll  relative ">
                    <div className="space-y-4 md:h-[80vh] ">
                        {cartItems && cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <UserCartItemsContent
                                    key={item.productId}
                                    cartItems={item}
                                />
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Your cart is empty
                            </p>
                        )}

                    </div>
                    <div className="sticky bottom-0 border-t px-4 py-4 space-y-4 bg-background">
                        <div className="flex justify-between">
                            <span className="font-bold">Total</span>
                            <span className="font-bold">₹{TotalCartAmount}</span>
                        </div>
                        <Button
                            onClick={() => { }}
                            className="w-full mt-3"
                        >
                            Checkout
                        </Button>
                    </div>

                </div>
            </SheetContent>
        </>
    )
}

export default UserCartWrapper