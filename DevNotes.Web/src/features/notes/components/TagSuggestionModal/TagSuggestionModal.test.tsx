import { render, screen, fireEvent, within } from "@testing-library/react";
import TagSuggestionModal from "./TagSuggestionModal";

describe("TagSuggestionModal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    suggestedTags: ["tag1", "tag2"],
    allTags: ["tag1", "tag2", "tag3", "tag4"],
    selectedTags: ["tag2"],
    onAddSelected: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not render when isOpen is false", () => {
    const { queryByText } = render(
      <TagSuggestionModal {...defaultProps} isOpen={false} />
    );
    expect(queryByText("Suggested Tags")).toBeNull();
  });

  it("renders modal with suggested and selected tags", () => {
    render(<TagSuggestionModal {...defaultProps} />);
    expect(screen.getByText("Suggested Tags")).toBeInTheDocument();

    // Buttons for suggested + selected tags
    expect(screen.getByText("tag1")).toBeInTheDocument();
    expect(screen.getByText("tag2")).toBeInTheDocument();
  });

  it("preloads selectedTags into internalSelectedTags when opened", () => {
    render(<TagSuggestionModal {...defaultProps} />);
    // Tag2 is selected initially (has amber background class)
    const selectedTagButton = screen.getByText("tag2");
    expect(selectedTagButton).toHaveClass("bg-amber-500");
  });

  it("toggles tag selection when clicking tag buttons", () => {
    render(<TagSuggestionModal {...defaultProps} />);

    const tag1Btn = screen.getByText("tag1");
    // Initially not selected
    expect(tag1Btn).not.toHaveClass("bg-amber-500");

    fireEvent.click(tag1Btn);
    // Now selected
    expect(tag1Btn).toHaveClass("bg-amber-500");

    fireEvent.click(tag1Btn);
    // Deselected again
    expect(tag1Btn).not.toHaveClass("bg-amber-500");
  });

  it("search input filters dropdown tags and allows selection", () => {
    render(<TagSuggestionModal {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search or select tags...");

    // Focus input to show dropdown
    fireEvent.focus(input);

    // Type search term to filter dropdown
    fireEvent.change(input, { target: { value: "3" } });

    // Get dropdown list container (the <ul>)
    const dropdown = screen.getByRole("list");

    // Dropdown should show "tag3" only (matches search, not selected)
    expect(within(dropdown).getByText("tag3")).toBeInTheDocument();

    // Dropdown should NOT show "tag1" (already selected, so excluded from dropdown)
    expect(within(dropdown).queryByText("tag1")).toBeNull();

    // Tag buttons container (outside dropdown) shows tag1 (selected) and tag2 (suggested)
    expect(screen.getByText("tag1")).toBeInTheDocument();

    // Click tag3 in dropdown to select it
    fireEvent.click(screen.getByText("tag3"));

    // Dropdown should close (no <ul> with role list)
    expect(screen.queryByRole("list")).toBeNull();

    // Tag3 should now appear selected in the tag buttons list (with selected styles)
    const tag3Button = screen.getByText("tag3");
    expect(tag3Button).toBeInTheDocument();
    expect(tag3Button).toHaveClass("bg-amber-500"); // selected style
  });

  it("clicking outside closes dropdown", () => {
    render(<TagSuggestionModal {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search or select tags...");

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "3" } });

    // Dropdown visible
    expect(screen.getByText("tag3")).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(document.body);

    // Dropdown should be closed
    expect(screen.queryByText("tag3")).toBeNull();
  });

  it("Add Selected button calls onAddSelected with new tags and closes modal", () => {
    render(<TagSuggestionModal {...defaultProps} />);
    // Select tag1 (not selected initially)
    const tag1Btn = screen.getByText("tag1");
    fireEvent.click(tag1Btn);

    const addButton = screen.getByText("Add Selected");
    fireEvent.click(addButton);

    expect(defaultProps.onAddSelected).toHaveBeenCalledWith(["tag1"]);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("Add Selected button is disabled if no new tags selected", () => {
    render(<TagSuggestionModal {...defaultProps} />);
    // tag2 is already selected, no new tags selected
    const addButton = screen.getByText("Add Selected");
    expect(addButton).toBeDisabled();
  });

  it("Cancel button calls onClose", () => {
    render(<TagSuggestionModal {...defaultProps} />);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
