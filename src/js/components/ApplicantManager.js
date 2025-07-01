import { APPLICANTS_DATA } from "../data/applicants";
import { LoadingManager } from "../utils/LoadingManager";
import { PaginationManager } from "../utils/PaginationManager";
import { FilterManager } from "../utils/FilterManager";

export class ApplicantManager {
  constructor() {
    console.log("ApplicantManager constructor called");
    console.log("APPLICANTS_DATA in constructor:", APPLICANTS_DATA);

    // Fallback data jika import gagal
    const fallbackData = [
      {
        id: 1,
        name: "Andy Diaz",
        location: "San Francisco, CA",
        distance: "2.1 mi",
        resumeMatch: 85,
        personalityMatch: 78,
        appliedDate: "2024-06-29",
        status: "new",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: 2,
        name: "Sarah Chen",
        location: "New York, NY",
        distance: "1.8 mi",
        resumeMatch: 92,
        personalityMatch: 85,
        appliedDate: "2024-06-28",
        status: "reviewed",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: 3,
        name: "Marcus Johnson",
        location: "Chicago, IL",
        distance: "15.3 mi",
        resumeMatch: 76,
        personalityMatch: 88,
        appliedDate: "2024-06-27",
        status: "interviewing",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: 4,
        name: "Emily Rodriguez",
        location: "Austin, TX",
        distance: "8.7 mi",
        resumeMatch: 89,
        personalityMatch: 72,
        appliedDate: "2024-06-26",
        status: "new",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
    ];

    this.applicants =
      APPLICANTS_DATA && APPLICANTS_DATA.length > 0
        ? APPLICANTS_DATA
        : fallbackData;
    this.filteredApplicants = [...this.applicants];
    this.currentPage = 1;
    this.itemsPerPage = 5;

    console.log("Final applicants loaded:", this.applicants.length);

    this.loadingManager = new LoadingManager();
    this.paginationManager = new PaginationManager(this);
    this.filterManager = new FilterManager(this);

    this.init();
  }

  init() {
    console.log("ApplicantManager init called");
    this.bindEvents();

    // Check if we have data
    if (this.applicants.length === 0) {
      console.error("No applicants data found!");
      $("#applicantList").html(`
                <div class="text-center py-12">
                    <div class="text-red-500 text-6xl mb-4">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">No Data Found</h3>
                    <p class="text-gray-600">Unable to load applicant data. Check console for errors.</p>
                </div>
            `);
      return;
    }

    this.loadingManager.showInitialLoading();

    // Simulate loading delay for better UX
    setTimeout(() => {
      this.loadingManager.hideLoading();
      this.renderApplicants();
      this.paginationManager.render();
    }, 1500);
  }

  bindEvents() {
    // Filter events
    this.filterManager.bindEvents();

    // Pagination events
    this.paginationManager.bindEvents();

    // Card clicks
    $(document).on("click", ".applicant-card", (e) => this.handleCardClick(e));
  }

  getCurrentPageData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredApplicants.slice(startIndex, endIndex);
  }

  getTotalPages() {
    return Math.ceil(this.filteredApplicants.length / this.itemsPerPage);
  }

  renderApplicants() {
    const container = $("#applicantList");
    const currentData = this.getCurrentPageData();

    container.empty();

    if (this.filteredApplicants.length === 0) {
      this.renderEmptyState(container);
      return;
    }

    currentData.forEach((applicant, index) => {
      const card = this.createApplicantCard(applicant, index);
      container.append(card);
    });

    this.updateApplicantCount();
  }

  renderEmptyState(container) {
    container.append(`
            <div class="text-center py-12">
                <div class="text-gray-400 text-6xl mb-4">
                    <i class="fas fa-search"></i>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">No applicants found</h3>
                <p class="text-gray-600">Try adjusting your filters to see more results.</p>
            </div>
        `);
    $("#applicantCount").text("0 applications received");
  }

