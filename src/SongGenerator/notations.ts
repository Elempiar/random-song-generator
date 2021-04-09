import { Notation, Note } from "./Song.type";

export const notations: {
    [note in Note]: Notation[]
} = {
    A: [{fret: 5, string: 0},      {fret: 0, string: 1},   {fret: 7, string: 2},  {fret: 2, string: 3},  {fret: 10, string: 4}, {fret: 5, string: 5}],
    Bflat: [{fret: 6, string: 0},  {fret: 1, string: 1},   {fret: 8, string: 2},  {fret: 3, string: 3},  {fret: 11, string: 4}, {fret: 6, string: 5}],
    B: [{fret: 7, string: 0},      {fret: 2, string: 1},   {fret: 9, string: 2},  {fret: 4, string: 3},  {fret: 0, string: 4},  {fret: 7, string: 5}],
    C: [{fret: 8, string: 0},      {fret: 3, string: 1},   {fret: 10, string: 2}, {fret: 5, string: 3},  {fret: 1, string: 4},  {fret: 8, string: 5}],
    Dflat: [{fret: 9, string: 0},  {fret: 4, string: 1},   {fret: 11, string: 2}, {fret: 6, string: 3},  {fret: 2, string: 4},  {fret: 9, string: 5}],
    D: [{fret: 10, string: 0},     {fret: 5, string: 1},   {fret: 0, string: 2},  {fret: 7, string: 3},  {fret: 3, string: 4},  {fret: 10, string: 5}],
    Eflat: [{fret: 11, string: 0}, {fret: 6, string: 1},   {fret: 1, string: 2},  {fret: 8, string: 3},  {fret: 4, string: 4},  {fret: 11, string: 5}],
    E: [{fret: 0, string: 0},      {fret: 7, string: 1},   {fret: 2, string: 2},  {fret: 9, string: 3},  {fret: 5, string: 4},  {fret: 0, string: 5}],
    F: [{fret: 1, string: 0},      {fret: 8, string: 1},   {fret: 3, string: 2},  {fret: 10, string: 3}, {fret: 6, string: 4},  {fret: 1, string: 5}],
    Gflat: [{fret: 2, string: 0},  {fret: 9, string: 1},   {fret: 4, string: 2},  {fret: 11, string: 3}, {fret: 7, string: 4},  {fret: 2, string: 5}],
    G: [{fret: 3, string: 0},      {fret: 10, string: 1},  {fret: 5, string: 2},  {fret: 0, string: 3},  {fret: 8, string: 4},  {fret: 3, string: 5}],
    Aflat: [{fret: 4, string: 0},  {fret: 11, string: 1},  {fret: 6, string: 2},  {fret: 1, string: 3},  {fret: 9, string: 4},  {fret: 4, string: 5}]
}