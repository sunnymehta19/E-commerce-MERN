import React, { useState } from 'react'
import accountBanner from "../../assets/CheckoutBanner.png"
import accountBanner1 from "../../assets/account.jpg"
import ShopAddress from '@/components/shopping-view/address'
import UserCartItemsContent from '@/components/shopping-view/cartItemsContent'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { showToast } from '@/utils/toast'
import { capturePayment, createNewOrder } from '@/store/shop-slice/orderSlice'
import axios from 'axios'
import { clearCart } from '@/store/shop-slice/cartSlice'
import { useNavigate } from 'react-router-dom'


//Razorpay script loader
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);

  });
};



const ShoppingCheckout = () => {

  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const navigate = useNavigate();


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

    setIsPaymentStart(true);

    const isRazorpayLoaded = await loadRazorpayScript();

    if (!isRazorpayLoaded) {
      showToast.error("Razorpay SDK failed to load");
      setIsPaymentStart(false);
      return;
    }

    const orderData = {
      userId: user?.id,
      username: user?.username,
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
      name: "UniDrobe",
      description: "Order Payment",
      order_id: razorpayOrder.id,

      handler: async (response) => {
        try {
          await dispatch(
            capturePayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId,
            }),
          ).unwrap();

          //Clear Cart on successful order
          dispatch(clearCart());
          navigate("/order-success");
          showToast.success("Payment successfully");

        } catch (error) {
          showToast.error("Payment verification failed");
        } finally {
          setIsPaymentStart(false);
        }
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

    const razorpayInstance = new window.Razorpay(options);

    razorpayInstance.on("Payment failed", () => {
      setIsPaymentStart(false);
      showToast.error("Payment failed")
    });

    razorpayInstance.open();

  };


  return (
    <div className='flex flex-col'>
      <div className="relative h-[250px] w-full overflow-hidden hidden md:block">
        <img
          src={accountBanner}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <h2 className="text-2xl font-extrabold tracking-widest text-center uppercase px-5 mt-4 md:hidden">
        Checkout
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 p-5">
        <ShopAddress
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="relative">
          <div className="lg:sticky lg:top-24 flex flex-col gap-4">

            {cartItems && cartItems.items && cartItems.items.length > 0 ? (
              cartItems.items.map((item) => (
                <UserCartItemsContent
                  key={item.productId}
                  cartItems={item}
                />
              ))
            ) : (
              <div className="font-bold p-4 text-2xl">
                Cart is empty
              </div>
            )}

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
    </div>
  )
}

export default ShoppingCheckout