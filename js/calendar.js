import { EventManager } from "./eventManager.js";
import { ModalManager } from "./modalManager.js";
import { allEventsMobile, currentMonthElement, calendarDaysElement, currentDate, dayNames } from "./globals.js";
import { DailyEventsDisplay } from "./dailyEventsDisplay.js";


export class Calendar {
    constructor() {
        this.width = window.innerWidth;
        this.eventManager = new EventManager();
        this.modalManager = new ModalManager();
        this.dailyEventsDisplay = new DailyEventsDisplay(); 
    }

    // Fonction pour afficher le calendrier
    renderCalendar() {
        allEventsMobile.innerHTML= '';

        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
    
        // Met à jour l'affichage du mois et de l'année
        currentMonthElement.textContent = currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

        // Effacer les jours précédents (sans effacer les noms des jours)
        const rows = calendarDaysElement.getElementsByClassName('row');
        while (rows.length > 1) { // Conserver la première ligne pour les jours de la semaine
            calendarDaysElement.removeChild(rows[1]);
        }
    
        // Détermine le premier jour du mois (en considérant que lundi est le premier jour)
        const firstDayOfMonth = new Date(year, month, 1);
        const startDay = (firstDayOfMonth.getDay() + 6) % 7; // Ajustement pour que lundi soit le premier jour
    
        // Nombre de jours dans le mois actuel
        const daysInMonth = new Date(year, month + 1, 0).getDate();
    
        // Crée une nouvelle ligne pour les jours du mois
        let row = document.createElement('div');
        row.className = 'row';
        calendarDaysElement.appendChild(row);
    
        // Remplit les cases pour les jours du mois précédent
        const prevMonthDays = new Date(year, month, 0).getDate(); // Nombre de jours dans le mois précédent

        for (let i = startDay - 1; i >= 0; i--) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('col', 'disabled'); // Ajoute la classe "disabled"
            
            const dayTitle = document.createElement('div');
            dayTitle.classList.add('day-title');
            dayElement.appendChild(dayTitle);
    
            // Affiche le numéro du jour du mois précédent
            const dayNumber = document.createElement('div');
            dayNumber.textContent = prevMonthDays - i;
            dayNumber.classList.add('day-number');
            dayTitle.appendChild(dayNumber);
    
            // Ajoute un label pour le jour de la semaine
            const dayLabel = document.createElement('div');
            dayLabel.textContent = dayNames[(startDay - i - 1 + 7) % 7];
            dayLabel.classList.add('day-label');
            dayTitle.appendChild(dayLabel);
    
            row.appendChild(dayElement);
        }

        // Crée un objet pour stocker les positions occupées par les événements
        let positionMap = {};

        // Remplit le calendrier avec les jours du mois actuel
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('col', 'day');
    
            const dayOfWeek = (startDay + day - 1) % 7; // Jour de la semaine (0 = lundi, 6 = dimanche)
    
            // Vérifier si c'est un week-end (samedi ou dimanche)
            if (dayOfWeek === 5 || dayOfWeek === 6) {
                dayElement.classList.add('weekend');
            }
    
            const dayTitle = document.createElement('div');
            dayTitle.classList.add('day-title');
            dayElement.appendChild(dayTitle);
    
            const dayNumber = document.createElement('div');
            dayNumber.textContent = (day<10 ? '0' : '') + day;
            dayNumber.classList.add('day-number');
            dayTitle.appendChild(dayNumber);
    
            // Ajoute un label pour le jour de la semaine
            const dayLabel = document.createElement('div');
            dayLabel.textContent = dayNames[(startDay + day - 1) % 7];
            dayLabel.classList.add('day-label');
            dayTitle.appendChild(dayLabel);
    
            // Vérifie si c'est aujourd'hui
            if (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                dayElement.classList.add('today');
            }
    
            // Obtient les événements pour le jour actuel
            const events = this.eventManager.getEvents(day, month, year);

            // Ajoute un conteneur pour les événements du jour
            const eventsBlock = document.createElement('div');
            eventsBlock.classList.add('eventsBlock');
            dayElement.appendChild(eventsBlock);

            // Trie les événements par ordre croissant de début
            events.sort((a, b) => a.start - b.start);

            // Initialise la carte des positions pour le jour actuel
            if (!positionMap[day]) {
                positionMap[day] = [false, false, false, false];
            }



            if (this.width > 992) {
                this.renderDesktop(events, eventsBlock, day, month, year, positionMap);
            } else if(this.width<=992 && events.length>0) {
                this.renderMobile(events, eventsBlock, dayElement, day, month, year);
            }
    
            row.appendChild(dayElement, eventsBlock);
    
