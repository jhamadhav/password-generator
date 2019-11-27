var show_strength, range, checkbox, ht, strength = 16;
var password = '';
var theme = 'light';

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
    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener('click',
            function check_boxes() {
                let count = 0;
                // show_msg(this.checked);
                if (!this.checked) {
                    for (let i = 0; i < checkbox.length; i++) {
                        if (checkbox[i] != this && !checkbox[i].disabled && checkbox[i].checked) {
                            count++;
                        }
                    }
                }
                if (count == 0) {
                    this.checked = true;
                }
                generate();
            });
    }
    set_theme();
    generate();
}

function generate() {

    //making the main set
    main_set = '';
    password = '';
    if (checkbox[0].checked) {
        main_set += alpha;
    }
    if (checkbox[1].checked) {
        main_set += lo;
    }
    if (checkbox[2].checked) {
        main_set += num_list;
    }
    if (checkbox[3].checked) {
        main_set += sym_list;
    }
    //to show strength
    strength_indicator();
    for (let i = 0; i < strength; i++) {
        let ran = Math.floor(Math.random() * (main_set.length - 1));
        password += main_set[ran];
    }

    document.getElementsByClassName('viewer')[0].value = password;

}

function strength_indicator() {
    let a = document.getElementsByClassName('strength')[0];
    let b = document.getElementsByClassName('strength-indicator')[0];

    if (strength < 8 && strength > 0) {
        b.style.background = 'rgb(241, 155, 43)';
        a.style.background = 'rgb(241, 155, 43,.3)';
        b.style.width = '20%';
    } else if (strength < 16 && strength >= 8) {
        b.style.background = 'rgb(216, 209, 69)';
        a.style.background = 'rgb(216, 209, 69,.3)';
        b.style.width = '50%';
    } else if (strength <= 32 && strength >= 16) {
        b.style.background = 'rgb(95, 216, 137)';
        a.style.background = 'rgb(95, 216, 137,.3)';
        b.style.width = '80%';

    } else if (strength >= 64) {
        b.style.background = 'rgb(95, 216, 137)';
        a.style.background = 'rgb(95, 216, 137,.3)';
        b.style.width = '100%';
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
        checkbox[0].checked = true;
        checkbox[1].checked = true;
        checkbox[2].checked = false;
        checkbox[2].disabled = true;
        checkbox[2].style.cursor = 'initial';
        checkbox[3].checked = false;
        checkbox[3].disabled = true;
        checkbox[3].style.cursor = 'initial';
    } else if (pre_set.value == 'b') {
        checkbox[0].checked = true;
        checkbox[1].checked = true;
        checkbox[2].checked = false;
        checkbox[3].checked = false;
        checkbox[3].disabled = false;
        checkbox[2].disabled = false;
    } else {
        checkbox[0].checked = true;
        checkbox[1].checked = true;
        checkbox[2].checked = true;
        checkbox[2].disabled = false;
        checkbox[2].style.cursor = 'pointer';
        checkbox[3].checked = true;
        checkbox[3].disabled = false;
        checkbox[3].style.cursor = 'pointer';
    }
    generate();
}

//to set theme
function set_theme() {
    let ht = document.documentElement.style;
    if (theme == 'light') {
        ht.setProperty('--theme', 'white');
        ht.setProperty('--color', '#202124');
        ht.setProperty('--shadow', 'rgba(0, 0, 0, .2)');
    }
    if (theme == 'dark') {
        ht.setProperty('--theme', '#202124');
        ht.setProperty('--color', 'white');
        ht.setProperty('--shadow', 'rgba(239, 239, 239, 0.2)');
    }
}

//to change theme
function change_theme() {
    document.getElementsByClassName('theme-changer')[0].classList.toggle('night');
    if (theme == 'light') {
        theme = 'dark';
        set_theme();
    } else {
        theme = 'light';
        set_theme();
    }
}

//some quick methods
function make_sort(a) {
    strength = a;
    range.value = strength;
    let val = (strength / (range.max - range.min)) * 100;
    range.style.background = 'linear-gradient(to right, #fb542b 0%, #fb542b ' + val + '%, gray ' + val + '%, gray 100%)'
    show_strength.value = strength;
    generate();
}