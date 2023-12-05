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
      nextEl: ".footer .footer-award-next",
      prevEl: ".footer .footer-award-prev"
    },
  })


  document.querySelector("section .control-area").onchange = (e) =>{
    console.log(e.target);
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

const authTabList= document.querySelector('.section-auth .tab-list');
const authIdSave = document.querySelector('.form .save') ?? ""
const authIdSaveBtn = document.querySelector('.form .save button')
const loginInner = document.querySelector('.login-inner').children
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
  let loginAreas = [...loginInner];
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
  if ( !e.target.matches('.tab-list > .tab-item')) return;
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
  console.log('움직임');
  authIdSaveBtn.classList.toggle("no")
}

const family = document.querySelector('.family');
const familyList = document.querySelector('.family-list');
family.onclick = (e) => {
  e.preventDefault()
  family.classList.toggle('opacity')
}

const topBannerArea = document.querySelector(".banner-area");
const bannerClose = document.querySelector(".banner-closeBtn");
bannerClose.onclick = (e) => {
  e.preventDefault();
  topBannerArea.classList.add("on")
}

const btnSearch = document.querySelector(".header .btn-search");
const btnMenu = document.querySelector(".header .btn-menu");

btnSearch.onclick = (e) => {
  e.preventDefault();
  console.log('검색버튼 클릭');
}

btnMenu.onclick = (e) => {
  e.preventDefault();
  console.log('메뉴버튼 클릭');
}

