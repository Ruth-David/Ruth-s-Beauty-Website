// ===== Helper: Smooth scroll to target =====
function smoothScroll(targetSelector) {
  const target = document.querySelector(targetSelector);
  if (!target) return;
  const headerOffset = 70; // height of sticky nav
  const elementPosition = target.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

// ===== Mobile Menu: close when a link is clicked =====
function closeMobileMenu() {
  const checkbox = document.getElementById("toggle-menu");
  if (checkbox && checkbox.checked) {
    checkbox.checked = false;
  }
}

// ===== Attach events once DOM is ready =====
document.addEventListener("DOMContentLoaded", () => {
  // 1. Current year in footer (fallback if not set via inline script)
  const yearSpan = document.getElementById("year");
  if (yearSpan && !yearSpan.textContent) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Smooth scrolling for nav links
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        smoothScroll(href);
        closeMobileMenu();
      }
    });
  });

  // 3. Basic form validation / user feedback
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      // Example: simple phone number check (Kenyan format max 15 chars)
      const phoneInput = form.querySelector("input[name='phone']");
      if (phoneInput && phoneInput.value.trim().length < 7) {
        alert("Please enter a valid phone number.");
        phoneInput.focus();
        e.preventDefault();
        return;
      }

      // TODO: Replace alert with backend integration success message
      alert("Thank you! Your booking request has been submitted.");
    });
  }
});
