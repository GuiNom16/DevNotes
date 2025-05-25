export interface NoteDTO {
id: string;
title: string;
content: string;
createdAt: string;
}

export interface CreateNoteInput {
  title: string;
  content: string;
}
