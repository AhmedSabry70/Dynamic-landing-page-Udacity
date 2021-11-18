/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
// get main tag
const main = document.querySelector("main");
// get all live section coz querySelector won't work with live
const sections = document.getElementsByTagName("section");
//get navbar ul
const navList = document.getElementById("navbar__list");
// add counter to count sections number
let counter = sections.length + 1;
//get scroll to top button element
const topscroll = document.querySelector(".topscroll");
//console.log(anchorList);

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

/*
 * build the nav
 */
const navBuilder = () => {
  /* 
      We will define a variable to carry each new element to the list without deleting the other elements.
      It will be empty to receive every time an item is created
  */
  navItem = "";
  // loop for section
  // const startingTime= performance.now()
  for (const section of sections) {
    // console.log(section.id);
    //get sction id
    const sctionLink = section.id;
    //get sction data-nav
    const anchorText = section.dataset.nav;
    // with every loop will create a nav list item for that section found
    navItem += `<li><a class="menu__link" href="#${sctionLink}" data-menu="${sctionLink}">${anchorText}</a></li>`;
  }

  // insert the new item item above in the navList
  navList.innerHTML = navItem;

  if (navItem < 2000) {
    setTimeout(navBuilder, 0);
  }
  //const endingTime= performance.now()
  //console.log(`this code took${(endingTime -startingTime)} millisecond`)
};
navBuilder();

/*
 * function => Scroll to anchor scetion ID using scrollintoview method to make smooth scroll
 */
const smootScroll = () => {
  // loop for all (a)tags=> anchors only inside navebar to include logo too, set scroll smooth for all and to every new dynamic's sections
  document.querySelectorAll(".navbar__menu a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); //prevent a default Html anchor behavior, to make own scroll event
      const secView = document.getElementById(link.getAttribute("data-menu")); //See every ID that matches the data-menu to link them with scrollIntoView
      secView.scrollIntoView({
        // the transition animation smooth
        behavior: "smooth",
      });
      // console.log(secView)
    });
  });
};
smootScroll();

/*
 *  build the new Sections
 */
// Add dynamic sections by button and then add links in our navList
const sectionBuilder = document
  .querySelector(".addbtn")
  .addEventListener("click", () => {
    // I will make the maximum number of sections that can be added 10 and no more
    if (counter <= 10) {
      const newSection = `<section id="section${counter}" data-nav="Section ${counter}">
        <div class="landing__container">
          <h2>Section ${counter}</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
    
          <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
        </div>
      </section>`;

      // add this newSection in the end of main element
      document
        .querySelector("main")
        .insertAdjacentHTML("beforeend", newSection);

      // after every new setion added ,counter will increase +1
      counter++;
      // call funcation with every addeventlistener happen
      navBuilder();
      activition();
      smootScroll();
    } else {
      // if the number of the sections are <= 10 , and the user want to add more will alert him,he can't add any more
      alert(`sorry but u can't add more than 10 sections`);
    }
  });

/*
 *  remove last Sections
 */
const sectionRemover = document
  .querySelector(".removebtn")
  .addEventListener("click", () => {
    //remove the last section until it reaches number 4. Less than it. cannot be deleted
    if (sections.length > 4) {
      //delet section from main tag
      document
        .querySelector("main")
        .removeChild(document.querySelector("main").lastElementChild);
      //delete linked section form navList
      navList.removeChild(navList.lastElementChild);
      //decrease counter var -1
      counter--;
    } else {
      //alert user when reaches a limited number =>(4)
      alert(`sorry i can't remove 4th section , it shoud there four sections`);
    }
  });

/*
 *  Add class 'active' to section when near top of viewport
 */
const options = {
  root: null,
  rootMargin: "0px", // margin around the section.
  threshold: 0.66, // visible amount of item shown
};

const activition = () => {
  let links = document.querySelectorAll("#navbar__list a");
  // use  IntersectionObserver method my reference |MDN
  observer = new IntersectionObserver((en) => {
    //loop for sections
    for (const e of en) {
      // if the section arrive at viewport will add an active class to both of link and section itself
      if (e.isIntersecting) {
        //loop for navlist items
        for (const link of links) {
          if (link.dataset.menu === e.target.id) {
            //add hightligths to anchor when this section in the viewport
            link.classList.add("active");
          } else {
            //if the section isn't in viewport will remove all active class from naveitem
            link.classList.remove("active");
          }
        }
        //add active class to the section that is in veiwport
        e.target.classList.add("your-active-class");
      } else {
        //remove active class from the section that not in veiwport
        e.target.classList.remove("your-active-class");
      }
    }
  }, options);

  // loop for all section and absorve everyone to (IntersectionObserver) method
  for (const section of sections) {
    observer.observe(section);
  }
};
activition();
// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

/**
 *
 * Begin Events scrollto top button and responsive menu
 *
 */
// show top button when the user scrolls below the fold of the page
const showScrollBtn = () => {
  // console.log(this.scrollY);
  //scroll great than 600 apply my setup
  if (window.scrollY >= 600) {
    // show => scroll to top button up
    topscroll.style.bottom = "40px";
  } else {
    //   //disappear => scroll to top button
    topscroll.style.bottom = "-70px";
  }
};
//catch last scrollY value
let lastScrollValue = window.pageYOffset || document.documentElement.scrollTop;

window.addEventListener("scroll", () => {
  //Catch the current scrollY value
  let scrollTop = this.pageYOffset || document.documentElement.scrollTop;
  // viewpor widt greater than 768px
  const mediaQuer = window.matchMedia("(min-width: 768px)");
  //when  you scroll down and scrollY greater than 600 will disappear the header ,and viewpor widt greater than 768px,
  // if not one of these two conditions, header still appear
  if (scrollTop > lastScrollValue && this.scrollY >= 600 && mediaQuer.matches) {
    // move it out from view port
    document.querySelector(".page__header").style.top = "-200";
  } else {
    // get it in from view port
    document.querySelector(".page__header").style.top = "0";
  }
  lastScrollValue = scrollTop;
  showScrollBtn();
});

//add the event to topscroll button, that makes smooth scroll top 0 (start of the page)
topscroll.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// get menu_icon HTML element ,add event and toggle it to display none and show
document.querySelector(".menu_icon").addEventListener("click", function () {
  this.classList.toggle("togglemenu");
  navList.classList.toggle("active");
});

/**
 *
 * end Events scrollto top button and responsive menu
 *
 */

//  scroll to top button

// Build menu

// Scroll to section on link click

// Set sections as active
