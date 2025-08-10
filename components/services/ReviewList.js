import React from 'react';
import { Star } from 'react-feather';

const ReviewList = ({ reviews }) => {
    return (
        <div className="mt-4">
            <h4>Reviews</h4>
            {reviews.length === 0 ? (
                <p>No reviews yet</p>
            ) : (
                reviews.map(review => (
                    <div key={review.id} className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-2">
                                <img
                                    src={review.userAvatar || '/default-avatar.png'}
                                    alt={review.userName}
                                    className="rounded-circle me-2"
                                    width="32"
                                    height="32"
                                />
                                <h5 className="mb-0">{review.userName}</h5>
                                <div className="ms-auto d-flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={i < review.rating ? 'text-warning' : 'text-muted'}
                                            size={16}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="mb-0">{review.comment}</p>
                            <small className="text-muted">
                                {new Date(review.createdAt?.toDate()).toLocaleDateString()}
                            </small>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ReviewList;