// Main entry point for the application
import "../css/main.css";
import { ApplicantManager } from "./components/ApplicantManager";
import { ApplicantDetailsManager } from "./components/ApplicantDetailsManager";
import { JobDescriptionManager } from "./components/JobDescriptionManager";
import { NavigationManager } from "./components/NavigationManager";
import $ from "jquery";

// Make jQuery globally available
window.$ = window.jQuery = $;

// Global utility functions
window.goBack = function () {
  window.history.back();
};

// Initialize application when DOM is ready
$(document).ready(() => {
  // Initialize navigation manager for all pages
  const navManager = new NavigationManager();
  navManager.setActiveNavItem();

  // Check which page we're on and initialize appropriate manager
  if (window.location.pathname.includes("applicant-details.html")) {
    new ApplicantDetailsManager();
  } else if (window.location.pathname.includes("job-description.html")) {
    new JobDescriptionManager();
  } else {
    new ApplicantManager();
  }
});
