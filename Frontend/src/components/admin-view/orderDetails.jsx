import React from 'react'
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import OrderStatusForm from '../common/OrderStatusForm'

const AdminOrderDetails = () => {

    const handleStatusUpdate = (data) => {
        
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
                            <Label>000000</Label>
                        </div>
                        <div className="flex mt-1 items-center justify-between">
                            <p className="font-medium">Order Date</p>
                            <Label>23/01/2026</Label>
                        </div>
                        <div className="flex mt-1 items-center justify-between">
                            <p className="font-medium">Order Price</p>
                            <Label>2000</Label>
                        </div>
                        <div className="flex mt-1 items-center justify-between">
                            <p className="font-medium">Payment Method</p>
                            <Label>Cash</Label>
                        </div>
                        <div className="flex mt-1 items-center justify-between">
                            <p className="font-medium">Payment Status</p>
                            <Label>success</Label>
                        </div>
                        <div className="flex mt-1 items-center justify-between">
                            <p className="font-medium">Order Status</p>
                            <Label>In Progress</Label>
                        </div>
                    </div>
                    <Separator />

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <div className="font-medium">Order Details</div>
                            <ul className="grid gap-3">
                                <li className="flex items-center justify-between">
                                    <span>Title: </span>
                                    <span>Quantity: </span>
                                    <span>Price: </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <div className="font-medium">Shipping Info</div>
                            <div className="grid gap-0.5 text-muted-foreground">
                                <span>Sunny</span>
                                <span>Address</span>
                                <span>City</span>
                                <span>Pincode</span>
                                <span>phone</span>
                                <span>notes</span>
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