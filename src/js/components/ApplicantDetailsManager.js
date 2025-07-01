import { APPLICANTS_DATA } from '../data/applicants';
import { LoadingManager } from '../utils/LoadingManager';

export class ApplicantDetailsManager {
  constructor() {
    this.applicantsData = {};
    this.loadingManager = new LoadingManager();

    // Convert array to object for easier lookup
    APPLICANTS_DATA.forEach((applicant) => {
      this.applicantsData[applicant.id] = applicant;
    });

    this.init();
  }

  init() {
    this.loadingManager.showDetailsLoading();
    this.bindEvents();

    // Simulate loading delay
    setTimeout(() => {
      this.loadApplicantDetails();
    }, 1000);
  }

  bindEvents() {
    // Video player events
    $(document).on('click', '#videoOverlay', (e) => this.playVideo(e));

    // Application status change
    $(document).on('change', '#applicationStatus', (e) => this.updateStatus(e));

    // Accordion events
    $(document).on('click', '[data-accordion]', (e) => this.toggleAccordion(e));
  }

  toggleAccordion(e) {
    const target = $(e.currentTarget);
    const accordionName = target.data('accordion');
    const content = $(`#${accordionName}-content`);
    const chevron = $(`#${accordionName}-chevron`);

    if (content.hasClass('hidden')) {
      content.removeClass('hidden').slideDown(300);
      chevron.removeClass('fa-chevron-down').addClass('fa-chevron-up');
    } else {
      content.slideUp(300, function () {
        content.addClass('hidden');
      });
      chevron.removeClass('fa-chevron-up').addClass('fa-chevron-down');
    }
  }

  loadApplicantDetails() {
    // Get applicant ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const applicantId = urlParams.get('id');

    if (!applicantId || !this.applicantsData[applicantId]) {
      this.loadingManager.showDetailsError();
      return;
    }

    const applicant = this.applicantsData[applicantId];
    this.populateApplicantDetails(applicant);
  }

