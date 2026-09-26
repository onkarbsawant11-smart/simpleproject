// =========================================================
// OmiKiTeam Event Platform
// Main JavaScript
// =========================================================


// =========================================================
// 1. BASIC ELEMENTS
// =========================================================

const themeButton = document.getElementById("themeButton");
const menuButton = document.getElementById("menuButton");
const navMenu = document.querySelector(".nav-menu");


// =========================================================
// 2. THEME SYSTEM
// =========================================================

function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark-mode");

        themeButton.textContent = "☀️";

    } else {

        document.body.classList.remove("dark-mode");

        themeButton.textContent = "🌙";
    }
}


// Load saved theme

const savedTheme =
    localStorage.getItem("omikiteam-theme");

if (savedTheme) {

    applyTheme(savedTheme);

}


// Toggle theme

themeButton.addEventListener("click", () => {

    const isDark =
        document.body.classList.contains("dark-mode");

    const newTheme =
        isDark ? "light" : "dark";

    applyTheme(newTheme);

    localStorage.setItem(
        "omikiteam-theme",
        newTheme
    );

});


// =========================================================
// MOBILE NAVIGATION
// =========================================================

menuButton.addEventListener("click", () => {

    navMenu.classList.toggle("mobile-menu");

    const isOpen =
        navMenu.classList.contains("mobile-menu");

    menuButton.textContent =
        isOpen ? "✕" : "☰";

});

// Close mobile menu when a navigation link is clicked

const navLinks =
    document.querySelectorAll(".nav-menu a");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navMenu.classList.remove(
            "mobile-menu"
        );

        menuButton.textContent = "☰";

    });

});


// =========================================================
// 4. COUNTDOWN
// =========================================================

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


const eventDateTime =
    new Date(
        `${eventData.event.date}T10:00:00`
    );


function updateCountdown() {

    const now =
        new Date();

    const difference =
        eventDateTime - now;


    // Event already started

    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) %
            24
        );


    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) %
            60
        );


    const seconds =
        Math.floor(
            (difference /
                1000) %
            60
        );


    daysElement.textContent =
        String(days).padStart(2, "0");


    hoursElement.textContent =
        String(hours).padStart(2, "0");


    minutesElement.textContent =
        String(minutes).padStart(2, "0");


    secondsElement.textContent =
        String(seconds).padStart(2, "0");
}


// Run immediately

updateCountdown();


// Update every second

setInterval(
    updateCountdown,
    1000
);


// =========================================================
// 5. SEARCH SYSTEM
// =========================================================

const searchButton =
    document.getElementById(
        "searchButton"
    );


const searchModal =
    document.getElementById(
        "searchModal"
    );


const closeSearch =
    document.getElementById(
        "closeSearch"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


const searchResults =
    document.getElementById(
        "searchResults"
    );


// Open search

searchButton.addEventListener(
    "click",
    () => {

        searchModal.classList.remove(
            "hidden"
        );

        searchInput.focus();

    }
);


// Close search

closeSearch.addEventListener(
    "click",
    () => {

        searchModal.classList.add(
            "hidden"
        );

    }
);


// Close by clicking outside modal

searchModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            searchModal
        ) {

            searchModal.classList.add(
                "hidden"
            );

        }

    }
);


// Search data

searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .trim()
                .toLowerCase();


        searchResults.innerHTML = "";


        if (!query) {

            return;

        }


        const results = [];


        // Search event information

        if (
            eventData.event.name
                .toLowerCase()
                .includes(query)
        ) {

            results.push({
                title:
                    eventData.event.name,

                description:
                    eventData.event.description,

                section:
                    "Event"
            });

        }


        if (
            eventData.event.venue
                .toLowerCase()
                .includes(query)
        ) {

            results.push({
                title:
                    eventData.event.venue,

                description:
                    eventData.event.address,

                section:
                    "Location"
            });

        }


        // Search schedule

        eventData.schedule.forEach(
            (item) => {

                const searchableText =
                    `${item.title} ${item.description}`
                        .toLowerCase();


                if (
                    searchableText.includes(
                        query
                    )
                ) {

                    results.push({

                        title:
                            item.title,

                        description:
                            `${item.time} — ${item.description}`,

                        section:
                            "Schedule"

                    });

                }

            }
        );


        // Search stakeholders

        eventData.stakeholders.forEach(
            (person) => {

                const searchableText =
                    `${person.name} ${person.role}`
                        .toLowerCase();


                if (
                    searchableText.includes(
                        query
                    )
                ) {

                    results.push({

                        title:
                            person.name,

                        description:
                            `${person.role} — ${person.phone}`,

                        section:
                            "Contact"

                    });

                }

            }
        );


        // No results

        if (
            results.length === 0
        ) {

            searchResults.innerHTML = `

                <div class="search-empty">

                    <p>
                        No results found.
                    </p>

                </div>

            `;

            return;

        }


        // Display results

        results.forEach(
            (result) => {

                const resultElement =
                    document.createElement(
                        "div"
                    );


                resultElement.className =
                    "search-result";


                resultElement.innerHTML = `

                    <span>
                        ${result.section}
                    </span>

                    <h3>
                        ${result.title}
                    </h3>

                    <p>
                        ${result.description}
                    </p>

                `;


                searchResults.appendChild(
                    resultElement
                );

            }
        );

    }
);


// =========================================================
// SETTINGS
// =========================================================

const settingsLightMode =
    document.getElementById(
        "settingsLightMode"
    );

const settingsDarkMode =
    document.getElementById(
        "settingsDarkMode"
    );

if (settingsLightMode) {

    settingsLightMode.addEventListener(
        "click",
        () => {

            applyTheme("light");

            localStorage.setItem(
                "omikiteam-theme",
                "light"
            );

        }
    );

}

if (settingsDarkMode) {

    settingsDarkMode.addEventListener(
        "click",
        () => {

            applyTheme("dark");

            localStorage.setItem(
                "omikiteam-theme",
                "dark"
            );

        }
    );

}


// =========================================================
// EVENT MAP
// =========================================================

function initializeEventMap() {

    const mapElement =
        document.getElementById("eventMap");

    if (!mapElement) {
        return;
    }

    const location =
        eventData.location;

    const latitude =
        location.latitude;

    const longitude =
        location.longitude;

    const mapUrl =
        new URL(
            "https://www.openstreetmap.org/export/embed.html"
        );

    mapUrl.searchParams.set(
        "bbox",
        [
            longitude - 0.01,
            latitude - 0.01,
            longitude + 0.01,
            latitude + 0.01
        ].join(",")
    );

    mapUrl.searchParams.set("layer", "mapnik");
    mapUrl.searchParams.set(
        "marker",
        `${latitude},${longitude}`
    );

    const mapFrame =
        document.createElement("iframe");

    mapFrame.src = mapUrl.toString();
    mapFrame.title = `Map showing ${location.venue}`;
    mapFrame.style.width = "100%";
    mapFrame.style.height = "100%";
    mapFrame.style.border = "0";
    mapFrame.style.display = "block";

    mapElement.replaceChildren(mapFrame);

    // Directions button

    const directionsButton =
        document.getElementById(
            "directionsButton"
        );

    if (directionsButton) {

        directionsButton.href =
            `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    }

    // Update venue information

    const venueName =
        document.getElementById(
            "venueName"
        );

    const venueAddress =
        document.getElementById(
            "venueAddress"
        );

    if (venueName) {

        venueName.textContent =
            location.venue;

    }

    if (venueAddress) {

        venueAddress.textContent =
            location.address;

    }

}

// Initialize map

initializeEventMap();


// =========================================================
// 7. CONSOLE MESSAGE
// =========================================================

console.log(
    "OmiKiTeam Event Platform loaded successfully."
);
