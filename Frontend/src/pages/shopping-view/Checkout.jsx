import React, { useState } from 'react'
import accountBanner from "../../assets/account.jpg"
import ShopAddress from '@/components/shopping-view/address'
import UserCartItemsContent from '@/components/shopping-view/cartItemsContent'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { showToast } from '@/utils/toast'
import { createNewOrder } from '@/store/shop-slice/orderSlice'
import axios from 'axios'
import { any } from 'zod'


const ShoppingCheckout = () => {

  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false)


  const TotalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce((sum, currentItem) =>
        sum + (currentItem?.salePrice > 0
          ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity, 0
      ) : 0


  const handlePlaceOrder = async () => {

    if (!cartItems?.items?.length) {
      showToast.error("Cart is empty!");
      return;
    }

    if (!currentSelectedAddress) {
      showToast.error("Please select an address.")
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item.productId,
        title: item.title,
        image: item.image,
        price: item.salePrice > 0 ? item.salePrice : item.price,
        quantity: item.quantity,
      })),
      addressInfo: {
        addressInfo: currentSelectedAddress._id,
        address: currentSelectedAddress.address,
        city: currentSelectedAddress.city,
        pincode: currentSelectedAddress.pincode,
        notes: currentSelectedAddress.notes,
        phone: currentSelectedAddress.phone,
      },
      totalAmount: TotalCartAmount,

    };

    console.log("orderData:", orderData);

    setIsPaymentStart(true);

    const response = await dispatch(createNewOrder(orderData));

    if (!response?.payload?.success) {
      setIsPaymentStart(false);
      showToast.error("Failed to place order!");
      return;
    }

    const { razorpayOrder, orderId } = response.payload;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "Ecommerce",
      description: "Order Payment",
      order_id: razorpayOrder.id,

      handler: async (response) => {
        await axios.post("/api/order/capture-payment", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          orderId,
        });

        showToast.success("Payment successfully")
      },

      modal: {
        ondismiss: () => {
          setIsPaymentStart(false);
          showToast.error("Payment cancelled");
        },
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("Payment failed", () => {
      setIsPaymentStart(false);
      showToast.error("Payment failed")
    });

    rzp.open();

  };


  return (
    <div className='flex flex-col'>
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accountBanner}
          className='h-full w-full object-cover object-center'
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <ShopAddress setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items.map((item) => (
                <UserCartItemsContent
                  cartItems={item}
                />
              )) : (
                <div className="font-bold p-4 text-2xl">
                  Cart is empty
                </div>
              )
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
              onClick={handlePlaceOrder}
              disabled={isPaymentStart}
            >
              {isPaymentStart ? "Processing Payment..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout