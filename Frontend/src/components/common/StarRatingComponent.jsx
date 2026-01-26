import React from 'react'
import { Button } from '../ui/button'
import { StarIcon } from 'lucide-react'

const StarRatingComponent = ({ rating, handleRatingChange }) => {
    return (
        <>
            {[1, 2, 3, 4, 5].map((star) => (
                <Button
                    key={star}
                    variant="outline"
                    size="icon"
                    onClick={handleRatingChange ? () => handleRatingChange(star) : null}
                    className="p-2 rounded-full transition-colors hover:bg-muted"
                >
                    <StarIcon
                        className={`
                            w-6 h-6 transition-colors
                            ${
                                star <= rating
                                    ? "fill-black text-black hover:fill-gray-500 hover:text-gray-500"
                                    : "fill-transparent text-black hover:fill-gray-400 hover:text-gray-400"
                            }
                        `}
                    />
                </Button>
            ))}
        </>
    )
}

export default StarRatingComponent
