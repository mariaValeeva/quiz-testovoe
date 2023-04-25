import '../styles/normilize.css'
import '../styles/choices.min.css'
import '../styles/style.css'
import '../img/icon__arrow_rigth.svg'
import '../img/icon__arrow_left.svg'
import '../img/icon__arrow_bottom.svg'
import '../img/icon__cross.svg'


document.addEventListener('DOMContentLoaded',()=>{
    let backBtn = document.getElementById('quiz-block__btn-back');
    let nextBtn = document.getElementById('quiz-block__btn-next');
    let btnsBlock = document.getElementById('quiz-block__btns');
    let title = document.getElementById('quiz-block__h2');
    let swiperWrapper = document.getElementById('swiper__wrapper');
    let swiperWidth = document.getElementById('swiper').offsetWidth;
    let page = document.getElementById('page');
    let forms = document.getElementsByClassName('form-div');
    let count = 0;
    let countPage = 0;


    let titleArr = [
        "Для кого вы ищете учебное заведение?",
        "В каком городе планируете поступать?",
        "Какое образование уже есть?",
        "Куда планируете поступать?",
        "Какую форму обучения предпочитаете?",
        "Рассматриваете платное обучение?",
        "Какая специальность интересует?",
        "Как скоро планируете поступать?",
        "Ваша подборка готова! 🥳 Куда нам отправить её?"
    ]

    for (let i = 0; i < forms.length; i++) {

        forms[i].addEventListener('change', () => {
            forms[i].classList.add('has-value');
            count -= swiperWidth;
            countPage += 1;
            if (forms[countPage]?.classList.contains('has-value')) {
                nextBtn.removeAttribute('disabled')
            }
            page.innerHTML = countPage + 1;
            if (countPage >= 1) {
                backBtn.classList.add("show");
                backBtn.classList.remove("none")
            }

            if (countPage > 7) {
                btnsBlock.classList.add('none');

            }
            swiperWrapper.style.left = count + "px";


            animation(title, titleArr, countPage)
        })
    };

    nextBtn.addEventListener('click', () => {
        nextBtn.setAttribute('disabled', 'true')
        count -= swiperWidth;
        countPage += 1;
        page.innerHTML = countPage + 1;

        if (forms[countPage].classList.contains('has-value')) {
            nextBtn.removeAttribute('disabled')
        }

        if (countPage >= 2) {
            backBtn.classList.add("show");
        }
        if (countPage >= 9) {
            btnsBlock.classList.add('none');
        }
        swiperWrapper.style.left = count + "px";

        animation(title, titleArr, countPage)
    });

    backBtn.addEventListener('click', () => {
        count += swiperWidth;
        countPage -= 1;

        if (forms[countPage].classList.contains('has-value')) {
            nextBtn.removeAttribute('disabled')
        }
        page.innerHTML = countPage + 1;
        swiperWrapper.style.left = count + "px";

        if (countPage > 0) {
            backBtn.classList.add("show");
            backBtn.classList.remove("none")
        } else {
            backBtn.classList.add("none");
        }

        animation(title, titleArr, countPage)
    })

    function animation(elem, currentElem, index) {
        let animation = elem.animate([
            { transform: 'translateY(0px)', opacity: 1 },
            { transform: 'translateY(0px)', opacity: 1 },
            { transform: 'translateY(5px)', opacity: 0 },

        ], 250);

        animation.addEventListener('finish', function () {
            elem.innerHTML = currentElem[index];
            elem.animate([
                { transform: 'translateY(5px)', opacity: 0 },
                { transform: 'translateY(0px)', opacity: 1 },

            ], 250);
        });
    }


    // Pass reference
    const element = document.querySelector('#js-choice');
    const elementTwo = document.querySelector('#js-choice-two');

    const choices = new Choices(element, {
        placeholder: true,
        placeholderValue: 'Город',
        searchPlaceholderValue: null,
        itemSelectText: '',
        classNames: {
            containerOuter: 'choices choices_placeholder',
        }
    });



    const choicesTwo = new Choices(elementTwo, {
        placeholder: true,
        placeholderValue: 'Город',
        searchPlaceholderValue: null,
        itemSelectText: '',
        classNames: {
            containerOuter: 'choices choices_placeholder-two',
        }
    });


    const formData = {}

    function getData() {
        const xhr = new XMLHttpRequest();
        const fakeUrl = {}
        xhr.open('POST', fakeUrl);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = () => {
            if (xhr.status !== 200) {
                return;
            }
        }
        xhr.addEventListener('error', console.log('error'));
        xhr.send(formData);
        modalWindowShow();

    }


    document.querySelector('.quiz-block__last-btn').addEventListener('click', () => {
        getData();
    });








    let modalWindowCloseBtn = document.getElementById('modal-window__close');
    let modalWindow = document.getElementById('modal-window');

    modalWindowCloseBtn.addEventListener('click', () => {
        modalWindow.classList.add('display-none')
    });

    let modalWindowShow = function () {
        modalWindow.classList.remove('display-none')
    };

})