


function samsungCardUI () {

  // 데스크탑, 모바일 모두 적용 DOM요소에 참조한 변수들
  let wrapper  = document.querySelector(".wrapper") 
  const topBannerArea = document.querySelector(".top-banner");
  const gnb = document.querySelector(".gnb")
  const appDown = document.querySelector(".appDown")
  const container = document.querySelector(".container")
  const chatBot = document.querySelector('.chatBot')
  const chatBotBtn = document.querySelector('.chatBot .btn')
  const closeBtn = document.querySelector('.chatBot .closeBtn')
  const autoplayBtn = document.querySelectorAll("section .control-area");
  const header = document.querySelector(".header")
  const btnMenu = document.querySelector(".header .btn-menu");
  const menu = document.querySelector(".menu")
  const cardContents = document.querySelectorAll('.section-cards .content')

  // 챗봇 이미지 움직이는 기능 관련 변수들(데스크탑, 모바일 모두 적용)
  let frameWidth = 70;
  let frameHeight = 88;
  let framesPerRow = 14; 
  let numRows = 11; 
  let totalFrames = framesPerRow * numRows; 
  let currentFrame = 0;

  // swiper기능(데스크탑, 모바일 모두 적용)
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

  // swiper기능(데스크탑, 모바일 모두 적용)
  const cardSwiper1 = new Swiper('.section-cards #personal .swiper', {
    slidesPerView: 5,
    slidesPerGroup: 5,
    speed: 2000,
    navigation: {
      nextEl: ".section-cards #personal .btn-next1",
      prevEl: ".section-cards #personal .btn-prev1"
    },
  })

  // swiper기능(데스크탑, 모바일 모두 적용)
  const cardSwiper2 = new Swiper('.section-cards #corporate .swiper', {
    slidesPerView: 5,
    slidesPerGroup: 5,
    speed: 2000,
    navigation: {
      nextEl: ".section-cards #corporate .btn-next2",
      prevEl: ".section-cards #corporate .btn-prev2"
    },
  })

  const cardSwiperMobile = new Swiper('.section-cards #mobile .swiper', {
    cssMode: true,
    slidesPerView: "auto",
    mousewheel: true,
    keyboard: true,
    spaceBetween: 20,
  })

  // swiper기능(데스크탑, 모바일 모두 적용)
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

  // swiper기능(데스크탑, 모바일 모두 적용)
  const footerSwiper = new Swiper('.footer #pc .swiper', {
    slidesPerView: 4.43,
    slidesPerGroup: 5,
    spaceBetween: 15,
    speed: 3000,
    navigation: {
      nextEl: ".footer .btn-next",
      prevEl: ".footer .btn-prev"
    },
  })

  // 챗봇 이미지 움직이는 함수(데스크탑, 모바일 모두 적용)
  function animateSprite() {
    let currentRow = Math.floor(currentFrame / framesPerRow);
    let currentColumn = currentFrame % framesPerRow;
    
    let posX = -(currentColumn * frameWidth); 
    let posY = -(currentRow * frameHeight); 

    chatBotBtn.style.backgroundPosition = `${posX}px ${posY}px`;
    currentFrame = (currentFrame + 1) % totalFrames;
  }
  setInterval(animateSprite, 50);

  // 스와이퍼 자동재생 버튼에 추가한 이벤트(데스크탑, 모바일 모두 적용)
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

  // 챗봇 끄는 버튼에 추가한 이벤트(데스크탑, 모바일 모두 적용)
  closeBtn.onclick = () => {
    chatBot.classList.add("none")
  }


  let deviceMode = '';

  // device 너비를 확인하여 mobile, desktop 모드를 감지하는 함수
  const getDeviceMode = function() {
    let currentMode = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'mobile' : 'desktop';

    if (deviceMode === currentMode) {
      return 'same';
    }
    else {
      deviceMode = currentMode;
    }
    return deviceMode;
  };


  // 창 너비를 감지하여 UI 변경을 처리하는 함수
  const handleWindowResize = function(e) {
    switch (getDeviceMode()) {
      case 'mobile':
        settingMobile();
        break;
      case 'desktop':
        settingDesktop();
        break;
      default:
    }
  };


  window.onscroll = () => {
    let curr =  window.scrollY
    console.log(curr);
    if(deviceMode === "desktop"){
      console.log('데스크탑');
      if(curr > 50){
        container.classList.add("scrollTop")
        if(!gnb.classList.contains("on")){
          topBannerArea.classList.add("none")
        }
      }else{
        container.classList.remove("scrollTop")
        topBannerArea.classList.remove("none")
      }
    }else{
      console.log('모바일');
      if(curr > 22.5) {
        appDown.classList.add("top")
      }else{
        appDown.classList.remove("top")
      }
    }
      return
    } 
  // 데스크탑 설정 함수
  const settingDesktop = function() {

    console.log('데스크탑');
    wrapper.classList.remove("mobile")

    const dimmed = document.querySelector(".dimmed")
    const bannerClose = document.querySelector(".banner-closeBtn");
    const btnSearch = document.querySelector(".header .btn-search");
    const searchChatbotArea = document.querySelector(".search-chatbot-area")
    const searchAreaInput = document.querySelector(".search-area input")
    const inputClearBtn = document.querySelector(".input-clear")
 
    const innerGnb = document.querySelector(".gnb > div")
    const innerChatbot = document.querySelector(".search-chatbot-area > div")
    const navList = document.querySelector(".gnb .nav-list")
    const depth1Menu = document.querySelectorAll(".gnb .depth1-menu")
    const authTabList= document.querySelector('.section-auth .auth-list');
    const authIdSave = document.querySelector('.form .save') ?? ""
    const authIdSaveBtn = document.querySelector('.form .save button')
    const authContents = document.querySelectorAll('.auth-contents .on')
    const joinText = document.querySelector('.join-text')
    const cardTabList = document.querySelector('.section-cards .tab-list')
    const family = document.querySelector('.family');

    // nav-list(ul)의 자식인 nav-item(li)에 classname 토글하는 함수
    const navItemOn = (target) => {
      [...navList.children].forEach(navItem => {
        if(navItem === target){
          target.classList.add('on')
        }else{
          navItem.classList.remove('on')
        }
      })
    }

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

    const render = () => {
      let loginAreas = [...authContents];
      const targetId = authTabList.querySelector('.on').id;
      loginAreas.filter(area => {
        if(targetId === area.id){
          area.style.display = "block"
          switch(area.id){
            case 'card':
            joinText.textContent = "삼성카드 앱 안내";
            break;
            case 'id':
            joinText.textContent = "아이디/비밀번호찾기"; break;
            case 'cert1':
            case 'cert2':
            joinText.textContent = "인증서등록"
            break;
            default: 
            return
          }
        }else{
          area.style.display = "none"
        }
      })
    }

    const tabAuthMove = (target) =>{
      [...authTabList.children].forEach(authItem => {
        if(authItem === target){
            authItem.classList.add('on');
        }else{
            authItem.classList.remove('on');
        }
      })
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


    // 앱다운로드 배너 끄는 함수 
    bannerClose.onclick = (e) => {
      e.preventDefault()
      topBannerArea.classList.add("on")
    }

    // 윈도우에 이벤트 추가하는 함수 (데스크탑 전용)
  

    navList.onmouseover = (e) => {
      if(!e.target.matches('.nav-list .nav-item > a')) return;
      e.preventDefault()
      navItemOn(e.target.parentNode)
    }

    depth1Menu.forEach(depth1Menu => {
      depth1Menu.onclick = (e) => {
        e.preventDefault()
        if(!e.target.matches('.depth1-item > button')) return;
        onFlexBox(e.target.parentNode.parentNode.parentNode)
      }
    }) 

    btnSearch.onclick = (e) => {
      e.preventDefault();
      console.log('돋보기버튼 누름');
      e.target.classList.toggle("close")
      searchChatbotArea.classList.toggle("on")
      dimmed.classList.toggle("on")
      menu.classList.toggle("none")
      header.classList.toggle("fixed")
    }

    searchAreaInput.onkeyup = (e) => {
      if(e.target.value){
        inputClearBtn.classList.add("on")
      }else{
        inputClearBtn.classList.remove("on")
      }
    }

    inputClearBtn.onclick = ()  => {
      searchAreaInput.value = ""
    }

    btnMenu.onclick = (e) => {
      e.preventDefault();
      console.log('버거버튼 누름');
      e.target.classList.toggle("close")
      gnb.classList.toggle("on")
      dimmed.classList.toggle("on")
      menu.classList.toggle("none")
      header.classList.toggle("fixed")
    }

    /** 
     *  @gnb와searchChatbotArea영역끄는기능
     * 
    */
    wrapper.onclick = (e) => {
      e.preventDefault();
      if(innerGnb.contains(e.target) || innerChatbot.contains(e.target)) return
      if(btnMenu.contains(e.target)){
        if(searchChatbotArea.classList.contains("on")){
          searchChatbotArea.classList.remove("on")
        }
      }else if(btnSearch.contains(e.target)){
        if(gnb.classList.contains("on")){
          gnb.classList.remove("on")
          searchChatbotArea.classList.add("on")
        }
      }else{
        dimmed.classList.remove("on")
        gnb.classList.remove("on")
        menu.classList.remove("none")
        searchChatbotArea.classList.remove("on")
        topBannerArea.classList.remove("none")
        header.classList.remove("fixed")
        btnSearch.classList.remove("close")
        btnMenu.classList.remove("close")
      }
    }

    authTabList.onclick = (e) => {
      if ( !e.target.matches('.auth-list > .auth-item')) return;
      tabAuthMove(e.target);
      render()
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

    /** 
     *  @섹션이벤트영역에서sticky기능
     * 
    */
    ScrollTrigger.create({
      trigger: ".section-event .left-area",
      pin: true,
      markers:false,
      start: "top 162px",
      end: "bottom 615px",
    });

    family.onclick = (e) => {
      e.preventDefault()
      family.classList.toggle('opacity')
    }

  } // settingDesktop()

  // 모바일 설정 함수
  const settingMobile = function() {
    console.log('모바일');
    // 모바일로 되면 wrapper 에 mobile 붙히고
    wrapper.classList.add("mobile")
    console.log(wrapper);
    const btnMenu = document.querySelector(".btn-menu ") 
    const moGnbCloseBtn = document.querySelector(".mo_gnb-close")
    const moGnb = document.querySelector(".mo_gnb")

    
    btnMenu.onclick = (e) => {
      console.log('버거버튼 클릭');
      moGnb.classList.add("on")
    }
    moGnbCloseBtn.onclick = (e) => {
      moGnb.classList.add("on")
    }

    const info2Title = document.querySelector(".info2-title")
    console.log(info2Title);
    info2Title.onclick = (e) => {
      e.preventDefault()
      e.target.classList.toggle("on")
    }

    moGnbCloseBtn.onclick =(e) => {
      e.preventDefault()
      moGnb.classList.toggle("on")
    }
  };
  // DOM 콘텐츠가 준비되면 init 이벤트 핸들러 연결
  window.addEventListener('DOMContentLoaded', handleWindowResize);
 window.addEventListener('resize', handleWindowResize);
}



samsungCardUI()