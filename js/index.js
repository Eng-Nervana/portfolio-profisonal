var sections = document.querySelectorAll("section");
var navLinks = document.querySelectorAll(".nav-links a");
var themeBtn = document.getElementById("theme-toggle-button");
var filterBtns = document.querySelectorAll(".portfolio-filter");
var items = document.querySelectorAll(".portfolio-item");
var topBtn = document.getElementById("scroll-to-top");

window.onscroll = function() {
  var scrollPosition = window.scrollY;

  for (var i = 0; i < sections.length; i++) {
    var sec = sections[i];
    var top = sec.offsetTop;
    var height = sec.offsetHeight;
    var id = sec.getAttribute("id");

    if (scrollPosition >= top && scrollPosition < top + height) {
      for (var k = 0; k < navLinks.length; k++) {
        navLinks[k].classList.remove("text-primary", "active");
      }
      var activeLink = document.querySelector(".nav-links a[href*=" + id + "]");
      if (activeLink) {
        activeLink.classList.add("text-primary", "active");
      }
    }
  }

  if (topBtn) {
    if (scrollPosition > 300) {
      topBtn.style.opacity = "1";
      topBtn.style.pointerEvents = "auto";
    } else {
      topBtn.style.opacity = "0";
      topBtn.style.pointerEvents = "none";
    }
  }
};

if (themeBtn) {
  themeBtn.onclick = function() {
    var htmlTag = document.documentElement;
    htmlTag.classList.toggle("dark");

    if (htmlTag.classList.contains("dark")) {
      localStorage.setItem("theme-mode", "dark");
    } else {
      localStorage.setItem("theme-mode", "light");
    }
  };
}

var savedThemeMode = localStorage.getItem("theme-mode");
if (savedThemeMode === "dark") {
  document.documentElement.classList.add("dark");
} else if (savedThemeMode === "light") {
  document.documentElement.classList.remove("dark");
}

