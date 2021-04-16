import { useContext } from "react";
import { Link } from "react-router-dom";
import { blueButtonClass, pinkButtonClass, Button } from "../Button";
import { randomArrayItem } from "../TabGenerator/randomArrayItem";
import { Note, notes } from "../TabGenerator/Tab.type";
import { ConfigContext } from "./Config.provider";

<head>
  <title>Tab generator</title>
</head>;

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
        Randomise Key
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
        checked={config.random === false}
        onChange={() => {
          if (config.random === false) {
            config.setRandom(96);
          } else {
            config.setRandom(false);
          }
        }}
      />
      <span>Personalise</span>
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
      <div className="prose mt-10">
        <h1>Elempiar's Tab Generator</h1>
        <p>
          This tool helps you generate guitar tabs in case you're stuck writing
          your next masterpiece.
        </p>
      </div>
      <div>
        <a
          target="_blank"
          href="https://www.instagram.com/generative.tabs"
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
          <span className="ml-2">Get Inspired</span>
        </a>
      </div>
      <div className="prose pt-10">
        <p>
          Start by selecting the key your song is in. Don't have a key yet? Just
          generate one!
        </p>
      </div>
      <KeySelect />
      <div className="prose">
        <p className="pt-10">
          Now choose whether you want to completely randomise the tab, or to use
          your own personal input as a base for the tab.
        </p>
        <p>
          For example: Keep track of your mood for a week. Rate it on a scale of
          1-10 every few hours, and use these scores as a base for your tab.
        </p>
      </div>
      <RandomEnabled />
      {config.random === false ? (
        <div className="prose">
          <p className="pt-10">
            Time to add your own input! The generator converts every specific
            input into a note on the tab. Keep in mind; you can only use numbers
            between 0-10.
          </p>
          <GradesForm />
        </div>
      ) : (
        <div className="prose">
          <p className="pt-10">
            Last but not least: choose how many notes you want in your tab.
          </p>
          <RandomAmount />
        </div>
      )}
      <div className="pt-10">
        <Link to="/generated-tab" className={blueButtonClass + " w-36"}>
          Generate Tab
        </Link>
      </div>
    </>
  );
};
