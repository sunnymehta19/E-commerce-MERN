import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ShoppingProductTile from '@/components/shopping-view/productTile';
import { Input } from '@/components/ui/input'
import { getSearchResults, resetSearchResults } from '@/store/shop-slice/searchSlice';
import { showToast } from '@/utils/toast';
import { addToCart, fetchCartItems } from '@/store/shop-slice/cartSlice';
import { Skeleton } from '@/components/ui/skeleton';

const ShopSearchProducts = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
    const dispatch = useDispatch();
    const { searchResults, loading } = useSelector((state) => state.shopSearch);
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);





    useEffect(() => {
        const trimmedKeyword = keyword.trim();

        if (trimmedKeyword && trimmedKeyword.length > 3) {
            setIsSearching(true);

            const timer = setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${trimmedKeyword}`));
                dispatch(getSearchResults(trimmedKeyword))
                    .finally(() => setIsSearching(false));
            }, 1000);

            return () => {
                clearTimeout(timer);
            }
        }

        if (!trimmedKeyword) {
            setIsSearching(false);
            setSearchParams(new URLSearchParams())
            dispatch(resetSearchResults())
        }
    }, [keyword, dispatch, setSearchParams])


    //handle search keyword on navigation
    useEffect(() => {
        const urlKeyword = searchParams.get('keyword')

        if (urlKeyword && searchResults.length === 0) {
            dispatch(getSearchResults(urlKeyword))
        }
    }, [])

    //Handle Add to Cart
    const handleAddToCart = (getCurrentProductId, getTotalStock) => {

         if ( !selectedSize) {
            showToast.error("Please select a size");
            return;
        }

        let getCartItems = cartItems.items || [];

        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(
                (item) => item.productId === getCurrentProductId
            );
            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    showToast.error(`Only ${getQuantity} items available in stock`);
                    return;
                }
            }
        }

        dispatch(addToCart({
            userId: user?.id, productId: getCurrentProductId, quantity: 1
        })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user.id));
                showToast.success("Added to Cart");
            }
        })
    }




    return (
        <>
            <div className="container mx-auto md:px-6 px-4 py-8">
                <div className="flex justify-center mb-4">
                    <div className="w-full flex items-center">
                        <Input
                            name="keyword"
                            value={keyword}
                            className="py-6 my-4"
                            placeholder="Search Products..."
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                </div>
                {searchResults.length > 0 && (
                    <p className="mb-4 text-sm text-muted-foreground">
                        Showing results for{' '}
                        <span className="font-semibold">"{keyword}"</span>
                    </p>
                )}

                {keyword.trim().length > 0 && keyword.trim().length <= 2 && (
                    <p className="text-lg text-yellow-600 mt-2">
                        Please enter at least 3 characters to search
                    </p>
                )}

                {
                    keyword.trim().length >= 3 &&
                    !loading &&
                    !isSearching &&
                    searchResults.length === 0 && (
                        <h1 className="text-3xl font-extrabold mt-6">
                            No result found!
                        </h1>
                    )
                }

                {/* Loading Screen */}
                {
                    (loading || isSearching) && (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} className="h-[300px] w-full rounded-lg" />
                            ))}
                        </div>
                    )
                }

                {
                    !loading && searchResults.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 mb-2">
                            {searchResults.map((item) => (
                                <div key={item._id}>
                                    <ShoppingProductTile
                                        handleAddToCart={handleAddToCart}
                                        product={item}
                                    />
                                </div>
                            ))}
                        </div>
                    )
                }

            </div>
        </>
    )
}

export default ShopSearchProducts