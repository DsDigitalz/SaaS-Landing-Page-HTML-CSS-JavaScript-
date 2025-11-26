document.addEventListener("DOMContentLoaded", () => {
  // =======================================================
  // 1. Mobile Menu Toggle
  // =======================================================
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }

  // =======================================================
  // 2. Pricing Toggle Logic (Monthly/Yearly)
  // =======================================================
  const pricingToggle = document.getElementById("pricing-toggle");
  const priceCards = document.querySelectorAll("#pricing article");
  const monthlyLabel = document.getElementById("monthly-label");
  const yearlyLabel = document.getElementById("yearly-label");

  if (pricingToggle && priceCards.length > 0) {
    pricingToggle.addEventListener("click", () => {
      pricingToggle.classList.toggle("yearly");
      const isYearly = pricingToggle.classList.contains("yearly");

      // Update label colors
      monthlyLabel.classList.toggle("text-gray-500");
      yearlyLabel.classList.toggle("text-gray-500");

      priceCards.forEach((card) => {
        const priceSpan = card.querySelector(".text-5xl");
        const priceCycle = card.querySelector('[id^="price-cycle-"]');
        const dataMonthly = priceSpan.getAttribute("data-monthly");
        const dataYearly = priceSpan.getAttribute("data-yearly");

        const newPrice = isYearly ? dataYearly : dataMonthly;
        const cycleText = isYearly ? "per year" : "per month";

        // Update price and cycle text
        priceSpan.innerHTML = `<span class="text-3xl align-top font-bold text-gray-500">$</span>${newPrice}`;
        priceCycle.textContent = cycleText;
      });
    });
  }

  // =======================================================
  // 3. Scroll Animation Observer (Framer Motion equivalent)
  // =======================================================
  const animateElements = document.querySelectorAll(".animate-on-scroll");

  const scrollObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      // Trigger animation when element is 100px from the viewport bottom
      rootMargin: "0px 0px -100px 0px",
      threshold: 0.1,
    }
  );

  animateElements.forEach((element) => {
    scrollObserver.observe(element);
  });

  // =======================================================
  // 4. Newsletter Subscription Mockup
  // =======================================================
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = this.querySelector('input[type="email"]');

      // Mock success message
      const parent = this.parentElement;
      parent.innerHTML = `
                        <div class="text-center md:text-left p-6 bg-green-100 border border-green-300 rounded-xl w-full">
                            <h3 class="text-xl font-bold text-green-800 mb-2">Success!</h3>
                            <p class="text-green-700">You are now subscribed with ${input.value}. Check your inbox soon!</p>
                        </div>
                    `;
    });
  }
});
