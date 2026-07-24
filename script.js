/* ============================================================
   Portfolio interactions — Mohammad Fatim Shoaib
   ============================================================ */
(function () {
    "use strict";

    /* ---- Sticky header state ---- */
    var header = document.getElementById("siteHeader");
    function onScroll() {
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---- Mobile nav ---- */
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    if (toggle && links) {
        toggle.addEventListener("click", function () {
            var open = links.classList.toggle("open");
            toggle.setAttribute("aria-expanded", String(open));
            toggle.textContent = open ? "✕" : "☰";
        });
        links.addEventListener("click", function (e) {
            if (e.target.tagName === "A" && links.classList.contains("open")) {
                links.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
                toggle.textContent = "☰";
            }
        });
    }

    /* ---- Scroll reveal ---- */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in");
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        revealEls.forEach(function (el) {
            io.observe(el);
        });
    } else {
        revealEls.forEach(function (el) {
            el.classList.add("in");
        });
    }

    /* ---- Project filter + search ---- */
    var grid = document.getElementById("projGrid");
    if (grid) {
        var cards = Array.prototype.slice.call(grid.querySelectorAll(".proj-card"));
        var filterBtns = Array.prototype.slice.call(document.querySelectorAll(".filter-btn"));
        var search = document.getElementById("projSearch");
        var empty = document.getElementById("projEmpty");
        var activeFilter = "all";

        var render = function () {
            var q = (search && search.value ? search.value : "").trim().toLowerCase();
            var visible = 0;
            cards.forEach(function (card) {
                var cat = card.getAttribute("data-cat") || "";
                var haystack = (card.textContent + " " + (card.getAttribute("data-tech") || "")).toLowerCase();
                var matchCat = activeFilter === "all" || cat === activeFilter;
                var matchQ = q === "" || haystack.indexOf(q) !== -1;
                var show = matchCat && matchQ;
                card.style.display = show ? "flex" : "none";
                if (show) visible++;
            });
            if (empty) empty.style.display = visible === 0 ? "block" : "none";
        };

        filterBtns.forEach(function (btn) {
            btn.addEventListener("click", function () {
                filterBtns.forEach(function (b) {
                    b.classList.remove("active");
                });
                btn.classList.add("active");
                activeFilter = btn.getAttribute("data-filter");
                render();
            });
        });

        if (search) {
            search.addEventListener("input", render);
        }
        render();
    }
})();
