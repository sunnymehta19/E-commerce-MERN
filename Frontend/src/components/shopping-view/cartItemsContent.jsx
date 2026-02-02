import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, updateCartItems } from '@/store/shop-slice/cartSlice';
import { showToast } from '@/utils/toast';

const UserCartItemsContent = ({ cartItems }) => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    // const { cartItems } = useSelector((state) => state.shopCart);
    const { productList } = useSelector((state) => state.shopProducts);


    const handleCartItemDelete = (getCartItem) => {
        dispatch(
            deleteCartItem({
                userId: user?.id,
                productId: getCartItem?.productId,
                size: getCartItem?.size,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                showToast.success("Product deleted successfully.");
            }
        }
        )
    }

    const handleUpdateQuantity = (getCartItem, typeOfAction) => {
        if (typeOfAction === "plus") {
            const currentProduct = productList.find(
                (product) => product._id === cartItems.productId
            );

            if (!currentProduct) {
                dispatch(updateCartItems({
                    userId: user?.id,
                    productId: getCartItem?.productId,
                    quantity:
                        typeOfAction === "plus"
                            ? getCartItem?.quantity + 1
                            : getCartItem?.quantity - 1,
                    size: getCartItem?.size,

                }));
                return;
            }

            if (cartItems.quantity + 1 > currentProduct.totalStock) {
                showToast.error(
                    `Only ${currentProduct.totalStock} items available in stock`
                );
                return;
            }
        }

        if (typeOfAction === "minus" && cartItems.quantity === 1) return;


        dispatch(updateCartItems({
            userId: user?.id,
            productId: getCartItem?.productId,
            quantity:
                typeOfAction === "plus"
                    ? getCartItem?.quantity + 1
                    : getCartItem?.quantity - 1,
            size: getCartItem?.size,
        })
        )
    }



    return (
        <>
            <div className="flex items-center gap-3 border rounded-lg p-2 md:space-x-4">
                <img
                    src={cartItems?.image}
                    alt={cartItems?.title}
                    className="w-14 h-14 md:w-20 md:h-20 rounded object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                    <h3 className="md:font-extrabold text-sm md:text-base truncate">
                        {cartItems?.title}
                    </h3>

                    <p className="text-xs md:text-sm text-muted-foreground">
                        Size: {cartItems?.size}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                        <Button
                            variant="outline"
                            className="h-7 w-7 md:h-8 md:w-8 rounded-full"
                            size="icon"
                            disabled={cartItems?.quantity === 1}
                            onClick={() => handleUpdateQuantity(cartItems, "minus")}
                        >
                            <Minus />
                        </Button>

                        <span className="font-semibold text-sm md:text-base">
                            {cartItems?.quantity}
                        </span>

                        <Button
                            variant="outline"
                            className="h-7 w-7 md:h-8 md:w-8 rounded-full"
                            size="icon"
                            onClick={() => handleUpdateQuantity(cartItems, "plus")}
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col items-end flex-shrink-0">
                    <p className="font-semibold text-sm md:text-base">
                        ₹{(
                            (cartItems?.salePrice > 0
                                ? cartItems?.salePrice
                                : cartItems?.price) * cartItems?.quantity
                        ).toFixed(2)}
                    </p>

                    <Trash
                        onClick={() => handleCartItemDelete(cartItems)}
                        size={18}
                        className="cursor-pointer mt-1"
                    />
                </div>
            </div>

        </>
    )
}

export default UserCartItemsContent