  createApplicantCard(applicant, index) {
    const statusColors = {
      new: "bg-green-100 text-green-800",
      reviewed: "bg-blue-100 text-blue-800",
      interviewing: "bg-yellow-100 text-yellow-800",
    };

    return `
            <div class="applicant-card card-fade-in bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 cursor-pointer" 
                 data-id="${applicant.id}" 
                 style="animation-delay: ${index * 0.1}s">
                <div class="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <!-- Left: Avatar & Video -->
                    <div class="flex items-center space-x-4">
                        <div class="relative">
                            <img src="${applicant.avatar}" alt="${applicant.name}" class="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover">
                            <button class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full text-white hover:bg-opacity-60 transition-all">
                                <i class="fas fa-play text-lg"></i>
                            </button>
                        </div>
                        <div class="sm:hidden">
                            <h3 class="font-semibold text-gray-900 text-lg">${applicant.name}</h3>
                            <p class="text-gray-600 text-sm">${applicant.location}</p>
                        </div>
                    </div>

                    <!-- Middle: Info (Desktop) -->
                    <div class="hidden sm:block flex-1">
                        <h3 class="font-semibold text-gray-900 text-lg mb-1">${applicant.name}</h3>
                        <p class="text-gray-600 text-sm mb-2">${applicant.location} • ${applicant.distance}</p>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[applicant.status]}">
                            ${applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                        </span>
                    </div>

                    <!-- Right: Scores & Date -->
                    <div class="space-y-3 sm:w-48">
                        <!-- Resume Match -->
                        <div>
                            <div class="flex justify-between items-center mb-1">
                                <span class="text-xs font-medium text-gray-700">Resume Match</span>
                                <span class="text-xs font-bold text-blue-600">${applicant.resumeMatch}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="match-bar h-2 rounded-full" style="width: ${applicant.resumeMatch}%"></div>
                            </div>
                        </div>

                        <!-- Personality Match -->
                        <div>
                            <div class="flex justify-between items-center mb-1">
                                <span class="text-xs font-medium text-gray-700">Personality Match</span>
                                <span class="text-xs font-bold text-purple-600">${applicant.personalityMatch}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style="width: ${applicant.personalityMatch}%"></div>
                            </div>
                        </div>

                        <!-- Date & Status (Mobile) -->
                        <div class="sm:hidden flex justify-between items-center pt-2">
                            <span class="text-xs text-gray-500">Applied ${new Date(applicant.appliedDate).toLocaleDateString()}</span>
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[applicant.status]}">
                                ${applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                            </span>
                        </div>

                        <!-- Date (Desktop) -->
                        <div class="hidden sm:block text-xs text-gray-500 text-right">
                            Applied ${new Date(applicant.appliedDate).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  updateApplicantCount() {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(
      this.currentPage * this.itemsPerPage,
      this.filteredApplicants.length,
    );
    $("#applicantCount").text(
      `Showing ${start}-${end} of ${this.filteredApplicants.length} applications`,
    );

    // Update pagination info
    $("#paginationInfo").text(
      `Page ${this.currentPage} of ${this.getTotalPages()}`,
    );
  }

  handleCardClick(e) {
    const id = $(e.currentTarget).data("id");
    this.viewApplicantDetails(id);
  }

  viewApplicantDetails(id) {
    // Navigate to details page with ID parameter
    window.location.href = `applicant-details.html?id=${id}`;
  }

  // Method called by FilterManager
  applyFiltersAndSort(filters, sortBy) {
    this.loadingManager.showLoadingOverlay();

    // Simulate API delay
    setTimeout(() => {
      let result = [...this.applicants];

      // Apply location filter
      if (filters.location) {
        result = result.filter((applicant) =>
          applicant.location
            .toLowerCase()
            .includes(filters.location.replace("-", " ")),
        );
      }

      // Apply resume match filter
      result = result.filter(
        (applicant) => applicant.resumeMatch >= filters.resumeMin,
      );

      // Apply personality match filter
      result = result.filter(
        (applicant) => applicant.personalityMatch >= filters.personalityMin,
      );

      // Apply sorting
      switch (sortBy) {
        case "date":
          result.sort(
            (a, b) => new Date(b.appliedDate) - new Date(a.appliedDate),
          );
          break;
        case "distance":
          result.sort(
            (a, b) => parseFloat(a.distance) - parseFloat(b.distance),
          );
          break;
        case "resume":
          result.sort((a, b) => b.resumeMatch - a.resumeMatch);
          break;
        case "personality":
          result.sort((a, b) => b.personalityMatch - a.personalityMatch);
          break;
      }

      this.filteredApplicants = result;
      this.currentPage = 1; // Reset to first page
      this.loadingManager.hideLoadingOverlay();
      this.renderApplicants();
      this.paginationManager.render();
    }, 800);
  }

  // Method called by PaginationManager
  changePage(page) {
    if (
      page &&
      page !== this.currentPage &&
      page >= 1 &&
      page <= this.getTotalPages()
    ) {
      this.currentPage = page;
      this.loadingManager.showSkeletonLoading(this.itemsPerPage);

      // Simulate loading delay
      setTimeout(() => {
        this.renderApplicants();
        this.paginationManager.render();

        // Scroll to top of list
        $("html, body").animate(
          {
            scrollTop: $("#applicantList").offset().top - 100,
          },
          300,
        );
      }, 500);
    }
  }

  // Method called by PaginationManager
  changeItemsPerPage(newItemsPerPage) {
    this.itemsPerPage = newItemsPerPage;
    this.currentPage = 1; // Reset to first page
    this.loadingManager.showSkeletonLoading(newItemsPerPage);

    setTimeout(() => {
      this.renderApplicants();
      this.paginationManager.render();
    }, 300);
  }
}
