  
  const topBannerArea = document.querySelector(".top-banner");
  const bannerClose = document.querySelector(".banner-closeBtn");
  const header = document.querySelector(".header")

  /** 
   *  @앱다운로드배너끄는기능
   * 
  */
  bannerClose.onclick = (e) => {
    e.preventDefault();
    topBannerArea.classList.add("on")
  }


  /** 
   *  @앱다운로드배너높이만큼스크롤이내려오면헤더가픽스되는기능
   * 
  */
  window.onscroll = (e)=> {
    let curr =  window.scrollY
    if(curr > 50){
      header.classList.add("scrollTop")
    }else{
      header.classList.remove('scrollTop')
    }
  }


  
  /** 
   *  @헤더에서돋보기버튼과버거버튼의기능
   * 
  */
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
  const dimmed = document.querySelector(".dimmed")
  const wrapper = document.querySelector(".wrapper")
  const innerGnb = document.querySelector(".gnb > div")
  const innerChatbot = document.querySelector(".search-chatbot-area > div")


  navList.onmouseover = (e) => {
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
    console.log('돋보기버튼 누름');
    searchChatbotArea.classList.add("on")
    e.target.classList.add("close")
    dimmed.classList.add("on")
    menu.classList.add("none")
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
    gnb.classList.add("on")
    dimmed.classList.add("on")
    menu.classList.add("none")
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
    }
  }



  /** 
   *  @섹션auth영역에서auth탭종류마다탭이동되는기능
   * 
  */
  const authTabList= document.querySelector('.section-auth .auth-list');
  const authIdSave = document.querySelector('.form .save') ?? ""
  const authIdSaveBtn = document.querySelector('.form .save button')
  const authContents = document.querySelectorAll('.auth-contents .on')
  const joinText1 = document.querySelector('.join-text1')
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



  /** 
   *  @swiper기능
   * 
  */
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


  /** 
   *  @swiper기능
   * 
  */
  const cardSwiper1 = new Swiper('.section-cards #personal .swiper', {
    slidesPerView: 5,
    slidesPerGroup: 5,
    speed: 2000,
    navigation: {
      nextEl: ".section-cards #personal .btn-next1",
      prevEl: ".section-cards #personal .btn-prev1"
    },
  })


  /** 
   *  @swiper기능
   * 
  */
    const cardSwiper2 = new Swiper('.section-cards #corporate .swiper', {
    slidesPerView: 5,
    slidesPerGroup: 5,
    speed: 2000,
    navigation: {
      nextEl: ".section-cards #corporate .btn-next2",
      prevEl: ".section-cards #corporate .btn-prev2"
    },
  })


  /** 
   *  @swiper기능
   * 
  */  
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


  /** 
   *  @swiper기능
   * 
  */  
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

  
  /** 
   *  @스와이퍼자동재생끄고키는기능
   * 
  */
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



  /** 
   *  @섹션이벤트영역에서sticky기능
   * 
  */
  ScrollTrigger.create({
    trigger: ".section-event .left-area",
    pin: true,
    markers:true,
    start: "top 162px",
    end: "bottom 615px",
  
  });



  /** 
   *  @패밀리사이트영역기능
   * 
  */
  const family = document.querySelector('.family');
  const familyList = document.querySelector('.family-list');
  family.onclick = (e) => {
    e.preventDefault()
    family.classList.toggle('opacity')
  }



  /** 
   *  @챗봇버튼이미지움직이는기능
   * 
  */
  var frameWidth = 70;
  var frameHeight = 88;
  var framesPerRow = 14; 
  var numRows = 11; 
  var totalFrames = framesPerRow * numRows; 
  var currentFrame = 0;

  const chatBot = document.querySelector('.chatBot')
  const chatBotBtn = document.querySelector('.chatBot .btn')
  const closeBtn = document.querySelector('.chatBot .closeBtn')

  function animateSprite() {
    var currentRow = Math.floor(currentFrame / framesPerRow);
    var currentColumn = currentFrame % framesPerRow;
    
    var posX = -(currentColumn * frameWidth); 
    var posY = -(currentRow * frameHeight); 

    chatBotBtn.style.backgroundPosition = `${posX}px ${posY}px`;
    currentFrame = (currentFrame + 1) % totalFrames;
  }
  setInterval(animateSprite, 50);


  /** 
   *  @챗봇버튼사라지는기능
   * 
  */
  closeBtn.onclick = () => {
    chatBot.classList.add("none")
  }
