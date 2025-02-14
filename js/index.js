window.addEventListener('DOMContentLoaded', () => {

    // Modal

    const buttonsModal = document.querySelectorAll('.order__call'),
        overlay = document.querySelector('.overlay'),
        modal = document.querySelector('.modal'),
        returnPage = document.querySelector('.return__page'),
        main = document.querySelector('main'),
        submitBtns = document.querySelectorAll('.callback__btn'),
        returnBtn = document.querySelector('.return__btn');

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

    submitBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openReturn();
        } )
    })

    returnBtn.addEventListener('click', closeReturn);


    // Slider

    const certificates = document.querySelectorAll('.thanks__letter'),
            prev = document.querySelector('.arrow__left'),
            next = document.querySelector('.arrow__right'),
            slidesWrapper = document.querySelector('.slider-wrapper'),
            slidesField = document.querySelector('.slider-inner'),
            width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1,
        offset = 0;


        slidesField.style.width = 100 * certificates.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';

        slidesWrapper.style.overflow = 'hidden';

        certificates.forEach(certificate => {
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
});