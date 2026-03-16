/**
 * Bento Grid Interactions — matches the original template behavior
 * 1. Absolute + percentage layout engine
 * 2. Entry animations (lines draw in → content fades in)
 * 3. Divider hover (thicken)
 * 4. Draggable resize with lerp damping
 * 5. Tagline rotating text
 */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("bento-container");
    if (!container) return;

    // ================================================================
    // LAYOUT ENGINE — percentage-based sizes
    // ================================================================
    var sizes = {
      topHeight: 35, // % of container
      midHeight: 40,
      // bottomHeight is computed: 100 - top - mid
      topLeftWidth: 55, // % of row width
      midLeftWidth: 45,
      botLeftWidth: 45,
    };

    var CONSTRAINTS = {
      minRowHeight: 15,
      maxRowHeight: 60,
      minColWidth: 25,
      maxColWidth: 75,
    };

    function clamp(val, min, max) {
      return Math.min(max, Math.max(min, val));
    }

    function applyLayout() {
      var botHeight = 100 - sizes.topHeight - sizes.midHeight;

      // Rows
      var top = document.getElementById("bento-top");
      var mid = document.getElementById("bento-middle");
      var bot = document.getElementById("bento-bottom");

      if (top) {
        top.style.top = "0";
        top.style.height = sizes.topHeight + "%";
      }
      if (mid) {
        mid.style.top = sizes.topHeight + "%";
        mid.style.height = sizes.midHeight + "%";
      }
      if (bot) {
        bot.style.top = (sizes.topHeight + sizes.midHeight) + "%";
        bot.style.height = botHeight + "%";
      }

      // Horizontal dividers
      var divMainH = document.getElementById("div-main-h");
      var divBotH = document.getElementById("div-bot-h");
      if (divMainH) divMainH.style.top = sizes.topHeight + "%";
      if (divBotH) divBotH.style.top = (sizes.topHeight + sizes.midHeight) + "%";

      // Panel widths within each row
      applyRowWidths("bento-top", sizes.topLeftWidth);
      applyRowWidths("bento-middle", sizes.midLeftWidth);
      applyRowWidths("bento-bottom", sizes.botLeftWidth);
    }

    function applyRowWidths(rowId, leftPct) {
      var row = document.getElementById(rowId);
      if (!row) return;
      var panels = row.querySelectorAll(":scope > .bento-panel");
      if (panels.length >= 2) {
        panels[0].style.width = leftPct + "%";
        panels[1].style.width = (100 - leftPct) + "%";
      } else if (panels.length === 1) {
        panels[0].style.width = "100%";
      }
    }

    // Initial layout
    applyLayout();

    // ================================================================
    // ENTRY ANIMATION — lines draw in, then content fades
    // ================================================================
    var lineHs = document.querySelectorAll("[data-animate='line-h']");
    var lineVs = document.querySelectorAll("[data-animate='line-v']");
    var contents = document.querySelectorAll("[data-animate='content']");

    // Set initial states
    lineHs.forEach(function (el) {
      el.style.transform = "scaleX(0)";
      el.style.transformOrigin = "left";
    });
    lineVs.forEach(function (el) {
      el.style.transform = "scaleY(0)";
      el.style.transformOrigin = "top";
    });
    contents.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
    });

    // Animate sequence
    // Phase 1: horizontal lines (0ms)
    setTimeout(function () {
      lineHs.forEach(function (el) {
        el.style.transition = "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        el.style.transform = "scaleX(1)";
      });
    }, 100);

    // Phase 2: vertical lines (400ms)
    setTimeout(function () {
      lineVs.forEach(function (el) {
        el.style.transition = "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        el.style.transform = "scaleY(1)";
      });
    }, 400);

    // Phase 3: content fades in (700ms, staggered)
    contents.forEach(function (el, i) {
      setTimeout(function () {
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 700 + i * 100);
    });

    // ================================================================
    // DRAGGABLE RESIZE — with lerp damping like original
    // ================================================================
    var LERP = 0.15;
    var dragging = null;
    var targetSizes = Object.assign({}, sizes);
    var rafId = null;

    // Check if mobile
    if (window.innerWidth <= 768) return;

    var dividers = document.querySelectorAll("[data-divider]");
    dividers.forEach(function (div) {
      var type = div.getAttribute("data-divider");

      div.addEventListener("mousedown", function (e) {
        e.preventDefault();
        dragging = type;
        div.classList.add("is-dragging");
        targetSizes = Object.assign({}, sizes);

        document.body.style.cursor = type.startsWith("horizontal") ? "row-resize" : "col-resize";
        document.body.style.userSelect = "none";

        startLerp();
      });
    });

    document.addEventListener("mousemove", function (e) {
      if (!dragging) return;

      var rect = container.getBoundingClientRect();
      var yPct = ((e.clientY - rect.top) / rect.height) * 100;
      var xPct = ((e.clientX - rect.left) / rect.width) * 100;

      if (dragging === "horizontal-main") {
        targetSizes.topHeight = clamp(yPct, CONSTRAINTS.minRowHeight, CONSTRAINTS.maxRowHeight);
        // Ensure mid doesn't get too small
        var remaining = 100 - targetSizes.topHeight;
        if (targetSizes.midHeight > remaining - CONSTRAINTS.minRowHeight) {
          targetSizes.midHeight = remaining - CONSTRAINTS.minRowHeight;
        }
      } else if (dragging === "horizontal-bottom") {
        var newMid = yPct - sizes.topHeight;
        targetSizes.midHeight = clamp(newMid, CONSTRAINTS.minRowHeight, 100 - sizes.topHeight - CONSTRAINTS.minRowHeight);
      } else if (dragging === "vertical-top") {
        targetSizes.topLeftWidth = clamp(xPct, CONSTRAINTS.minColWidth, CONSTRAINTS.maxColWidth);
      } else if (dragging === "vertical-middle") {
        targetSizes.midLeftWidth = clamp(xPct, CONSTRAINTS.minColWidth, CONSTRAINTS.maxColWidth);
      } else if (dragging === "vertical-bottom") {
        targetSizes.botLeftWidth = clamp(xPct, CONSTRAINTS.minColWidth, CONSTRAINTS.maxColWidth);
      }
    });

    document.addEventListener("mouseup", function () {
      if (!dragging) return;

      // Remove is-dragging from all dividers
      dividers.forEach(function (d) { d.classList.remove("is-dragging"); });

      dragging = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";

      // Final snap
      Object.assign(sizes, targetSizes);
      applyLayout();

      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function startLerp() {
      function animate() {
        if (!dragging) return;

        sizes.topHeight = lerp(sizes.topHeight, targetSizes.topHeight, LERP);
        sizes.midHeight = lerp(sizes.midHeight, targetSizes.midHeight, LERP);
        sizes.topLeftWidth = lerp(sizes.topLeftWidth, targetSizes.topLeftWidth, LERP);
        sizes.midLeftWidth = lerp(sizes.midLeftWidth, targetSizes.midLeftWidth, LERP);
        sizes.botLeftWidth = lerp(sizes.botLeftWidth, targetSizes.botLeftWidth, LERP);

        applyLayout();
        rafId = requestAnimationFrame(animate);
      }
      rafId = requestAnimationFrame(animate);
    }

    // ================================================================
    // TAGLINE ROTATING TEXT
    // ================================================================
    var taglineContainer = document.getElementById("bento-taglines");
    if (taglineContainer) {
      var taglines = taglineContainer.querySelectorAll(".bento-tagline");
      if (taglines.length > 1) {
        var current = 0;

        // Set container height and make relative
        var h = taglines[0].offsetHeight;
        taglineContainer.style.height = h + "px";

        taglines.forEach(function (t, i) {
          if (i !== 0) {
            t.style.position = "absolute";
            t.style.top = "0";
            t.style.left = "0";
            t.style.opacity = "0";
            t.style.transform = "translateY(10px)";
          }
        });

        setInterval(function () {
          var prev = current;
          current = (current + 1) % taglines.length;

          // Out
          taglines[prev].style.transition = "opacity 0.5s ease, transform 0.5s ease";
          taglines[prev].style.opacity = "0";
          taglines[prev].style.transform = "translateY(-10px)";
          taglines[prev].style.position = "absolute";
          taglines[prev].style.top = "0";
          taglines[prev].style.left = "0";

          // In (slight delay)
          taglines[current].style.transform = "translateY(10px)";
          taglines[current].style.opacity = "0";

          setTimeout(function () {
            taglines[current].style.transition = "opacity 0.5s ease, transform 0.5s ease";
            taglines[current].style.opacity = "1";
            taglines[current].style.transform = "translateY(0)";
          }, 50);
        }, 3500);
      }
    }
  });
})();
