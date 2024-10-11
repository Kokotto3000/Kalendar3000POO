import { Calendar } from "./calendar.js";
import { currentDate, dropdownMenu } from "./globals.js";
import { InteractionHandler } from "./interactionHandler.js";

export class DropdownMenu {
    constructor() {
        this.currentMonth = currentDate.getMonth();
        this.currentYear = currentDate.getFullYear();
        this.previousYear = null;
        this.calendar = new Calendar();
        this.generateDropdownMenu();
    }

    // Méthode pour générer le menu déroulant des mois, le but c'est que le menu ne bouge pas en fonction du mois sur lequel on clique mais qu'il y ait les 6 mois précédant la date du jour et les 6 mois suivant avec un sous titre pour l'année
    generateDropdownMenu() {
        // Ajouter les 6 mois précédents et les 6 mois suivants dans le dropdown
        for (let i = -6; i <= 6; i++) {
            let month = new Date(this.currentYear, this.currentMonth + i, 1);
            let monthName = month.toLocaleDateString('fr-FR', { month: 'long' });
            let year = month.getFullYear();
    
            // Si l'année change, ajouter un sous-titre pour l'année
            if (year !== this.previousYear) {
                let yearHeader = document.createElement('li');
                yearHeader.className = 'dropdown-header';
                yearHeader.textContent = year;
                dropdownMenu.appendChild(yearHeader);
                this.previousYear = year;
            }
    
            let listItem = document.createElement('li');
            let linkItem = document.createElement('a');
            linkItem.className = 'dropdown-item';
            linkItem.href = '#';
            linkItem.textContent = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)}`;
            linkItem.dataset.month = month.getMonth();
            linkItem.dataset.year = year;
    
            // Ajouter une classe spéciale pour le mois en cours
            if (month.getMonth() === this.currentMonth && year === this.currentYear) {
                linkItem.classList.add('current-month');
            }

            linkItem.addEventListener("click", (e)=> {
                e.preventDefault();
                currentDate.setMonth(parseInt(linkItem.dataset.month));
                currentDate.setFullYear(parseInt(linkItem.dataset.year));
                this.calendar.renderCalendar(); // Mettre à jour le cal
            })
    
            listItem.appendChild(linkItem);
            dropdownMenu.appendChild(listItem);
        }
    }
}
