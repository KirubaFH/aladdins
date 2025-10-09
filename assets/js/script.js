// const loader = document.getElementById("loader");
// window.addEventListener("load", () => {
//     setTimeout(() => {
//         loader.classList.add("inactive");
//         document.body.classList.add("loaded");
//     }, 500)
// });

const images = document.querySelectorAll("img");
images.forEach((img) => {
    img.setAttribute('loading', 'lazy');
})

const openMenu = document.getElementById("openmenu");
const slide = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-link");
const dropLinks = document.querySelectorAll(".drop-nav-link");
const body = document.getElementById("page-body");
const overlay = document.getElementById("overlay");
const menuNavLink = document.querySelector(".menu-nav-link-li");
const menuDropDown = document.querySelector(".menu-dropdown");
const activePage = window.location.pathname;

openMenu.addEventListener('click', () => {
    openMenu.classList.toggle("active");
    slide.classList.toggle("active");
    body.classList.toggle("active");
})

links.forEach((link) => {
    link.addEventListener('click', () => {
        openMenu.classList.remove("active");
        slide.classList.remove("active");
        body.classList.remove("active");
    })

    const linkPath = new URL(link.href).pathname; 
    if (linkPath === activePage) {
        link.classList.add("active");
    }
})

const media = window.matchMedia("(max-width: 767px)");
mediaFunction(media);
function toggleMenu(active) {
  openMenu.classList.toggle("active", active);
  slide.classList.toggle("active", active);
  body.classList.toggle("active", active);
}

function mediaFunction(media) {
  const isMobile = media.matches;

  dropLinks.forEach((dropLink) => {
    dropLink.addEventListener('click', () => {
      toggleMenu(isMobile);
    });
  });

  menuNavLink.addEventListener('click', () => {
    menuDropDown.classList.toggle("active");
    toggleMenu(isMobile);
  });
}


// home video banner
function adjustHeroHeight() {
    const hero = document.querySelector(".home-hero-section");
    const windowHeight = window.innerHeight;
    hero.style.height = windowHeight + "px"; 
}
window.addEventListener("load", adjustHeroHeight);
window.addEventListener("resize", adjustHeroHeight);


/* ------------------------
PopUp form Validation
--------------------------- */ 
const form = document.getElementById("fran-form");
const firstName = document.getElementById("firstName-input");
const lastName = document.getElementById("lastName-input");
const email = document.getElementById("email-input");
const phone = document.getElementById("phone-input");
const locationField = document.getElementById("location-input");
const referral = document.getElementById("referral-input");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener('submit',(e)=> {
    if(!validateInputs()) {
        e.preventDefault();
    } 
})

function validateInputs() {
    const firstNameVal = firstName.value.trim();
    const lastNameVal = lastName.value.trim();
    const emailVal = email.value.trim();
    const phoneVal = phone.value.trim();
    const locationVal = locationField.value.trim();
    const referralVal = referral.value.trim();
    let success = true;

    // First Name
    if(firstNameVal === '') {
        success = false;
        setError(firstName,'Please enter your first name*')
    } else if(/\d/.test(firstNameVal)) {
        success = false;
        setError(firstName,'First name cannot contain numbers*')
    } else {
        setSuccess(firstName);
    }

    // Last Name
    if(lastNameVal === '') {
        success = false;
        setError(lastName,'Please enter your last name*')
    } else if(/\d/.test(lastNameVal)) {
        success = false;
        setError(lastName,'Last name cannot contain numbers*')
    } else {
        setSuccess(lastName);
    }

    // Email
    if(emailVal === '') {
        success = false;
        setError(email,'Email is required*')
    }
    else if(!validateEmail(emailVal)) {
        success = false;
        setError(email,'Please enter a valid Email*')
    }
    else {
        setSuccess(email)
    }

    // Phone
    if(phoneVal === '') {
        success = false;
        setError(phone,'Please enter your phone number*')
    } else if(!/^[0-9]{7,15}$/.test(phoneVal)) {
        success = false;
        setError(phone,'Please enter a valid phone number*')
    } else {
        setSuccess(phone);
    }

    // Location
    if(locationVal === '') {
        success = false;
        setError(locationField,'Preferred location required*')
    } else {
        setSuccess(locationField);
    }

    // Referral
    if(referralVal === '') {
        success = false;
        setError(referral,'Please tell us how you heard about us*')
    } else {
        setSuccess(referral);
    }

    return success;
}

function setError(element,message) {
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector(".error-msg");

    errorElement.innerText = message;
    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');
}

function setSuccess(element) {
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector(".error-msg");

    errorElement.innerText = '';
    inputGroup.classList.add('success');
    inputGroup.classList.remove('error');
}

const validateEmail = (email) => {
    return String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};



$('.samples-slider').owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    dots: false,
    navText: ["<i class='fa fa-caret-left'></i>", "<i class='fa fa-caret-right'></i>"],
    smartSpeed: 1000,
    autoplay: false,
    autoplayTimeout: 4000,
    smartSpeed: 1000,
    responsive: {
        0: {
            items: 1
        },
        576: {
            items: 2
        },
        768: {
            items: 3
        },
        1200: {
            items: 4
        }
    }
})

lc_lightbox('.lightbox', {
    wrap_class: 'lcl_fade_oc',
    gallery: false,
    thumb_attr: 'data-lcl-thumb',
    skin: 'light',
    radius: 4,
    padding: 0,
    border_w: 0
});



