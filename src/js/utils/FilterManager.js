export class FilterManager {
  constructor(applicantManager) {
    this.manager = applicantManager;
    this.currentFilters = {
      location: "",
      resumeMin: 0,
      personalityMin: 0,
    };
    this.currentSort = "date";
  }

  bindEvents() {
    // Filter button
    $("#filterBtn").click(() => this.openFilter());

    // Close filter
    $("#closeFilter").click((e) => this.closeFilter(e));
    $("#filterOverlay").click((e) => this.closeFilter(e));

    // Range sliders
    $("#resumeRange").on("input", (e) =>
      this.updateRangeValue("resume", e.target.value)
    );
    $("#personalityRange").on("input", (e) =>
      this.updateRangeValue("personality", e.target.value)
    );

    // Filter actions
    $("#applyFilters").click(() => this.applyFilters());
    $("#clearFilters").click(() => this.clearFilters());

    // Sort and location changes
    $("#locationFilter").change(() => this.handleQuickFilter());
    $('input[name="sort"]').change(() => this.handleQuickFilter());
  }

  openFilter() {
    $("#filterOverlay").removeClass("hidden");
    setTimeout(() => $("#filterSidebar").addClass("open"), 10);
  }

  closeFilter(e) {
    if (e.target === e.currentTarget) {
      $("#filterSidebar").removeClass("open");
      setTimeout(() => $("#filterOverlay").addClass("hidden"), 300);
    }
  }

  updateRangeValue(type, value) {
    $(`#${type}Value`).text(value + "%");
  }

  handleQuickFilter() {
    // Update filters from form
    this.updateCurrentFilters();

    // Apply filters immediately for quick filters (location, sort)
    this.manager.applyFiltersAndSort(this.currentFilters, this.currentSort);
  }

  applyFilters() {
    // Update filters from form
    this.updateCurrentFilters();

    // Apply filters
    this.manager.applyFiltersAndSort(this.currentFilters, this.currentSort);

    // Close filter sidebar
    this.closeFilter({
      target: $("#filterSidebar")[0],
      currentTarget: $("#filterSidebar")[0],
    });
  }

  updateCurrentFilters() {
    this.currentFilters = {
      location: $("#locationFilter").val(),
      resumeMin: parseInt($("#resumeRange").val()),
      personalityMin: parseInt($("#personalityRange").val()),
    };

    this.currentSort = $('input[name="sort"]:checked').val();
  }

  clearFilters() {
    // Reset form elements
    $("#locationFilter").val("");
    $("#resumeRange").val(0);
    $("#personalityRange").val(0);
    $("#resumeValue").text("0%");
    $("#personalityValue").text("0%");
    $('input[name="sort"][value="date"]').prop("checked", true);

    // Reset internal state
    this.currentFilters = {
      location: "",
      resumeMin: 0,
      personalityMin: 0,
    };
    this.currentSort = "date";

    // Apply cleared filters
    this.manager.applyFiltersAndSort(this.currentFilters, this.currentSort);
  }

  // Get current filter state
  getCurrentFilters() {
    return {
      filters: { ...this.currentFilters },
      sort: this.currentSort,
    };
  }

  // Set filters programmatically
  setFilters(filters, sort = "date") {
    // Update form elements
    $("#locationFilter").val(filters.location || "");
    $("#resumeRange").val(filters.resumeMin || 0);
    $("#personalityRange").val(filters.personalityMin || 0);
    $("#resumeValue").text((filters.resumeMin || 0) + "%");
    $("#personalityValue").text((filters.personalityMin || 0) + "%");
    $(`input[name="sort"][value="${sort}"]`).prop("checked", true);

    // Update internal state
    this.currentFilters = {
      location: filters.location || "",
      resumeMin: filters.resumeMin || 0,
      personalityMin: filters.personalityMin || 0,
    };
    this.currentSort = sort;

    // Apply filters
    this.manager.applyFiltersAndSort(this.currentFilters, this.currentSort);
  }

  // Check if any filters are active
  hasActiveFilters() {
    return (
      this.currentFilters.location !== "" ||
      this.currentFilters.resumeMin > 0 ||
      this.currentFilters.personalityMin > 0 ||
      this.currentSort !== "date"
    );
  }

  // Get filter summary for display
  getFilterSummary() {
    const summary = [];

    if (this.currentFilters.location) {
      const locationText = this.currentFilters.location
        .replace("-", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      summary.push(`Location: ${locationText}`);
    }

    if (this.currentFilters.resumeMin > 0) {
      summary.push(`Resume Match: ≥${this.currentFilters.resumeMin}%`);
    }

    if (this.currentFilters.personalityMin > 0) {
      summary.push(
        `Personality Match: ≥${this.currentFilters.personalityMin}%`
      );
    }

    if (this.currentSort !== "date") {
      const sortLabels = {
        distance: "Distance",
        resume: "Resume Match",
        personality: "Personality Match",
      };
      summary.push(`Sorted by: ${sortLabels[this.currentSort]}`);
    }

    return summary;
  }

  // Show/hide filter indicator
  updateFilterIndicator() {
    const indicator = $("#filterIndicator");

    if (this.hasActiveFilters()) {
      if (indicator.length === 0) {
        $("#filterBtn").append(
          '<span id="filterIndicator" class="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full"></span>'
        );
      }
    } else {
      indicator.remove();
    }
  }

  // Preset filter combinations
  applyPreset(presetName) {
    const presets = {
      highMatch: {
        filters: { location: "", resumeMin: 80, personalityMin: 80 },
        sort: "resume",
      },
      recent: {
        filters: { location: "", resumeMin: 0, personalityMin: 0 },
        sort: "date",
      },
      nearby: {
        filters: { location: "", resumeMin: 0, personalityMin: 0 },
        sort: "distance",
      },
      newApplicants: {
        filters: { location: "", resumeMin: 70, personalityMin: 0 },
        sort: "date",
      },
    };

    const preset = presets[presetName];
    if (preset) {
      this.setFilters(preset.filters, preset.sort);
    }
  }

  // Save current filters to localStorage
  saveFilters() {
    const filterState = {
      filters: this.currentFilters,
      sort: this.currentSort,
    };
    localStorage.setItem("applicantFilters", JSON.stringify(filterState));
  }

  // Load filters from localStorage
  loadSavedFilters() {
    const saved = localStorage.getItem("applicantFilters");
    if (saved) {
      try {
        const filterState = JSON.parse(saved);
        this.setFilters(filterState.filters, filterState.sort);
      } catch (e) {
        console.warn("Failed to load saved filters:", e);
      }
    }
  }

  // Clear saved filters
  clearSavedFilters() {
    localStorage.removeItem("applicantFilters");
  }
}
