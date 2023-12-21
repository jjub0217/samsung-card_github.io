


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


  // device 가 뭔지 변수생성 후, 빈 문자열 할당(해당 변수에 할당되는 값이 바뀔 예정)
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


  // 스크롤을 조금만 내리면 topBanner 가 없어지고, container 에 padding top 이 생기는 함수(데스크탑과 모바일 혼용 함수)
  window.onscroll = () => {
    let curr =  window.scrollY
    if(deviceMode === "desktop"){
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

    // 데스크탑 DOM요소에 참조한 변수들
    wrapper.classList.remove("mobile")
    const dimmed = document.querySelector(".dimmed")
    const headerBackground = document.querySelector(".header .background")
    const btnBox = document.querySelector(".btn-box")
    const bannerClose = document.querySelector(".banner-closeBtn");
    const btnSearch = document.querySelector(".header .btn-search");
    const searchChatbotArea = document.querySelector(".search-chatbot-area")
    const searchAreaInput = document.querySelector(".search-area input")
    const inputClearBtn = document.querySelector(".input-clear")
    const innerGnb = document.querySelector(".gnb > div")
    const innerChatbot = document.querySelector(".search-chatbot-area > div")
    const navList = document.querySelector(".gnb .nav-list")
    const depth1Menu = document.querySelectorAll(".gnb .depth1-menu")
    const authTabList= document.querySelector('.section-auth .auth-tabList');
    const authContents = document.querySelector('.section-auth .auth-contents');
    const authIdSave = document.querySelector('.form .save') ?? ""
    const authIdSaveBtn = document.querySelector('.form .save button')
    const joinText = document.querySelector('.join-text')
    const cardTabList = document.querySelector('.section-cards .tab-list')
    const cardContents = document.querySelector('.section-cards .card-contents');
    const family = document.querySelector('.family');


    // nav-list(ul)의 자식인 nav-item(li)에 class name 토글하는 함수
    const navItemOn = (target) => {
      [...navList.children].forEach(navItem => {
        if(navItem === target){
          target.classList.add('on')
        }else{
          navItem.classList.remove('on')
        }
      })
    }


    // gnb에서 .depth1-item 클릭했을때 depth1-item의 서브리스트 영역이 나타나는 함수
    const onFlexBox = (target) => {
      const depth1FlexBoxes = document.querySelector(".gnb .nav-list .nav-item.on .depth1-menu");
      [...depth1FlexBoxes.children].forEach(flexBox => {
        if(target === flexBox){
          if(target.classList.contains("on")){
            target.classList.remove("on")
          }else{
            target.classList.add("on")
          }
        }else{
          flexBox.classList.remove("on")
        }
      })
    }


    // auth-tabItem 클릭했을때 해당 tab과 연결되어있는 authContent가 나타나는 함수
    const tabAuthMove = (dataset) =>{
      const targetTabItemAuthContent = document.querySelector(dataset);

      [...authContents.children].forEach(authContent => {
        if(authContent === targetTabItemAuthContent){
          targetTabItemAuthContent.classList.add('on');
        }else{
          authContent.classList.remove('on');
        }
      })
    }


    // auth-tabItem 클릭했을때 해당 tab과 연결되어있는 text가 나타나는 함수
    const textRender = (data) => {
      const targetData = document.querySelector(data);
      switch(targetData.id ){
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
    }


    // section-cards 영역에서 tab-item 을 클릭하면 해당 tab과 연결되어있는 cardContent 가 나타나는 함수
    const tabCardMove = (dataset) =>{
      const targetTabItemCardContent = document.querySelector(dataset);
      [...cardContents.children].forEach(cardContent => {
        console.log(cardContent);
        if(cardContent === targetTabItemCardContent){
          cardContent.classList.add('on')
        }else{
          cardContent.classList.remove('on')
        }
      })
    }

    
    // 앱다운로드 배너 끄는 함수 (데스크탑 전용)
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


    // gnb에서 depth1-title에 이벤트 추가하는 함수 (데스크탑 전용)
    depth1Menu.forEach(depth1Title => {
      depth1Title.onclick = (e) => {
        e.preventDefault()
        if(!e.target.matches('.depth1-item > .depth1-title')) return;
        if (e.target.ariaExpanded  === 'false') {
          e.target.ariaExpanded = 'true' 
        } else {
          e.target.ariaExpanded = 'false' 
        }
        onFlexBox(e.target.parentNode.parentNode.parentNode)
      }
    }) 


   // auth-item 에 이벤트 추가하는 함수 (데스크탑 전용)
    authTabList.onclick = (e) => {
      if ( !e.target.matches('.auth-tabList > .auth-tabItem')) return;
      [...authTabList.children].forEach(authTabItem => {
        if(authTabItem === e.target) {
          e.target.classList.add("on")
        }else{
          authTabItem.classList.remove("on")
        }
      })
      tabAuthMove(e.target.dataset.tab);
      textRender(e.target.dataset.tab)
    }


    // section-cards 영역에서 tab-item 에 이벤트 추가하는 함수 (데스트탑 전용)
    cardTabList.onclick = (e) => {
      if (!e.target.matches('.tab-list > .tab-item')) return;
      tabCardMove(e.target.dataset.tab);
    }


    // section-auth 영역에서 아이디 tab-item 클릭하면 나타나는 .save 에 이벤트 추가하는 함수
    authIdSave.onclick = (e) => {
      if (!e.target.matches('.form .save') && !e.target.matches('.save button')) return;
      authIdSaveBtn.classList.toggle("no")
    }


    // btn-search 에 이벤트 추가하는 함수
    btnSearch.onclick = (e) => {
      e.preventDefault();
      // console.log('돋보기버튼 누름');
      e.target.classList.toggle("close")
      searchChatbotArea.classList.toggle("on")
      dimmed.classList.add("on")
      menu.classList.toggle("none")
      header.classList.toggle("fixed")
      if (e.target.ariaPressed  === 'false') {
        e.target.ariaPressed = 'true' 
      } else {
        e.target.ariaPressed = 'false' 
      }
    }


    // search-area 영역에서 input 에 이벤트 추가하는 함수
    searchAreaInput.onkeyup = (e) => {
      if(e.target.value){
        inputClearBtn.classList.add("on")
      }else{
        inputClearBtn.classList.remove("on")
      }
    }


    // input-clear 에 이벤트 추가하는 함수
    inputClearBtn.onclick = ()  => {
      searchAreaInput.value = ""
    }


    // btn-menu 에 이벤트 추가하는 함수
    btnMenu.onclick = (e) => {
      e.preventDefault();
      e.target.classList.toggle("close")
      gnb.classList.toggle("on")
      menu.classList.add("none")
      header.classList.toggle("fixed")
      dimmed.classList.add("on")
      if (e.target.ariaExpanded  === 'false') {
        e.target.ariaExpanded = 'true' 
      } else {
        e.target.ariaExpanded = 'false' 
      }
    }


    // gnb와 searchChatbotArea 영역과 dimmed 끄는 이벤트 함수 :
    // headerBackground click 이벤트
    // wrapper click 이벤트
    // searchChatbotArea click 이벤트
    // gnb click 이벤트
    // dimmed click 이벤트
    headerBackground.onclick = (e) => {
      if(!btnBox.contains(e.target)
      ){
        dimmed.classList.remove("on")
      } 
    }
    wrapper.onclick = (e) => {
      e.preventDefault();
      console.log(e);
      if(searchChatbotArea.classList.contains("on") && !innerChatbot.contains(e.target) && e.target !== btnSearch ){
        searchChatbotArea.classList.remove("on")
        header.classList.remove("fixed")
        btnSearch.classList.toggle("close")
        menu.classList.remove("none")
      }else if(gnb.classList.contains("on") && e.target !== btnMenu && !innerGnb.contains(e.target)) {
        gnb.classList.remove("on")
        header.classList.remove("fixed")
        btnMenu.classList.toggle("close")
        menu.classList.remove("none")
      }
    }
    searchChatbotArea.onclick = (e) => {
      if(searchChatbotArea.classList.contains("on") && !innerChatbot.contains(e.target)){
        dimmed.classList.remove("on")
      }
    }
    gnb.onclick = (e) => {
      if(gnb.classList.contains("on") && !innerGnb.contains(e.target)){
        dimmed.classList.remove("on")
      }
    }
    dimmed.onclick = (e)=> {
      if(dimmed.classList.contains("on")){
        dimmed.classList.remove("on")
      }
    }


    // section-event 영역에서 sticky 기능하는 gsap 라이브러리
    ScrollTrigger.create({
      trigger: ".section-event .left-area",
      pin: true,
      markers:false,
      start: "top 162px",
      end: "bottom 615px",
    });



    // .family 에 이벤트 추가하는 함수
    family.onclick = (e) => {
      e.preventDefault()
      family.classList.toggle('opacity')
    }

  } // settingDesktop()



  // 모바일 설정 함수
  const settingMobile = function() {
    wrapper.classList.add("mobile")

     // 모바일 DOM요소에 참조한 변수들
    const btnMenu = document.querySelector(".btn-menu ") 
    const moGnbCloseBtn = document.querySelector(".mo_gnb-close")
    const moGnb = document.querySelector(".mo_gnb")
    const info2Title = document.querySelector(".info2-title")
    

    // btn-menu 에 이벤트 추가하는 함수
    btnMenu.onclick = (e) => {
      moGnb.classList.add("on")
    }

    // mo_gnb 에 이벤트 추가하는 함수
    moGnbCloseBtn.onclick = (e) => {
      moGnb.classList.add("on")
    }


    // info2-title 에 이벤트 추가하는 함수
    info2Title.onclick = (e) => {
      e.preventDefault()
      e.target.classList.toggle("on")
    }

    // mo_gnb-close 에 이벤트 추가하는 함수
    moGnbCloseBtn.onclick =(e) => {
      e.preventDefault()
      moGnb.classList.toggle("on")
    }
  };

  // DOM 콘텐츠가 준비되면 handleWindowResize 이벤트 핸들러 연결
  window.addEventListener('DOMContentLoaded', handleWindowResize);
  // 윈도우 창의 사이즈가 변하면 handleWindowResize 이벤트 핸들러 연결
  window.addEventListener('resize', handleWindowResize);
}


// 삼성카드 웹페이지 실행
samsungCardUI()