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

    const deadline = "2021-10-22";

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

            if(setTime.total <= 0){
                clearInterval(timerId);
            }
        }
    }

    setClock('.timer', deadline);

    //Modal

    const btnModalShow = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          btnClose =  document.querySelector('[data-close]');

  
    function openModalWindow(){
        modal.style.display = 'block'; 
        //modal.classList.add('show'); if css style
        //modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';

        clearInterval(timeShowId);
    }      

    btnModalShow.forEach(btn => {
        btn.addEventListener('click', openModalWindow);
     });

    function closeModal(){
        // modal.classList.add('hide');
        // modal.classList.remove('show');
        modal.style.display = 'none'; 
        document.body.style.overflow = '';
    }

    btnClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if(event.target === modal){
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
});