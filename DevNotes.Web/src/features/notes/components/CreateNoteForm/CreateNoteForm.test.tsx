import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateNoteForm from "./CreateNoteForm";

describe("CreateNoteForm Component", () => {
  const mockOnCreate = jest.fn(async (note) => ({
    ...note,
    id: "new-id",
  }));
  const mockOnUpdate = jest.fn(async (note) => note);
  const mockOnCancel = jest.fn();
  const mockOnBeautify = jest.fn(async () => "Beautified content");
  const mockOnSuggestTags = jest.fn(async () => ["tag1", "tag2"]);
  const mockOnAssignTags = jest.fn();
  const mockOnRemoveTag = jest.fn();

  const baseProps = {
    onCreate: mockOnCreate,
    onUpdate: mockOnUpdate,
    onCancel: mockOnCancel,
    onBeautify: mockOnBeautify,
    onSuggestTags: mockOnSuggestTags,
    onAssignTags: mockOnAssignTags,
    onRemoveTag: mockOnRemoveTag,
    tagLoading: false,
    tagError: null,
    allExistingTags: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with empty fields for create mode", () => {
    render(
      <CreateNoteForm
        {...baseProps}
        isEditing={false}
        initialData={undefined}
      />
    );

    expect(
      screen.getByPlaceholderText("Enter note title...")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Write your note here...")
    ).toBeInTheDocument();
    expect(screen.getByText(/0 characters/i)).toBeInTheDocument();
  });

  it("displays initial data in edit mode", () => {
    const initialData = {
      id: "123",
      title: "Test Note",
      content: "Initial content",
      tags: ["tag1"],
      createdAt: Date().toString(),
    };

    render(
      <CreateNoteForm
        {...baseProps}
        isEditing={true}
        initialData={initialData}
      />
    );

    expect(screen.getByDisplayValue("Test Note")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Initial content")).toBeInTheDocument();
    expect(screen.getByText("tag1")).toBeInTheDocument();
  });

  it("submits a new note via onCreate", async () => {
    render(
      <CreateNoteForm
        {...baseProps}
        isEditing={false}
        initialData={undefined}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter note title..."), {
      target: { value: "New Title" },
    });
    fireEvent.change(screen.getByPlaceholderText("Write your note here..."), {
      target: { value: "New Content" },
    });

    fireEvent.submit(screen.getByTestId("note-form"));

    await waitFor(() => {
      expect(mockOnCreate).toHaveBeenCalledWith({
        title: "New Title",
        content: "New Content",
        tags: [],
      });
    });
  });

  it("removes a tag when remove button is clicked", () => {
    const initialData = {
      id: "1",
      title: "Title",
      content: "Content",
      tags: ["removeMe"],
      createdAt: Date().toString(),
    };

    render(
      <CreateNoteForm
        {...baseProps}
        isEditing={true}
        initialData={initialData}
      />
    );

    const removeButton = screen.getByLabelText("Remove tag removeMe");
    fireEvent.click(removeButton);

    expect(mockOnRemoveTag).toHaveBeenCalledWith("removeMe");
  });

  it("calls onCancel when cancel button is clicked", () => {
    const initialData = {
      id: "1",
      title: "Title",
      content: "Content",
      tags: [],
      createdAt: Date().toString(),
    };

    render(
      <CreateNoteForm
        {...baseProps}
        isEditing={true}
        initialData={initialData}
      />
    );

    const cancelButton = screen.getByTestId("cancel-button");
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("suggests tags and opens modal on Add Tag click", async () => {
    render(
      <CreateNoteForm
        {...baseProps}
        isEditing={false}
        initialData={undefined}
      />
    );

    const addTagButton = screen.getByRole("button", { name: /add tag/i });
    fireEvent.click(addTagButton);

    await waitFor(() => {
      expect(mockOnSuggestTags).toHaveBeenCalled();
    });
  });

  it("shows summary after clicking summarize", async () => {
    render(
      <CreateNoteForm
        {...baseProps}
        isEditing={false}
        initialData={undefined}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Write your note here..."), {
      target: { value: "This is a note content that will be summarized." },
    });

    const summarizeButton = screen.getByTestId("summarize-button");
    fireEvent.click(summarizeButton);

    await waitFor(() => {
      expect(screen.getByText(/AI Summary/i)).toBeInTheDocument();
    });
  });

  it("beautifies content when Beautify is clicked", async () => {
    render(
      <CreateNoteForm
        {...baseProps}
        isEditing={false}
        initialData={undefined}
      />
    );

    const beautifyButton = screen.getByRole("button", { name: /beautify/i });
    fireEvent.click(beautifyButton);

    await waitFor(() => {
      expect(mockOnBeautify).toHaveBeenCalled();
    });

    expect(
      await screen.findByDisplayValue("Beautified content")
    ).toBeInTheDocument();
  });

  it("displays tagError message when tagError is set", () => {
    render(
      <CreateNoteForm
        {...baseProps}
        isEditing={false}
        initialData={undefined}
        tagError="Failed to load tags"
      />
    );

    expect(screen.getByText("Failed to load tags")).toBeInTheDocument();
  });
});
