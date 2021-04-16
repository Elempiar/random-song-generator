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
import { pinkButtonClass, Button } from "../Button";

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
        <div>
          <a
            href="https://www.instagram.com/generative.tabs"
            target="_blank"
            className={pinkButtonClass + " w-36"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="ml-2">Inspire</span>
          </a>
        </div>
      </div>
      {songLines.map((songLine) => (
        <pre>{songLine.join("\n")}</pre>
      ))}
    </div>
  );
};
