/**
 * Serviap Design Test - Main JavaScript
 *
 * Modern, accessible JavaScript implementation with:
 * - Gallery modal functionality with keyboard navigation
 * - Card link tracking with console logging
 * - Focus management and accessibility features
 * - Cross-browser compatibility
 */

(function () {
  "use strict";

  // DOM Elements
  let modal = null;
  let modalImage = null;
  let modalClose = null;
  let galleryImages = null;
  let cardLinks = null;
  let focusedElementBeforeModal = null;

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    // Get DOM elements
    modal = document.getElementById("gallery-modal");
    modalImage = document.getElementById("modal-image");
    modalClose = modal?.querySelector(".modal-close");
    galleryImages = document.querySelectorAll(".images img[data-full-src]");
    cardLinks = document.querySelectorAll(".card-link");

    // Initialize gallery modal functionality
    initGalleryModal();

    // Initialize card link tracking
    initCardLinkTracking();

    // Initialize keyboard navigation
    initKeyboardNavigation();
  }

  // Gallery Modal Functionality
  function initGalleryModal() {
    if (!modal || !modalImage || !modalClose) {
      console.warn("Gallery modal elements not found");
      return;
    }

    // Add click listeners to gallery images
    galleryImages.forEach((img, index) => {
      img.addEventListener("click", () => openModal(img));
      img.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(img);
        }
      });
    });

    // Close modal listeners
    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Keyboard navigation for modal
    document.addEventListener("keydown", (e) => {
      if (modal.classList.contains("active")) {
        if (e.key === "Escape") {
          closeModal();
        } else if (e.key === "Tab") {
          trapFocus(e);
        }
      }
    });
  }

  function openModal(img) {
    if (!modal || !modalImage) return;

    // Store currently focused element
    focusedElementBeforeModal = document.activeElement;

    // Set modal image
    const fullSrc = img.dataset.fullSrc || img.src;
    const alt = img.alt;

    modalImage.src = fullSrc;
    modalImage.alt = alt;

    // Scale modal image to 110% of original size
    const originalWidth = img.naturalWidth || img.width;
    const originalHeight = img.naturalHeight || img.height;

    modalImage.style.width = `${originalWidth * 1.3}px`;
    modalImage.style.height = `${originalHeight * 1.3}px`;
    modalImage.style.maxWidth = "90vw";
    modalImage.style.maxHeight = "85vh";

    // Show modal
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    // Focus close button
    setTimeout(() => {
      modalClose.focus();
    }, 100);

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Log interaction for analytics
    console.log("Gallery image opened:", {
      src: fullSrc,
      alt: alt,
      timestamp: new Date().toISOString(),
    });
  }

  function closeModal() {
    if (!modal) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    // Restore body scroll
    document.body.style.overflow = "";

    // Return focus to previously focused element
    if (focusedElementBeforeModal) {
      focusedElementBeforeModal.focus();
      focusedElementBeforeModal = null;
    }

    // Clear modal image after animation
    setTimeout(() => {
      if (modalImage) {
        modalImage.src = "";
        modalImage.alt = "";
        // Reset image styles
        modalImage.style.width = "";
        modalImage.style.height = "";
        modalImage.style.maxWidth = "";
        modalImage.style.maxHeight = "";
      }
    }, 300);
  }

  function trapFocus(e) {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  // Card Link Tracking
  function initCardLinkTracking() {
    cardLinks.forEach((link, index) => {
      link.addEventListener("click", (e) => {
        // Prevent default navigation for demo purposes
        e.preventDefault();

        // Log the click event with detailed information
        const cardData = extractCardData(link);
        console.log("Card link clicked:", {
          ...cardData,
          index: index,
          element: link,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          screenSize: `${window.screen.width}x${window.screen.height}`,
          viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        });

        // Optional: Send to analytics service
        // trackCardClick(cardData);
      });

      // Also track keyboard navigation
      link.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const cardData = extractCardData(link);
          console.log("Card link activated via keyboard:", {
            ...cardData,
            index: index,
            element: link,
            timestamp: new Date().toISOString(),
            activationMethod: "keyboard",
          });
        }
      });
    });
  }

  function extractCardData(link) {
    const card = link.closest(".card");
    const image = card?.querySelector(".image");
    const title = card?.querySelector(".card-title");
    const description = card?.querySelector(".card-description");

    return {
      href: link.href,
      title: title?.textContent?.trim() || "",
      description: description?.textContent?.trim() || "",
      imageSrc: image?.src || "",
      imageAlt: image?.alt || "",
    };
  }

  // Optional: Function to send data to analytics service
  // function trackCardClick(cardData) {
  //   // Example: Send to Google Analytics, Adobe Analytics, etc.
  //   if (typeof gtag !== 'undefined') {
  //     gtag('event', 'card_click', {
  //       card_title: cardData.title,
  //       card_href: cardData.href
  //     });
  //   }
  // }

  // Keyboard Navigation Enhancement
  function initKeyboardNavigation() {
    // Enhance focus visibility for better accessibility
    const focusableElements = document.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach((element) => {
      element.addEventListener("focus", () => {
        element.classList.add("focused");
      });

      element.addEventListener("blur", () => {
        element.classList.remove("focused");
      });
    });

    // Add keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      // Alt + 1: Focus on main content
      if (e.altKey && e.key === "1") {
        e.preventDefault();
        const mainContent = document.getElementById("main-content");
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }

  // Utility Functions
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Resize handler for responsive updates
  const handleResize = debounce(() => {
    // Any resize-specific logic can go here
    console.log(
      "Viewport resized:",
      `${window.innerWidth}x${window.innerHeight}`
    );
  }, 250);

  window.addEventListener("resize", handleResize);

  // Error handling
  window.addEventListener("error", (e) => {
    console.error("JavaScript error:", e.error);
  });

  // Make some functions globally available for debugging
  window.ServiapDebug = {
    openModal: (index = 0) => {
      if (galleryImages[index]) {
        openModal(galleryImages[index]);
      }
    },
    closeModal: closeModal,
    logCardData: () => {
      cardLinks.forEach((link, index) => {
        console.log(`Card ${index}:`, extractCardData(link));
      });
    },
  };
})();
