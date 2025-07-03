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
    this.initEnhancedFeatures();

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
      content.removeClass('hidden');
      chevron.removeClass('fa-chevron-down').addClass('fa-chevron-up');
    } else {
      content.addClass('hidden');
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
    // Main header information
    $('#applicantAvatarMain').attr('src', applicant.avatar).attr('alt', applicant.name);
    $('#applicantNameMain').text(applicant.name);
    $('#applicantLocationMain').append(applicant.location);
    $('#applicantDistanceMain').append(applicant.distance);
    $('#applicantAppliedDateMain').append(
      new Date(applicant.appliedDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    );

    // Match scores
    $('#resumeMatchScore').text(`${applicant.resumeMatch}%`);
    $('#personalityMatchScore').text(`${applicant.personalityMatch}%`);

    // Calculate and display overall score
    const overallScore = Math.round((applicant.resumeMatch + applicant.personalityMatch) / 2);
    $('#overallScore').text(`${overallScore}%`);

    // Animate progress bars and circle
    setTimeout(() => {
      $('#resumeProgressBar').css('width', applicant.resumeMatch + '%');
      $('#personalityProgressBar').css('width', applicant.personalityMatch + '%');

      // Animate circular progress
      const circle = document.getElementById('overallProgressCircle');
      if (circle) {
        const circumference = 2 * Math.PI * 56; // radius = 56
        const offset = circumference - (overallScore / 100) * circumference;
        circle.style.strokeDashoffset = offset;
      }
    }, 500);

    // Set application status
    $('#applicationStatus').val(applicant.status || 'new');

    // Education description
    const educationText = `The candidate has a ${applicant.education} with strong academic performance and relevant coursework in software engineering and computer science.`;
    $('#educationDescription').text(educationText);

    // Contact Information
    $('#applicantEmailContact').text(applicant.email);
    $('#applicantPhoneContact').text(applicant.phone || '+1 (555) 123-4567');
    $('#applicantLocationContact').text(applicant.location);

    // Education & Experience
    $('#applicantEducationDetail').text(applicant.education);
    $('#applicantExperienceDetail').text(`${applicant.experience} of professional experience`);

    // Skills
    this.populateSkills(applicant.skills);

    // Custom Questions
    this.populateCustomQuestions(applicant);

    // Setup video
    this.setupVideo();

    // Update page title
    document.title = `${applicant.name} - Applicant Details - JobBoard`;

    // Show details and hide loading
    this.loadingManager.showDetailsContent();
  }

  setupVideo() {
    const video = document.getElementById('applicantVideo');
    const overlay = document.getElementById('videoOverlay');

    if (!video) return;

    // Try multiple video sources - prioritizing the actual location
    const videoSources = [
      'src/assets/videos/video.mp4', // Primary location
      '../src/assets/videos/video.mp4', // If accessed from dist folder
      './assets/videos/video.mp4', // Relative from current location
      'assets/videos/video.mp4', // Direct assets path
      '../assets/videos/video.mp4', // One level up
      '../../assets/videos/video.mp4', // Two levels up
      '/src/assets/videos/video.mp4', // Absolute path
      'video.mp4', // Fallback to root
      './video.mp4' // Current directory
    ];

    let sourceIndex = 0;
    let videoLoaded = false;

    const tryNextSource = () => {
      if (sourceIndex >= videoSources.length) {
        // All sources failed, show error state
        overlay.innerHTML = `
          <div class="text-center text-white">
            <div class="w-20 h-20 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto">
              <i class="fas fa-video-slash text-3xl"></i>
            </div>
            <p class="text-lg font-medium">Video Unavailable</p>
            <p class="text-sm opacity-75 mt-2">Sample video not found</p>
            <p class="text-xs opacity-50 mt-4">Place video.mp4 in the project root directory</p>
          </div>
        `;
        return;
      }

      const source = videoSources[sourceIndex];
      console.log(`Trying video source: ${source}`);

      // Update video source
      video.src = source;
      video.load();
      sourceIndex++;
    };

    // Video event handlers
    video.addEventListener('loadeddata', () => {
      console.log('Video loaded successfully');
      videoLoaded = true;

      // Update overlay for successful load
      overlay.innerHTML = `
        <div class="text-center text-white transform group-hover:scale-110 transition-transform">
          <div class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto shadow-2xl group-hover:bg-white/30">
            <i class="fas fa-play text-3xl ml-1"></i>
          </div>
          <p class="text-lg font-medium">Watch Introduction</p>
          <p class="text-sm opacity-75">Get to know the candidate</p>
        </div>
      `;
    });

    video.addEventListener('error', (e) => {
      console.error(`Video error for source: ${video.src}`, e);
      if (!videoLoaded) {
        tryNextSource();
      }
    });

    video.addEventListener('play', () => {
      overlay.style.display = 'none';
    });

    video.addEventListener('pause', () => {
      if (video.currentTime > 0 && video.currentTime < video.duration) {
        overlay.style.display = 'flex';
      }
    });

    video.addEventListener('ended', () => {
      overlay.style.display = 'flex';
    });

    // Click overlay to play
    overlay.addEventListener('click', (e) => {
      e.preventDefault();
      if (videoLoaded) {
        video.play().catch((err) => {
          console.error('Play error:', err);
        });
      }
    });

    // Start trying sources
    tryNextSource();
  }

  populateSkills(skills) {
    const skillsContainer = $('#skillsList');
    skillsContainer.empty();

    const skillColors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600'
    ];

    skills.forEach((skill, index) => {
      const colorClass = skillColors[index % skillColors.length];
      setTimeout(() => {
        skillsContainer.append(`
          <span class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r ${colorClass} text-white shadow-sm hover:shadow-md transition-all transform hover:scale-105 cursor-default">
            ${skill}
          </span>
        `);
      }, index * 50);
    });
  }

  populateCustomQuestions(applicant) {
    const questions = applicant.questions || {};
    const questionsContainer = $('#customQuestions');
    questionsContainer.empty();

    const questionList = [
      {
        question: 'What is your availability to start?',
        answer: questions.availability || 'Available to start immediately',
        icon: 'fa-calendar-check',
        color: 'blue'
      },
      {
        question: 'What are your salary expectations?',
        answer: questions.salary || '$85,000 - $95,000',
        icon: 'fa-dollar-sign',
        color: 'green'
      },
      {
        question: 'What is your remote work preference?',
        answer: questions.remote || 'Open to hybrid work',
        icon: 'fa-laptop-house',
        color: 'purple'
      },
      {
        question: 'What was your biggest professional challenge?',
        answer:
          questions.challenge ||
          'Led a team migration from legacy PHP to modern React/Node.js stack',
        icon: 'fa-trophy',
        color: 'orange'
      }
    ];

    questionList.forEach((item, index) => {
      const bgColor = {
        blue: 'bg-blue-50',
        green: 'bg-green-50',
        purple: 'bg-purple-50',
        orange: 'bg-orange-50'
      }[item.color];

      const iconColor = {
        blue: 'text-blue-600',
        green: 'text-green-600',
        purple: 'text-purple-600',
        orange: 'text-orange-600'
      }[item.color];

      questionsContainer.append(`
        <div class="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
          <div class="flex items-start space-x-3">
            <div class="w-8 h-8 ${bgColor} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <i class="fas ${item.icon} ${iconColor} text-sm"></i>
            </div>
            <div class="flex-1">
              <h4 class="font-medium text-gray-900 text-sm mb-1">${item.question}</h4>
              <p class="text-gray-700 text-sm leading-relaxed">${item.answer}</p>
            </div>
          </div>
        </div>
      `);
    });
  }

  playVideo(e) {
    e.preventDefault();
    const video = document.getElementById('applicantVideo');

    if (video) {
      video.play().catch((error) => {
        console.error('Video play failed:', error);
      });
    }
  }

  updateStatus(e) {
    const newStatus = $(e.target).val();
    console.log('Status updated to:', newStatus);

    // Show toast notification
    this.showToast(`Status updated to: ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`);
  }

  showToast(message) {
    const toast = $(`
      <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 opacity-0 transition-opacity">
        ${message}
      </div>
    `);

    $('body').append(toast);

    setTimeout(() => toast.addClass('opacity-100'), 100);
    setTimeout(() => {
      toast.removeClass('opacity-100');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
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
          if (!$(e.target).is('input, textarea, select')) {
            e.preventDefault();
            this.navigateToApplicant('prev');
          }
          break;
        case 'ArrowRight':
          if (!$(e.target).is('input, textarea, select')) {
            e.preventDefault();
            this.navigateToApplicant('next');
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
    window.applicantDetailsManager = this;
  }
}
