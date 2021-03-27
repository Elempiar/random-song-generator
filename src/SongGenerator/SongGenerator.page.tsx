import { useContext, useEffect, useMemo, useState } from "react";
import { GradesContext } from "../Grades/Grades.provider";
import { TabWriterNote, Note, PitchedNote, Notation } from "./Song.type";
import createTab from "tabwriter";
import { Link } from "react-router-dom";
import { randomArrayItem } from "./randomArrayItem";
import { majorScales } from "./majorScales";
import { notations } from "./notations";
import { range, chunk } from "lodash";

const notes = Object.values(Note) as Note[];

const mapGradeToNote = (grade: number) => notes[Math.floor(grade * (7 / 10))];

const generateNote = (key: Note): Note => {
  return randomArrayItem(majorScales[key]);
};

const generateFretAndString = (key: Note): Notation => {
  const note = generateNote(key);
  const notation = randomArrayItem(notations[note]);
  return notation;
};

const generateRandomSongKey = (): Note => {
  return randomArrayItem(notes);
};

export const SongGeneratorPage = () => {
  const [songKey, setSongKey] = useState<Note>(generateRandomSongKey);
  const gradesContext = useContext(GradesContext);

  const regenerateSong = () => {
    setSongKey(generateRandomSongKey());
  };

  const songLines = useMemo(() => {
    // const finalGrades = gradesContext.grades.map(({ grade }) => grade);
    const finalGrades = range(100).map(() => Math.floor(Math.random() * 10));
    const gradeChunks = chunk(
      finalGrades.filter((grade): grade is number => typeof grade === "number"),
      16
    );

    const notes = gradeChunks.map((grades) => {
      return grades.map((grade, index) => {
        const { fret, string } = generateFretAndString(mapGradeToNote(grade));
        return {
          beat: index * 2 + 1,
          fret,
          string,
        };
      });
    });

    return notes.map((notes: TabWriterNote[]): string[] => createTab(notes));
  }, [songKey]);

  return (
    <div>
      <Link to="/">Edit grades</Link>
      <button onClick={regenerateSong}>Regenerate Song</button>
      <div>key: {songKey}</div>
      {songLines.map((songLine) => (
        <pre className="mb-8">{songLine.join("\n")}</pre>
      ))}
    </div>
  );
};
