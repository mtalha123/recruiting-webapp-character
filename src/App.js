import { useState, useEffect } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, SKILL_LIST, DEFAULT_ATTR_VALUE } from './consts.js';

import CharacterSheet from './components/CharacterSheet';

// Helper function for building a character JSON
// object whenever new character is created
function buildDefaultCharacterJSON() {
  // Convert array of attributes into JSON format and
  // set default of each attribute to 10
  const attrObject = ATTRIBUTE_LIST.reduce((acc, attr) => {
    return {...acc, [attr]: DEFAULT_ATTR_VALUE};
  }, {})

  // Convert array of skills into JSON format and
  // set default of each skill to 0
  const skillsObject = SKILL_LIST.reduce((acc, skill) => {
    return {...acc, [skill.name]: {attributeModifier: skill.attributeModifier, points: 0}};
  }, {})

  return {
    id: Date.now(), // Use this as id to ensure uniqueness for the sake of this coding exercise
    attributes: {
      ...attrObject
    },
    skills: {
      ...skillsObject
    }
  }
}

async function saveAllCharacters(characters) {
  const URL = 'https://recruiting.verylongdomaintotestwith.ca/api/{mtalha123}/character';

  await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({characters}),
  });
}

async function getSavedCharacters() {
  const URL = 'https://recruiting.verylongdomaintotestwith.ca/api/{mtalha123}/character';

  const resp = await fetch(URL);
  return resp.json();
}

function App() {
  const [characters, setCharacters] = useState([]);

  // Load characters on mount
  useEffect(() => {
    (async () => {
      const data = await getSavedCharacters();

      if (data.body.characters) {
        setCharacters(data.body.characters);
      } else {
        setCharacters([buildDefaultCharacterJSON()]);
      }
    })();
  }, [])

  const handleAttrChange = (charId, attr, attrNewValue) => {
    setCharacters(
      // Mutate attributes in immutable way
      characters.map(
        c => {
          if (charId === c.id) {
            return {
              ...c,
              attributes: {
                ...c.attributes,
                [attr]: attrNewValue,
              }
            }
          }

          return c;
        }
      )
    );
  }

  const handleSkillChange = (charId, skill, skillNewValue) => {
    setCharacters(
      // Mutate skills in immutable way
      characters.map(
        c => {
          if (charId === c.id) {
            return {
              ...c,
              skills: {
                ...c.skills,
                [skill]: {
                  ...c.skills[skill],
                  points: skillNewValue
                },
              }
            }
          }

          return c;
        }
      )
    );
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise - Muhammad Talha</h1>
      </header>
      <section className="App-section">
        <button onClick={() => setCharacters([...characters, buildDefaultCharacterJSON()])}>New Character</button>
        <button onClick={() => saveAllCharacters(characters)}>Save All Characters</button>
        {
          characters.map(
            (character, i) => <CharacterSheet key={character.id} charNumber={i+1} charData={character} handleAttrChange={handleAttrChange} handleSkillChange={handleSkillChange}/>
          )
        }
      </section>
    </div>
  );
}

export default App;
