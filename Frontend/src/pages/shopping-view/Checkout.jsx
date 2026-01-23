import React from 'react'
import accountBanner from "../../assets/account.jpg"
import ShopAddress from '@/components/shopping-view/address'
import UserCartItemsContent from '@/components/shopping-view/cartItemsContent'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'


const ShoppingCheckout = () => {

  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  const TotalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce((sum, currentItem) =>
        sum + (currentItem?.salePrice > 0
          ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity, 0
      ) : 0

  return (
    <div className='flex flex-col'>
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accountBanner}
          className='h-full w-full object-cover object-center'
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <ShopAddress />
        <div className="flex flex-col gap-4">
          {
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items.map((item) => (
                <UserCartItemsContent
                  cartItems={item}
                />
              )) : null
          }
          <div className="mt-4 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹{TotalCartAmount}</span>
            </div>
          </div>
          <div className="mt-2 w-full">
            <Button
              className="w-full"
            >Place Order</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout