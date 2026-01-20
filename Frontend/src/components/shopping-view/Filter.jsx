import React, { Fragment } from 'react'
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';


const filterOptions = {
    category: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "accessories", label: "Accessories" },
        { id: "footwear", label: "Footwear" },
    ],
    brand: [
        { id: "nike", label: "Nike" },
        { id: "adidas", label: "Adidas" },
        { id: "puma", label: "Puma" },
        { id: "levi", label: "Levi's" },
        { id: "zara", label: "Zara" },
        { id: "h&m", label: "H&M" },
    ],
};

const ProductFilter = ({ filters, handleFilter }) => {
    return (
        <div className="bg-background rounded-lg shadow-sm h-fit">
            <div className="p-4 border-b">
                <h2 className="text-lg font-extrabold">Filters</h2>
            </div>
            <div className="p-4 space-y-4">
                {Object.keys(filterOptions).map((keyItem) => (
                    <Fragment key={keyItem}>
                        <div>
                            <h3 className="text-base font-bold capitalize">{keyItem}</h3>
                            <div className="grid gap-2 mt-2">
                                {filterOptions[keyItem].map((option) => (
                                    <Label key={option.id} className="flex font-medium items-center gap-2 cursor-pointer ">
                                        <Checkbox
                                            checked={
                                                filters && Object.keys(filters).length > 0 &&
                                                filters[keyItem] &&
                                                filters[keyItem].indexOf(option.id) > -1
                                            }
                                            className="cursor-pointer"
                                            onCheckedChange={() => handleFilter(keyItem, option.id)}
                                        />
                                        {option.label}
                                    </Label>
                                ))}
                            </div>
                        </div>
                        <Separator />
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default ProductFilter