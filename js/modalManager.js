export class ModalManager {
    constructor() {
        this.modalElement = document.getElementById('eventModal');
        this.readButton = document.getElementById('read-button');
        this.sideButtons = document.getElementById('side-buttons');
    }

    //fonction pour l'ajout des modal au click
    addingModal(event, block){
        block.addEventListener('click', function() {
        document.getElementById('modal-img').src = event.image;
        document.getElementById('eventName').textContent = event.titreComplet;

        const typeTags = document.getElementById('eventType');
        typeTags.innerHTML = '';
       
        /*code pour ajouter tous les tags
        event.type.forEach(type => {
            const tag = document.createElement('span');
            tag.classList.add('badge', 'rounded-pill', type)
            tag.textContent = type;
            typeTags.appendChild(tag);
        });*/

        //code pour le tag thématique seulement
        for(let i= 0; i < 1; i++){
            const tag = document.createElement('span');
            tag.classList.add('badge', 'rounded-pill', event.type[i])
            tag.textContent = event.type[i];
            typeTags.appendChild(tag);
        }

        document.getElementById('eventModalLabel').innerHTML= `<i class="fa-solid fa-calendar-days"></i> ${event.recurrence}`;
        document.getElementById('eventDescription').innerHTML = event.description;
        const readBtn = document.getElementById('read-button');
        const sideBtns = document.getElementById('side-buttons');

        switch (event.format) {
            case 'pdf':
                readBtn.innerHTML= `<a href="${event.url}" target="_blank" rel="noreferrer" class="d-flex align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-solid fa-file-arrow-down"></i>Télécharger le contenu</a><button id="addToCalendarBtnMobile" type="button" class="d-flex d-lg-none align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-regular fa-calendar-plus"></i><span>Ajouter à mon calendrier</span></button>`;
                sideBtns.innerHTML= `<button id="addToCalendarBtn" type="button" class="d-flex align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-regular fa-calendar-plus"></i><span>Ajouter à mon calendrier</span></button>
                <a href="${event.url}" target="_blank" rel="noreferrer" class="d-flex align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-solid fa-file-arrow-down"></i>Télécharger le contenu</a>`;
                break;
            case 'article':
                readBtn.innerHTML= `<a href="${event.url}" target="_blank" rel="noreferrer" class="d-flex align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-regular fa-newspaper"></i>Lire l'article</a><button id="addToCalendarBtnMobile" type="button" class="d-flex d-lg-none align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-regular fa-calendar-plus"></i><span>Ajouter à mon calendrier</span></button>`;
                sideBtns.innerHTML= `<button id="addToCalendarBtn" type="button" class="d-flex align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-regular fa-calendar-plus"></i><span>Ajouter à mon calendrier</span></button>
                <a href="${event.url}" target="_blank" rel="noreferrer" class="d-flex align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-regular fa-newspaper"></i>Lire l'article</a>`;
                break;
            case 'video':
                readBtn.innerHTML= `<a href="${event.url}" target="_blank" rel="noreferrer" class="d-flex align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-solid fa-video"></i>Regarder la vidéo</a><button id="addToCalendarBtnMobile" type="button" class="d-flex d-lg-none align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-regular fa-calendar-plus"></i><span>Ajouter à mon calendrier</span></button>`;
                sideBtns.innerHTML= `<button id="addToCalendarBtn" type="button" class="d-flex align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-regular fa-calendar-plus"></i><span>Ajouter à mon calendrier</span></button>
                <a href="${event.url}" target="_blank" rel="noreferrer" class="d-flex align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-solid fa-video"></i>Regarder la vidéo</a>`;
                break;
            case 'podcast':
                readBtn.innerHTML= `<a href="${event.url}" target="_blank" rel="noreferrer" class="d-flex align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-solid fa-play"></i>Écouter le podcast</a><button id="addToCalendarBtnMobile" type="button" class="d-flex d-lg-none align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-regular fa-calendar-plus"></i><span>Ajouter à mon calendrier</span></button>`;
                sideBtns.innerHTML= `<button id="addToCalendarBtn" type="button" class="d-flex align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-regular fa-calendar-plus"></i><span>Ajouter à mon calendrier</span></button>
                <a href="${event.url}" target="_blank" rel="noreferrer" class="d-flex align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-solid fa-play"></i>Écouter le podcast</a>`;
                break;
            default:
                readBtn.innerHTML= `<a href="${event.url}" target="_blank" rel="noreferrer" class="d-flex align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-solid fa-arrow-up-right-from-square"></i>En savoir plus</a><button id="addToCalendarBtnMobile" type="button" class="d-flex d-lg-none align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-regular fa-calendar-plus"></i><span>Ajouter à mon calendrier</span></button>`;
                sideBtns.innerHTML= `<button id="addToCalendarBtn" type="button" class="d-flex align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-regular fa-calendar-plus"></i><span>Ajouter à mon calendrier</span></button>
                <a href="${event.url}" target="_blank" rel="noreferrer" class="d-flex align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-solid fa-arrow-up-right-from-square"></i>En savoir plus</a>`;
        }

        document.getElementById('addToCalendarBtn').addEventListener('click', ()=> {
            new bootstrap.Modal(document.getElementById('addToCalendarModal')).show();
        });

        document.getElementById('addToCalendarBtnMobile').addEventListener('click', ()=> {
            new bootstrap.Modal(document.getElementById('addToCalendarModal')).show();
        });

        //GOOGLE
        document.getElementById('googleCalendar').addEventListener('click', function() {
        //détails de l'évènement
        // Conversion de la date
        const eventStartDate = new Date(event.startDate.year, event.startDate.month, event.startDate.day);
        const eventEndDate = new Date(event.endDate.year, event.endDate.month, event.endDate.day);

        // Format pour Google Calendar: YYYYMMDD
        const googleStartDate = eventStartDate.toISOString().replace(/-|:|\.\d+/g, '').slice(0, 15); // 20240930T000000Z
        const googleEndDate = eventEndDate.toISOString().replace(/-|:|\.\d+/g, '').slice(0, 15); // 20240930T000000Z;

        const title = encodeURIComponent(event.titreComplet);
        const location = encodeURIComponent("France");
        const details = encodeURIComponent(event.description);
        const startDate = googleStartDate; // Format: YYYYMMDDTHHMMSSZ
        const endDate = googleEndDate;
    
        // URL pour ajouter l'événement à Google Calendar
        const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}&sf=true&output=xml`;
    
        // Ouvre la nouvelle fenêtre pour ajouter l'événement
        window.open(calendarUrl, '_blank');
        });

        //OUTLOOK
        document.getElementById('outlookCalendar').addEventListener('click', function() {
            //détails de l'évènement
            /// Conversion de la date A VERIFIER COMME GOOGLE
            const eventStartDate = new Date(event.startDate);
            const eventEndDate = new Date(event.endDate);
    
            // Format pour Outlook Calendar: YYYY-MM-DDTHH:MM:SS
            const outlookStartDate = eventStartDate.toISOString().split('.')[0]; // 2024-09-30T00:00:00
            const outlookEndDate = eventEndDate.toISOString().split('.')[0]; // Même début et fin pour un événement d'une journée

            const title = encodeURIComponent(event.titreComplet);
            const location = encodeURIComponent("France");
            const details = encodeURIComponent(event.description);
            const startDate = outlookStartDate; // Format: YYYY-MM-DDTHH:MM:SS
            const endDate = outlookEndDate;
        
            // URL pour ajouter l'événement à Outlook Calendar
            const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&body=${details}&location=${location}&startdt=${startDate}&enddt=${endDate}`;

            window.open(outlookUrl, '_blank');
        });

        //APPLE
        document.getElementById('appleCalendar').addEventListener('click', function() {

            // Format pour Apple Calendar (.ics): YYYYMMDDTHHMMSSZ A VERIFIER COMME GOOGLE
            const title= event.titreComplet;
            const startDate= new Date(event.startDate);
            const endDate = new Date(event.endDate);
            // Format pour Apple Calendar (.ics): YYYYMMDDTHHMMSSZ (UTC)
            const appleStartDate = startDate.toISOString().replace(/-|:|\.\d+/g, '').slice(0, 15) + 'Z';  // 20240930T000000Z
            const appleEndDate = endDate.toISOString().replace(/-|:|\.\d+/g, '').slice(0, 15) + 'Z';  // 20240930T000000Z;  // Même jour, 23:59
            const location = "Paris, France";
            // Utilise la description nettoyée en texte brut
            const plainTextDescription = convertHtmlToPlainText(event.description).trim();

            function convertHtmlToPlainText(html) {
                // Crée un élément DOM temporaire pour retirer les balises HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
              
                // Utilise textContent pour obtenir uniquement le texte brut
                let plainText = tempDiv.textContent || tempDiv.innerText || '';
              
                // Remplace les caractères spéciaux problématiques pour un fichier .ics
                plainText = plainText.replace(/,/g, '\\,');  // Échappe les virgules
                plainText = plainText.replace(/;/g, '\\;');  // Échappe les points-virgules
                plainText = plainText.replace(/\n/g, '\\n'); // Échappe les retours à la ligne
              
                return plainText;
            }

            function escapeSpecialCharacters(text) {
                return text
                  .replace(/,/g, '\\,')   // Échappe les virgules
                  .replace(/;/g, '\\;')   // Échappe les points-virgules
                  .replace(/\n/g, '\\n')  // Échappe les sauts de ligne
                  .replace(/:/g, '\\:');  // Échappe les deux-points
            }
            
            escapeSpecialCharacters(plainTextDescription);

            // Génération du contenu du fichier .ics
            const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MonApp//MonProduit//FR
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${title}
DTSTART:${appleStartDate}
DTEND:${appleEndDate}
LOCATION:${location}
DESCRIPTION:${plainTextDescription}
UID:${new Date().getTime()}@monapp.com
STATUS:CONFIRMED
SEQUENCE:0
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR
`.trim();  // Trim supprime les espaces en début et fin pour éviter les lignes blanches superflues
          
            // Création d'un blob pour permettre le téléchargement du fichier .ics
            const blob = new Blob([icsContent], { type: 'text/calendar' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'event.ics';
            link.click();
          });
          

        new bootstrap.Modal(document.getElementById('eventModal')).show();
    });
}



    // Méthode pour ajouter un événement à la modale
    /*show(event) {
        // Mettre à jour le contenu de la modale
        document.getElementById('modal-img').src = event.image;
        document.getElementById('eventName').textContent = event.titreComplet;

        this.updateEventTypeTags(event);
        document.getElementById('eventModalLabel').innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${event.recurrence}`;
        document.getElementById('eventDescription').innerHTML = event.description;

        this.updateButtons(event);

        // Afficher la modale
        new bootstrap.Modal(this.modalElement).show();
    }*/

    // Méthode pour mettre à jour les tags d'événements
    /*updateEventTypeTags(event) {
        const typeTags = document.getElementById('eventType');
        typeTags.innerHTML = '';

        // Code pour le tag thématique seulement
        if (event.type.length > 0) {
            const tag = document.createElement('span');
            tag.classList.add('badge', 'rounded-pill', event.type[0]);
            tag.textContent = event.type[0];
            typeTags.appendChild(tag);
        }
    }*/

    // Méthode pour mettre à jour les boutons de la modale
    /*updateButtons(event) {
        const readBtn = this.readButton;
        const sideBtns = this.sideButtons;

        switch (event.format) {
            case 'pdf':
                this.setButtonContent(readBtn, sideBtns, 'Télécharger le contenu', event.url);
                break;
            case 'article':
                this.setButtonContent(readBtn, sideBtns, 'Lire l\'article', event.url);
                break;
            case 'video':
                this.setButtonContent(readBtn, sideBtns, 'Regarder la vidéo', event.url);
                break;
            case 'podcast':
                this.setButtonContent(readBtn, sideBtns, 'Écouter le podcast', event.url);
                break;
            default:
                this.setButtonContent(readBtn, sideBtns, 'En savoir plus', event.url);
        }

        this.setupCalendarButtons(event);
    }*/

    // Méthode pour configurer le contenu des boutons
    /*setButtonContent(readBtn, sideBtns, actionText, url) {
        readBtn.innerHTML = `<a href="${url}" target="_blank" rel="noreferrer" class="d-flex align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-solid fa-file-arrow-down"></i>${actionText}</a>`;
        sideBtns.innerHTML = `<button id="addToCalendarBtn" type="button" class="d-flex align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-regular fa-calendar-plus"></i><span>Ajouter à mon calendrier</span></button>
        <a href="${url}" target="_blank" rel="noreferrer" class="d-flex align-items-center justify-content-center flex-column gap-2 p-3 text-center"><i class="fa-solid fa-file-arrow-down"></i>${actionText}</a>`;
    }*/

    // Méthode pour configurer les boutons de calendrier
    /*setupCalendarButtons(event) {
        document.getElementById('addToCalendarBtn').addEventListener('click', () => {
            new bootstrap.Modal(document.getElementById('addToCalendarModal')).show();
        });

        // Ajoutez vos événements pour Google, Outlook et Apple ici...
    }*/
}