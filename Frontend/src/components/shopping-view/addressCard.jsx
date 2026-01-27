import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const ShopAddressCard = ({ addressInfo, handleEditAddress, handleDeleteAddress, setCurrentSelectedAddress, selectedId }) => {
    return (
        <>
            <Card
                onClick={setCurrentSelectedAddress ?
                    () => setCurrentSelectedAddress(addressInfo)
                    : null
                }
                className={`gap-4 p-4 flex flex-col h-full cursor-pointer
                    ${selectedId?._id === addressInfo?._id 
                        ? "border-red-950 border-[4px]"
                        : 'border-black'

                    }`}
            >
                <CardContent className="grid px-3 gap-3">
                    <Label>Address: {addressInfo?.address}</Label>
                    <Label>City: {addressInfo?.city}</Label>
                    <Label>Pincode: {addressInfo?.pincode}</Label>
                    <Label>Phone No.: {addressInfo?.phone}</Label>
                    {addressInfo?.notes && (
                        <Label>Landmark: {addressInfo.notes}</Label>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between px-3 mt-auto">
                    <Button
                        onClick={() => handleEditAddress(addressInfo)}
                        className="cursor-pointer"
                    >
                        <FaEdit />
                    </Button>
                    <Button
                        onClick={() => handleDeleteAddress(addressInfo)}
                        className="cursor-pointer"
                    >
                        <MdDelete />
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default ShopAddressCard