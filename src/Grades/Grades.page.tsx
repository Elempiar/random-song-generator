import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GradesContext } from "./Grades.provider";

export const GradesPage = () => {
  const gradesContext = useContext(GradesContext);
  return (
    <div>
      {gradesContext.grades.map(({ grade, id }) => {
        return (
          <React.Fragment key={id}>
            <input
              key={id}
              type="number"
              value={grade}
              onChange={(e) =>
                gradesContext.updateGrade(id, Number(e.target.value))
              }
            ></input>
            <button
              onClick={() => {
                gradesContext.removeGrade(id);
              }}
            >
              ❌
            </button>
          </React.Fragment>
        );
      })}
      <button
        onClick={() => {
          gradesContext.createGrade();
        }}
      >
        ➕
      </button>
      <Link to="/song-generator">Generate Song</Link>
    </div>
  );
};
