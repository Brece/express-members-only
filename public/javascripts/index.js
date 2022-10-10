const closeBtns = document.querySelectorAll('.c-hint-message__close');
const dropdownBtn = document.querySelector('.c-btn--dropdown');
const msgForm = document.querySelector('.c-message-form');

if (closeBtns.length > 0) {
    closeBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.currentTarget.parentElement.style.display = 'none';
        });
    });
}

if (dropdownBtn !== null) {
    dropdownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        msgForm.classList.toggle('isVisible');
    });
}
