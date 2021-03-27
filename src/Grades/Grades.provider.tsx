import React, { createContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

interface Grade {
  grade?: number;
  id: string;
}

interface GradesContext {
  grades: Grade[];
  updateGrade: (id: string, grade: number) => void;
  createGrade: () => void;
  removeGrade: (id: string) => void;
}

// @ts-ignore
export const GradesContext = createContext<GradesContext>({});

interface GradesProviderProps {}

export const GradesProvider = ({
  children,
}: React.PropsWithChildren<GradesProviderProps>) => {
  const [grades, setGrades] = useState<Grade[]>(() => {
    const gradesFromStorage = localStorage.getItem("grades");
    return gradesFromStorage ? JSON.parse(gradesFromStorage) : [];
  });

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
    <GradesContext.Provider
      value={{
        grades,
        updateGrade,
        removeGrade,
        createGrade,
      }}
    >
      {children}
    </GradesContext.Provider>
  );
};
