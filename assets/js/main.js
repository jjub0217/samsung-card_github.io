


function samsungCardUI () {
  var event = new Event("scroll");

  window.dispatchEvent(event);
  
  let wrapper = document.querySelector(".wrapper");
  
  const dimmed = document.querySelector(".dimmed");
  const topBannerArea = document.querySelector(".app_link_wrap");
  const btnSearch = document.querySelector(".header .search_btn");
  const searchChatbotArea = document.querySelector(".search_chatbot_area");
  const pcGnb = document.querySelector(".gnb");
  const pcNav = document.querySelector(".pc_nav");
  const appDown = document.querySelector(".app_down_link");
  const chatBotBtn = document.querySelector(".chat_bot .chat_bot_btn");
  const closeBtn = document.querySelector(".chat_bot .chat_bot_close_btn");
  const controlAreas = document.querySelectorAll("section .control-area");
  const header = document.querySelector(".header");
  const btnMenu = document.querySelector(".header .menu_btn");
  const moGnb = document.querySelector(".mo_gnb");
  
  let deviceMode = "";

  const getDeviceMode = function () {
    let currentMode =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
        ? "mobile"
        : "desktop";

    if (deviceMode === currentMode) {
      return "same";
    } else {
      deviceMode = currentMode;
    }
    return deviceMode;
  };

  const handleWindowResize = function (e) {
    switch (getDeviceMode()) {
      case "mobile":
        settingMobile();
        break;
      case "desktop":
        settingDesktop();
        break;
      default:
    }
  };

  window.addEventListener("scroll", function () {
    const scrollableDiv = document.querySelector(".container");

    deviceMode === "desktop"
      ? scrollableDiv.getBoundingClientRect().top <= 215
        ? header.classList.add("js_scrolling")
        : header.classList.remove("js_scrolling")
      : scrollableDiv.getBoundingClientRect().top <= -24
      ? appDown.classList.add("is_show")
      : appDown.classList.remove("is_show");
  });

  btnMenu.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isDesktop = deviceMode === "desktop";
    const targetExpanded = e.target.ariaExpanded === "true";
    e.target.ariaExpanded = !targetExpanded;
    e.target.ariaPressed = !targetExpanded;

    if (isDesktop) {
      pcNav.classList.toggle("is_show");
      dimmed.classList.toggle("is_active", !targetExpanded);

      if (searchChatbotArea.classList.contains("is_show")) {
        searchChatbotArea.classList.remove("is_show");
        btnSearch.setAttribute("aria-expanded", "false");
        btnSearch.setAttribute("aria-pressed", "false");
      }
    } else {
      moGnb.classList.toggle("is_show");
    }
  };
  
  let frameWidth = 70;
  let frameHeight = 88;
  let framesPerRow = 12;
  let numRows = 10;
  let totalFrames = framesPerRow * numRows;
  let currentFrame = 0;

  function animateSprite() {
    let currentRow = Math.floor(currentFrame / framesPerRow);
    let currentColumn = currentFrame % framesPerRow;

    let posX = -(currentColumn * frameWidth);
    let posY = -(currentRow * frameHeight);

    chatBotBtn.style.backgroundPosition = `${posX}px ${posY}px`;
    currentFrame = (currentFrame + 1) % totalFrames;
  }
  setInterval(animateSprite, 50);

  closeBtn.onclick = (e) => {
    e.target.parentNode.classList.add("is_hidden");
  };

  const createSwiper = (selector, options) => new Swiper(selector, options);

  const commonA11ySettings = {
    enabled: true,
    containerMessage: "프로모션 슬라이드 영역입니다.",
    slideLabelMessage:
      "총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.",
    firstSlideMessage: "첫번째 슬라이드입니다.",
    lastSlideMessage: "마지막 슬라이드입니다.",
    paginationBulletMessage: "{{index}}번째 슬라이드로 이동합니다.",
    containerRoleDescriptionMessage: "Carousel",
    itemRoleDescriptionMessage: "Slide",
    slideRole: "listitem",
  };


  createSwiper(".promotion_slide_area .swiper", {
    a11y: commonA11ySettings,
    slidesPerView: 1,
    pagination: {
      el: ".pagination",
      clickable: true,
    },
  });


  createSwiper(".section_cards #personal_card .swiper", {
    a11y: commonA11ySettings,
    slidesPerView: 5,
    slidesPerGroup: 5,
    speed: 2000,
    navigation: {
      nextEl: ".personal_card_btn_next",
      prevEl: ".personal_card_btn_prev",
    },
  });

  createSwiper(".section_cards #corporate_card .swiper", {
    a11y: commonA11ySettings,
    slidesPerView: 5,
    slidesPerGroup: 5,
    speed: 2000,
    navigation: {
      nextEl: ".section_cards #corporate .corporate_card_btn_next",
      prevEl: ".section_cards #corporate .corporate_card_btn_prev",
    },
  });



  createSwiper(".section_cards #mobile .swiper", {
    a11y: commonA11ySettings,
    cssMode: true,
    slidesPerView: "auto",
    mousewheel: true,
    keyboard: true,
    spaceBetween: 20,
  });

  createSwiper(".section_customer_protect .swiper", {
    a11y: commonA11ySettings,
    spaceBetween: 15,
    pagination: {
      el: ".pagination",
      clickable: true,
    },
    autoplay: {
      delay: 5000,
    },
    loop: true,
  });

  createSwiper(".footer .inner .award_area .swiper", {
    a11y: commonA11ySettings,
    slidesPerView: 4.43,
    slidesPerGroup: 5,
    spaceBetween: 15,
    speed: 3000,
    navigation: {
      nextEl: ".footer .inner .award_area .slide_btn_next",
      prevEl: ".footer .inner .award_area .slide_btn_prev",
    },
  });


  // 슬라이드 재생 버튼
  controlAreas.forEach((controlArea) => {
    controlArea.onchange = (e) => {
      const label = e.target.nextElementSibling;
      const checked = e.target.checked;
      label.classList.toggle("pause");
      if (e.target.id === "visual-autoplay") {
        if (!checked) {
          visualSwiper.autoplay.stop();
        } else {
          visualSwiper.autoplay.start();
        }
      } else if (e.target.id === "board-autoplay") {
        if (!checked) {
          boardSwiper.autoplay.stop();
        } else {
          boardSwiper.autoplay.start();
        }
      }
    };
  });

  const settingDesktop = function () {
    wrapper.classList.remove("mobile");

    const bannerClose = document.querySelector(".app_link_banner_close_button");
    const bannerStatus = document.querySelector(".banner_status");
    const searchAreaInput = document.querySelector(".input_box .input");
    const inputClearBtn = document.querySelector(".input_clear_btn");
    const pcNavTabTitles = document.querySelectorAll(".pc_nav .nav_tab_title");
    const navListBoxes = document.querySelectorAll(".pc_nav .nav_list_box");
    const navItemTitles = document.querySelectorAll(".pc_nav .nav_list_box.is_show .nav_item_title");
    const navLists = document.querySelectorAll( ".pc_nav .nav_list_box.is_show .nav_list");

    const authTabTitles = document.querySelectorAll(".section_login .login_tab_title");
    const authContents = document.querySelector(".section_login .login_contents");
    const utilDesc = document.querySelector(".util_desc");

    const cardTabTitles = document.querySelectorAll(".section_cards .card_tab_title");
    const cardContents = document.querySelector(".section_cards .card_contents" );
    const familySite = document.querySelector( ".family_site_area .family_site_area_title");
    const familyList = document.querySelector(".family_site_area .family_list");

    pcGnb.addEventListener("click", () => {
      [searchChatbotArea, pcNav].forEach((element) => {
        if (element.classList.contains("is_show")) {
          element.classList.remove("is_show");
          const relatedButton =
            element === searchChatbotArea ? btnSearch : btnMenu;
          relatedButton.setAttribute("aria-expanded", "false");
          relatedButton.setAttribute("aria-pressed", "false");
          dimmed.classList.remove("is_active");
        }
      });
    });
  
    bannerClose.onclick = (e) => {
      e.preventDefault();
      topBannerArea.classList.add("is_hidden");
      topBannerArea.setAttribute("aria-hidden", "true");
      bannerStatus.textContent = "배너가 닫혔습니다."
      bannerStatus.setAttribute("aria-hidden", "false");
    };

    btnSearch.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      searchChatbotArea.classList.toggle("is_show");
      const targetExpanded = e.target.ariaExpanded === "true";
      e.target.ariaExpanded = !targetExpanded;
      e.target.ariaPressed = !targetExpanded;
      dimmed.classList.toggle("is_active", !targetExpanded);

      if (pcNav.classList.contains("is_show")) {
        pcNav.classList.remove("is_show");
        btnMenu.setAttribute("aria-expanded", "false");
        btnMenu.setAttribute("aria-pressed", "false");
      }
    };

    searchAreaInput.onkeyup = (e) => {
      if (e.target.value) {
        e.target.ariaInvalid = "false";
      } else {
        e.target.ariaInvalid = "true";
      }
    };

    inputClearBtn.onclick = (e) => {
      searchAreaInput.value = "";
      inputClearBtn.focus(); 
      setTimeout(() => {
        searchAreaInput.focus(); 
      }, 100); 
    };

    pcNavTabTitles.forEach((tabItem) => {
      tabItem.onmouseover = (e) => {
        e.preventDefault();
        [...pcNavTabTitles].forEach((btn) => {
          const isTarget = e.target === btn;
          const targetControlId = e.target.getAttribute("aria-controls");
          if (isTarget) {
            navTabControl(targetControlId);
            e.target.setAttribute("aria-selected", "true");
          } else {
            btn.setAttribute("aria-selected", "false");
          }
        });
      };
    });

    navItemTitles.forEach((button) => {
      button.onclick = (e) => {
        [...navLists].forEach((list) => {
          [...list.children].forEach((element) => {
            [...element.children]
              .filter((item) => item.classList.contains("nav_item_title"))
              .forEach((btn) => {
                const targetNavList = e.target.parentNode.parentNode;
                const isTarget = targetNavList === list;
                const expanded = isTarget && btn.ariaExpanded === "false";
                const pressed = isTarget && btn.ariaPressed === "false";
                btn.setAttribute("aria-expanded", expanded ? "true" : "false");
                btn.setAttribute("aria-pressed", pressed ? "true" : "false");
                isTarget
                  ? (!expanded
                    ? targetNavList.classList.remove("is_show")
                    : targetNavList.classList.add("is_show"))
                  : list.classList.remove("is_show");
              }); 
          });
        });
      };
    });

    authTabTitles.forEach((authButton) => {
      authButton.onclick = (e) => {
        [...authTabTitles].forEach((btn) => {
          const isTarget = e.target === btn;
          const targetControlId = e.target.getAttribute("aria-controls");
          if (isTarget) {
            tabAuthMove(targetControlId);
            textRender(targetControlId);
            e.target.setAttribute("aria-selected", "true");
          } else {
            btn.setAttribute("aria-selected", "false");
          }
        });
      };
    });

    cardTabTitles.forEach((cardTabTitle) => {
      cardTabTitle.onclick = (e) => {
        [...cardTabTitles].forEach((btn) => {
          const isTarget = e.target === btn;
          const targetControlId = e.target.getAttribute("aria-controls");
          if (isTarget) {
            tabCardMove(targetControlId);
            e.target.setAttribute("aria-selected", "true");
          } else {
            btn.setAttribute("aria-selected", "false");
          }
        });
      };
    });

    const navTabControl = (id) => {
      [...navListBoxes].forEach((navListBox) => {
        const targetNavListBox = document.getElementById(id);
        const isTarget = targetNavListBox === navListBox;
        isTarget
          ? targetNavListBox.classList.add("is_show")
          : navListBox.classList.remove("is_show");
      });
      const visibleNavItemTitles = document.querySelectorAll(`.pc_nav .nav_list_box.is_show .nav_item_title`);
      const visibleNavLists = document.querySelectorAll(".pc_nav .nav_list_box.is_show .nav_list");
      subListShow(visibleNavItemTitles, visibleNavLists);
    };

    const subListShow = (visibleTitles, visibleNavLists) => {
      visibleTitles.forEach((button) => {
        button.onclick = (e) => {
          [...visibleNavLists].forEach((navList) => {
            [...navList.children].forEach((element) => {
              [...element.children]
                .filter((item) => item.classList.contains("nav_item_title"))
                .forEach((btn) => {
                  const targetSubList = e.target.parentNode.parentNode;
                  const isTarget = targetSubList === navList;
                  const expanded = isTarget && btn.ariaExpanded === "false";
                  btn.setAttribute(
                    "aria-expanded",
                    expanded ? "true" : "false"
                  );
                  isTarget
                    ? targetSubList.classList.add("is_show")
                    : navList.classList.remove("is_show");
                });
            });
          });
        };
      });
    };

    const tabAuthMove = (id) => {
      [...authContents.children].forEach((authContent) => {
        const targetTabItemAuthContent = document.getElementById(id);
        const isTarget = targetTabItemAuthContent === authContent;
        isTarget
          ? targetTabItemAuthContent.classList.add("is_show")
          : authContent.classList.remove("is_show");
      });
    };

    const textRender = (id) => {
      switch (id) {
        case "card":
          utilDesc.textContent = "삼성카드 앱 안내";
          break;
        case "id":
          utilDesc.textContent = "아이디/비밀번호찾기";
          break;
        case "cert_finance":
        case "cert_public":
          utilDesc.textContent = "인증서등록";
          break;
        default:
          return;
      }
    };

    const tabCardMove = (id) => {
      [...cardContents.children].forEach((cardContent) => {
        const targetTabItemCardContent = document.getElementById(id);
        console.log(targetTabItemCardContent);
        const isTarget = targetTabItemCardContent === cardContent;
        isTarget
          ? targetTabItemCardContent.classList.add("is_show")
          : cardContent.classList.remove("is_show");
      });
    };

    gsap
    .timeline({
      scrollTrigger: {
        trigger: ".event_benefit_wrap",
        start: "0% 130px",
        end: "100% 100%",
        markers: false,
        pin: true,
        scrub: 1,
      },
    })
    .to(".section_ongoing_event", {
      yPercent: 51,
      xPercent: 0,
    });

    familySite.onclick = (e) => {
      e.preventDefault();
      const targetPressed = e.target.ariaPressed === "true";
      e.target.ariaPressed = !targetPressed;
      e.target.ariaExpanded = !targetPressed;
      familyList.style.opacity = targetPressed ? 0 : 1;
      familyList.style.visibility = targetPressed ? "hidden" : "visible";
    };
  }; 

  const settingMobile = function () {
    wrapper.classList.add("mobile");

    const moGnbCloseBtn = document.querySelector(".mo_gnb_close_btn");
    const policyItemTitle = document.querySelector(".policy_item_title");


    policyItemTitle.onclick = (e) => {
      e.preventDefault();
      const targetPressed = e.target.ariaPressed === "true";
      e.target.ariaPressed = !targetPressed;
      e.target.ariaExpanded = !targetPressed;
    };

    moGnbCloseBtn.onclick = (e) => {
      e.preventDefault();
      moGnb.classList.toggle("is_show");
      btnMenu.ariaExpanded = "false"
    };
  };

  window.addEventListener("DOMContentLoaded", handleWindowResize);
  window.addEventListener("resize", handleWindowResize);
}


samsungCardUI()