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
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);


  const handleFetchOrderDetails = (getId) => {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUser(user?.id));
  }, [dispatch])

  console.log("orderList:", orderList);

  useEffect(() => {
    if (orderDetails) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails])


  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead><span className="sr-only">Details</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                orderList && orderList.length > 0 ? (
                  [...orderList]
                    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
                    .map((orderItem) => (
                      <TableRow key={orderItem._id}>
                        <TableCell>{orderItem?._id}</TableCell>
                        <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                        <TableCell>
                          <Badge
                            className={`py-1 px-3 ${orderItem?.orderStatus === "confirmed"
                              ? "bg-green-500"
                              : orderItem?.orderStatus === "rejected"
                                ? "bg-red-600"
                                : "bg-black"
                              }`}
                          >
                            {orderItem?.orderStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{orderItem?.totalAmount}</TableCell>
                        <TableCell>
                          <Dialog
                            open={openDetailsDialog}
                            onOpenChange={(open) => {
                              if (!open) {
                                setOpenDetailsDialog(false);
                                dispatch(resetOrderDetails());
                              }
                            }}
                          >
                            <Button
                              onClick={() => handleFetchOrderDetails(orderItem?._id)}
                            >
                              View details
                            </Button>
                            <ShopOrderDetails orderDetails={orderDetails} />
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center p-4 font-bold text-2xl">
                      No order yet.
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

export default ShopOrders