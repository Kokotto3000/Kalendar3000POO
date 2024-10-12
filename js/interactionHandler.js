// InteractionHandler.js
import { facebookShareBtn, twitterShareBtn, linkedinShareBtn, calendarUrl, copyBtn, filterButton, filterSection, closeFilters, currentDate, prevMonthButton, nextMonthButton, filterInputs, activeFilters, pageUrl } from './globals.js';
import { Calendar } from './calendar.js';
import { FiltersManager } from './filtersManager.js';


export class InteractionHandler {
    constructor() {
        this.calendar = new Calendar();
        this.filtersManager = new FiltersManager();
        this.calendar = new Calendar();

        this.initializeInteractions();
    }

    initializeInteractions() {
        
        facebookShareBtn.addEventListener("click", () => this.shareOnFacebook());
        twitterShareBtn.addEventListener("click", () => this.shareOnTwitter());
        linkedinShareBtn.addEventListener("click", () => this.shareOnLinkedin());
        copyBtn.addEventListener("click", () => this.copyUrl());
        filterButton.addEventListener('click', ()=> filterSection.classList.toggle('active'));
        closeFilters.addEventListener('click', ()=> filterSection.classList.remove('active'));
        // Gestion des filtres
        // Sélectionner toutes les cases par défaut
        filterInputs.forEach(input => {
            if(input.checked) activeFilters.push(input.value); // Coche toutes les cases // Ajouter chaque filtre à la liste des filtres actifs
            input.addEventListener('change', ()=> this.filtersManager.updateActiveFilters()); // Met à jour les filtres quand une case change
        });

        prevMonthButton.addEventListener('click', ()=> this.monthUpdate("prev"));
        nextMonthButton.addEventListener('click', ()=> this.monthUpdate("next"));
    }

    shareOnFacebook() {

        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
        window.open(facebookUrl, '_blank');
    }

    shareOnTwitter() {

        const tweetText = "Découvrez ce Kalendrier incroyable !";
        const twitterUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${encodeURIComponent(tweetText)}&via=Kokotto3000`;
        window.open(twitterUrl, '_blank');
    }

    shareOnLinkedin() {

        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
        window.open(linkedInUrl, '_blank');
    }

    copyUrl() {

        const copyText = document.getElementById("input");
        copyText.value = calendarUrl;
        copyText.select();
        navigator.clipboard.writeText(copyText.value);
    }

    dropdownMonthUpdate(linkItem) {
        linkItem.addEventListener("click", (e)=> {
            e.preventDefault();

            currentDate.setMonth(parseInt(linkItem.dataset.month));
            currentDate.setFullYear(parseInt(linkItem.dataset.year));
            //EN ATTENTE DE LA METHODE !!! avec la classe Calendar...
            this.calendar.renderCalendar(); // Mettre à jour le cal
        })
    }

    monthUpdate(direction) {
        direction === "prev" ? currentDate.setMonth(currentDate.getMonth() - 1) : currentDate.setMonth(currentDate.getMonth() + 1);
        this.calendar.renderCalendar();
    }
}