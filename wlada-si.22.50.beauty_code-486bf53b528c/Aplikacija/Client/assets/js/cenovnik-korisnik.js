import {Api} from "../../assets/js/api.js"
import { Salon } from "../../assets/js/salon.js";
import { Radnik } from "../../assets/js/radnik.js";

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()




var api=new Api();
var usluge= await api.vratiUslugePrazne();
var salon=await api.vratiSalon();
var radnici=[];
var api=new Api();
var usluge= await api.vratiUslugePrazne();
var salon=await api.vratiSalon();
let izabrano;
document.getElementById("inputTip").onchange=(ev)=>prikaziOdabrano();
function prikaziOdabrano(){
  console.log("okinuto");

  const divUsluge3 = document.querySelectorAll(".usluga");
  if (divUsluge3 !== null) {
    divUsluge3.forEach( el => {
      let brisi997 = el.parentNode;
      brisi997.removeChild(el);
    })
  }

  
  let index;
  izabrano= document.querySelector(".tipUslugeSelekt").value;
  if(izabrano==0){
    console.log("al nema nista");
  }
  else{
    vratiUslugeOdabrane(izabrano);
  }
}

async function vratiUslugeOdabrane(izabrano){
  let ch= await api.vratiUslugePoTipu(izabrano);

  tabelaUsluge(ch);
  
  console.log(ch);
  console.log(izabrano);
}
function tabelaUsluge(data){
  var selekcija=document.getElementById("usluga");
  data.forEach((p,i)=>{
     console.log(p, i);
    selekcija.innerHTML+=`
    <div class="usluge-container">
      <div class="usluga" id="itemForm "> 
        <div class="div-za-checkbox"> 

          <form class="forma-checkbox">
            <div class="form-group1">
          
              <input name="usluga" type="checkbox" id="${i}" value="${p.ID}">
              
              <label class="labela" for="${i}">
                <span class="checkbox" type="checkbox" id="${i}" value="${p.ID}">
                  <span class="check"> </span>
                </span>
              </label>

            </div>
          </form>
        </div>

        <div class="usluga-info"> ${p.imeUsluge} </div>
        <div class="usluga-cena">  ${p.cena + " RSD"} </div>
          
      </div>
    </div>`
  })
  const divUsluge2 = document.querySelectorAll(".usluga");
  console.log(divUsluge2);
  divUsluge2.forEach(cb => 
    cb.onclick = () => {
      // console.log("aaaaaaa");
      const box = cb.querySelector('input[type=checkbox]');
  
      if (box.checked === true) {
        // console.log("cek");
        box.checked = false;
      }
      else {
        // console.log("ne-cek");
        box.checked = true;
      }
    })
}



document.getElementById("PrelazSaCenovnikaNaZakazivanje").onclick=(ev)=>zakazivanje();

function zakazivanje(){
  var UslugeZaSlanje=[]
  let selektovano=0;
  document.getElementsByName("usluga").forEach(p=>{
    if(p.checked==true)
    {
      UslugeZaSlanje.push(p.value);
      selektovano++;
      console.log(p.value);
    }
    
  })
  if(selektovano==0)
  {
    alert("Niste odabrali usluge!");
  }
  else{
    localStorage.setItem("UslugeDuzina",UslugeZaSlanje.length);
    UslugeZaSlanje.forEach((x,i)=>{
      localStorage.setItem(`Usluge${i}`,UslugeZaSlanje[i]);  
      })
      console.log(izabrano);
    localStorage.setItem("Tip",izabrano);
      window.location.href = "zakazivanje.html";
  }
}
var radnici=await api.vratiRadnike(salon.id);
var selekcija=document.getElementById("radniciCenovikStrana");
for(const radn of radnici)
{
  selekcija.innerHTML+=`
  <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div class="member" data-aos="fade-up">
              <div class="member-img">
                <img src="assets/img/user-photo.png" class="img-fluid" alt="">
                <div class="social">
                  <a href="https://twitter.com"><i class="bi bi-twitter"></i></a>
                  <a href="https://facebook.com"><i class="bi bi-facebook"></i></a>
                  <a href="https://instagram.com"><i class="bi bi-instagram"></i></a>
                  <a href="https://linkedin.com"><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div class="member-info">
                <h3>${radn.ime}</h3>
                <span><h4>${radn.tipRadnika}</h4></span>
              </div>
            </div>
          </div>
  `
}