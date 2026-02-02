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
                className={`gap-4 px-2 py-3 flex flex-col h-full cursor-pointer
                    ${selectedId?._id === addressInfo?._id
                        ? "border-red-950 border-[4px]"
                        : 'border-muted-foreground'

                    }`}
            >
                <CardContent className="grid px-3 gap-2 ">
                    <Label className="leading-4 capitalize">
                        {addressInfo?.address}, {addressInfo?.city}, {addressInfo?.pincode}
                    </Label>
                    <Label>{addressInfo?.phone}</Label>
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