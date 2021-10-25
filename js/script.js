window.addEventListener('DOMContentLoaded', () =>{
    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabsContent.forEach(tbs => {
            tbs.style.display = 'none'; 
        });

        tabs.forEach(tbs => {
            tbs.classList.remove('tabheader__item_active');
        });
    }   
    
    function showTabContent(i = 0){
        tabsContent[i].style.display = "block";
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) =>{
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach( (btn, i) =>{
                if(target == btn){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer

    const deadline = "2021-10-25";

    function getTimeRemaining(){
        const t = Date.parse(deadline) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor(t / (1000 * 60 * 60) % 24),
              minutes = Math.floor(t / (1000 * 60) % 60),
              seconds = Math.floor(t / 1000 % 60);

              return {
                  'total' : t,
                  'days' : days,
                  'hours': hours,
                  'minutes': minutes,
                  'seconds': seconds
              };
    }

    function setZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        }else{
            return num;
        }
    }
   
    function setClock(selector, intime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timerId = setInterval(updateClock, 1000);

        updateClock();  

        function updateClock(){
            const setTime = getTimeRemaining(intime);

            days.innerHTML = setZero(setTime.days);
            hours.innerHTML = setZero(setTime.hours);
            minutes.innerHTML = setZero(setTime.minutes);
            seconds.innerHTML = setZero(setTime.seconds);

           // console.log(setTime.total);

            if(setTime.total <= 0){
                clearInterval(timerId);
            }
        }
    }

    setClock('.timer', deadline);

    //Modal

    const btnModalShow = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

  
    function openModalWindow(){
        //modal.style.display = 'block'; 
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';

        clearInterval(timeShowId);
    }      

    btnModalShow.forEach(btn => {
        btn.addEventListener('click', openModalWindow);
     });

    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.style.display = 'none'; 
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (event) => {
        if(event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape'){
            closeModal();
        }
    });

    let timeShowId = setInterval(openModalWindow, 5000);

    function showModalByScrol(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModalWindow();
            window.removeEventListener('scroll', showModalByScrol);
        }
    }

    window.addEventListener('scroll', showModalByScrol);

    //write class

    class GenerikContainer{
        constructor(src, alt, title, descr, price, containerSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes =classes;
            this.kurs = 27;
            this.exchangeRate();
            this.containerSelector = document.querySelector(containerSelector);
        }

        exchangeRate(){
            this.price = this.price * this.kurs;
        }

        render(){
            const element = document.createElement('div');
            if(this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else{
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            this.containerSelector.append(element);
        }
    }

    new GenerikContainer(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню “Фитнес”',
        'Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        "menu__item"
    ).render();

    new GenerikContainer(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container",
        "menu__item"
    ).render();

    new GenerikContainer(
        "img/tabs/post.jpg",
        "post",
        'Меню “Постное”',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        18,
        ".menu .container",
        "menu__item"
    ).render();

    //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'спасибо! Скоро мы с Вами свяжемся.',
        failure: 'Что-то пошло не так...' 
    };

    forms.forEach(form => {
        postData(form);
    });

    function postData(form){
        form.addEventListener('submit', (event) =>{
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            //form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            //XMLHttpRequest
            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');

            // //request.setRequestHeader('Content-Type', 'multipart/form-data');
            // const formData = new FormData(form);

            // request.send(formData);

            // request.addEventListener('load', ()=>{
            //     if(request.status === 200){
            //         console.log(request.response);
            //         showTanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     }else{
            //         showTanksModal(message.failure);
            //     }
            // });

            //Fetch Api
            const formData = new FormData(form);

            fetch('server.php', {
                method: "POST",
                body: formData
            })
            .then(data => data.text())
            .then(data => {
                console.log(data);
                showTanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showTanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showTanksModal(message){
        const prevModalDilog = document.querySelector('.modal__dialog');

        prevModalDilog.classList.add('hide');
        openModalWindow();

        const thanksModal = document.createElement('div'); 
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDilog.classList.add('show');
            prevModalDilog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
});