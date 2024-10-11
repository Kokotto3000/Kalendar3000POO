import { loadedEvents, activeFilters } from "./globals.js";
// EventManager.js
export class EventManager {
    constructor() {

    }

    // Méthode pour charger les événements à partir d'un fichier JSON
    loadEvents() {
        return fetch('../events.json')
            .then(response => response.json())
            .then(data => {
                loadedEvents.length = 0; // Vider le tableau si nécessaire
                loadedEvents.push(...data.map(event => ({
                    ...event,
                    date: new Date(event.date)
                })));
            })
            .catch(error => console.error('Erreur lors du chargement des événements:', error));
    }

    getEvents(day, month, year) {
        // Filtrer les événements qui correspondent au jour actuel et aux filtres actifs
        return loadedEvents.filter(event => {
            const eventDate = event.date; // Chaque événement n'a plus qu'une seule date
            const currentDay = new Date(year, month, day);

            // Vérifier si la date de l'événement correspond au jour actuel
            const isSameDay = eventDate.getFullYear() === currentDay.getFullYear() &&
                            eventDate.getMonth() === currentDay.getMonth() &&
                            eventDate.getDate() === currentDay.getDate();

            // Vérifier si le type d'événement est dans les filtres actifs
            const isFiltered = activeFilters.length === 0 || activeFilters.some(e => event.type.includes(e));

            return isSameDay && isFiltered;
        });

    }

    // Méthode pour mettre à jour les filtres actifs
    /*updateActiveFilters(filters) {
        activeFilters = filters;
    }*/
}