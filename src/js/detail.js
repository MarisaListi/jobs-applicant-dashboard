// Entry point for applicant details page
import "../css/main.css";
import { ApplicantDetailsManager } from "./components/ApplicantDetailsManager";
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
  // Initialize navigation manager
  const navManager = new NavigationManager();
  navManager.setActiveNavItem();
  
  new ApplicantDetailsManager();
});
