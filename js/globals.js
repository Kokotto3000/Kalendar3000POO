//données
const dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const MOBILE_WIDTH = 992;
const currentDate = new Date();
//utilitaires
const loadedEvents = [];
const activeFilters = [];
//éléments du DOM
const currentMonthElement = document.getElementById('current-month');
const calendarDaysElement = document.getElementById('calendar-days');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const filterInputs = document.querySelectorAll('.event-filter');
const dropdownMenu = document.querySelector('.dropdown-menu');
const allEventsMobile = document.getElementById('all-events-mobile');
const filterButton = document.getElementById('filter-button');
const filterSection = document.querySelector('.filter-section');
const closeFilters = document.getElementById('close-filters');
const copyText = document.getElementById("input");
const facebookShareBtn = document.getElementById('shareOnFacebook');
const twitterShareBtn = document.getElementById('shareOnTwitter');
const linkedinShareBtn = document.getElementById('shareOnLinkedIn');
const copyBtn = document.querySelector("#copy");
//url
const calendarUrl = window.location.href;
const pageUrl = encodeURIComponent(calendarUrl);
// Met à jour les métadonnées
function updateMetaTags() {
    const imageUrl = 'https://kokotto3000.com/kalendar3000-screenshot-1200-630.png';
    const calendarTitle = 'Mon Super Calendrier RH 3000';
    const calendarDescription = 'Découvrez les événements RH à ne pas manquer cette année !';

    const title = encodeURIComponent(calendarTitle);
    const description = encodeURIComponent(calendarDescription);

    document.getElementById('og-title').setAttribute('content', title);
    document.getElementById('og-description').setAttribute('content', description);
    document.getElementById('og-image').setAttribute('content', 'https://kokotto3000.com/kalendar3000-screenshot-1200-630.png');
    document.getElementById('og-url').setAttribute('content', pageUrl);
    
    document.getElementById('twitter-title').setAttribute('content', title);
    document.getElementById('twitter-description').setAttribute('content', description);
    document.getElementById('twitter-image').setAttribute('content', imageUrl);
}

export { dayNames, MOBILE_WIDTH,  currentMonthElement, calendarDaysElement, prevMonthButton, nextMonthButton, filterInputs, dropdownMenu, allEventsMobile, filterButton, filterSection, closeFilters, copyText, calendarUrl, currentDate, activeFilters, loadedEvents, facebookShareBtn, twitterShareBtn, linkedinShareBtn, copyBtn, pageUrl, updateMetaTags};