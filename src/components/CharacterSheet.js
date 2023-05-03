import { useState } from 'react';
import SkillCheck from './SkillCheck.js';
import Attributes from './Attributes.js';
import Classes from './Classes.js';
import ClassMinRequirements from './ClassMinRequirements.js';
import Skills from './Skills.js';

function CharacterSheet({ charNumber, charData, handleAttrChange, handleSkillChange }) {
  const [classReqOpen, setClassReqOpen] = useState(undefined);

  const onClassClicked = (e) => {
    setClassReqOpen(e.target.textContent);
  }

  return (
    <div className="char-sheet-container">
      <h1>Character: {charNumber}</h1>
      <div>
        <SkillCheck charData={charData}/>
      </div>
      <div>
        <Attributes handleAttrChange={handleAttrChange} charId={charData.id} charAttributes={charData.attributes} />
      </div>
      <div>
        <Classes charAttributes={charData.attributes} onClassClicked={onClassClicked}/>
      </div>
      {
        classReqOpen 
          ?
            <div>
              <ClassMinRequirements charClassName={classReqOpen} onCloseRequirements={() => setClassReqOpen(undefined)}/>
            </div>
          : <></>
      }
      <div>
        <Skills charData={charData} handleSkillChange={handleSkillChange}/>
      </div>
    </div>
  );
}

export default CharacterSheet;
