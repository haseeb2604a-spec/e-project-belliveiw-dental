/* =========================================================
   BELLEVILLE DENTAL - MAIN JAVASCRIPT
   ========================================================= */

$(document).ready(function () {

    /* =====================================================
       NAVBAR - CLOSE MOBILE MENU AFTER CLICK
       ===================================================== */

    $(".navbar-nav .nav-link:not(.dropdown-toggle), .navbar-nav .dropdown-item").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    /* Desktop: clicking a dropdown title also jumps to its section */
    $(".navbar-nav .dropdown-toggle").on("click", function () {
        if (window.innerWidth >= 992) {
            window.location.hash = $(this).attr("href");
        }
    });


    /* =====================================================
       PRODUCT FILTER
       ===================================================== */

    $(".product-filter").click(function () {

        $(".product-filter").removeClass("active");

        $(this).addClass("active");

        var filter = $(this).attr("data-filter");

        $(".product-item").each(function () {

            var item = $(this);
            var category = item.attr("data-category");

            if (filter === "all" || category === filter) {

                item.stop(true, true)
                    .fadeIn(400);

            } else {

                item.stop(true, true)
                    .fadeOut(300);

            }

        });

    });


    /* =====================================================
       PRODUCT RATING BUTTON
       ===================================================== */

    $(document).on("click", ".product-btn", function () {

        var button = $(this);

        var productCard = button.closest(".product-card");

        var productName = productCard
            .find("h3")
            .text()
            .trim();

        /*
         * If rating box already exists,
         * remove it.
         */

        if (button.next(".rating-box").length) {

            button.next(".rating-box").slideUp(250, function () {
                $(this).remove();
            });

            return;
        }


        /* Get saved rating */

        var savedRating = localStorage.getItem(
            "rating_" + productName
        );


        /* Default message */

        var ratingText = "No rating selected";


        if (savedRating) {

            ratingText =
                "Your Rating: " +
                savedRating +
                "/5 ✓ Saved";

        }


        /* Create rating box */

        var ratingBox = `
            <div class="rating-box">

                <p>
                    Rate <strong>${productName}</strong>
                </p>

                <div class="rating-stars">

                    <span data-rating="1">★</span>
                    <span data-rating="2">★</span>
                    <span data-rating="3">★</span>
                    <span data-rating="4">★</span>
                    <span data-rating="5">★</span>

                </div>

                <p class="selected-rating">
                    ${ratingText}
                </p>

            </div>
        `;


        /* Add rating box */

        button.after(ratingBox);


        /* Show animation */

        button.next(".rating-box").hide().slideDown(300);


        /* Highlight saved rating */

        if (savedRating) {

            productCard
                .find(".rating-box .rating-stars span")
                .each(function () {

                    var starRating =
                        parseInt(
                            $(this).attr("data-rating")
                        );

                    if (
                        starRating <=
                        parseInt(savedRating)
                    ) {

                        $(this).addClass("selected");

                    }

                });

        }

    });


    /* =====================================================
       STAR RATING
       ===================================================== */

    $(document).on(
        "click",
        ".rating-stars span",
        function () {

            var star = $(this);

            var rating =
                parseInt(
                    star.attr("data-rating")
                );


            var ratingBox =
                star.closest(".rating-box");


            var productCard =
                star.closest(".product-card");


            var productName =
                productCard
                    .find("h3")
                    .text()
                    .trim();


            /* Remove previous stars */

            ratingBox
                .find(".rating-stars span")
                .removeClass("selected");


            /* Select stars */

            ratingBox
                .find(".rating-stars span")
                .each(function () {

                    var starRating =
                        parseInt(
                            $(this).attr("data-rating")
                        );

                    if (starRating <= rating) {

                        $(this).addClass("selected");

                    }

                });


            /* Save rating */

            localStorage.setItem(
                "rating_" + productName,
                rating
            );


            /* Show saved message */

            ratingBox
                .find(".selected-rating")
                .text(
                    "Your Rating: " +
                    rating +
                    "/5 ✓ Saved"
                );


            /* Small success animation */

            ratingBox
                .find(".selected-rating")
                .hide()
                .fadeIn(300);

        }
    );


    /* =====================================================
       SCROLL FADE-UP ANIMATION
       ===================================================== */

    function revealOnScroll() {

        $(".fade-up").each(function () {

            var elementTop =
                $(this).offset().top;

            var windowBottom =
                $(window).scrollTop() +
                $(window).height();

            if (windowBottom > elementTop + 80) {

                $(this).addClass("show");

            }

        });

    }


    $(window).on(
        "scroll",
        revealOnScroll
    );

    revealOnScroll();


    /* =====================================================
       NAVBAR BACKGROUND ON SCROLL
       ===================================================== */

    $(window).on("scroll", function () {

        if ($(window).scrollTop() > 50) {

            $(".navbar").addClass("navbar-scrolled");

        } else {

            $(".navbar").removeClass("navbar-scrolled");

        }

    });


    /* =====================================================
       BUTTON HOVER EFFECT
       ===================================================== */

    $(".btn-theme, .btn-outline-theme")
        .on("mouseenter", function () {

            $(this).css(
                "transform",
                "translateY(-4px)"
            );

        })
        .on("mouseleave", function () {

            $(this).css(
                "transform",
                "translateY(0)"
            );

        });


    /* =====================================================
       PRODUCT CARD HOVER
       ===================================================== */

    $(".product-card").hover(

        function () {

            $(this)
                .find(".product-image img")
                .css(
                    "transform",
                    "scale(1.08)"
                );

        },

        function () {

            $(this)
                .find(".product-image img")
                .css(
                    "transform",
                    "scale(1)"
                );

        }

    );


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    $(".current-year").text(
        new Date().getFullYear()
    );


    /* =====================================================
       CARD DETAIL POPUP  (Education + Research cards)
       ===================================================== */

    var cardDetails = {
        "Related Courses": {
            tag: "PROFESSIONAL EDUCATION",
            items: ["Short courses on modern dental procedures", "Continuing education programs for practitioners", "Beginner to advanced learning paths", "Certificates of completion where offered"]
        },
        "Help Documents": {
            tag: "PROFESSIONAL EDUCATION",
            items: ["Step-by-step clinical guides", "Quick reference sheets and checklists", "Infection control and safety notes", "Downloadable educational material"]
        },
        "Faculty Resources": {
            tag: "PROFESSIONAL EDUCATION",
            items: ["Lecture outlines and teaching aids", "Assessment and assignment ideas", "Presentation material for classrooms", "Updated references for educators"]
        },
        "Student Resources": {
            tag: "PROFESSIONAL EDUCATION",
            items: ["Study notes and revision material", "Exam preparation guidance", "Illustrated learning content", "Recommended reading lists"]
        },
        "Dental Case Studies": {
            tag: "PROFESSIONAL EDUCATION",
            items: ["Real-world style clinical scenarios", "Diagnosis and treatment planning discussion", "Common conditions and approaches", "Learning points after every case"]
        },
        "Oral Health Basics": {
            tag: "PATIENT EDUCATION",
            items: ["Why healthy teeth and gums matter", "Daily routine for a clean mouth", "How diet affects oral health", "When to visit a dentist"]
        },
        "Brushing & Flossing": {
            tag: "PATIENT EDUCATION",
            items: ["Correct brushing technique", "How often and how long to brush", "Flossing step by step", "Choosing a toothbrush and toothpaste"]
        },
        "Common Dental Problems": {
            tag: "PATIENT EDUCATION",
            items: ["Cavities and tooth decay", "Gum problems and bleeding gums", "Tooth sensitivity", "Warning signs that need a checkup"]
        },
        "Dental Care & Prevention": {
            tag: "PATIENT EDUCATION",
            items: ["Simple preventive habits", "Why regular checkups are important", "Caring for children's teeth", "Healthy lifestyle tips for your smile"]
        },
        "Latest Research": {
            tag: "DENTAL RESEARCH",
            items: ["Recent developments in dentistry", "New materials and techniques", "Summaries of key findings", "Links to further reading"]
        },
        "Research Documents": {
            tag: "DENTAL RESEARCH",
            items: ["Research papers and articles", "Educational reports", "Reference documents for students and clinicians", "Organized by topic"]
        },
        "Media Library": {
            tag: "DENTAL RESEARCH",
            items: ["Educational dental videos", "Awareness and how-to clips", "Visual explanations of procedures", "Learning media for all levels"]
        }
    };

    var cardModal = new bootstrap.Modal(document.getElementById("cardModal"));

    /* make cards keyboard-friendly */
    $(".education-card, .research-card").attr({ tabindex: 0, role: "button" });

    function openCardModal(card) {

        var title = card.find("h3").first().text().trim();
        var icon = card.find(".education-icon, .research-icon").first().text().trim();
        var intro = card.find("p").first().text().replace(/\s+/g, " ").trim();
        var info = cardDetails[title] || { tag: "BELLEVILLE DENTAL", items: ["More details coming soon"] };

        $("#cardModalIcon").text(icon);
        $("#cardModalTag").text(info.tag);
        $("#cardModalTitle").text(title);
        $("#cardModalText").text(intro);

        var list = $("#cardModalList").empty();

        info.items.forEach(function (item) {
            list.append($("<li>").text(item));
        });

        cardModal.show();
    }

    $(document).on("click", ".education-card, .research-card", function (e) {
        e.preventDefault();          /* stops "#" link from jumping to the top */
        openCardModal($(this));
    });

    $(document).on("keydown", ".education-card, .research-card", function (e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openCardModal($(this));
        }
    });


    /* =====================================================
       BACK TO TOP (footer button)
       ===================================================== */

    $("#backToTop").on("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    /* =====================================================
       NAVBAR ACTIVE LINK ON SCROLL
       ===================================================== */

    function highlightNav() {

        var pos = $(window).scrollTop() + 140;
        var current = "home";

        $("section[id]").each(function () {
            if (pos >= $(this).offset().top) {
                current = $(this).attr("id");
            }
        });

        /* sections that live inside dropdowns highlight their parent */
        var parent = {
            professional: "#professional", patient: "#professional",
            about: "#about", gallery: "#about",
            queries: "#contact", contact: "#contact"
        };

        var target = "#" + current;
        if (parent[current]) { target = parent[current]; }

        $(".navbar-nav > .nav-item > .nav-link").removeClass("active");
        $('.navbar-nav > .nav-item > .nav-link[href="' + target + '"]').addClass("active");
    }

    $(window).on("scroll", highlightNav);
    highlightNav();


    /* =====================================================
       PAGE LOADED
       ===================================================== */

    $("body").addClass("page-loaded");

});


