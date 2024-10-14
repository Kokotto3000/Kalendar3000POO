import { loadedEvents, activeFilters } from "./globals.js";
// EventManager.js
export class EventManager {
    constructor() {

    }

    // Méthode pour charger les événements à partir d'un fichier JSON
    loadEvents() {
        return fetch('data/events.json')
            .then(response => response.json())
            .then(data => {
                loadedEvents.length = 0; // Vider le tableau si nécessaire
                loadedEvents.push(...data.map(event => ({
                    ...event,
                    //date: new Date(event.date),
                    start: new Date(event.startDate.year, event.startDate.month, event.startDate.day),
                    end: new Date(event.endDate.year, event.endDate.month, event.endDate.day),
                    position: null
                })));
            })
            .catch(error => console.error('Erreur lors du chargement des événements:', error));
    }

    getEvents(day, month, year) {
        // Filtrer les événements qui correspondent au jour actuel et aux filtres actifs
        return loadedEvents.filter(event => {
            //const eventDate = event.date; // Chaque événement n'a plus qu'une seule date
            const currentDay = new Date(year, month, day);

            // Vérifier si le jour actuel est dans la plage de dates de l'événement
            const isInDateRange = currentDay >= event.start && currentDay <= event.end;

            // Vérifier si le type d'événement est dans les filtres actifs
            const isFiltered = activeFilters.length === 0 || activeFilters.some(e => event.type.includes(e));

            return isInDateRange && isFiltered;
        });

    }
}