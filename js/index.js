window.addEventListener('DOMContentLoaded', () => {

    // Modal

    const buttonsModal = document.querySelectorAll('.order__call'),
        overlay = document.querySelector('.overlay'),
        modal = document.querySelector('.modal'),
        returnPage = document.querySelector('.return__page'),
        main = document.querySelector('main'),
        modalBtn = document.querySelector('.modal__btn'),
        inviteBtn = document.querySelector('.invite__btn'),
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
        
        // modalBtn.value ='Оставить заявку';
        // inviteBtn.value = 'ПОСЕТИТЬ ПРОИЗВОДСТВО';

    
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

});