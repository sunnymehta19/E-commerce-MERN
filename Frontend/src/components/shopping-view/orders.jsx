import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import ShopOrderDetails from './orderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUser, getOrderDetails, resetOrderDetails } from '@/store/shop-slice/orderSlice'
import { Badge } from '../ui/badge'

const ShopOrders = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);


  const handleFetchOrderDetails = (getId) => {
    setSelectedOrderId(getId);
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUser(user?.id));
  }, [dispatch])


  useEffect(() => {
    if (orderDetails) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails])


  return (
    <>
      <Card className="border-0 shadow-none md:border md:shadow-sm">
        <CardHeader>
          <CardTitle className="font-bold text-lg">Order History</CardTitle>
        </CardHeader>

        <CardContent  className="px-0 md:px-6 pt-0">
          {/* desktop card view */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Order Status</TableHead>
                  <TableHead>Order Price</TableHead>
                  <TableHead>
                    <span className="sr-only">Details</span>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orderList && orderList.length > 0 ? (
                  [...orderList]
                    .sort(
                      (a, b) =>
                        new Date(b.orderDate) - new Date(a.orderDate)
                    )
                    .map((orderItem) => (
                      <TableRow key={orderItem._id}>
                        <TableCell>{orderItem._id}</TableCell>
                        <TableCell>
                          {orderItem.orderDate.split('T')[0]}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`py-1 px-3 capitalize ${
                              (orderItem.orderStatus === 'pending' &&
                                'bg-yellow-600 text-white') ||
                              (orderItem.orderStatus === 'inProcess' &&
                                'bg-blue-800 text-white') ||
                              (orderItem.orderStatus === 'inShipping' &&
                                'bg-purple-800 text-white') ||
                              (orderItem.orderStatus === 'delivered' &&
                                'bg-green-500 text-white') ||
                              (orderItem.orderStatus === 'rejected' &&
                                'bg-red-600 text-white') ||
                              (orderItem.orderStatus === 'cancelled' &&
                                'bg-red-700 text-white') ||
                              'bg-black text-white'
                            }`}
                          >
                            {orderItem.orderStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {orderItem.totalAmount}
                        </TableCell>
                        <TableCell>
                          <Button
                            className="cursor-pointer"
                            onClick={() =>
                              handleFetchOrderDetails(orderItem._id)
                            }
                          >
                            View details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center p-4 font-bold text-2xl"
                    >
                      No order yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* mobile card view */}
          <div className="md:hidden space-y-4">
            {orderList && orderList.length > 0 ? (
              [...orderList]
                .sort(
                  (a, b) =>
                    new Date(b.orderDate) - new Date(a.orderDate)
                )
                .map((orderItem) => (
                  <div
                    key={orderItem._id}
                    className="border rounded-lg p-4 space-y-2"
                  >
                    <div className="flex justify-between gap-2">
                      <span className="text-xs text-muted-foreground">
                        Order ID
                      </span>
                      <span className="text-sm font-medium truncate max-w-[160px]">
                        {orderItem._id}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">
                        Date
                      </span>
                      <span className="text-sm">
                        {orderItem.orderDate.split('T')[0]}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Status
                      </span>
                      <Badge
                        className={`capitalize ${
                          (orderItem.orderStatus === 'pending' &&
                            'bg-yellow-600 text-white') ||
                          (orderItem.orderStatus === 'inProcess' &&
                            'bg-blue-800 text-white') ||
                          (orderItem.orderStatus === 'inShipping' &&
                            'bg-purple-800 text-white') ||
                          (orderItem.orderStatus === 'delivered' &&
                            'bg-green-500 text-white') ||
                          (orderItem.orderStatus === 'rejected' &&
                            'bg-red-600 text-white') ||
                          (orderItem.orderStatus === 'cancelled' &&
                            'bg-red-700 text-white') ||
                          'bg-black text-white'
                        }`}
                      >
                        {orderItem.orderStatus}
                      </Badge>
                    </div>

                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{orderItem.totalAmount}</span>
                    </div>

                    <Button
                      className="w-full mt-2"
                      onClick={() =>
                        handleFetchOrderDetails(orderItem._id)
                      }
                    >
                      View details
                    </Button>
                  </div>
                ))
            ) : (
              <div className="text-center font-bold text-lg">
                No order yet.
              </div>
            )}
          </div>

          {/* order details */}
          <Dialog
            open={openDetailsDialog}
            onOpenChange={(open) => {
              if (!open) {
                setOpenDetailsDialog(false)
                dispatch(resetOrderDetails())
              }
            }}
          >
            <ShopOrderDetails orderDetails={orderDetails} />
          </Dialog>
        </CardContent>
      </Card>
    </>
  )
}

export default ShopOrders