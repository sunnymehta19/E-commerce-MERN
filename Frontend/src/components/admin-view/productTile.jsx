import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

const AdminProductTile = ({ product, setCreateProductDialog }) => {
    return (
        <>
            <Card className="w-full max-w-sm mx-auto p-0 ">
                <div>
                    <div className="relative">
                        <img
                            src={product?.image}
                            alt={product?.title}
                            className='w-full h-[180px] md:h-[250px] object-center rounded-t-lg'
                        />
                    </div>
                    <div>
                        <CardContent className="px-3">
                            <h2 className='text-base md:text-xl font-semibold mb-2 mt-2 overflow-x-scroll no-scrollbar whitespace-nowrap'>{product?.title}</h2>
                            <div className="flex justify-between items-center mb-2">
                                <span
                                    className={`${product?.salePrice > 0 ? "line-through" : ""
                                        } text-lg font-semibold text-primary`}
                                >
                                    ${product?.price}
                                </span>
                                {product?.salePrice > 0 ? (
                                    <span className="text-lg font-bold">${product?.salePrice}</span>
                                ) : null}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center pb-3 px-3">
                            <Button
                                onClick={() => {
                                    setCreateProductDialog(true);

                                }}
                            >
                                Edit
                            </Button>
                            <Button>Delete</Button>
                        </CardFooter>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default AdminProductTile