export interface NoteDTO {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags: string[];
}

export interface NoteCreateDTO {
  title: string;
  content: string;
  tags: string[];
}

export interface NoteUpdateDTO {
  id: string;
  title: string;
  content: string;
  tags: string[];
}