/* =====================================================
   VISITOR COUNTER
   ===================================================== */

var visitors = localStorage.getItem("bellevilleVisitors");

if (visitors === null) {

    visitors = 1;

} else {

    visitors = parseInt(visitors) + 1;

}

localStorage.setItem(
    "bellevilleVisitors",
    visitors
);

$("#visitorCount").text(visitors);



/* =====================================================
   LOGIN / SIGN UP / LOGOUT SYSTEM
===================================================== */

function updateAuthButton() {

    var loggedInUser =
        localStorage.getItem("bellevilleLoggedInUser");

    var authArea = $("#authArea");

    if (loggedInUser) {

        authArea.html(`
            <div class="user-menu">

                <button class="user-btn">
                    👤 ${loggedInUser}
                    <span>▼</span>
                </button>

                <div class="user-dropdown">

                    <button id="dashboardBtn">
                        📊 Dashboard
                    </button>

                    <button id="logoutBtn">
                        🚪 Logout
                    </button>

                </div>

            </div>
        `);

    } else {

        authArea.html(`
            <button class="auth-btn" id="signInBtn">
                👤 Sign In
            </button>
        `);

    }
}


/* OPEN LOGIN */

$(document).on("click", "#signInBtn", function () {

    $("#authTitle").text("Sign In");

    $("#loginForm").show();

    $("#signupForm").hide();

    $("#authMessage").text("");

    $("#authModal").modal("show");

});


