document.addEventListener("DOMContentLoaded", () => {
  // =======================================================
  // 1. Mobile Menu Toggle
  // =======================================================
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        // Ensure the menu is collapsed after tapping a link (on mobile)
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
        }
      });
    });
  }

  // =======================================================
  // 2. Pricing Toggle Logic (Monthly/Yearly)
  // =======================================================
  const pricingSwitch = document.getElementById("pricing-switch");
  const priceElements = document.querySelectorAll(".price");

  if (pricingSwitch && priceElements.length > 0) {
    // Initial setup for price display
    // The HTML should default to monthly prices, so we update the cycle text to match
    document.querySelectorAll(".price-cycle").forEach((textEl) => {
      textEl.textContent = "per user / month";
    });

    pricingSwitch.addEventListener("change", (event) => {
      const isYearly = event.target.checked;

      priceElements.forEach((priceEl) => {
        // Get the appropriate price from the data attributes
        // Data attributes use the full value (e.g., "$199")
        const newPrice = isYearly
          ? priceEl.getAttribute("data-yearly")
          : priceEl.getAttribute("data-monthly");

        // Update the visible text, splitting the currency sign and value for consistent styling
        const value = newPrice.replace("$", "");

        priceEl.innerHTML = `<span class="price-currency">$</span>${value}`;
      });

      // Update the price cycle text below the price
      const cycleText = document.querySelectorAll(".price-cycle");
      cycleText.forEach((textEl) => {
        textEl.textContent = isYearly
          ? "per user / year (Billed Annually)"
          : "per user / month";
      });
    });
  }

  // =======================================================
  // 3. Scroll Animation Observer (for CSS animations)
  // =======================================================
  // Select all elements that should animate on scroll
  const animateElements = document.querySelectorAll(
    ".fade-in-up, .slide-in-bottom, .scale-in, .slide-in-left, .slide-in-right"
  );

  if (animateElements.length > 0) {
    const scrollObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When intersecting, add the 'animated' class to trigger the CSS keyframes
            entry.target.classList.add("animated");
            // Stop observing once the animation has been triggered
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // Adjust the rootMargin to trigger the animation earlier, when the element is 100px from the bottom
        rootMargin: "0px 0px -100px 0px",
        threshold: 0.01, // Trigger with minimal visibility
      }
    );

    // Set initial state and start observing elements
    animateElements.forEach((element) => {
      // 1. Initial Opacity: Must be 0 to hide it before animation starts
      element.style.opacity = "0";

      // 2. Initial Transform: Set the starting position for the animation to reserve space
      if (
        element.classList.contains("fade-in-up") ||
        element.classList.contains("slide-in-bottom")
      ) {
        element.style.transform = "translateY(20px)";
      } else if (element.classList.contains("scale-in")) {
        element.style.transform = "scale(0.9)";
      } else if (element.classList.contains("slide-in-left")) {
        element.style.transform = "translateX(-30px)";
      } else if (element.classList.contains("slide-in-right")) {
        element.style.transform = "translateX(30px)";
      }

      // Start observing
      scrollObserver.observe(element);
    });
  }

  // =======================================================
  // 4. Newsletter Subscription Mockup
  // =======================================================
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = this.querySelector('input[type="email"]');

      // In a real application, this is where you'd send data to a server.
      console.log("Subscribing email:", input.value);

      // Mock success message (replace input with a message box)
      const parent = this.parentElement;
      parent.innerHTML = `
                <div class="text-green-600 bg-green-100 p-4 rounded-lg shadow-inner w-full">
                    <p class="font-bold">Subscribed!</p>
                    <p class="text-sm">Thank you for joining our newsletter with ${input.value}!</p>
                </div>
            `;
    });
  }
});
