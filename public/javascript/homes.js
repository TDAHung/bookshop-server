const ctx = document.getElementById('myChart');

const lineChartData = document.getElementById('lineChartData');
const monthPattern = /<div class="month">(\d{4}-\d{2})<\/div>/g;
const pricePattern = /<div class="total_price">(\d+)<\/div>/g;
let months = [];
let prices = [];
let match;
while ((match = monthPattern.exec(lineChartData.innerHTML)) !== null) {
    months.push(match[1]);
}

while ((match = pricePattern.exec(lineChartData.innerHTML)) !== null) {
    prices.push(match[1]);
}

new Chart(ctx, {
    type: 'line',
    data: {
        labels: months.reverse(),
        datasets: [{
            label: 'Revenue of Month',
            data: prices.reverse(),
            borderWidth: 1,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.4
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Revenue USD'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Month'
                }
            }
        }
    }
});

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

    const review_rating = document.querySelector('.book__rating');
    const shop_rating = document.querySelector('.shop__rating');
    review_rating.innerHTML = renderStarRating(review_rating.innerText);
    shop_rating.innerHTML = renderStarRating(shop_rating.innerText);
})()
