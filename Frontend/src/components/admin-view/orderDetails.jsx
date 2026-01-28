import React from 'react'
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import OrderStatusForm from './OrderStatusForm'
import { Badge } from '../ui/badge'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from '@/store/admin-slice/orderSlice'
import { showToast } from '@/utils/toast'

const AdminOrderDetails = ({ orderDetails, onClose }) => {

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleStatusUpdate = (data) => {

        dispatch(
            updateOrderStatus({
                id: orderDetails?._id,
                orderStatus: data.orderStatus,
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
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto pill-scrollbar">
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
                                    className={`py-1 px-3 capitalize ${orderDetails?.orderStatus === "pending" && "bg-yellow-600 text-white" ||
                                        orderDetails?.orderStatus === "inProcess" && "bg-blue-800 text-white" ||
                                        orderDetails?.orderStatus === "inShipping" && "bg-purple-800 text-white" ||
                                        orderDetails?.orderStatus === "delivered" && "bg-green-500 text-white" ||
                                        orderDetails?.orderStatus === "rejected" && "bg-red-600 text-white" ||
                                        orderDetails?.orderStatus === "cancelled" && "bg-red-700 text-white" ||
                                        "bg-black text-white"
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
                            <div className="font-medium">Product Details</div>
                            <ul className="grid gap-3">
                                {
                                    orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                                        ? orderDetails?.cartItems.map((item) => (
                                            <div key={item?._id} className="flex items-center border p-2 rounded-lg justify-between">
                                                <div className="flex gap-4 items-center  ">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-16 h-16 object-cover rounded-md"
                                                    />

                                                    <div className="flex flex-col ">
                                                        <p className="font-semibold">{item.title}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Size: {item.size || "FREE"}
                                                        </p>
                                                        <p className="text-sm">Qty: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <p className="text-lg font-medium">₹{item.price}</p>

                                                </div>
                                            </div>
                                        )) : null
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <div className="font-medium">Shipping Info</div>
                            <div className="grid  text-muted-foreground">
                                <span className='font-bold capitalize'>{orderDetails?.username}</span>
                                <span>{orderDetails?.addressInfo?.address}</span>
                                <span>{orderDetails?.addressInfo?.city}</span>
                                <span>{orderDetails?.addressInfo?.pincode}</span>
                                <span>{orderDetails?.addressInfo?.phone}</span>
                                <span>Landmark: {orderDetails?.addressInfo?.notes}</span>

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