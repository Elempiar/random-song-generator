import { Note } from "./Tab.type";

// @ts-ignore
export const majorScales: {
    [groundNote in Note]: Note[];
} = {
    Aflat: [Note.Aflat, Note.Bflat, Note.C, Note.Dflat, Note.Eflat, Note.F, Note.G],
    A: [Note.A, Note.B, Note.Dflat, Note.D, Note.E, Note.Gflat, Note.Aflat],
    Bflat: [Note.Bflat, Note.C, Note.D, Note.Eflat, Note.F, Note.G, Note.A],
    B: [Note.B, Note.Dflat, Note.Eflat, Note.E, Note.Gflat, Note.Aflat, Note.B],
    C: [Note.C, Note.D, Note.E, Note.F, Note.G, Note.A, Note.B],
    Dflat: [Note.Dflat, Note.Eflat, Note.F, Note.Gflat, Note.Aflat, Note.Bflat, Note.C],
    D: [Note.D, Note.E, Note.Gflat, Note.G, Note.A, Note.B, Note.Dflat],
    Eflat: [Note.Eflat, Note.F, Note.G, Note.Aflat, Note.Bflat, Note.C, Note.D],
    E: [Note.E, Note.Gflat, Note.Aflat, Note.A, Note.B, Note.Dflat, Note.Eflat],
    F: [Note.F, Note.G, Note.A, Note.Bflat, Note.C, Note.D, Note.E],
    Gflat: [Note.Gflat, Note.Aflat, Note.Bflat, Note.B, Note.Dflat, Note.Eflat, Note.F],
    G: [Note.G, Note.A, Note.B, Note.C, Note.D, Note.E, Note.Gflat],
    
}