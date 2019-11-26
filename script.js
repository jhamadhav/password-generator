var show_strength, range, strength = 6;
var password = '';
var checkbox, upper, lower, num, sym;

// set of variables
var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var lo = 'abcdefghijklmnopqrstuvwxyz';
var num_list = '0123456789';
var sym_list = '!@#$%^&*()-_+={[}]:;<,>.?/';
var main_set = '';

window.onload = function () {
    range = document.getElementById('myRange');
    show_strength = document.getElementById('slide-value');
    checkbox = document.getElementsByClassName('checkbox');
    upper = checkbox[0];
    lower = checkbox[1];
    num = checkbox[2];
    sym = checkbox[3];
    generate();
}
function set_strength_s() {

    strength = range.value;
    let val = (strength / 250) * 100;
    range.style.background = 'linear-gradient(to right, #fb542b 0%, #fb542b ' + val + '%, gray ' + val + '%, gray 100%)'
    show_strength.value = strength;

    generate();
    strength_indicator();
}
function set_strength_i() {
    strength = show_strength.value;
    range.value = strength;
    let val = (strength / 250) * 100;
    range.style.background = 'linear-gradient(to right, #fb542b 0%, #fb542b ' + val + '%, gray ' + val + '%, gray 100%)'

    generate();
    strength_indicator();
}

function generate() {

    //making the main set
    main_set = '';
    password = '';
    if (upper.checked) {
        main_set += alpha;
    }
    if (lower.checked) {
        main_set += lo;
    }
    if (num.checked) {
        main_set += num_list;
    }
    if (sym.checked) {
        main_set += sym_list;
    }

    // console.log(main_set);
    if (main_set.trim().length > 0) {


        for (let i = 0; i < strength; i++) {
            let ran = Math.floor(Math.random() * (main_set.length - 1));
            password += main_set[ran];
        }

        document.getElementsByClassName('viewer')[0].value = password;
    } else {
        show_msg('Check some parameters first');
    }
}

function strength_indicator() {
    let a = document.getElementsByClassName('strength')[0];
    let b = document.getElementsByClassName('strength-indicator')[0];

    if (strength <= 8 && strength > 0) {
        b.style.background = 'rgb(241, 155, 43)';
        a.style.background = 'rgb(241, 155, 43,.3)';
        b.style.width = '20%';
    } else if (strength < 16 && strength > 8) {
        b.style.background = 'rgb(216, 209, 69)';
        a.style.background = 'rgb(216, 209, 69,.3)';
        b.style.width = '40%';
    } else if (strength >= 16) {
        b.style.background = 'rgb(95, 216, 137)';
        a.style.background = 'rgb(95, 216, 137,.3)';
        if (strength >= 32 && strength < 128) {
            b.style.width = '80%';
        } else if (strength >= 128) {
            b.style.width = '100%';
        } else {
            b.style.width = '60%';
        }

    }

}

function make_copy() {
    show_msg('copied', 'black');
    //copying the text
    let copyText = document.getElementsByClassName('viewer')[0];

    //making input bar available to copy the text
    copyText.disabled = false;

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");

    //making input bar unavailable after copying the text
    copyText.selectionEnd = copyText.selectionStart;
    copyText.disabled = true;
}
function show_msg(msg, color = 'black') {
    let c = document.getElementsByClassName('copied')[0];
    c.innerText = msg;
    c.style.color = color;
    c.classList.add('an-copy');
    c.addEventListener('animationend', function () {
        c.classList.remove('an-copy');
    });
}
function set_type() {
    let pre_set = document.querySelector('input[name="pswd_type"]:checked');
    if (pre_set.value == 'a') {
        num.checked = false;
        num.disabled = true;
        num.style.cursor = 'initial';
        sym.checked = false;
        sym.disabled = true;
        sym.style.cursor = 'initial';
    } else if (pre_set.value == 'b') {
        num.checked = false;
        sym.checked = false;
    } else {
        num.checked = true;
        num.disabled = false;
        num.style.cursor = 'pointer';
        sym.checked = true;
        sym.disabled = false;
        sym.style.cursor = 'pointer';
    }
    generate();
}