import { React, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddress, deleteAddress, editAddress, fetchAllAddress } from '@/store/shop-slice/addressSlice';
import { showToast } from '@/utils/toast';
import ShopAddressCard from './addressCard';


const initialAddressFormData = {
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: "",
};



const ShopAddress = ({ setCurrentSelectedAddress, selectedId }) => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { addressList } = useSelector((state) => state.shopAddress);
    const [currentEditedId, setCurrentEditedId] = useState(null)

    const form = useForm({
        defaultValues: initialAddressFormData,
        mode: "onChange"
    });

    const onSubmit = (data) => {

        if (addressList.length >= 3 && currentEditedId === null) {
            form.reset(initialAddressFormData);
            showToast.error("Address limit reached (maximum 3).");

            return;
        }

        currentEditedId !== null
            ? dispatch(editAddress({
                userId: user?.id, addressId: currentEditedId, formData: data
            })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddress(user?.id));
                    setCurrentEditedId(null);
                    form.reset(initialAddressFormData);
                    showToast.success("Address updated successfully.")
                }
            })
            : dispatch(
                addNewAddress({
                    ...data,
                    userId: user?.id,
                })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddress(user?.id));
                    form.reset();
                    showToast.success("Address added successfully.")
                }
            });
    }

    const handleEditAddress = (getCurrentAddress) => {
        setCurrentEditedId(getCurrentAddress._id);

        form.reset({
            address: getCurrentAddress.address,
            city: getCurrentAddress.city,
            phone: getCurrentAddress.phone,
            pincode: getCurrentAddress.pincode,
            notes: getCurrentAddress.notes || "",
        });
    }


    const handleDeleteAddress = (getCurrentAddress) => {
        dispatch(deleteAddress({
            userId: user?.id, addressId: getCurrentAddress._id
        })
        ).then(((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddress(user?.id));
                showToast.success("Address deleted successfully.")
            }
        }
        ));
    }



    useEffect(() => {
        dispatch(fetchAllAddress(user?.id))
    }, [dispatch, user?.id])



    return (
        <>
            <Card className="py-3 ">
                <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-2">
                    {
                        addressList && addressList.length > 0
                            ? addressList.map((addressItem) => (
                                <ShopAddressCard
                                    key={addressItem._id}
                                    selectedId={selectedId}
                                    addressInfo={addressItem}
                                    handleDeleteAddress={handleDeleteAddress}
                                    handleEditAddress={handleEditAddress}
                                    setCurrentEditedId={setCurrentEditedId}
                                    setCurrentSelectedAddress={setCurrentSelectedAddress}
                                />
                            )) : null
                    }
                </div>
                <CardHeader>
                    <CardTitle className="text-lg font-bold">{currentEditedId !== null ? "Edit Address" : "Add New Address"}</CardTitle>
                </CardHeader>
                <CardContent >
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 cursor-pointer"
                        >
                            {/* Address */}
                            <FormField
                                control={form.control}
                                name="address"
                                rules={{ required: "Address is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="House no, street, area" {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* City */}
                            <FormField
                                control={form.control}
                                name="city"
                                rules={{ required: "City is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="City" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Phone */}
                            <FormField
                                control={form.control}
                                name="phone"
                                rules={{
                                    required: "Phone number is required",
                                    minLength: {
                                        value: 10,
                                        message: "Phone number must be 10 digits",
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "Phone number must be 10 digits",
                                    },
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="tel"
                                                placeholder="10-digit mobile number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Pincode */}
                            <FormField
                                control={form.control}
                                name="pincode"
                                rules={{
                                    required: "Pincode is required",
                                    pattern: {
                                        value: /^[0-9]{6}$/,
                                        message: "Pincode must be 6 digits",
                                    },
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pincode</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"        // ✅ FIXED
                                                inputMode="numeric"
                                                placeholder="Pincode"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Notes */}
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Landmark (Optional)</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nearby landmark, delivery notes"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit"
                                disabled={!form.formState.isValid}
                                className={`w-full ${!form.formState.isValid
                                    ? "opacity-60 cursor-not-allowed"
                                    : "cursor-pointer"
                                    }`}
                            >
                                {currentEditedId !== null ? "Edit Address" : "Add Address"}
                            </Button>

                        </form>
                    </Form>

                </CardContent>

            </Card>
        </>
    )
}

export default ShopAddress