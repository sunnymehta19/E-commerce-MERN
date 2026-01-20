import ProductFilter from '@/components/shopping-view/Filter'
import ShoppingProductTile from '@/components/shopping-view/productTile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { fetchAllFilteredProducts } from '@/store/shop-slice/productSlice'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'


const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];


const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}


const ShoppingListing = () => {

  const dispatch = useDispatch();
  const { productList } = useSelector(state => state.shopProducts)
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();



  const handleSort = (value) => {
    setSort(value);
  }

  const handleFilter = (getSectionId, getCurrentOption) => {
    console.log(getSectionId, getCurrentOption)

    let copyFilter = { ...filters }
    const indexOfCurrentSection = Object.keys(copyFilter).indexOf(getSectionId);


    if (indexOfCurrentSection === -1) {
      copyFilter = {
        ...copyFilter,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentSection = copyFilter[getSectionId].indexOf(getCurrentOption)

      if (indexOfCurrentSection === -1) {
        copyFilter[getSectionId].push(getCurrentOption);
      } else {
        copyFilter[getSectionId].splice(indexOfCurrentSection, 1)
      }
    }

    setFilters(copyFilter);
    sessionStorage.setItem("filters", JSON.stringify(copyFilter));

  }

  console.log(filters, searchParams, "filters")



  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [])

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters])



  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
    }
  }, [dispatch, sort, filters])


  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 ">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='flex items-center gap-1 cursor-pointer'>
                  <ArrowUpDownIcon className='h-4 w-4' />
                  <span>Sort by</span>
                </Button>

              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort} >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                    className='cursor-pointer'
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 h-[78vh] overflow-y-auto no-scrollbar">
          {productList && productList.length > 0
            ? productList.map((productItem) => (

              <ShoppingProductTile
                key={productItem._id}
                product={productItem}

              />
            )) : null}
        </div>

      </div>
    </div>
  )
}

export default ShoppingListing