
  const topBannerArea = document.querySelector(".top-banner");
  const bannerClose = document.querySelector(".banner-closeBtn");

  bannerClose.onclick = (e) => {
    e.preventDefault();
    topBannerArea.classList.add("on")
  }

  const header = document.querySelector(".header")

  window.onscroll = (e)=> {
    let curr =  window.scrollY
    if(curr > 50){
      header.classList.add("scrollTop")
    }else{
      header.classList.remove('scrollTop')
    }
  }


  const visualSwiper = new Swiper('.section-visual .swiper', {
    slidesPerView: 1,
    pagination: {
      el: ".pagination",
      clickable: true
    },
    autoplay:{
      delay: 2000,
    },
    loop: true
  })

  const cardSwiper1 = new Swiper('.section-cards #personal .swiper', {
    slidesPerView: 5,
    slidesPerGroup: 5,
    speed: 2000,
    navigation: {
      nextEl: ".section-cards #personal .btn-next1",
      prevEl: ".section-cards #personal .btn-prev1"
    },
  })
    const cardSwiper2 = new Swiper('.section-cards #corporate .swiper', {
    slidesPerView: 5,
    slidesPerGroup: 5,
    speed: 2000,
    navigation: {
      nextEl: ".section-cards #corporate .btn-next2",
      prevEl: ".section-cards #corporate .btn-prev2"
    },
  })

  ScrollTrigger.create({
    trigger: ".section-event .left-area",
    pin: true,
    markers:false,
    start: "top 162px",
    end: "bottom 65%",
  });
  
  const boardSwiper = new Swiper('.section-board .swiper', {
    pagination : {
      el: ".pagination",
      clickable: true
    },
    autoplay:{
      delay: 5000,
    },
    loop: true,
  })


  const footerSwiper = new Swiper('.footer .swiper', {
    slidesPerView: 4.43,
    slidesPerGroup: 5,
    spaceBetween: 15,
    speed: 3000,
    navigation: {
      nextEl: ".footer .btn-next",
      prevEl: ".footer .btn-prev"
    },
  })

  const autoplayBtn = document.querySelectorAll("section .control-area");

  autoplayBtn.forEach(btn => {
    btn.onchange = (e) => {
      const checked = e.target.checked
      const label = e.target.nextElementSibling;
      if(checked){
        label.classList.add('pause')
        if(e.target.classList.contains("visual")){
          visualSwiper.autoplay.stop();
        }
        if(e.target.classList.contains("board")){
          boardSwiper.autoplay.stop();
        }
      }else{
        label.classList.remove('pause')
        if(e.target.classList.contains("visual")){
          visualSwiper.autoplay.start();
        }
        if(e.target.classList.contains("visual")){
          boardSwiper.autoplay.start();
        }
      }
    }
  })


const authTabList= document.querySelector('.section-auth .auth-list');
const authIdSave = document.querySelector('.form .save') ?? ""
const authIdSaveBtn = document.querySelector('.form .save button')
const authContents = document.querySelectorAll('.auth-contents .on')
const joinText1 = document.querySelector('.join-text1')

// ul
const cardTabList = document.querySelector('.section-cards .tab-list')
const cardContents = document.querySelectorAll('.section-cards .content')


const tabAuthMove = (target) =>{
  [...authTabList.children].forEach(authItem => {
    if(authItem === target){
        authItem.classList.add('on');
    }else{
        authItem.classList.remove('on');
    }
  })
}

const render = () => {
  let loginAreas = [...authContents];
  console.log(loginAreas);
  const targetId = authTabList.querySelector('.on').id;

  loginAreas.filter(area => {
    if(targetId === area.id){
      area.style.display = "block"
      switch(area.id){
        case 'card':
        joinText1.textContent = "삼성카드 앱 안내";
        break;
        case 'id':
        joinText1.textContent = "아이디/비밀번호찾기"; break;
        case 'cert1':
        case 'cert2':
        joinText1.textContent = "인증서등록"
        break;
        default: 
        return
      }
    }else{
      area.style.display = "none"
    }
  })
}

