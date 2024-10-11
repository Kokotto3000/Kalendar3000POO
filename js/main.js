import { updateMetaTags } from './globals.js';
import { EventManager } from './eventManager.js';
import { Calendar } from './calendar.js';
import { DropdownMenu } from './dropdownMenu.js';
import { InteractionHandler } from './interactionHandler.js';


document.addEventListener('DOMContentLoaded', () => {
    const eventManager = new EventManager();
    const calendar = new Calendar();

    // Chargement des événements puis initialisation du calendrier
    eventManager.loadEvents().then(() => {
        const dropdownMenu = new DropdownMenu();
        //en attente de la methode
        calendar.renderCalendar();
        const interactionHandler = new InteractionHandler();
        updateMetaTags();

        window.addEventListener("resize", () => calendar.renderCalendar());
    });
});