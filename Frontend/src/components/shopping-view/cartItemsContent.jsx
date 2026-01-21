import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, updateCartItems } from '@/store/shop-slice/cartSlice';
import { showToast } from '@/utils/toast';

const UserCartItemsContent = ({ cartItems }) => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleCartItemDelete = (getCartItem) => {
        dispatch(
            deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
        ).then((data) => {
            if (data?.payload?.success) {
                showToast.success("Product deleted successfully.");
            }
        }
        )
    }

    const handleUpdateQuantity = (getCartItem, typeOfAction) => {
        dispatch(updateCartItems({
            userId: user?.id,
            productId: getCartItem?.productId,
            quantity:
                typeOfAction === "plus"
                    ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1
        })
        )
    }



    return (
        <>
            <div className="flex items-center space-x-4 border rounded-lg p-2">
                <img
                    src={cartItems?.image}
                    alt={cartItems?.title}
                    className='w-20 h-20 rounded object-cover'
                />
                <div className="flex-1">
                    <h3 className="font-extrabold">{cartItems?.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <Button
                            variant='outline'
                            className='h-8 w-8 rounded-full cursor-pointer'
                            size='icon'
                            disabled={cartItems?.quantity === 1}
                            onClick={() => handleUpdateQuantity(cartItems, "minus")}
                        >
                            <Minus />
                            <span className="sr-only">Decrease</span>
                        </Button>
                        <span className="font-semibold">{cartItems?.quantity}</span>
                        <Button
                            variant='outline'
                            className='h-8 w-8 rounded-full cursor-pointer'
                            size='icon'
                            onClick={() => handleUpdateQuantity(cartItems, "plus")}
                        >
                            <Plus />
                            <span className="sr-only">Decrease</span>
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <p className="font-semibold">
                        ₹{((cartItems?.salePrice > 0
                            ? cartItems?.salePrice : cartItems?.price) * cartItems?.quantity).toFixed(2)}
                    </p>
                    <Trash
                        onClick={() => handleCartItemDelete(cartItems)}
                        size={20}
                        className='cursor-pointer mt-1'
                    />
                </div>
            </div>
        </>
    )
}

export default UserCartItemsContent