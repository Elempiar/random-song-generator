import { useContext } from "react";
import { Link } from "react-router-dom";
import { blueButtonClass, Button } from "../Button";
import { randomArrayItem } from "../SongGenerator/randomArrayItem";
import { Note, notes } from "../SongGenerator/Song.type";
import { ConfigContext } from "./Config.provider";

const KeySelect = () => {
  const config = useContext(ConfigContext);

  return (
    <div className="space-x-2">
      <select
        className="rounded "
        value={config.key}
        onChange={(event) => {
          const newNote = event.target.value as Note;
          config.updateKey(newNote);
        }}
      >
        {notes.map((note) => (
          <option value={note} key={note}>
            {note}
          </option>
        ))}
      </select>
      <Button
        onClick={() => {
          config.updateKey(randomArrayItem(notes));
        }}
      >
        Randomize Key
      </Button>
    </div>
  );
};

const RandomEnabled = () => {
  const config = useContext(ConfigContext);
  return (
    <label className="w-36 flex space-x-2 items-center p-2 border-blue-300 border rounded bg-gray-100 cursor-pointer">
      <input
        type="checkbox"
        checked={config.random !== false}
        onChange={() => {
          if (config.random === false) {
            config.setRandom(96);
          } else {
            config.setRandom(false);
          }
        }}
      />
      <span>Randomness</span>
    </label>
  );
};

const RandomAmount = () => {
  const config = useContext(ConfigContext);
  return (
    <input
      className="flex border-blue-300 border rounded overflow-hidden bg-gray-100 w-36"
      type="number"
      value={config.random as number}
      onChange={(e) => {
        config.setRandom(Number(e.target.value));
      }}
    />
  );
};

const GradesForm = () => {
  const config = useContext(ConfigContext);

  return (
    <div className="space-y-4">
      <div className="space-y-2 flex flex-col">
        {config.grades.map(({ grade, id }) => {
          return (
            <div
              key={id}
              className="flex border-blue-300 border rounded overflow-hidden bg-gray-100 w-36"
            >
              <input
                min={0}
                step={1}
                max={10}
                className="border-none bg-transparent min-w-0 flex-grow"
                key={id}
                type="number"
                defaultValue={grade}
                onChange={(e) => config.updateGrade(id, Number(e.target.value))}
              ></input>
              <button
                className="p-2 bg-gray-200"
                onClick={() => {
                  config.removeGrade(id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
      <Button
        onClick={() => {
          config.createGrade();
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </Button>
    </div>
  );
};

export const GradesPage = () => {
  const config = useContext(ConfigContext);
  return (
    <>
      <div className="prose my-10">
        <h1>Elempiar's Tab Generator</h1>
        <p>
          This tool helps you generate guitar tabs in case you're stuck writing
          your next masterpiece.
        </p>
      </div>
      <div className="prose">
        <p>
          Start by selecting the key your song is in. Don't have a key yet? Just
          generate one!
        </p>
      </div>
      <KeySelect />
      <div className="prose">
        <p>
          Now choose whether you want to completely randomize the tab, or to use
          your own input as a base for the tab.
        </p>
      </div>
      <RandomEnabled />
      {config.random === false ? <GradesForm /> : <RandomAmount />}
      <Link to="/song-generator" className={blueButtonClass + " w-36"}>
        Generate Tab
      </Link>
    </>
  );
};
