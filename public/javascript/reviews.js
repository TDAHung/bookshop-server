(() => {
    const renderStarRating = (rating) => {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHTML += '<i class="fas fa-star "></i>';
            } else if (rating > i - 1 && rating < i) {
                starsHTML += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHTML += '<i class="far fa-star"></i>';
            }
        }
        return starsHTML;
    }

    const review_rating = document.querySelectorAll('.t-row.review__rating');
    review_rating.forEach((rating) => {
        rating.innerHTML = renderStarRating(rating.innerText);
    });
})()
