(() => {
    const descriptions = document.querySelectorAll('.book__description');
    descriptions.forEach(description => {
        console.log(description);
        const fullText = description.innerText;
        const truncatedText = fullText.split(' ').slice(0, 30).join(' ');

        if (fullText.split(' ').length > 30) {
            const showMoreBtn = document.createElement('button');
            showMoreBtn.textContent = ' Show More';
            showMoreBtn.classList.add('show-more-btn');

            const showLessBtn = document.createElement('button');
            showLessBtn.textContent = ' Show Less';
            showLessBtn.classList.add('show-less-btn');
            showLessBtn.style.display = 'none';

            description.textContent = truncatedText + '...';
            description.appendChild(showMoreBtn);
            description.appendChild(showLessBtn);

            showMoreBtn.addEventListener('click', () => {
                description.textContent = fullText;
                showMoreBtn.style.display = 'none';
                showLessBtn.style.display = 'inline';
            });

            showLessBtn.addEventListener('click', () => {
                description.textContent = truncatedText + '...';
                description.appendChild(showMoreBtn);
                description.appendChild(showLessBtn);
                showMoreBtn.style.display = 'inline';
                showLessBtn.style.display = 'none';
            });
        }
    });
})();
