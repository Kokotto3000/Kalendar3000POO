import { Calendar } from "./calendar.js";
import { filterInputs, activeFilters } from "./globals.js";

export class FiltersManager {
    constructor() {
        this.calendar = new Calendar();
        
    }


    

    // Fonction pour mettre à jour les filtres actifs
    updateActiveFilters() {
        activeFilters.length = 0; // Vider le tableau si nécessaire
        filterInputs.forEach(input => {
            if(input.checked){
                activeFilters.push(input.value);
            }
        });

        //en attente de la methode
        this.calendar.renderCalendar(); // Re-render le calendrier avec les nouveaux filtres
    }
}