import { useContext, useMemo, useState } from "react";
import { ConfigContext } from "../Config/Config.provider";
import { TabWriterNote, Note, Notation } from "./Tab.type";
import createTab from "tabwriter";
import { Link } from "react-router-dom";
import { randomArrayItem } from "./randomArrayItem";
import { majorScales } from "./majorScales";
import { notations } from "./notations";
import { range, chunk } from "lodash";
import { BlueButton } from "../Button";

const mapGradeToNote = (songKey: Note, grade: number) =>
  majorScales[songKey][Math.floor(grade * (6 / 10))];

const generateFretAndString = (randomNote: Note): Notation =>
  randomArrayItem(notations[randomNote]);

const generateRandomGrades = (randomAmount: number) =>
  range(randomAmount).map(() => Math.floor(Math.random() * 10));

export const TabGeneratorPage = () => {
  const config = useContext(ConfigContext);

  const [randomId, setRandomId] = useState(0);

  const songLines = useMemo(() => {
    const finalGrades =
      config.random === false
        ? config.grades.map(({ grade }) => grade)
        : generateRandomGrades(config.random);
    const gradeChunks = chunk(
      finalGrades.filter((grade): grade is number => typeof grade === "number"),
      16
    );

    const notes = gradeChunks.map((grades) => {
      return grades.map((grade, index) => {
        const { fret, string } = generateFretAndString(
          mapGradeToNote(config.key, grade)
        );
        return {
          beat: index * 2 + 1,
          fret,
          string,
        };
      });
    });

    return notes.map((notes: TabWriterNote[]): string[] => createTab(notes));
  }, [config.key, randomId]);

  return (
    <div className="space-y-8">
      <div className="flex space-x-4">
        <Link
          to="/"
          className={
            "bg-gray-200 inline-flex items-center p-2 justify-center rounded border-gray-400 border"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Change Settings</span>
        </Link>
        <BlueButton
          className="space-x-2"
          onClick={() => {
            setRandomId((id) => id + 1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>Regenerate Tab</span>
        </BlueButton>
        <div className="flex items-center content-center">
          <div className="p-3 uppercase font-bold text-xs border-r border-blue-300">
            key
          </div>
          <div className="p-2 font-bold">{config.key}</div>
        </div>
      </div>
      {songLines.map((songLine) => (
        <pre>{songLine.join("\n")}</pre>
      ))}
    </div>
  );
};
