// document.getElementById('password').type = 'password';

$('body').click(function(evt){ 

    const label = $('.form-label')
    label.each(function(i) {
        const input = this.children[0];
        const placeholder = this.children[1];

        if($(evt.target).closest(`.${input.className}`).length && input.value.length == 0) {
            placeholder.style.position = "relative"
            placeholder.style.top = "-77px"
            placeholder.style.fontSize = "15px"
            return;
        }

        if($(evt.target).closest(`.${placeholder.className}`).length && input.value.length == 0) {
            placeholder.style.position = "relative"
            placeholder.style.top = "-77px"
            placeholder.style.fontSize = "15px"
            return;  
        }

        if(input.value.length == 0) {
            placeholder.style.position = "relative"
            placeholder.style.top = "-60px"
            placeholder.style.fontSize = "20px"
        }
    })
    
});