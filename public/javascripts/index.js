const closeBtns = document.querySelectorAll('.c-hint-message__close');


if (closeBtns.length > 0) {
    closeBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.currentTarget.parentElement.style.display = 'none';
        });
    });
}
