import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import AdminOrderDetails from './orderDetails'

const AdminOrdersContent = () => {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>All Orders</CardTitle>
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
                            <TableRow>
                                <TableCell>00000</TableCell>
                                <TableCell>23/01/2026</TableCell>
                                <TableCell>In Progress</TableCell>
                                <TableCell>3000</TableCell>
                                <TableCell>
                                    <Dialog
                                        open={openDetailsDialog}
                                        onOpenChange={setOpenDetailsDialog}
                                    >
                                        <Button
                                            onClick={() => setOpenDetailsDialog(true)}
                                            className="cursor-pointer">view detials
                                        </Button>
                                        <AdminOrderDetails />
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}

export default AdminOrdersContent