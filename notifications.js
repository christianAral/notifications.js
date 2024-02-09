const notifications = {
    templates:{},
    helperFn:{
        generateID: function(N) {
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var result = '';
            for (var i = 0; i < N; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        },
        formatDate: function () {
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            const timeString = date.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            return `${year}-${month}-${day} ${timeString}`;
        }
    }
};

notifications.id=`n${notifications.helperFn.generateID(8)}`;

notifications.templates.card = `
    <div class="notification">
         <div class="notifHeader">
             <span class="notifTitle"></span>
             <div class="notifHeaderRight">
                 <span class="notifTime"></span>
                 <span class="notifClose">X</span>
             </div>
         </div>
         <span class="notifBody"></span>
     </div>`;

notifications.container = document.createElement('div');
notifications.container.id = notifications.id;
notifications.container.classList.add("notifications");

let clearAllButton = document.createElement('div');
clearAllButton.id = "notifClearAll";
clearAllButton.textContent = "Clear All Notifications";
clearAllButton.addEventListener('click', function() {
    Array.from(document.querySelectorAll(`#${notifications.id}>.notification`)).forEach(el => el.remove());
    this.style.display = 'none'; // Hide the button when all notifications are cleared
});

notifications.container.appendChild(clearAllButton);

document.body.appendChild(notifications.container);

notifications.addCard = function(title, description, type) {
    let newCard = document.createElement('div');
    newCard.innerHTML = notifications.templates.card;

    if (["Error", "Warning"].includes(type)) {
        newCard.firstElementChild.classList.add(`notifStatus${type}`);
    } else {
        newCard.firstElementChild.classList.add("notifStatusInfo");
    }
    newCard.querySelector(".notifTitle").textContent = title;
    newCard.querySelector(".notifBody").textContent = description;
    newCard.querySelector(".notifTime").textContent = notifications.helperFn.formatDate();

    newCard.querySelector('.notifClose').addEventListener('click', function() {
        this.closest(".notification").remove();
        if (document.querySelectorAll(`#${notifications.id}>.notification`).length === 0) {
            clearAllButton.style.display = 'none'; // Hide the button when all notifications are dismissed
        }
    });

    notifications.container.appendChild(newCard.firstElementChild);
    clearAllButton.style.display = 'block'; // Show the button when a new notification is added
}