/* SHOW SIGNUP */

$(document).on("click", "#showSignup", function (e) {

    e.preventDefault();

    $("#authTitle").text("Create Account");

    $("#loginForm").hide();

    $("#signupForm").show();

    $("#authMessage").text("");

});


/* SHOW LOGIN */

$(document).on("click", "#showLogin", function (e) {

    e.preventDefault();

    $("#authTitle").text("Sign In");

    $("#signupForm").hide();

    $("#loginForm").show();

    $("#authMessage").text("");

});


/* SIGN UP */

$(document).on("submit", "#signupForm", function (e) {

    e.preventDefault();

    var name =
        $("#signupName").val().trim();

    var email =
        $("#signupEmail").val().trim();

    var password =
        $("#signupPassword").val();


    if (password.length < 6) {

        $("#authMessage")
            .text("Password must be at least 6 characters.");

        return;
    }


    var user = {
        name: name,
        email: email,
        password: password,
        joined: new Date().toISOString()
    };


    localStorage.setItem(
        "bellevilleUser",
        JSON.stringify(user)
    );

    localStorage.setItem(
        "bellevilleLoggedInUser",
        name
    );

    sessionStorage.setItem("bellevilleJustLoggedIn", "signup");


    $("#authMessage")
        .text("Account created! Opening your dashboard...");


    setTimeout(function () {

        window.location.href = "dashboard.html";

    }, 900);

});


