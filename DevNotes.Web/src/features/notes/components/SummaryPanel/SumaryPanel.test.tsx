import { render, screen, fireEvent } from "@testing-library/react";
import SummaryPanel from "./SummaryPanel";

describe("SummaryPanel Component", () => {
  const mockOnClose = jest.fn();
  const mockOnAccept = jest.fn();
  const mockOnChangeSummary = jest.fn();

  const baseProps = {
    isOpen: true,
    summary: "Initial summary",
    loading: false,
    error: null,
    onClose: mockOnClose,
    onAccept: mockOnAccept,
    onChangeSummary: mockOnChangeSummary,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders and shows summary textarea when open", () => {
    render(<SummaryPanel {...baseProps} />);
    expect(screen.getByText(/AI Summary/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("Initial summary");
  });

  it("does not show panel when isOpen is false (off-screen)", () => {
    render(<SummaryPanel {...baseProps} isOpen={false} />);
    const panel = screen.getByText(/AI Summary/i).parentElement?.parentElement;
    expect(panel).toHaveClass("translate-x-full");
  });

  it("shows loading spinner when loading is true", () => {
    render(<SummaryPanel {...baseProps} loading={true} />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("shows error message when error prop is set", () => {
    render(<SummaryPanel {...baseProps} error="Error occurred" />);
    expect(screen.getByText("Error occurred")).toBeInTheDocument();
  });

  it("calls onClose when close button clicked", () => {
    render(<SummaryPanel {...baseProps} />);
    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when cancel button clicked", () => {
    render(<SummaryPanel {...baseProps} />);
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onAccept when accept button clicked", () => {
    render(<SummaryPanel {...baseProps} />);
    const acceptButton = screen.getByRole("button", { name: /accept/i });
    fireEvent.click(acceptButton);
    expect(mockOnAccept).toHaveBeenCalledTimes(1);
  });

  it("disables accept button when loading is true", () => {
    render(<SummaryPanel {...baseProps} loading={true} />);
    const acceptButton = screen.getByRole("button", { name: /accept/i });
    expect(acceptButton).toBeDisabled();
  });

  it("disables accept button when summary is empty", () => {
    render(<SummaryPanel {...baseProps} summary="" />);
    const acceptButton = screen.getByRole("button", { name: /accept/i });
    expect(acceptButton).toBeDisabled();
  });

  it("calls onChangeSummary when textarea content changes", () => {
    render(<SummaryPanel {...baseProps} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "New summary" } });
    expect(mockOnChangeSummary).toHaveBeenCalledWith("New summary");
  });
});
