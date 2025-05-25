export interface NoteDTO {
id: string;
title: string;
content: string;
createdAt: string;
}

export interface NoteCreateDTO  {
  title: string;
  content: string;
}

export interface NoteUpdateDTO {
  id: string;
  title: string;
  content: string;
}
