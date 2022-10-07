const addBtn = document.querySelector('#addBtn');
const closeBtn = document.querySelector('#closeBtn');
const popup = document.querySelector('#c-popup');
const deleteBtns = document.querySelectorAll('.c-btn--popup');
const overlay = document.querySelector('.c-overlay');


if (addBtn !== null && closeBtn !== null) {
    addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        popup.classList.add('isActive');
        overlay.classList.add('isActive');
    });

    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        popup.classList.remove('isActive');
        overlay.classList.remove('isActive');
    });
}

if (deleteBtns !== null) {
    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            popup.classList.add('isActive');
            overlay.classList.add('isActive');
        });
    });
}