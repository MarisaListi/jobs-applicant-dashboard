import { getJobById, getAllJobs } from '../data/jobs';
import { LoadingManager } from '../utils/LoadingManager';

export class JobDescriptionManager {
  constructor() {
    this.jobData = null;
    this.loadingManager = new LoadingManager();
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadJobDetails();
    this.initEnhancedFeatures();
  }

  bindEvents() {
    // Apply button event
    $(document).on('click', '#applyBtn', this.handleApply.bind(this));
    
    // Save job event
    $(document).on('click', '#saveJobBtn', this.handleSaveJob.bind(this));
    
    // Share job event
    $(document).on('click', '#shareJobBtn', this.handleShareJob.bind(this));
    
    // View company profile event
    $(document).on('click', '#viewCompanyBtn', this.handleViewCompany.bind(this));
    
    // Accordion toggle events
    $(document).on('click', '[data-accordion]', this.toggleAccordion.bind(this));
  }

  loadJobDetails() {
    // Get job ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');

    // Show loading state
    this.showLoadingState();

    // Simulate API call delay
    setTimeout(() => {
      if (!jobId || !getJobById(parseInt(jobId))) {
        this.showErrorState();
        return;
      }

      this.jobData = getJobById(parseInt(jobId));
      this.populateJobDetails(this.jobData);
      this.hideLoadingState();
    }, 800);
  }

  populateJobDetails(job) {
    // Update page title
    document.title = `${job.title} at ${job.company} - JobBoard`;

    // Populate job header
    $('#jobTitle').text(job.title);
    $('#jobCompany').text(job.company);
    $('#jobLocation').text(job.location);
    $('#jobType').text(job.type);
    $('#jobRemote').text(job.remote);
    $('#companyLogo').attr('src', job.logo);
    
    // Format and populate salary
    const salaryText = this.formatSalary(job.salary);
    $('#jobSalary').text(salaryText);

    // Populate job stats
    $('#applicationCount').text(job.applicationCount);
    $('#viewCount').text(job.views);
    $('#postedDate').text(this.formatDate(job.posted));
    $('#deadlineDate').text(this.formatDate(job.deadline));

    // Populate job description
    $('#jobDescription').text(job.description);

    // Populate responsibilities
    this.populateList('#responsibilitiesList', job.responsibilities);

    // Populate requirements
    this.populateList('#requirementsList', job.requirements);

    // Populate preferred qualifications
    this.populateList('#preferredQualificationsList', job.preferredQualifications);

    // Populate benefits
    this.populateList('#benefitsList', job.benefits);

    // Populate company information
    $('#companySize').text(job.companyInfo.size);
    $('#companyIndustry').text(job.companyInfo.industry);
    $('#companyFounded').text(job.companyInfo.founded);
    $('#companyWebsite').attr('href', job.companyInfo.website).text(job.companyInfo.website);
    $('#companyDescription').text(job.companyInfo.description);

    // Show the job content
    $('#jobContent').removeClass('hidden');
  }

  populateList(selector, items) {
    const list = $(selector);
    list.empty();
    
    items.forEach(item => {
      list.append(`
        <li class="flex items-start space-x-3">
          <i class="fas fa-check-circle text-green-500 mt-1 flex-shrink-0"></i>
          <span class="text-gray-700">${item}</span>
        </li>
      `);
    });
  }

