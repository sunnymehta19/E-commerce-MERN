import React from 'react'
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import OrderStatusForm from '../common/OrderStatusForm'
import { Badge } from '../ui/badge'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from '@/store/admin-slice/orderSlice'
import { showToast } from '@/utils/toast'

const AdminOrderDetails = ({ orderDetails }) => {

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleStatusUpdate = (data) => {
        const { status } = data;

        dispatch(
            updateOrderStatus({
                id: orderDetails?._id, orderStatus: data
            })
        ).then((response) => {
            if (response?.payload?.success) {
                dispatch(getOrderDetailsForAdmin(orderDetails?._id));
                dispatch(getAllOrdersForAdmin());
                showToast.success("Order status updated successfully");
            }
        });
    }

    return (
        <>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-extrabold">Order Details</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6">
                    <div className="grid gap-1">
                        <div className="flex  items-center justify-between">
                            <p className="font-medium">Order ID</p>
                            <Label>{orderDetails?._id}</Label>
                        </div>
                        <div className="flex mt-1 items-center justify-between">
                            <p className="font-medium">Order Date</p>
                            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
                        </div>
                        <div className="flex mt-1 items-center justify-between">
                            <p className="font-medium">Order Price</p>
                            <Label>{orderDetails?.totalAmount}</Label>
                        </div>
                        <div className="flex mt-1 items-center justify-between">
                            <p className="font-medium">Payment Method</p>
                            <Label>{orderDetails?.paymentMethod}</Label>
                        </div>
                        <div className="flex mt-1 items-center justify-between">
                            <p className="font-medium">Payment Status</p>
                            <Label>{orderDetails?.paymentStatus}</Label>
                        </div>
                        <div className="flex mt-1 items-center justify-between">
                            <p className="font-medium">Order Status</p>
                            <Label>
                                <Badge
                                    className={`py-1 px-3 ${orderDetails?.orderStatus === "confirmed"
                                        ? "bg-green-500"
                                        : orderDetails?.orderStatus === "rejected"
                                            ? "bg-red-600"
                                            : "bg-black"
                                        }`}
                                >
                                    {orderDetails?.orderStatus}
                                </Badge>
                            </Label>
                        </div>
                    </div>
                    <Separator />

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <div className="font-medium">Order Details</div>
                            <ul className="grid gap-3">
                                {
                                    orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                                        ? orderDetails?.cartItems.map((item) => (
                                            <li className="flex items-center justify-between">
                                                <span>Title: {item.title}</span>
                                                <span>Quantity: {item.quantity}</span>
                                                <span>Price: ₹{item.price}</span>
                                            </li>
                                        )) : null
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <div className="font-medium">Shipping Info</div>
                            <div className="grid gap-0.5 text-muted-foreground">
                                <span>{user.username}</span>
                                <span>{orderDetails?.addressInfo?.address}</span>
                                <span>{orderDetails?.addressInfo?.city}</span>
                                <span>{orderDetails?.addressInfo?.pincode}</span>
                                <span>{orderDetails?.addressInfo?.phone}</span>
                                <span>{orderDetails?.addressInfo?.notes}</span>

                            </div>
                        </div>
                    </div>
                    <Separator />

                    <OrderStatusForm
                        defaultStatus='inProcess'
                        onSubmitStatus={handleStatusUpdate}
                    />
                </div>
            </DialogContent>
        </>
    )
}

export default AdminOrderDetails