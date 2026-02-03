import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import UserCartItemsContent from './cartItemsContent'
import { useNavigate } from 'react-router-dom'

const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {
    const navigate = useNavigate();

    const TotalCartAmount =
        cartItems && cartItems.length > 0
            ? cartItems.reduce((sum, currentItem) =>
                sum + (currentItem?.salePrice > 0
                    ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity, 0
            ) : 0


    const handleCheckOut = () => {
        setOpenCartSheet(false);
        navigate("/checkout");
    }

    return (
        <>
  <SheetHeader className="px-4">
    <SheetTitle className="text-2xl font-bold">
      Your Cart
    </SheetTitle>
  </SheetHeader>

  {/* Full-height layout */}
  <div className="flex flex-col h-[calc(100vh-64px)]">

    {/* Scrollable cart items */}
    <div className="flex-1 overflow-y-auto px-4 space-y-4 mb-2">
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

    {/* Fixed bottom checkout */}
    <div className="border-t px-4 py-6 bg-background shrink-0">
      <div className="flex justify-between mb-3">
        <span className="font-bold">Total</span>
        <span className="font-bold">₹{TotalCartAmount}</span>
      </div>

      <Button
        onClick={handleCheckOut}
        className="w-full mb-3"
      >
        Checkout
      </Button>
    </div>

  </div>
</>


    )
}

export default UserCartWrapper