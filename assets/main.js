// Debugging: Ensure script is loaded
console.log("main.js is loaded successfully.");

// Toggle navigation menu with interactive close/bars icon transition
function myMenuFunction(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    var menu = document.getElementById("myNavMenu");
    var menuBtnIcon = document.querySelector(".nav-menu-btn i");

    if (menu) {
        var isOpen = menu.classList.toggle("responsive");
        if (menuBtnIcon) {
            if (isOpen) {
                menuBtnIcon.classList.remove("uil-bars");
                menuBtnIcon.classList.add("uil-times");
            } else {
                menuBtnIcon.classList.remove("uil-times");
                menuBtnIcon.classList.add("uil-bars");
            }
        }
    }
}
window.myMenuFunction = myMenuFunction;

// Initialize app logic when DOM is ready
function initApp() {
    // Navigation menu button event listener
    const menuBtn = document.querySelector(".nav-menu-btn");
    if (menuBtn) {
        menuBtn.addEventListener("click", myMenuFunction);
    }

    // Auto-close menu when clicking a link
    const navLinks = document.querySelectorAll(".nav-links, .nav-menu-list a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const menu = document.getElementById("myNavMenu");
            const menuBtnIcon = document.querySelector(".nav-menu-btn i");
            if (menu && menu.classList.contains("responsive")) {
                menu.classList.remove("responsive");
                if (menuBtnIcon) {
                    menuBtnIcon.classList.replace("uil-times", "uil-bars");
                }
            }
        });
    });

    // Typing effect initialization
    if (typeof Typed !== "undefined" && document.querySelector(".typedtext")) {
        try {
            new Typed(".typedtext", {
                strings: ["Developer", "Web Developer", "Designer"],
                loop: true,
                typeSpeed: 100,
                backSpeed: 80,
                backDelay: 2000
            });
        } catch (err) {
            console.error("Typed error:", err);
        }
    }

    // ScrollReveal Animations setup
    if (typeof ScrollReveal !== "undefined") {
        try {
            const sr = ScrollReveal({
                origin: "top",
                distance: "50px",
                duration: 2000,
                reset: true
            });

            sr.reveal(".featured-text-card", {});
            sr.reveal(".featured-name", { delay: 100 });
            sr.reveal(".featured-text-info", { delay: 200 });
            sr.reveal(".featured-text-btn", { delay: 200 });
            sr.reveal(".social-icons", { delay: 200 });
            sr.reveal(".featured-image", { delay: 300 });
            sr.reveal(".project-box", { interval: 200 });
            sr.reveal(".top-header", {});

            // Left direction scroll reveal
            const srLeft = ScrollReveal({
                origin: "left",
                distance: "50px",
                duration: 2000,
                reset: true
            });

            srLeft.reveal(".about-info", { delay: 100 });
            srLeft.reveal(".contact-info", { delay: 100 });
            srLeft.reveal(".top-footer", { delay: 100 });
            srLeft.reveal(".footer-social-icons", { delay: 100 });

            // Right direction scroll reveal
            const srRight = ScrollReveal({
                origin: "right",
                distance: "50px",
                duration: 2000,
                reset: false
            });

            srRight.reveal(".skill-box", { delay: 100 });
            srRight.reveal(".form-control", { delay: 100 });
            srRight.reveal(".bottom-footer", { delay: 100 });
            srRight.reveal(".middle-footer", { delay: 100 });
        } catch (err) {
            console.error("ScrollReveal error:", err);
        }
    }

    // Run shadow and active-links calculations initially
    headerShadow();
    scrollActive();
}

// Scroll highlight active navigation links
function scrollActive() {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const sections = document.querySelectorAll("section[id]");

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute("id");
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add("active-link");
            } else {
                navLink.classList.remove("active-link");
            }
        }
    });
}

// Add shadow effect on header and adjust menu height dynamically during scroll
function headerShadow() {
    const navHeader = document.getElementById("header");
    const navMenu = document.getElementById("myNavMenu");
    const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    
    if (navHeader) {
        if (scrollTop > 50) {
            navHeader.style.boxShadow = "0 1px 6px rgba(0,0,0,0.1)";
            navHeader.style.height = "70px";
            navHeader.style.lineHeight = "70px";
            if (navMenu) {
                navMenu.style.top = "70px";
                navMenu.style.height = "calc(100vh - 70px)";
            }
        } else {
            navHeader.style.boxShadow = "none";
            navHeader.style.height = "90px";
            navHeader.style.lineHeight = "90px";
            if (navMenu) {
                navMenu.style.top = "90px";
                navMenu.style.height = "calc(100vh - 90px)";
            }
        }
    }
}

// Consolidate scroll event listeners
window.addEventListener("scroll", () => {
    headerShadow();
    scrollActive();
});

// Ensure initApp runs safely on load
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}

// AJAX Form submission listener
const contactForm = document.querySelector(".form-control");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        fetch(contactForm.getAttribute("action") || "assets/connect.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.text())
        .then(data => {
            alert("Message sent successfully!");
            contactForm.reset();
        })
        .catch(() => {
            alert("An error occurred during submission.");
        });
    });
}
