import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'

const UserCartWrapper = () => {
    return (
        <>
            <SheetContent className="sm:max-w-md ">
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                <div className="p-4">
                    <div className="mt-8 space-y-4">

                    </div>
                    <div className="mt-8 space-y-4 ">
                        <div className="flex justify-between">
                            <span className="font-bold">Total</span>
                            <span className="font-bold">10000</span>
                        </div>
                    </div>
                    <Button
                        onClick={() => { }}
                        className="w-full mt-6"
                    >
                        Checkout
                    </Button>
                </div>
            </SheetContent>
        </>
    )
}

export default UserCartWrapper