const formInput = document.querySelectorAll('.form-input');
const formPlaceholder = document.querySelectorAll('.form-placeholder');

formInput.forEach(input => {
    const placeholder = input.nextElementSibling
    input.addEventListener('focusin', () => {
        placeholder.style.top = '-5px';
        placeholder.style.fontSize = '15px';
    })
    input.addEventListener('focusout', () => {
        if(input.value === '') {
            placeholder.style.top = '10px';
            placeholder.style.fontSize = '20px';
        }
    })
})