  populateApplicantDetails(applicant) {
    // Main profile information
    $('#applicantAvatarMain').attr('src', applicant.avatar).attr('alt', applicant.name);
    $('#applicantNameMain').text(applicant.name);
    $('#applicantLocationMain').text(applicant.location);
    $('#applicantDistanceMain').text(applicant.distance);
    $('#applicantAppliedDateMain').text(
      new Date(applicant.appliedDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    );

    // Match scores without >>> symbols
    $('#resumeMatchScore').text(`${applicant.resumeMatch}%`);
    $('#personalityMatchScore').text(`${applicant.personalityMatch}%`);

    // Calculate and display overall score
    const overallScore = Math.round((applicant.resumeMatch + applicant.personalityMatch) / 2);
    $('#overallScore').text(`${overallScore}%`);

    // Animate progress bars
    setTimeout(() => {
      $('#resumeProgressBar').css('width', applicant.resumeMatch + '%');
      $('#personalityProgressBar').css('width', applicant.personalityMatch + '%');
    }, 500);

    // Set application status
    $('#applicationStatus').val(applicant.status);

    // Education description
    const educationText = `The candidate exceeds the typical educational requirements with both a ${applicant.education} in relevant engineering fields, with a strong academic record (High Honours, 95th percentile).`;
    $('#educationDescription').text(educationText);

    // Contact Information
    $('#applicantEmailContact').text(applicant.email);
    $('#applicantPhoneContact').text(applicant.phone || '444-555-6666');
    $('#applicantEducationContact').text(applicant.education);

    // Skills
    this.populateSkills(applicant.skills);

    // Custom Questions
    this.populateCustomQuestions(applicant);

    // Setup video with multiple fallback paths
    this.setupVideo();

    // Update page title
    document.title = `${applicant.name} - Applicant Details - JobMap`;

    // Show details and hide loading
    this.loadingManager.showDetailsContent();
  }

  setupVideo() {
    const video = document.getElementById('applicantVideo');
    if (video) {
      // Multiple video sources to try
      const videoSources = ['./video.mp4', 'video.mp4', 'assets/videos/video.mp4', 'src/video.mp4'];

      let currentSourceIndex = 0;

      const tryNextSource = () => {
        if (currentSourceIndex < videoSources.length) {
          const source = video.querySelector('source');
          if (source) {
            source.src = videoSources[currentSourceIndex];
            video.load();
            console.log(`Trying video source: ${videoSources[currentSourceIndex]}`);
            currentSourceIndex++;
          }
        } else {
          // All sources failed
          $('#videoOverlay').html(`
                        <div class="text-center text-white">
                            <div class="w-16 h-16 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto">
                                <i class="fas fa-video-slash text-2xl"></i>
                            </div>
                            <p class="text-sm font-medium mb-2">Video not available</p>
                            <p class="text-xs opacity-75">Place video.mp4 in project root</p>
                        </div>
                    `);
        }
      };

      // Video event listeners
      video.addEventListener('error', (e) => {
        console.error('Video error for source:', video.querySelector('source')?.src);
        tryNextSource();
      });

      video.addEventListener('loadstart', () => {
        console.log('Video loading started');
      });

      video.addEventListener('canplay', () => {
        console.log('Video ready to play');
        // Video loaded successfully, hide any error messages
        $('#videoOverlay').html(`
                    <div class="text-center text-white transform group-hover:scale-110 transition-transform">
                        <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                            <i class="fas fa-play text-2xl ml-1"></i>
                        </div>
                        <p class="text-sm font-medium">Watch Introduction</p>
                    </div>
                `);
      });

      video.addEventListener('ended', () => {
        $('#videoOverlay').show();
        console.log('Video ended');
      });

      video.addEventListener('play', () => {
        $('#videoOverlay').hide();
      });

      video.addEventListener('pause', () => {
        if (video.currentTime < video.duration) {
          $('#videoOverlay').show();
        }
      });

      // Start with first source
      tryNextSource();
    }
  }

  populateSkills(skills) {
    const skillsContainer = $('#skillsList');
    skillsContainer.empty();

    skills.forEach((skill, index) => {
      setTimeout(() => {
        skillsContainer.append(`
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-sm hover:shadow-md transition-all transform hover:scale-105">
                        ${skill}
                    </span>
                `);
      }, index * 100);
    });
  }

  populateCustomQuestions(applicant) {
    const questions = applicant.questions || {};
    const questionsContainer = $('#customQuestions');
    questionsContainer.empty();

    // Use real application questions if available
    const questionList = [
      {
        question: 'What is your availability to start?',
        answer: questions.availability || 'Available to start immediately'
      },
      {
        question: 'What are your salary expectations?',
        answer: questions.salary || '$85,000 - $95,000'
      },
      {
        question: 'What is your remote work preference?',
        answer: questions.remote || 'Open to hybrid work'
      },
      {
        question: 'What was your biggest professional challenge?',
        answer:
          questions.challenge ||
          'Led a team migration from legacy PHP to modern React/Node.js stack'
      }
    ];

    questionList.forEach((item, index) => {
      questionsContainer.append(`
                <div class="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-sm transition-all">
                    <div class="flex items-start space-x-4">
                        <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                            <span class="text-blue-600 font-bold text-sm">${index + 1}</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="font-semibold text-gray-900 mb-3">${item.question}</h4>
                            <p class="text-gray-700 leading-relaxed">${item.answer}</p>
                        </div>
                    </div>
                </div>
            `);
    });
  }

  playVideo(e) {
    e.preventDefault();
    const video = document.getElementById('applicantVideo');
    const overlay = document.getElementById('videoOverlay');

    if (video && overlay) {
      overlay.style.display = 'none';
      video
        .play()
        .then(() => {
          console.log('Video started playing');
        })
        .catch((error) => {
          console.error('Video play failed:', error);
          // Show error message if video fails to play
          overlay.style.display = 'flex';
          $(overlay).html(`
                    <div class="text-center text-white">
                        <div class="w-12 h-12 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center mb-3 mx-auto">
                            <i class="fas fa-exclamation-triangle text-lg"></i>
                        </div>
                        <p class="text-xs">Cannot play video</p>
                        <p class="text-xs mt-1">File may be missing or corrupted</p>
                    </div>
                `);
        });
    }
  }

  updateStatus(e) {
    const newStatus = $(e.target).val();
    console.log('Status updated to:', newStatus);
    // Here you would save to backend

    // Update visual feedback
    const statusText = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
    // You could add a toast notification here
  }

  // Additional utility methods
  getApplicantData() {
    const urlParams = new URLSearchParams(window.location.search);
    const applicantId = urlParams.get('id');
    return this.applicantsData[applicantId] || null;
  }

  // Navigate to next/previous applicant
  navigateToApplicant(direction) {
    const currentId = parseInt(new URLSearchParams(window.location.search).get('id'));
    const allIds = Object.keys(this.applicantsData)
      .map((id) => parseInt(id))
      .sort((a, b) => a - b);
    const currentIndex = allIds.indexOf(currentId);

    let nextIndex;
    if (direction === 'next') {
      nextIndex = currentIndex < allIds.length - 1 ? currentIndex + 1 : 0;
    } else {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : allIds.length - 1;
    }

    const nextId = allIds[nextIndex];
    window.location.href = `applicant-details.html?id=${nextId}`;
  }

  // Add keyboard navigation
  bindKeyboardEvents() {
    $(document).on('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.navigateToApplicant('prev');
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.navigateToApplicant('next');
          break;
        case 'Escape':
          e.preventDefault();
          window.history.back();
          break;
        case ' ': // Spacebar for play/pause
          e.preventDefault();
          this.toggleVideo();
          break;
      }
    });
  }

  toggleVideo() {
    const video = document.getElementById('applicantVideo');
    if (video) {
      if (video.paused) {
        this.playVideo({ preventDefault: () => {} });
      } else {
        video.pause();
        $('#videoOverlay').show();
      }
    }
  }

  // Initialize enhanced features
  initEnhancedFeatures() {
    this.bindKeyboardEvents();

    // Add navigation buttons if desired
    this.addNavigationButtons();
  }

  addNavigationButtons() {
    const navigationHtml = `
            <div class="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-2 z-40">
                <button onclick="applicantDetailsManager.navigateToApplicant('prev')" 
                        class="bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors">
                    <i class="fas fa-chevron-up text-gray-600"></i>
                </button>
                <button onclick="applicantDetailsManager.navigateToApplicant('next')" 
                        class="bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors">
                    <i class="fas fa-chevron-down text-gray-600"></i>
                </button>
            </div>
        `;

    $('body').append(navigationHtml);

    // Make instance globally available for onclick handlers
    window.applicantDetailsManager = this;
  }
}
