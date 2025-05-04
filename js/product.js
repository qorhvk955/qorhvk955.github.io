document.addEventListener("DOMContentLoaded", () => {
  const categoryItems = document.querySelectorAll(".category-item");
  const dragContainer = document.getElementById("drag");
  const template = document.querySelector(".drag-item.template");
  const drag = document.getElementById('drag');
  let isDown = false;
  let startX;
  let scrollLeft;

  // var foodATop = -200
  // var foodBTop = -210
  // var foodALeft = -140
  // var foodBLeft = -150

  // var drinkTop = -200
  // var drinkLeft = -140
  var foodATop = 50
  var foodBTop = 50
  var foodALeft = -20
  var foodBLeft = -12

  var drinkTop = 50
  var drinkLeft = 0

  var productS = "clamp(15vh, 16vh, 158px)"
  var productSS = "clamp(30vh, 33vh, 324px)"
  var productD = "clamp(12vh, 13vh, 140px)"
  var productF = "clamp(32vh, 35vh, 400px)"
  var productFS = "clamp(18vh, 26vh, 252px)"
  var productDr = "clamp(17vh, 28vh, 270px)"

  const productData = {
    sauce: [
      {
        title: "<span>저칼로리</span><br><span>토마토케찹</span>",
        desc: "<span>설탕</span> <span>대신</span> <span>알룰로스를</span> <span>사용</span><br><span>특유의</span> <span>새콤</span> <span>달콤한</span> <span>맛을</span><br><span>살린</span> <span>케찹</span>",
        mainImg: "./file/main/sauce_tomato.png",
        subImg: "./file/sub/sauce_tomato.png",
        link: "https://www.dongwonmall.com/product/detail.do?productId=003698299&cate_id=",
        mainSize: productS,
        subSize: productSS
      },
      {
        title: "<span>저칼로리</span><br><span>머스타드</span> <span>소스</span>",
        desc: "<span>홀그레인을</span> <span>넣어</span> <span>톡톡</span> <span>씹히는</span> <span>재미를</span> <span>더해</span> <span>특유의</span> <span>향긋한</span><br><span>풍미를</span> <span>UP</span><span>!</span>",
        mainImg: "./file/main/sauce_mustard.png",
        subImg: "./file/sub/sauce_mustard.png",
        link: "https://www.dongwonmall.com/product/detail.do?productId=003698283&cate_id=",
        mainSize: productS,
        subSize: productSS
      },
      {
        title: "<span>저당</span> <span>굴소스</span>",
        desc: "<span>당류를</span> <span>덜었지만</span> <span>진하게</span><br><span>농축된</span> <span>감칠맛은</span> <span>그대로</span><span>!</span> <br> <span>국산</span> <span>굴</span> <span>추출물을</span> <span>사용해</span><br><span>풍부한</span> <span>해산물</span> <span>향까지</span><span>!</span>",
        mainImg: "./file/main/sauce_oyster.png",
        subImg: "./file/sub/sauce_oyster.png",
        link: "https://www.dongwonmall.com/product/detail.do?productId=003698276&cate_id=",
        mainSize: productS,
        subSize: productSS
      },
      {
        title: "<span>저당</span> <span>갈릭디핑</span> <span>소스</span>",
        desc: "<span>고소한</span> <span>마늘향이</span> <span>입안을</span><br><span>감싸며</span><span>,</span> <span>당은</span> <span>줄이고</span><br><span>풍미는</span> <span>꽉</span> <span>채웠다</span><span>!</span>",
        mainImg: "./file/main/sauce_garlic dipping.png",
        subImg: "./file/sub/sauce_garlic dipping.png",
        link: "https://www.dongwonmall.com/product/detail.do?productId=003755174&cate_id=",
        mainSize: productS,
        subSize: productSS
      }
    ],
    dressing: [
      {
        title: "<span>저당</span> <span>시저</span><br><span>드레싱</span>",
        desc: "<span>진한</span> <span>치즈</span> <span>풍미와</span><br><span>고소함은</span> <span>그대로</span><span>!</span><br><span>느끼하지</span> <span>않게</span> <span>당만</span> <span>뺐다</span><span>!</span>",
        mainImg: "./file/main/dressing_caesar.png",
        subImg: "",
        link: "https://www.dongwonmall.com/product/detail.do?productId=003698267&cate_id=",
        mainSize: productD,
        subSize: ""
      },
      {
        title: "<span>저당</span> <span>오리엔탈</span> <span>드레싱</span>",
        desc: "<span>깔끔한</span> <span>간장</span> <span>베이스에</span><br><span>참기름</span> <span>향이</span> <span>솔솔~</span><br><span>저당</span> <span>레시피로</span> <span>완성!</span>",
        mainImg: "./file/main/dressing_oriental.png",
        subImg: "",
        link: "https://www.dongwonmall.com/product/detail.do?productId=003698300&cate_id=",
        mainSize: productD,
        subSize: ""
      },
      {
        title: "<span>저당</span> <span>참깨소이</span> <span>드레싱</span>",
        desc: "<span>고소한</span> <span>참깨와</span><br><span>부드러운</span> <span>두유의</span> <span>조화!</span><br><span>건강하고</span> <span>담백한</span> <span>맛의</span> <span>정석</span>",
        mainImg: "./file/main/dressing_sesame.png",
        subImg: "",
        link: "https://www.dongwonmall.com/product/detail.do?productId=003702228&cate_id=",
        mainSize: productD,
        subSize: ""
      },
      {
        title: "<span>저당</span> <span>사우전드</span> <span>아일랜드</span><br><span>드레싱</span>",
        desc: "<span>새콤달콤한</span> <span>맛은</span> <span>그대로,</span><br><span>칼로리는</span> <span>가볍게!</span><br><span>샐러드에</span> <span>생기를</span> <span>더하다</span>",
        mainImg: "./file/main/dressing_thousand island.png",
        subImg: "",
        link: "https://www.coupang.com/vp/products/8614640543?itemId=24988948930&vendorItemId=91994356961&sourceType=CATEGORY&categoryId=502068",
        mainSize: productD,
        subSize: ""
      }
    ],
    food: [
      {
        title: "<span>저당</span> <span>브리또</span> <span>바베큐맛</span>",
        desc: "<span>훈연</span> <span>바베큐</span> <span>풍미</span> <span>가득!</span><br><span>담백한</span> <span>닭가슴살로</span><br><span>속까지</span><span>든든하게</span>",
        mainImg: "./file/main/food_babeq.png",
        subImg: "",
        link: "https://www.dongwonmall.com/product/detail.do?productId=003738654&cate_id=",
        mainSize: productF,
        subSize: "",
        top: foodATop + "%",
        left: foodALeft + "%"
      },
      {
        title: "<span>저당</span> <span>브리또</span><br><span>양념치킨맛</span>",
        desc: "<span>매콤달콤한</span> <span>양념치킨</span> <span>맛을</span><br><span>브리또에</span> <span>쏙!</span> <span>당</span> <span>줄이고</span><br><span>맛은</span> <span>업그레이드!</span>",
        mainImg: "./file/main/food_fire hot.png",
        subImg: "",
        link: "https://www.dongwonmall.com/product/detail.do?productId=003738611&cate_id=",
        mainSize: productF,
        subSize: "",
        top: foodATop + "%",
        left: foodALeft + "%"
      },
      {
        title: "<span>저당</span> <span>브리또</span><br><span>숯불매콤맛</span>",
        desc: "<span>불향</span> <span>가득</span> <span>매콤한</span> <span>맛으로</span><br><span>입맛</span> <span>저격!</span> <span>저당으로</span><br><span>더</span> <span>가볍게</span> <span>즐기자</span>",
        mainImg: "./file/main/food_red chicken.png",
        subImg: "",
        link: "https://www.dongwonmall.com/product/detail.do?productId=003738609&cate_id=",
        mainSize: productF,
        subSize: "",
        top: foodATop + "%",
        left: foodALeft + "%"
      },
      {
        title: "<span>저당</span> <br> <span>닭가슴살죽</span>",
        desc: "<span>부드러운</span> <span>닭가슴살이</span> <span>듬뿍!</span><br><span>당</span> <span>걱정</span> <span>없는</span> <span>담백한</span> <span>한</span> <span>끼</span>",
        mainImg: "./file/main/food_chick soup.png",
        subImg: "",
        link: "https://www.dongwonmall.com/product/detail.do?productId=003604669&cate_id=",
        mainSize: productFS,
        subSize: "",
        top: foodBTop + "%",
        left: foodBLeft + "%"
      },
      {
        title: "<span>저당</span> <span>닭가슴살</span> <span>김치죽</span>",
        desc: "<span>칼칼한</span> <span>김치와</span><br><span>담백한</span> <span>닭가슴살의</span> <span>조화!</span><br><span>부담</span> <span>없이</span> <span>얼큰한</span> <span>맛</span>",
        mainImg: "./file/main/food_kimchi soup.png",
        subImg: "",
        link: "https://www.dongwonmall.com/product/detail.do?productId=003698630&cate_id=#this",
        mainSize: productFS,
        subSize: "",
        top: foodBTop + "%",
        left: foodBLeft + "%"
      },
      {
        title: "<span>저당</span> <span>단호박죽</span>",
        desc: "<span>달콤한</span> <span>단호박</span><br><span>본연의</span> <span>맛을</span> <span>살려,</span><br><span>당은</span> <span>줄이고</span> <span>맛은</span> <span>그대로</span>",
        mainImg: "./file/main/food_pumpkin soup.png",
        subImg: "",
        link: "https://www.dongwonmall.com/product/detail.do?productId=003698630&cate_id=#this",
        mainSize: productFS,
        subSize: "",
        top: foodBTop + "%",
        left: foodBLeft + "%"
      }
    ],
    drink: [{
        title: "<span>저당</span> <span>푸룬</span> <br> <span>드링크</span>",
        desc: "<span>푸룬</span> <span>특유의</span> <span>깊은</span> <span>풍미는</span><br><span>그대로,</span> <span>당은</span> <span>확</span> <span>줄여</span><br><span>상쾌하게</span> <span>마시자!</span>",
        mainImg: "./file/main/drink_prune.png",
        subImg: "",
        link: "https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000224172&utm_campaign=onpro_echo_main.fp_tbd_tbd&gad_source=1&gad_campaignid=21380184449&gbraid=0AAAAADhLsCWFWkH1rws5_3wlkvx3LWkTy&gclid=Cj0KCQjwt8zABhDKARIsAHXuD7aIpUxtqjbrS-jfpYEv_v77K_XdhHzG-cmbVgvd370yYMdkwjBUnrgaAtdvEALw_wcB",
        mainSize: productDr,
        subSize: "",
        top: drinkTop + "%",
        left: drinkLeft + "%"
      },
      {
        title: "<span>제로</span> <br> <span>샤인머스캣</span> <br> <span> 에이드</span>",
        desc: "<span>청포도향</span> <span>가득한</span> <span>상큼한</span> <span>탄산!</span> <span>당</span> <span>없이도</span> <span>충분히</span> <span>달콤하게</span>",
        mainImg: "./file/main/drink_shine muscat.png",
        subImg: "",
        link: "https://www.dongwonmall.com/product/detail.do?productId=003612690&cate_id=",
        mainSize: productDr,
        subSize: "",
        top: drinkTop + "%",
        left: drinkLeft + "%"
      },
      {
        title: "<span>제로</span> <br> <span>자몽에이드</span>",
        desc: "<span>자몽의</span> <span>쌉싸름한</span> <span>매력을</span><br><span>탄산에</span> <span>담다!</span> <span>제로슈거로</span><br><span>깔끔하게</span> <span>터지는</span> <span>맛</span>",
        mainImg: "./file/main/drink_grapefruit.png",
        subImg: "",
        link: "https://www.dongwonmall.com/product/detail.do?productId=003692322&cate_id=",
        mainSize: productDr,
        subSize: "",
        top: drinkTop + "%",
        left: drinkLeft + "%"
      },
      {
        title: "<span>저당</span> <span>초코라떼</span>",
        desc: "<span>진한</span> <span>초콜릿의</span> <span>풍미는</span> <span>그대로,</span> <span>당만</span> <span>쏙</span> <span>빼낸</span> <span>부드러운</span> <span>달콤함</span>",
        mainImg: "./file/main/drink_choco latte.png",
        subImg: "",
        link: "https://www.dongwonmall.com/product/detail.do?productId=003612688",
        mainSize: productDr,
        subSize: "",
        top: drinkTop + "%",
        left: drinkLeft + "%"
      },
      {
        title: "<span>저당</span> <span>바닐라</span> <span>라떼</span>",
        desc: "<span>은은한</span> <span>바닐라향이</span> <span>입안을</span><br><span>감싸고,</span> <span>당은</span> <span>덜어낸</span><br><span>부드러운</span> <span>여운</span>",
        mainImg: "./file/main/drink_vanilla latte.png",
        subImg: "",
        link: "https://www.dongwonmall.com/product/detail.do?productId=003612687",
        mainSize: productDr,
        subSize: "",
        top: drinkTop + "%",
        left: drinkLeft + "%"
      }
    ]
  };

  // 제품 렌더링 함수
  function renderProducts(category) {
    // 드래그 컨테이너를 초기화 (스크롤을 0으로 설정)
    dragContainer.scrollLeft = 0;

    // 기존 아이템 제거
    const existingItems = dragContainer.querySelectorAll(".drag-item:not(.template)");
    existingItems.forEach(item => item.remove());

    const items = productData[category] || [];
    items.forEach((product, index) => {
      const clone = template.cloneNode(true);
      clone.classList.remove("template");
      clone.style.display = "flex";

      clone.querySelector(".item-index").innerHTML = `No.${index + 1}`;
      clone.querySelector("h3").innerHTML = product.title;
      clone.querySelector("h4").innerHTML = product.desc;
      clone.querySelector(".main-img").src = product.mainImg;
      clone.querySelector(".sub-img").src = product.subImg;
      clone.querySelector("a").href = product.link;

      // 이미지 크기 설정
      clone.querySelector(".main-img").style.width = product.mainSize;
      clone.querySelector(".sub-img").style.width = product.subSize;

      // 이미지 top, left 위치 조정 (있을 경우만)
      if (product.top) {
        clone.querySelector(".main-img").style.top = product.top;
      }
      if (product.left) {
        clone.querySelector(".main-img").style.right = product.left;
      }

      // 만약 타이틀에 "브리또"가 포함되어 있다면, main-img에 회전 효과 주기
      if (product.title.includes("브리또")) {
        clone.querySelector(".main-img").style.transform = "translateY(-50%) rotate(9deg)";
      }

      // subImg가 비어 있는지 확인하고 display를 조정
      if (product.subImg === "") {
        clone.querySelector(".sub-img").style.display = "none";
      } else {
        clone.querySelector(".sub-img").style.display = "block";
      }

      dragContainer.appendChild(clone);
    });

    // "제품 더보기" 버튼 추가
    const moreButton = document.createElement('div');
    moreButton.className = 'drag-item more-button';
    moreButton.innerHTML = `
      <button class="more-btn" onclick="window.open('https://brand.naver.com/vividkitchen', '_blank')">
        제품 더보기
        <img src="./file/more.svg" alt="더보기 화살표" />
      </button>
    `;
    dragContainer.appendChild(moreButton);
  }

  categoryItems.forEach(item => {
    item.addEventListener("click", () => {
      const selectedCategory = item.getAttribute("data-category");

      // 버튼 이미지 상태 업데이트
      categoryItems.forEach(el => {
        const category = el.getAttribute("data-category");
        const img = el.querySelector("img");
        if (category === selectedCategory) {
            img.src = `./file/button/button_on_${category}.svg`;
        } else {
            img.src = `./file/button/button_off_${category}.svg`;
        }
      });

      renderProducts(selectedCategory);
    });
  });

  // 초기 로딩 시 첫 번째 카테고리 자동 클릭
  categoryItems[0].click();

  const burritoProducts = productData.food.filter(item =>
    item.title.includes("브리또")
  );

  console.log(burritoProducts);

  // 드래그 시작
  dragContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    dragContainer.classList.add('active');
    startX = e.pageX - dragContainer.offsetLeft;
    scrollLeft = dragContainer.scrollLeft;
  });

  // 드래그 중
  dragContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();

    // 스크롤을 부드럽게 만들기 위해 requestAnimationFrame 사용
    requestAnimationFrame(() => {
      const x = e.pageX - dragContainer.offsetLeft;
      const walk = (x - startX) * 1.5; // 스크롤 속도 조절
      dragContainer.scrollLeft = scrollLeft - walk;

      // 애니메이션 효과 추가: 스크롤이 빠르게 느껴지지 않도록
      drag.style.transition = "scroll-left 0.2s ease-out";
    });
  });

  // 드래그 종료
  dragContainer.addEventListener('mouseup', () => {
    isDown = false;
    dragContainer.classList.remove('active');
    drag.style.transition = "none";

    // 가장 가까운 아이템 위치 계산
    const items = [...dragContainer.querySelectorAll('.drag-item:not(.template)')];
    const containerLeft = dragContainer.scrollLeft;
    let closest = items[0];
    let minDiff = Math.abs(items[0].offsetLeft - containerLeft);

    items.forEach(item => {
      const diff = Math.abs(item.offsetLeft - containerLeft);
      if (diff < minDiff) {
        closest = item;
        minDiff = diff;
      }
    });

    // 가장 가까운 아이템 위치로 스크롤
    dragContainer.scrollTo({
      left: closest.offsetLeft,
      behavior: 'smooth'
    });
  });

  dragContainer.addEventListener('mouseleave', () => {
    if (!isDown) return;
    isDown = false;
    dragContainer.classList.remove('active');
  });

  // 드래그가 멈춘 후 스크롤을 부드럽게 멈추도록 하는 함수
  function smoothScroll() {
    drag.style.transition = "scroll-left 0.2s ease-out"; // 부드럽게 멈추기
  }

  console.log(drag.scrollWidth, drag.clientWidth);
});