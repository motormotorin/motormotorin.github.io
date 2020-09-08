import generateUniqueId from '../../Util/generateUniqueId';

class DescriptionView {
    static buildDescription(description) {
        var $description = this.createDescriptionContainer(description);
        $description.innerHTML = this.fillDescriptionContainer(description);

        return $description;
    }

    static createDescriptionContainer(description) {
        var $description = document.createElement("div");
        $description.id = description.id;
        $description.classList.add("description");

        return $description;
    }

    static fillDescriptionContainer(description) {
        let engToRus = {"mon": "пн", "tue": "вт", "wed": "ср", "thu": "чт", "fri": "пт", "sat": "сб", "sun": "вс"};
        let currentDay = Object.keys(description.worktime)[new Date().getDay() - 1];

        function generateDaysHTML() {
            let result = "";
            Object.keys(description.worktime).forEach(key => {
                result += `<li id="${key}" ${key === currentDay ? `class="active"` : ""}>${engToRus[key]}</li>`
            });
            return result;
        }

        function generateLink() {
            if (description.link) {
                return `<button class="description__learn-more">
                    <a href="${description.link}" class="description__learn-more--text">Узнать больше</span>
                </button>`;
            } else {
                return "";
            }
        }

        return `
            <div class="description__card shadow">
                <div class="description__container">
                    <div class="description__info">
                        <div class="line">
                            <div class="label">${description.type}</div>
                            <div class="value">${description.title}</div>
                        </div>
                        <div class="line">
                            <div class="label">Местоположение</div>
                            <div class="value">Корпус ${description.building}, уровень ${description.level}</div>
                        </div>
                        <div id="worktime" class="line">
                            <div class="label">Рабочее время</div>
                            <ul>
                                ${generateDaysHTML()}
                            </ul>
                            <div class="value">Работает: ${description.worktime[currentDay]}</div>
                        </div>
                    </div>
                    <!--<div class="description__view">
                        <div class="description__img shadow">
                            <img src="../media/places/Barbershop_A_6.jpg" alt="">
                        </div>
                    </div>-->
                </div>
                ${generateLink()}
            </div>
        `;
    }

    static renderDescription(description) {
        document.querySelector(".app .main .container").insertAdjacentElement("beforeend", description);
    }

    static changeWorktime($description, description, dayId) {
        var $days = Array.from($description.querySelectorAll("li"));
        var $input = $description.querySelector("#worktime .value");

        $days.forEach(day => {
            day.id === dayId 
                ? day.classList.add("active")
                : day.classList.remove("active");
        });
        $input.innerText = `Работает: ${description.worktime[dayId]}`;
    }

    static removeDescription($description) {
        $description.parentNode.removeChild($description);
    }
}

export default DescriptionView;
