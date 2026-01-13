import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React, { Fragment, useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"

// const initialFormData = {
//   image: null,
//   title: "",
//   description: "",
//   category: "",
//   brand: "",
//   price: "",
//   salePrice: "",
//   totalStock: "",
//   averageReview: 0,
// }

const AdminProducts = () => {

  const [createProductDialog, setCreateProductDialog] = useState(false);
  // const [formData, setformData] = useState(initialFormData);

  const form = useForm({
    defaultValues: {
      image: null,
      title: "",
      description: "",
      category: "",
      brand: "",
      price: "",
      salePrice: "",
      totalStock: "",
      averageReview: 0,
    },
  })


  const onSubmit = (data) => {
    console.log("Product Data:", data);
    setCreateProductDialog(false);
    form.reset()
  }


  return (
    <>
      <Fragment>
        <div className="mt-5 flex w-full justify-end">
          <Button onClick={() => { setCreateProductDialog(true) }} >
            Add New Product
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Sheet
            open={createProductDialog}
            onOpenChange={() => {
              setCreateProductDialog(false)

            }}
          >
            <SheetContent side='right' className='overflow-auto'>
              <SheetHeader>
                <SheetTitle className='text-lg'>
                  Add New Product
                </SheetTitle>
              </SheetHeader>
              <div className="py-2 px-3">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'
                  >
                    {/* Title */}
                    <FormField
                      control={form.control}
                      name="title"
                      rules={{ required: "Title is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder='Product title' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description */}
                    <FormField
                      control={form.control}
                      name="description"
                      rules={{ required: "Description is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea className='resize-none h-[10vh] ' placeholder="Product Description" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />






                  </form>
                </Form>
              </div>
            </SheetContent>

          </Sheet>
        </div>
      </Fragment>
    </>
  )
}

export default AdminProducts