  formatSalary(salary) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: salary.currency,
      minimumFractionDigits: 0
    });

    if (salary.period === 'hourly') {
      return `${formatter.format(salary.min)} - ${formatter.format(salary.max)} /hour`;
    } else {
      return `${formatter.format(salary.min)} - ${formatter.format(salary.max)} /year`;
    }
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  toggleAccordion(e) {
    const target = $(e.currentTarget);
    const accordionName = target.data('accordion');
    const content = $(`#${accordionName}-content`);
    const chevron = $(`#${accordionName}-chevron`);

    if (content.hasClass('hidden')) {
      content.removeClass('hidden').hide().slideDown(300);
      chevron.removeClass('fa-chevron-down').addClass('fa-chevron-up');
    } else {
      content.slideUp(300, () => {
        content.addClass('hidden');
      });
      chevron.removeClass('fa-chevron-up').addClass('fa-chevron-down');
    }
  }

  handleApply(e) {
    e.preventDefault();
    this.showToast('Application submitted successfully!', 'success');
    
    // Disable apply button and show applied state
    const applyBtn = $('#applyBtn');
    applyBtn.prop('disabled', true)
            .removeClass('bg-blue-600 hover:bg-blue-700')
            .addClass('bg-green-600')
            .html('<i class="fas fa-check mr-2"></i>Applied');
  }

  handleSaveJob(e) {
    e.preventDefault();
    const btn = $(e.currentTarget);
    const icon = btn.find('i');
    
    if (icon.hasClass('far')) {
      icon.removeClass('far').addClass('fas');
      btn.addClass('text-blue-600');
      this.showToast('Job saved to your list!', 'success');
    } else {
      icon.removeClass('fas').addClass('far');
      btn.removeClass('text-blue-600');
      this.showToast('Job removed from your list', 'info');
    }
  }

  handleShareJob(e) {
    e.preventDefault();
    
    // Copy job URL to clipboard
    const jobUrl = window.location.href;
    navigator.clipboard.writeText(jobUrl).then(() => {
      this.showToast('Job link copied to clipboard!', 'success');
    }).catch(() => {
      this.showToast('Unable to copy link', 'error');
    });
  }

  handleViewCompany(e) {
    e.preventDefault();
    this.showToast('Company profile feature coming soon!', 'info');
  }

  showLoadingState() {
    $('#loadingState').show();
    $('#jobContent').hide();
    $('#errorState').hide();
  }

  hideLoadingState() {
    $('#loadingState').hide();
    $('#jobContent').show();
    $('#errorState').hide();
  }

  showErrorState() {
    $('#loadingState').hide();
    $('#jobContent').hide();
    $('#errorState').show();
  }

  showToast(message, type = 'info') {
    const toastId = 'toast-' + Date.now();
    const bgColor = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500',
      warning: 'bg-yellow-500'
    }[type] || 'bg-blue-500';

    const toast = $(`
      <div id="${toastId}" class="fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full opacity-0 transition-all duration-300">
        <div class="flex items-center space-x-2">
          <i class="fas fa-info-circle"></i>
          <span>${message}</span>
        </div>
      </div>
    `);

    $('body').append(toast);

    // Animate in
    setTimeout(() => {
      toast.removeClass('translate-x-full opacity-0');
    }, 100);

    // Auto remove after 3 seconds
    setTimeout(() => {
      toast.addClass('translate-x-full opacity-0');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }

  // Navigate to next/previous job
  navigateToJob(direction) {
    const allJobs = getAllJobs();
    const currentId = this.jobData?.id;
    const currentIndex = allJobs.findIndex(job => job.id === currentId);
    
    if (currentIndex === -1) return;

    let nextIndex;
    if (direction === 'next') {
      nextIndex = currentIndex < allJobs.length - 1 ? currentIndex + 1 : 0;
    } else {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : allJobs.length - 1;
    }

    const nextJob = allJobs[nextIndex];
    window.location.href = `job-description.html?id=${nextJob.id}`;
  }

  // Add keyboard navigation
  bindKeyboardEvents() {
    $(document).on('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          if (!$(e.target).is('input, textarea, select')) {
            e.preventDefault();
            this.navigateToJob('prev');
          }
          break;
        case 'ArrowRight':
          if (!$(e.target).is('input, textarea, select')) {
            e.preventDefault();
            this.navigateToJob('next');
          }
          break;
        case 'Escape':
          if (!$(e.target).is('input, textarea, select')) {
            e.preventDefault();
            window.history.back();
          }
          break;
      }
    });
  }

  // Initialize enhanced features
  initEnhancedFeatures() {
    this.bindKeyboardEvents();

    // Make instance globally available for navigation buttons
    window.jobDescriptionManager = this;
  }
}