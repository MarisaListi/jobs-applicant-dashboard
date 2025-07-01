export class PaginationManager {
  constructor(applicantManager) {
    this.manager = applicantManager;
    this.maxVisiblePages = 5;
  }

  bindEvents() {
    // Pagination clicks
    $(document).on("click", ".pagination-item", (e) =>
      this.handlePaginationClick(e)
    );

    // Items per page change
    $("#itemsPerPage").change((e) => this.handleItemsPerPageChange(e));
  }

  handlePaginationClick(e) {
    e.preventDefault();
    const page = parseInt($(e.currentTarget).data("page"));

    if (page && !$(e.currentTarget).hasClass("disabled")) {
      this.manager.changePage(page);
    }
  }

  handleItemsPerPageChange(e) {
    const newItemsPerPage = parseInt($(e.target).val());
    this.manager.changeItemsPerPage(newItemsPerPage);
  }

  render() {
    const totalPages = this.manager.getTotalPages();
    const container = $("#paginationContainer");

    if (totalPages <= 1) {
      container.hide();
      return;
    }

    container.show();
    const paginationEl = $("#pagination");
    paginationEl.empty();

    // Previous button
    const prevDisabled = this.manager.currentPage === 1 ? "disabled" : "";
    paginationEl.append(`
            <button class="pagination-item ${prevDisabled}" data-page="${this.manager.currentPage - 1}">
                <i class="fas fa-chevron-left"></i>
            </button>
        `);

    // Page numbers with ellipsis logic
    this.renderPageNumbers(paginationEl, totalPages);

    // Next button
    const nextDisabled =
      this.manager.currentPage === totalPages ? "disabled" : "";
    paginationEl.append(`
            <button class="pagination-item ${nextDisabled}" data-page="${this.manager.currentPage + 1}">
                <i class="fas fa-chevron-right"></i>
            </button>
        `);

    // Update pagination info
    this.updatePaginationInfo();
  }

  renderPageNumbers(paginationEl, totalPages) {
    const currentPage = this.manager.currentPage;
    let startPage = Math.max(
      1,
      currentPage - Math.floor(this.maxVisiblePages / 2)
    );
    let endPage = Math.min(totalPages, startPage + this.maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage < this.maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - this.maxVisiblePages + 1);
    }

    // First page and ellipsis
    if (startPage > 1) {
      paginationEl.append(
        `<button class="pagination-item" data-page="1">1</button>`
      );
      if (startPage > 2) {
        paginationEl.append(`<span class="pagination-ellipsis">...</span>`);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      const active = i === currentPage ? "active" : "";
      paginationEl.append(
        `<button class="pagination-item ${active}" data-page="${i}">${i}</button>`
      );
    }

    // Last page and ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationEl.append(`<span class="pagination-ellipsis">...</span>`);
      }
      paginationEl.append(
        `<button class="pagination-item" data-page="${totalPages}">${totalPages}</button>`
      );
    }
  }

  updatePaginationInfo() {
    const start =
      (this.manager.currentPage - 1) * this.manager.itemsPerPage + 1;
    const end = Math.min(
      this.manager.currentPage * this.manager.itemsPerPage,
      this.manager.filteredApplicants.length
    );
    const total = this.manager.filteredApplicants.length;

    $("#paginationInfo").text(
      `Page ${this.manager.currentPage} of ${this.manager.getTotalPages()}`
    );

    // Also update the main count
    if (total > 0) {
      $("#applicantCount").text(
        `Showing ${start}-${end} of ${total} applications`
      );
    } else {
      $("#applicantCount").text("0 applications received");
    }
  }

  // Get pagination summary
  getPaginationSummary() {
    const currentPage = this.manager.currentPage;
    const totalPages = this.manager.getTotalPages();
    const itemsPerPage = this.manager.itemsPerPage;
    const totalItems = this.manager.filteredApplicants.length;

    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);

    return {
      currentPage,
      totalPages,
      itemsPerPage,
      totalItems,
      start,
      end,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    };
  }

  // Navigate to specific page
  goToPage(page) {
    if (page >= 1 && page <= this.manager.getTotalPages()) {
      this.manager.changePage(page);
    }
  }

  // Navigate to first page
  goToFirst() {
    this.goToPage(1);
  }

  // Navigate to last page
  goToLast() {
    this.goToPage(this.manager.getTotalPages());
  }

  // Navigate to next page
  goToNext() {
    if (this.manager.currentPage < this.manager.getTotalPages()) {
      this.goToPage(this.manager.currentPage + 1);
    }
  }

  // Navigate to previous page
  goToPrev() {
    if (this.manager.currentPage > 1) {
      this.goToPage(this.manager.currentPage - 1);
    }
  }

  // Reset pagination
  reset() {
    this.manager.currentPage = 1;
    this.render();
  }

  // Hide pagination
  hide() {
    $("#paginationContainer").hide();
  }

  // Show pagination
  show() {
    $("#paginationContainer").show();
  }
}
