export class LoadingManager {
  constructor() {
    this.isLoading = false;
    console.log("LoadingManager initialized");
  }

  showInitialLoading() {
    console.log("Showing initial loading...");
    const container = $("#applicantList");
    container.html(`
          <div class="text-center py-12">
              <div class="loading-spinner mx-auto mb-4"></div>
              <p class="text-gray-600">Loading applicants...</p>
              <p class="text-xs text-gray-400 mt-2">Debug: LoadingManager.showInitialLoading called</p>
          </div>
      `);
    $("#applicantCount").text("Loading...");
    this.isLoading = true;
  }

  showSkeletonLoading(itemCount = 5) {
    const container = $("#applicantList");
    container.empty();

    // Create skeleton cards
    for (let i = 0; i < itemCount; i++) {
      const skeletonCard = `
              <div class="skeleton-card">
                  <div class="flex items-center space-x-6">
                      <div class="skeleton-avatar"></div>
                      <div class="flex-1 space-y-2">
                          <div class="skeleton-text medium"></div>
                          <div class="skeleton-text short"></div>
                          <div class="skeleton-text long"></div>
                      </div>
                      <div class="w-48 space-y-2">
                          <div class="skeleton-text medium"></div>
                          <div class="skeleton-text short"></div>
                      </div>
                  </div>
              </div>
          `;
      container.append(skeletonCard);
    }
    this.isLoading = true;
  }

  showLoadingOverlay() {
    if (!$("#loadingOverlay").length) {
      $("body").append(`
              <div id="loadingOverlay" class="fixed inset-0 loading-overlay flex items-center justify-center">
                  <div class="bg-white rounded-lg p-6 shadow-lg text-center">
                      <div class="loading-spinner mx-auto mb-4"></div>
                      <p class="text-gray-600">Applying filters...</p>
                  </div>
              </div>
          `);
    }
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }

  hideLoadingOverlay() {
    $("#loadingOverlay").remove();
    this.isLoading = false;
  }

  // Show loading state for details page
  showDetailsLoading() {
    $("#loadingState").removeClass("hidden");
    $("#applicantDetails").addClass("hidden");
    $("#errorState").addClass("hidden");
    this.isLoading = true;
  }

  hideDetailsLoading() {
    $("#loadingState").addClass("hidden");
    this.isLoading = false;
  }

  showDetailsError() {
    $("#loadingState").addClass("hidden");
    $("#applicantDetails").addClass("hidden");
    $("#errorState").removeClass("hidden");
    this.isLoading = false;
  }

  showDetailsContent() {
    $("#loadingState").addClass("hidden");
    $("#errorState").addClass("hidden");
    $("#applicantDetails").removeClass("hidden");
    this.isLoading = false;
  }

  // Generic loading state for any element
  showElementLoading(element, message = "Loading...") {
    $(element).html(`
          <div class="text-center py-8">
              <div class="loading-spinner mx-auto mb-4"></div>
              <p class="text-gray-600">${message}</p>
          </div>
      `);
  }

  // Fade transition helper
  fadeTransition(element, newContent, duration = 300) {
    $(element).fadeOut(duration / 2, function () {
      $(this)
        .html(newContent)
        .fadeIn(duration / 2);
    });
  }
}
