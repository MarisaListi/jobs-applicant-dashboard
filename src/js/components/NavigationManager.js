export class NavigationManager {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // Menu button click
    $(document).on('click', '#menuBtn', (e) => {
      e.preventDefault();
      this.toggleNav();
    });

    // Close button click
    $(document).on('click', '#closeNav', (e) => {
      e.preventDefault();
      this.closeNav();
    });

    // Overlay click
    $(document).on('click', '#navOverlay', (e) => {
      if (e.target === e.currentTarget) {
        this.closeNav();
      }
    });

    // ESC key handling
    $(document).on('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        e.preventDefault();
        this.closeNav();
      }
    });

    // Prevent event bubbling inside the sidebar
    $(document).on('click', '#navSidebar', (e) => {
      e.stopPropagation();
    });
  }

  toggleNav() {
    if (this.isOpen) {
      this.closeNav();
    } else {
      this.openNav();
    }
  }

  openNav() {
    const overlay = $('#navOverlay');
    const sidebar = $('#navSidebar');
    
    overlay.removeClass('hidden');
    
    // Small delay to ensure the element is rendered before animation
    setTimeout(() => {
      sidebar.addClass('open');
      this.isOpen = true;
      
      // Prevent body scroll when nav is open
      $('body').addClass('overflow-hidden');
    }, 10);
  }

  closeNav() {
    const overlay = $('#navOverlay');
    const sidebar = $('#navSidebar');
    
    sidebar.removeClass('open');
    this.isOpen = false;
    
    // Allow body scroll again
    $('body').removeClass('overflow-hidden');
    
    // Hide overlay after animation completes
    setTimeout(() => {
      overlay.addClass('hidden');
    }, 300);
  }

  // Set active navigation item based on current page
  setActiveNavItem() {
    const currentPath = window.location.pathname;
    $('.nav-item').removeClass('active');
    
    if (currentPath.includes('applicant-details.html')) {
      $('.nav-item').eq(2).addClass('active'); // Applicants
    } else if (currentPath.includes('job-description.html')) {
      $('.nav-item').eq(1).addClass('active'); // Job Listings
    } else {
      $('.nav-item').eq(0).addClass('active'); // Dashboard
    }
  }
}