/* LOGIN */

$(document).on("submit", "#loginForm", function (e) {

    e.preventDefault();

    var email =
        $("#loginEmail").val().trim();

    var password =
        $("#loginPassword").val();


    var savedUser =
        localStorage.getItem("bellevilleUser");


    if (!savedUser) {

        $("#authMessage")
            .text("No account found. Please create an account.");

        return;
    }


    var user =
        JSON.parse(savedUser);


    if (
        email === user.email &&
        password === user.password
    ) {

        localStorage.setItem(
            "bellevilleLoggedInUser",
            user.name
        );


        $("#authMessage")
            .text("Login successful!");


        if (!user.joined) {
            user.joined = new Date().toISOString();
            localStorage.setItem("bellevilleUser", JSON.stringify(user));
        }

        sessionStorage.setItem("bellevilleJustLoggedIn", "login");

        updateAuthButton();


        setTimeout(function () {

            window.location.href = "dashboard.html";

        }, 800);


    } else {

        $("#authMessage")
            .text("Incorrect email or password.");

    }

});


/* OPEN DASHBOARD */

$(document).on("click", "#dashboardBtn", function () {

    window.location.href = "dashboard.html";

});


/* LOGOUT */

$(document).on("click", "#logoutBtn", function () {

    localStorage.removeItem(
        "bellevilleLoggedInUser"
    );

    updateAuthButton();

});


/* INITIAL AUTH CHECK */

updateAuthButton();




/* ================================= */
/*   DATE, TIME & GEOLOCATION        */
/* ================================= */

function updateDateTime() {

    const now = new Date();

    const dateOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric"
    };

    const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    };

    const currentDate = now.toLocaleDateString(
        "en-GB",
        dateOptions
    );

    const currentTime = now.toLocaleTimeString(
        "en-US",
        timeOptions
    );

    document.getElementById("currentDate").textContent =
        currentDate;

    document.getElementById("currentTime").textContent =
        currentTime;
}


/* Update date and time every second */

updateDateTime();

setInterval(updateDateTime, 1000);


/* ================================= */
/*       HTML5 GEOLOCATION           */
/* ================================= */

function getUserLocation() {

    const locationElement =
        document.getElementById("userLocation");


    if (!navigator.geolocation) {

        locationElement.textContent =
            "Geolocation not supported";

        return;
    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude.toFixed(4);

            const longitude =
                position.coords.longitude.toFixed(4);


            locationElement.textContent =
                "Lat " + latitude +
                "°, Long " + longitude + "°";

        },

        function(error) {

            if (error.code === 1) {

                locationElement.textContent =
                    "Location permission denied";

            } else {

                locationElement.textContent =
                    "Location unavailable";

            }

        }

    );
}


/* Start location detection */

getUserLocation();

