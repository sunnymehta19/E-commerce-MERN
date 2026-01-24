import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const orderStatusOptions = [
    { id: "pending", label: "Pending" },
    { id: "inProcess", label: "In Process" },
    { id: "inShipping", label: "In Shipping" },
    { id: "delivered", label: "Delivered" },
    { id: "rejected", label: "Rejected" },
];

const OrderStatusForm = ({ defaultStatus = "pending", onSubmitStatus }) => {
    const form = useForm({
        defaultValues: {
            status: defaultStatus,
        },
    });

    const onSubmit = (data) => {
        onSubmitStatus?.({
            orderStatus: data.status
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
            >
                <FormField
                    control={form.control}
                    name="status"
                    rules={{ required: "Order status is required" }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Update Order Status</FormLabel>

                            <FormControl>
                                <Select 
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger  className="w-full">
                                        <SelectValue placeholder="Select order status" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {orderStatusOptions.map((option) => (
                                            <SelectItem
                                             
                                                key={option.id}
                                                value={option.id}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full cursor-pointer">
                    Update Status
                </Button>
            </form>
        </Form>
    );
};

export default OrderStatusForm;
