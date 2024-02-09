class Notifications {
    constructor() {
        this.templates = {};
        this.id = `n${this.generateID(8)}`;
        this.container = document.createElement('div');
        this.container.id = this.id;
        this.container.classList.add("notifications");

        let clearAllButton = document.createElement('div');
        clearAllButton.id = "notifClearAll";
        clearAllButton.textContent = "Clear All Notifications";
        clearAllButton.addEventListener('click', () => {
            Array.from(document.querySelectorAll(`#${this.id}>.notification`)).forEach(el => el.remove());
            clearAllButton.style.display = 'none';
        });

        this.container.appendChild(clearAllButton);
        document.body.appendChild(this.container);

        this.templates.card = `
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
    }

    generateID(N) {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var result = '';
        for (var i = 0; i < N; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    formatDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const timeString = date.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return `${year}-${month}-${day} ${timeString}`;
    }

    addCard(title, description, type) {
        let newCard = document.createElement('div');
        newCard.innerHTML = this.templates.card;

        if (["Error", "Warning"].includes(type)) {
            newCard.firstElementChild.classList.add(`notifStatus${type}`);
        } else {
            newCard.firstElementChild.classList.add("notifStatusInfo");
        }
        newCard.querySelector(".notifTitle").textContent = title;
        newCard.querySelector(".notifBody").textContent = description;
        newCard.querySelector(".notifTime").textContent = this.formatDate();

        newCard.querySelector('.notifClose').addEventListener('click', function(event) {
            event.target.closest(".notification").remove();
            if (document.querySelectorAll(`#${this.id}>.notification`).length === 0) {
                document.getElementById('notifClearAll').style.display = 'none';
            }
        }.bind(this));

        this.container.appendChild(newCard.firstElementChild);
        document.getElementById('notifClearAll').style.display = 'block';
    }
}

// Usage:
// const notifications = new Notifications();