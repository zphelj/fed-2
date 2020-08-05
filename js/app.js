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
const iSectionIter = document.querySelectorAll('Section');
const eNavbarList = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// Returns true if the element passed in is in the viewport at all
function isInViewport(element) {
  let rect = element.getBoundingClientRect();
  return ( rect.top >= 0 && rect.left >= 0 );
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav using the global iterator for sections
function buildNav(mySection) {
  // create a list item for the NavBar
  eNavbarList.insertAdjacentHTML('beforeend', `<li class='menu__link ${mySection.className}' data-nav=${mySection.id}><a href="#${mySection.id}">${mySection.dataset.nav}</li>`);
}

// refreshes the navbar based on current browser state
function refreshNavBar() {
  // loop through the navbar items and find any in the viewport
  let items = eNavbarList.getElementsByTagName("li");
  // clean first
  for (let i = 0; i < items.length; ++i) {
    items[i].classList.remove('your-active-class'); // strip if it's there - will not throw error if missing
  }
  // update
  for (let i = 0; i < items.length; ++i) {
    if (isInViewport(document.getElementById(items[i].dataset.nav))) {
      items[i].classList.add('your-active-class'); // we have a match, update it
      i = items.length; // only update the first hit
    }
  }
}

// Scroll to anchor
function ScrollToAnchor(click_event) {
  if (click_event.target.parentElement.hasAttribute('data-nav') == false) return; // we're only interested in data-nav items
  click_event.preventDefault(); // don't jump to the anchor!
  dataNav = click_event.target.parentElement.dataset.nav; // what section was targeted
  document.getElementById(dataNav).scrollIntoView({behavior: "smooth"}); // now scroll to it
  refreshNavBar(); // finally, refresh the navbar
}

/* If the page is scrolled manually we may need to update the menu and/or the page content
   NOTE: If the user clicks a navigation item this wil also trigger scroll events */
function UserScroll(scroll_event) {
  refreshNavBar(); // all we need to do is refresh the navbar
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build initial menu
document.addEventListener('DOMContentLoaded', iSectionIter.forEach(buildNav));

// Scroll to section on link click
eNavbarList.addEventListener('click', ScrollToAnchor);

// catch scrolling and check for any necessary adjustments needed
document.addEventListener('scroll', UserScroll);