            // Ajoute une nouvelle ligne si nous avons atteint la fin de la semaine
            if ((startDay + day) % 7 === 0) {
                row = document.createElement('div');
                row.className = 'row';
                calendarDaysElement.appendChild(row);
            }
        }
    
        // Remplit les cases pour les jours du mois suivant
        const totalCells = startDay + daysInMonth;
        const nextMonthStart = totalCells % 7;
        if (nextMonthStart !== 0) {
            for (let i = 1; i <= (7 - nextMonthStart); i++) {
                const dayElement = document.createElement('div');
                dayElement.classList.add('col', 'disabled');
    
                const dayTitle = document.createElement('div');
                dayTitle.classList.add('day-title');
                dayElement.appendChild(dayTitle);
    
                const dayNumber = document.createElement('div');
                dayNumber.textContent = (i<10 ? '0' : '') + i;
                dayNumber.classList.add('day-number');
                dayTitle.appendChild(dayNumber);
    
                const dayLabel = document.createElement('div');
                dayLabel.textContent = dayNames[(startDay + daysInMonth + i - 1) % 7];
                dayLabel.classList.add('day-label');
                dayTitle.appendChild(dayLabel);
    
                row.appendChild(dayElement);
            }
        }
    }

    renderDesktop(events, block, day, month, year, positionMap) {
        // Limite le nombre d'événements affichés à 3 pour les évènements journaliers
        //const displayedEvents = events.slice(0, 2);
        // Limite le nombre d'événements affichés à 5 pour les évènements multiples l'affichage du plus est bof...
        const displayedEvents = events.slice(0, 4);
        
        displayedEvents.forEach(event => {
            let position = event.position; // Position de l'événement

            // Vérifie si l'événement a déjà une position attribuée et valide
            if (position !== null && positionMap[day][position] === false) {
                // Si la position est libre dans la positionMap, on conserve l'ancienne position
                positionMap[day][position] = true;
            }

            // Si l'événement n'a pas encore de position attribuée
            if (position === null) {
                // Trouve la première position libre
                position = positionMap[day].findIndex(pos => pos === false);

                // Attribue la position à l'événement
                event.position = position;
            }

            // Marque la position comme occupée
            positionMap[day][position] = true;





            // Crée un élément pour l'événement
            const eventElement = document.createElement('div');

            // Afficher le nom seulement pour le premier jour de l'événement
            /*if (day === event.startDate.day && month === event.startDate.month && year === event.startDate.year) {
                eventElement.textContent = event.name;
            }*/
            eventElement.textContent= event.name;
            event.type.forEach(type => eventElement.classList.add('event', type));
            
            eventElement.classList.add(`position-${position + 1}`);

            // Détecte si l'événement est d'une journée ou multi-jour
            if (new Date(event.start.toISOString().substring(0, 10)).getTime() == new Date(event.end.toISOString().substring(0, 10)).getTime() &&
            event.start.getMonth() === event.end.getMonth() &&
            event.start.getFullYear() === event.end.getFullYear()) {
            eventElement.classList.add('single-day');
            } else if (day === event.startDate.day && month === event.startDate.month && year === event.startDate.year) {
                eventElement.classList.add('multi-day', 'start');
            } else if (day === event.endDate.day && month === event.endDate.month && year === event.endDate.year) {
                eventElement.classList.add('multi-day', 'end');
            } else {
                eventElement.classList.add('multi-day', 'middle');
            }

            this.modalManager.addingModal(event, eventElement);

            block.appendChild(eventElement);
        });

        // Ajoute un bouton "+" si plus de 2 événements 4 en multiple
        if (events.length > 4) {
            const moreEventsButton = document.createElement('div');
            moreEventsButton.classList.add('more-events');
            moreEventsButton.innerHTML = '<i class="fa-solid fa-plus"></i>';

            block.appendChild(moreEventsButton);

            let moreEventsOpen = false;

            const allEventsBlock = document.createElement('div');
            allEventsBlock.id = 'allEventsBlock';
            
            // Ajouter le gestionnaire de clic pour afficher tous les événements dans un bloc sous le calendrier
            moreEventsButton.addEventListener('click', ()=> {
                if(!moreEventsOpen) {
                    moreEventsOpen= true;
                    moreEventsButton.innerHTML = '<i class="fa-solid fa-minus"></i>';
                    moreEventsButton.classList.add('active');
                    block.appendChild(allEventsBlock);
                   this.dailyEventsDisplay.displayAllEventsForDay(day, month, year, this.width);
                } 
                else{
                    moreEventsOpen= false;
                    moreEventsButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
                    moreEventsButton.classList.remove('active');
                    block.removeChild(allEventsBlock);
                }
            });
        }
    }

    renderMobile(events, block, dayElement, day, month, year) {
        dayElement.classList.add('day-button');

                events.forEach(event => {
                    // Crée un élément pour l'événement
                    const eventElement = document.createElement('div');
                    eventElement.textContent = event.name;
                    event.type.forEach(type => eventElement.classList.add('event', type));
                    eventElement.classList.add('event');
    
                    //addingModal(event, eventElement);
        
                    block.appendChild(eventElement);
                });

                const allEventsBlock = document.createElement('div');
                allEventsBlock.id = 'allEventsBlock';

                dayElement.addEventListener('click', ()=> {
                    window.scroll({
                        top: allEventsMobile.offsetTop,
                        left: 0,
                        behavior: "smooth",
                      });
                      
                    //window.scroll(0, allEventsMobile.offsetTop);
                    const activeDayElement= document.querySelectorAll('.day-button.active');
                    activeDayElement.forEach(e=> {
                        e.classList.remove('active');
                    });
                    dayElement.classList.add('active');

                    allEventsMobile.innerHTML= '';
                    allEventsMobile.appendChild(allEventsBlock);
                    this.dailyEventsDisplay.displayAllEventsForDay(day, month, year, this.width, dayElement);
                });
    }
}