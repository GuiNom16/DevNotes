import { render, screen, fireEvent } from "@testing-library/react";
import NotesList from "./NotesList";
import type { NoteDTO } from "../../../../types";

describe("NotesList", () => {
  const mockNotes: NoteDTO[] = [
    {
      id: "1",
      title: "First Note",
      content: "Content of first note",
      createdAt: new Date("2024-06-01T10:00:00Z").toISOString(),
      tags: ["work", "important"],
    },
    {
      id: "2",
      title: "Second Note",
      content: "Another content here",
      createdAt: new Date("2024-06-02T12:00:00Z").toISOString(),
      tags: [],
    },
    {
      id: "3",
      title: "Third Note",
      content: "Third note content",
      createdAt: new Date("2024-06-03T09:30:00Z").toISOString(),
      tags: [],
    },
  ];

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  it("renders all notes with their titles, content, and tags if any", () => {
    render(
      <NotesList
        notes={mockNotes}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    // Check headers
    expect(screen.getByText("Your Notes")).toBeInTheDocument();

    // Check note titles and contents
    mockNotes.forEach((note) => {
      expect(screen.getByText(note.title)).toBeInTheDocument();
      expect(screen.getByText(note.content)).toBeInTheDocument();
    });

    // Check for tag rendering
    expect(screen.getByText("#work")).toBeInTheDocument();
    expect(screen.getByText("#important")).toBeInTheDocument();
  });

  it("calls onEdit when Edit button is clicked", () => {
    render(
      <NotesList
        notes={mockNotes}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockNotes[0]);
  });

  it("calls onDelete when Delete button is clicked", () => {
    render(
      <NotesList
        notes={mockNotes}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[1]);

    expect(mockOnDelete).toHaveBeenCalledWith("2");
  });

  it("filters notes based on search input", () => {
    render(
      <NotesList
        notes={mockNotes}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search notes...");
    fireEvent.change(searchInput, { target: { value: "third" } });

    expect(screen.queryByText("First Note")).not.toBeInTheDocument();
    expect(screen.queryByText("Second Note")).not.toBeInTheDocument();
    expect(screen.getByText("Third Note")).toBeInTheDocument();
  });

  it("shows 'No notes found.' when search yields no results", () => {
    render(
      <NotesList
        notes={mockNotes}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search notes...");
    fireEvent.change(searchInput, { target: { value: "nonexistent" } });

    expect(screen.getByText("No notes found.")).toBeInTheDocument();
  });
});