authTabList.onclick = (e) => {
  if ( !e.target.matches('.auth-list > .auth-item')) return;
  tabAuthMove(e.target);
  render()
}


const tabCardMove = (target) =>{
  [...cardTabList.children].forEach(cardType => {
    if(cardType=== target){
      cardType.classList.add('on')
    }else{
      cardType.classList.remove('on')
    }
  })
}

const cardRender = () => {
  let cardList = [...cardContents];
  const targetId = cardTabList.querySelector('.on').id;
  cardList.filter(content => {
    if(targetId === content.id){
      content.style.display = "block"
    }else{
      content.style.display = "none"
    }
  })
}

cardTabList.onclick = (e) => {
  if (!e.target.matches('.tab-list > .tab-item')) return;
  tabCardMove(e.target);
  cardRender()
}

authIdSave.onclick = (e) => {
  if (!e.target.matches('.form .save') && !e.target.matches('.save button')) return;
  authIdSaveBtn.classList.toggle("no")
}

const family = document.querySelector('.family');
const familyList = document.querySelector('.family-list');
family.onclick = (e) => {
  e.preventDefault()
  family.classList.toggle('opacity')
}

const btnSearch = document.querySelector(".header .btn-search");
const btnMenu = document.querySelector(".header .btn-menu");
const searchChatbotArea = document.querySelector(".search-chatbot-area")
const searchAreaInput = document.querySelector(".search-area input")
const inputClearBtn = document.querySelector(".input-clear")
const menu = document.querySelector(".menu")
const gnb = document.querySelector(".gnb")
const navList = document.querySelector(".gnb .nav-list")
const navItems = document.querySelectorAll(".gnb .nav-item")
const depth1Menu = document.querySelectorAll(".gnb .depth1-menu")

navList.onclick = (e) => {
  if(!e.target.matches('.nav-list .nav-item > a')) return;
  e.preventDefault()
  navItemOn(e.target.parentNode)
}

const navItemOn = (target) => {
  [...navList.children].forEach(navItem => {
    if(navItem === target){
      target.classList.add('on')
    }else{
      navItem.classList.remove('on')
    }
  })
}


depth1Menu.forEach(depth1Menu => {
  depth1Menu.onclick = (e) => {
    e.preventDefault()
    if(!e.target.matches('.depth1-item > button')) return;
    onFlexBox(e.target.parentNode.parentNode.parentNode)
  }
}) 

const onFlexBox = (target) => {
  const depth1FlexBoxes = document.querySelectorAll(".gnb .nav-list .nav-item.on .flex-box")
  if(target.classList.contains("on")){
    target.classList.remove("on")
  }else{
    depth1FlexBoxes.forEach(flexBox => {
      if(flexBox.classList.contains("on"))
      flexBox.classList.remove("on")
      target.classList.add("on")
    })
  }
}



btnSearch.onclick = (e) => {
  e.preventDefault();
  searchChatbotArea.classList.toggle("on")
  e.target.classList.toggle("close")
  menu.classList.toggle("none")
}
searchAreaInput.onkeyup = (e) => {
  console.log(e.target.value);
  if(e.target.value){
    inputClearBtn.classList.add("on")
  }else{
    inputClearBtn.classList.remove("on")
  }
}
inputClearBtn.onclick = ()  => {
  searchAreaInput.value = ""
}


const dimmed = document.querySelector(".dimmed")

btnMenu.onclick = (e) => {
  e.preventDefault();
  // console.log('메뉴버튼 클릭');
  gnb.classList.toggle("on")
  dimmed.classList.add("on")
}

const wrapper = document.querySelector(".wrapper")
const innerGnb = document.querySelector(".gnb > div")




wrapper.onclick = (e) => {
  if(dimmed.classList.contains("on")){
      console.log('gnb가 열림');
    if(!innerGnb.contains(e.target)){
     console.log('gnb가 눌린게 아님');
    }else{
       console.log('gnb가 눌림');
    }

  }else{
    console.log('gnb가 안열림');
  }
}


