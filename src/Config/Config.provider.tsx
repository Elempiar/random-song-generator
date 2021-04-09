import React, { createContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Note } from "../SongGenerator/Song.type";

interface Grade {
  grade?: number;
  id: string;
}

interface Config {
  grades: Grade[];
  key: Note;
  updateGrade: (id: string, grade: number) => void;
  createGrade: () => void;
  removeGrade: (id: string) => void;
  updateKey: (key: Note) => void;
  random: false | number;
  setRandom: (random: false | number) => void;
}

// @ts-ignore
export const ConfigContext = createContext<Config>({});

interface ConfigProviderProps {}

export const ConfigProvider = ({
  children,
}: React.PropsWithChildren<ConfigProviderProps>) => {
  const [grades, setGrades] = useState<Grade[]>(() => {
    const gradesFromStorage = localStorage.getItem("grades");
    return gradesFromStorage ? JSON.parse(gradesFromStorage) : [];
  });

  const [key, setKey] = useState<Note>(Note.A);
  const [random, setRandom] = useState<false | number>(96);

  useEffect(() => {
    localStorage.setItem("grades", JSON.stringify(grades, null, 2));
  }, [grades]);

  const updateGrade = (id: string, grade: number) => {
    setGrades((currentGrades) => {
      return currentGrades.map((_grade) => {
        if (_grade.id === id) {
          return {
            grade,
            id,
          };
        }
        return _grade;
      });
    });
  };

  const createGrade = () => {
    setGrades((currentGrades) => {
      return currentGrades.concat({
        id: uuid(),
      });
    });
  };

  const removeGrade = (id: string) => {
    setGrades((currentGrades) => {
      return currentGrades.filter((grade) => grade.id !== id);
    });
  };

  return (
    <ConfigContext.Provider
      value={{
        grades,
        updateGrade,
        removeGrade,
        createGrade,
        key,
        updateKey: setKey,
        random,
        setRandom,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
