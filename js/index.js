window.addEventListener('DOMContentLoaded', () => {
    // Slider

    const certificates = document.querySelectorAll('.thanks__letter');
    const prev = document.querySelector('.arrow__left');
    const next = document.querySelector('.arrow__right');
    const slidesWrapper = document.querySelector('.slider-wrapper');
    const slidesField = document.querySelector('.slider-inner');
    let width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;


        slidesField.style.width = 100 * certificates.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';

        slidesWrapper.style.overflow = 'hidden';

        certificates.forEach(certificate => {
            let width = window.getComputedStyle(slidesWrapper).width;
            certificate.style.width = width;
        });

        next.addEventListener('click', () => {
            if (offset == +width.slice(0, width.length - 2) * (certificates.length - 1)) {
                offset = 0;
            } else {
                offset += +width.slice(0, width.length - 2);
            }
    
            slidesField.style.transform = `translateX(-${offset}px)`
    
            if (slideIndex == certificates.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }
        });

        prev.addEventListener('click', () => {
            if (offset == 0) {
                offset = +width.slice(0, width.length - 2) * (certificates.length - 1);
            } else {
                offset -= +width.slice(0, width.length - 2);
            }
    
            slidesField.style.transform = `translateX(-${offset}px)`
    
            if (slideIndex == 1) {
                slideIndex = certificates.length;
            } else {
                slideIndex--;
            }
        });


        // Forms and Modal
        const forms = document.querySelectorAll('form');
        const buttonsModal = document.querySelectorAll('.order__call');
        const overlay = document.querySelector('.overlay');
        const modal = document.querySelector('.modal');
        const returnPage = document.querySelector('.return__page');
        const main = document.querySelector('main');
        const returnBtn = document.querySelector('.return__btn');

    function openModal() {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        modal.classList.add('show');
        overlay.classList.add('show');
        modal.classList.remove('hide');
        overlay.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const inputs = document.querySelectorAll('.callback__input');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            }
            input.value = '';
        });
    
        modal.classList.remove('show');
        overlay.classList.remove('show');
        modal.classList.add('hide');
        overlay.classList.add('hide');
        document.body.style.overflow = '';
    }

    buttonsModal.forEach((btn) => {
        btn.addEventListener('click', openModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    overlay.addEventListener('click', closeModal);

    function openReturn() {
        closeModal();
        main.classList.remove('show__main');
        main.classList.add('hide__main');
        returnPage.classList.add('show__main');
        returnPage.classList.remove('hide__main');
    }

    function closeReturn() {
        main.classList.add('show__main');
        main.classList.remove('hide__main');
        returnPage.classList.remove('show__main');
        returnPage.classList.add('hide__main');
    }


    returnBtn.addEventListener('click', closeReturn);

    forms.forEach(item => {
        bindPostData(item);
    });
    
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
    
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
    
            const formData = new FormData(form);
    
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
    
            postData('http://localhost:3000/requests', json)
            .then(data => {
                form.reset();
            }).finally(() => {
                form.reset();
            })
            openReturn();
        });
    }


    function applyStyles() {
        if (window.innerWidth <= 950) {
            certificates.forEach(certificate => {
                certificate.style.width = '25vw';
                certificate.style.objectFit = 'contain';
            });
            slidesWrapper.style.width = '25vw';
        } else {
            certificates.forEach(certificate => {
                certificate.style.width = '';
                certificate.style.objectFit = '';
            });

            slidesWrapper.style.width = '';
        }
    }


    window.addEventListener('resize', applyStyles);
});