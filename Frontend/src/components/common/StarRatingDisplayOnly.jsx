import { StarIcon } from 'lucide-react'
import React from 'react'

const StarRatingDisplayOnly = ({ rating }) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                    key={star}
                    className={`w-5 h-5 ${star <= rating
                            ? "fill-black text-black"
                            : "fill-muted text-muted-foreground"
                        }`}
                />
            ))}
        </div>
    )
}

export default StarRatingDisplayOnly