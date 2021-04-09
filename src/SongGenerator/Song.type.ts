export interface Notation {
  string: number;
  fret: number;
}

export interface TabWriterNote extends Notation {
  beat: number;
}

export enum Note {
  Aflat = "Aflat",
  A = "A",
  Bflat = "Bflat",
  B = "B",
  C = "C",
  Dflat = "Dflat",
  D = "D",
  Eflat = "Eflat",
  E = "E",
  F = "F",
  Gflat = "Gflat",
  G = "G",
}

export const notes = Object.keys(Note) as Note[];

export type PitchedNote = {
  pitch: number;
  note: Note;
};