filterBtns.forEach(function(btn) {
  btn.onclick = function() {
    filterBtns.forEach(function(b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
    var category = btn.getAttribute("data-filter");
    items.forEach(function(item) {
      if (category === "all" || item.getAttribute("data-category") === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  };
});

document.addEventListener("DOMContentLoaded", function() {
  var settingsToggle = document.getElementById("settings-toggle");
  var settingsSidebar = document.getElementById("settings-sidebar");
  var closeSettingsBtn = document.getElementById("close-settings");
  
  if (settingsToggle && settingsSidebar) {
    settingsToggle.onclick = function() {
      settingsSidebar.classList.toggle("translate-x-full");
      var expanded = settingsToggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        settingsToggle.setAttribute("aria-expanded", "false");
      } else {
        settingsToggle.setAttribute("aria-expanded", "true");
      }
    };
  }

  if (closeSettingsBtn && settingsSidebar) {
    closeSettingsBtn.onclick = function() {
      settingsSidebar.classList.add("translate-x-full");
      if (settingsToggle) {
        settingsToggle.setAttribute("aria-expanded", "false");
      }
    };
  }

  var fontButtons = document.querySelectorAll(".font-option");
  fontButtons.forEach(function(button) {
    button.onclick = function() {
      var selectedFont = button.getAttribute("data-font");
      document.body.classList.remove("font-tajawal", "font-cairo", "font-alexandria");
      document.body.classList.add("font-" + selectedFont);
      localStorage.setItem("selected-font", selectedFont);
    };
  });

  var savedFont = localStorage.getItem("selected-font");
  if (savedFont) {
    document.body.classList.remove("font-tajawal", "font-cairo", "font-alexandria");
    document.body.classList.add("font-" + savedFont);
  }
});

var colorsData = [
  { 
    main: "#0ea5e9",
     secondary: "#38bdf8",
      gradient: "linear-gradient(135deg, #0ea5e9, #38bdf8)" 
    },
  {
     main: "#16a34a",
      secondary: "#22c55e",
       gradient: "linear-gradient(135deg, #16a34a, #22c55e)"
       },
  {
     main: "#db2777",
      secondary: "#ec4899",
       gradient: "linear-gradient(135deg, #db2777, #ec4899)"
       },
  {
     main: "#4f46e5", 
     secondary: "#6366f1",
      gradient: "linear-gradient(135deg, #4f46e5, #6366f1)"
     },
  {
     main: "#ea580c",
      secondary: "#f97316",
       gradient: "linear-gradient(135deg, #ea580c, #f97316)" 
      },
  {
     main: "#dc2626",
      secondary: "#ef4444",
       gradient: "linear-gradient(135deg, #dc2626, #ef4444)" 
      }
];
var defaultPrimary = "#0ea5e9";
var defaultSecondary = "#38bdf8";

var colorsGrid = document.getElementById("theme-colors-grid");
if (colorsGrid) {
  colorsGrid.innerHTML = "";
  colorsData.forEach(function(item) {
    var btn = document.createElement("button");
    btn.className = "color-option w-8 h-8 rounded-full border-2 border-white shadow-md transition-transform hover:scale-110 cursor-pointer";
    btn.style.background = item.gradient;
    
    btn.onclick = function() {
      document.documentElement.style.setProperty("--color-primary", item.main);
      document.documentElement.style.setProperty("--color-secondary", item.secondary);
      document.documentElement.style.setProperty("--theme-color", item.main);
      
      localStorage.setItem("theme-primary", item.main);
      localStorage.setItem("theme-secondary", item.secondary);
      localStorage.setItem("theme-color", item.main);
    };

    colorsGrid.appendChild(btn);
  });
}

var savedPrimary = localStorage.getItem("theme-primary");
var savedSecondary = localStorage.getItem("theme-secondary");
var savedColor = localStorage.getItem("theme-color");

if (savedPrimary) {
  document.documentElement.style.setProperty("--color-primary", savedPrimary);
}
if (savedSecondary) {
  document.documentElement.style.setProperty("--color-secondary", savedSecondary);
}
if (savedColor) {
  document.documentElement.style.setProperty("--theme-color", savedColor);
}

var resetBtn = document.getElementById("reset-settings");
if (resetBtn) {
  resetBtn.onclick = function() {
    document.documentElement.style.setProperty("--color-primary", defaultPrimary);
    document.documentElement.style.setProperty("--color-secondary", defaultSecondary);
    document.documentElement.style.setProperty("--theme-color", defaultPrimary);

    localStorage.removeItem("theme-primary");
    localStorage.removeItem("theme-secondary");
    localStorage.removeItem("theme-color");
    
  };
}

if (topBtn) {
  topBtn.classList.remove("opacity-0", "invisible");
  topBtn.style.opacity = "0";
  topBtn.style.pointerEvents = "none";
  
  topBtn.onclick = function() {
    window.scrollTo({
      top: 0,
    });
  };
}

document.addEventListener("DOMContentLoaded", function () {
    var carousel = document.getElementById('testimonials-carousel');
    var cards = carousel.querySelectorAll('.testimonial-card');
    var nextBtn = document.getElementById('next-testimonial');
    var prevBtn = document.getElementById('prev-testimonial');
    var indicators = document.querySelectorAll('.carousel-indicator');

    var currentIndex = 0;

    function getCardsPerView() {
        if (window.innerWidth >= 1024) {
            return 3;
        }
        if (window.innerWidth >= 640) {
            return 2;
        }
        return 1;
    }

    function updateCarousel() {
        var cardsPerView = getCardsPerView();
        var maxIndex = Math.max(0, cards.length - cardsPerView);
        
        if (currentIndex > maxIndex)
           {
            currentIndex = maxIndex;
        }
        if (currentIndex < 0)
           {
            currentIndex = 0;
        }

        var percentage = currentIndex * (100 / cardsPerView);
        carousel.style.transform = `translateX(${percentage}%)`;

        for (var i = 0; i < indicators.length; i++) {
            var indicator = indicators[i];
            if (i === currentIndex) {
                indicator.classList.add('bg-accent', 'w-6');
                indicator.classList.remove('bg-slate-400', 'dark:bg-slate-600', 'w-3');
                indicator.setAttribute('aria-selected', 'true');
            } else {
                indicator.classList.remove('bg-accent', 'w-6');
                indicator.classList.add('bg-slate-400', 'dark:bg-slate-600', 'w-3');
                indicator.setAttribute('aria-selected', 'false');
            }
        }
    }

    nextBtn.addEventListener('click', function () {
        var cardsPerView = getCardsPerView();
        var maxIndex = cards.length - cardsPerView;
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', function () {
        var cardsPerView = getCardsPerView();
        var maxIndex = cards.length - cardsPerView;
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex;
        }
        updateCarousel();
    });

    for (var j = 0; j < indicators.length; j++) {
        (function (index) {
            indicators[index].addEventListener('click', function () {
                currentIndex = parseInt(this.getAttribute('data-index'));
                updateCarousel();
            });
        })(j);
    }

    window.addEventListener('resize', updateCarousel);

    updateCarousel();
});