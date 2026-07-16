document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentVisibleItems = [];
    let currentIndex = 0;


    updateVisibleItems();


    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    item.classList.remove('hidden');

                    item.style.position = 'relative';
                } else {
                    item.classList.add('hidden');

                    setTimeout(() => {
                        if (item.classList.contains('hidden')) {
                            item.style.position = 'absolute';
                        }
                    }, 500);
                }
            });


            setTimeout(updateVisibleItems, 500);
        });
    });

    function updateVisibleItems() {
        currentVisibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
    }


    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const altText = img.getAttribute('alt');
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = altText;
            lightboxImg.className = 'lightbox-img';
            
            currentIndex = currentVisibleItems.indexOf(item);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });


    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }


    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate(-1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate(1);
    });

    function navigate(direction) {
        if (currentVisibleItems.length === 0) return;
        
        currentIndex += direction;
        
        if (currentIndex < 0) {
            currentIndex = currentVisibleItems.length - 1;
        } else if (currentIndex >= currentVisibleItems.length) {
            currentIndex = 0;
        }

        const nextItem = currentVisibleItems[currentIndex];
        const nextImg = nextItem.querySelector('img');
        

        lightboxImg.style.opacity = 0;
        
        setTimeout(() => {
            lightboxImg.src = nextImg.src;
            lightboxCaption.textContent = nextImg.getAttribute('alt');
            lightboxImg.style.opacity = 1;
        }, 300);
    }


    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });
});
