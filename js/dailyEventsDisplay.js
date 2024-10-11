import { EventManager } from "./eventManager.js";
import { allEventsMobile } from "./globals.js";
import { ModalManager } from "./modalManager.js";

export class DailyEventsDisplay {
    constructor() {
        this.eventManager = new EventManager();
        this.modalManager = new ModalManager();
        
    }

    // Fonction pour afficher tous les événements d'un jour donné sous le calendrier
    displayAllEventsForDay(day, month, year, width, element) {
        const allEventsBlock = document.getElementById('allEventsBlock');
        allEventsBlock.innerHTML = ''; // Efface les événements précédents

        const allEventsHeader = document.createElement('div');
        allEventsHeader.classList.add('all-events-header', 'mb-3');

        if(width>992){
            allEventsHeader.innerHTML= `<h5>Tous les évènements du ${(day<10 ? '0' : '') + day}</h5>`;
        }
        else if(width<=992){
            allEventsHeader.innerHTML= `<h5>Tous les évènements du ${(day<10 ? '0' : '') + day}</h5><div class="more-events"><i class="fa-solid fa-minus"></i></div>`;
            const closeBtn = allEventsHeader.querySelector(".more-events");
            closeBtn.addEventListener('click', ()=> {
                element.classList.remove('active');
                allEventsMobile.innerHTML='';
            })
        }

        allEventsBlock.appendChild(allEventsHeader);
    
        const events = this.eventManager.getEvents(day, month, year);
    
        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.textContent = event.name;
            event.type.forEach(type => eventElement.classList.add('event', type));
            eventElement.classList.add('event', 'full-event');

            this.modalManager.addingModal(event, eventElement);
    
            allEventsBlock.appendChild(eventElement);
        });
    }
}