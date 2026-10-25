// ================= CITY SERVICES =================

function showMessage(service) {
    alert(
        "🏙️ " + service +
        "\n\nThis service information is available through the Smart City Portal."
    );
}


// ================= EMERGENCY =================

function emergencyCall(number) {
    const confirmCall = confirm(
        "🚨 Emergency Service\n\n" +
        "You selected emergency number: " + number +
        "\n\nThis is a demo portal. No real call will be made."
    );

    if (confirmCall) {
        alert("Emergency number " + number + " selected.");
    }
}


// ================= TRANSPORT SEARCH =================

function searchTransport() {

    const searchText = document
        .getElementById("transportSearch")
        .value
        .toLowerCase()
        .trim();

    const results = document.getElementById("transportResults");

    if (searchText === "") {

        results.innerHTML = `
            <div class="route-card">
                <span>🚌</span>
                <div>
                    <h3>Route 101</h3>
                    <p>City Centre → Railway Station</p>
                </div>
            </div>

            <div class="route-card">
                <span>🚌</span>
                <div>
                    <h3>Route 202</h3>
                    <p>Bus Station → University</p>
                </div>
            </div>

            <div class="route-card">
                <span>🚌</span>
                <div>
                    <h3>Route 303</h3>
                    <p>Market → Hospital</p>
                </div>
            </div>
        `;

        return;
    }


    const routes = [

        {
            number: "101",
            route: "City Centre → Railway Station",
            keywords: ["city", "centre", "railway", "station", "101"]
        },

        {
            number: "202",
            route: "Bus Station → University",
            keywords: ["bus", "station", "university", "202"]
        },

        {
            number: "303",
            route: "Market → Hospital",
            keywords: ["market", "hospital", "303"]
        }

    ];


    const filteredRoutes = routes.filter(route =>
        route.keywords.some(keyword =>
            keyword.includes(searchText)
        )
    );


    if (filteredRoutes.length === 0) {

        results.innerHTML = `
            <div class="route-card">
                <span>🔍</span>
                <div>
                    <h3>No Route Found</h3>
                    <p>Try searching for City, Railway, University, Market or Hospital.</p>
                </div>
            </div>
        `;

        return;
    }


    results.innerHTML = filteredRoutes.map(route => `

        <div class="route-card">

            <span>🚌</span>

            <div>
                <h3>Route ${route.number}</h3>
                <p>${route.route}</p>
            </div>

        </div>

    `).join("");
}
// ================= COMPLAINT FORM =================

const complaintForm = document.getElementById("complaintForm");

if (complaintForm) {
    complaintForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("citizenName").value;
        const category = document.getElementById("complaintCategory").value;
        const location = document.getElementById("complaintLocation").value;

        const message = document.getElementById("complaintMessage");

        message.innerHTML = `
            ✅ Complaint submitted successfully!<br>
            Thank you, ${name}.<br>
            <small>
                Category: ${category} |
                Location: ${location}
            </small>
        `;

        message.style.color = "#16a34a";

        // Reset the form after displaying the success message
        complaintForm.reset();

    });
}



    

// ================= NAVIGATION =================

document.querySelectorAll(".navbar nav a").forEach(link => {

    link.addEventListener("click", function() {

        document
            .querySelectorAll(".navbar nav a")
            .forEach(item => item.classList.remove("active"));

        this.classList.add("active");

    });

});

// ===============================
// SMARTCITY HOME PAGE
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    console.log("SmartCity Portal Loaded Successfully");

    // Add a small click effect to service cards
    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach(function (card) {

        card.addEventListener("click", function () {

            console.log(
                "Opening:",
                card.querySelector("h3").textContent
            );

        });

    });

});
/* =====================================
   SMART CITY PORTAL - THEME TOGGLE
===================================== */

document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");

    // Restore the user's previously selected theme
    const savedTheme = localStorage.getItem("smartCityTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    // If this page contains the theme button, activate it
    if (themeToggle) {
        function updateThemeButton() {
            const isDarkMode = document.body.classList.contains("dark-mode");

            themeToggle.textContent = isDarkMode
                ? "☀️ Day Mode"
                : "🌙 Night Mode";

            themeToggle.setAttribute(
                "aria-label",
                isDarkMode ? "Switch to day mode" : "Switch to night mode"
            );
        }

        updateThemeButton();

        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            const isDarkMode = document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "smartCityTheme",
                isDarkMode ? "dark" : "light"
            );

            updateThemeButton();
        });
    }
});


// ========================================
// SMART CITY SEARCH
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("citySearchInput");
    const searchButton = document.getElementById("citySearchButton");
    const searchResults = document.getElementById("citySearchResults");

    if (!searchInput || !searchButton || !searchResults) {
        return;
    }

    const cityServices = [
        {
            name: "City Services",
            keywords: ["services", "city services", "all services"],
            url: "services.html"
        },
        {
            name: "Hospitals & Healthcare",
            keywords: ["hospital", "hospitals", "health", "healthcare", "medical"],
            url: "map.html"
        },
        {
            name: "Water Services",
            keywords: ["water", "water supply"],
            url: "water.html"
        },
        {
            name: "Electricity Services",
            keywords: ["electricity", "power", "electric"],
            url: "electricity.html"
        },
        {
            name: "Waste Management",
            keywords: ["waste", "garbage", "trash", "cleaning"],
            url: "waste.html"
        },
        {
            name: "Road Services",
            keywords: ["roads", "road", "potholes", "street"],
            url: "roads.html"
        },
        {
            name: "Parks & Recreation",
            keywords: ["parks", "park", "garden", "recreation"],
            url: "parks.html"
        },
        {
            name: "Transport Services",
            keywords: ["transport", "bus", "buses", "traffic"],
            url: "transport.html"
        },
        {
            name: "City Map",
            keywords: ["map", "maps", "locations", "directions"],
            url: "map.html"
        },
        {
            name: "Report a Complaint",
            keywords: ["complaint", "complaints", "report", "problem", "issue"],
            url: "report.html"
        },
        {
            name: "City News",
            keywords: ["news", "events", "announcements"],
            url: "news.html"
        },
        {
            name: "Contact Us",
            keywords: ["contact", "help", "support"],
            url: "contact.html"
        }
    ];
    function searchCity() {

    const query = searchInput.value.trim().toLowerCase();

    searchResults.replaceChildren();

    // Clear suggestions when the search box is empty
    if (!query) {
        return;
    }

        const matches = cityServices.filter(function (service) {

            return service.name.toLowerCase().includes(query) ||
                service.keywords.some(function (keyword) {
                    return keyword.includes(query) || query.includes(keyword);
                });

        });

        if (matches.length === 0) {
            searchResults.textContent =
                "No matching services found. Try hospitals, water, transport, or complaints.";
            return;
        }

        matches.forEach(function (service) {

            const link = document.createElement("a");
            link.href = service.url;
            link.textContent = "📍 " + service.name + " →";

            searchResults.appendChild(link);

        });
    }

    searchButton.addEventListener("click", searchCity);
    searchInput.addEventListener("input", searchCity);


    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            searchCity();
        }
    });

});





