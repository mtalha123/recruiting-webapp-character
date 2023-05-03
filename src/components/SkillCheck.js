import { useState } from 'react';
import { SKILL_LIST } from '../consts.js';
import { calcTotalSkill } from '../util.js';

function SkillCheck({ charData }) {
  const [skill, setSkill] = useState(SKILL_LIST[0].name);
  const [DC, setDC] = useState(20);
  const [lastRoll, setLastRoll] = useState(undefined);

  const handleSkillChange = (e) => {
    setSkill(e.target.value);
  }

  const handleDCChange = (e) => {
    setDC(e.target.value);
  }

  const handleRoll = (e) => {
    setLastRoll(Math.floor(Math.random() * 20) + 1);
  }

  return (
    <div className="skillcheck-container">
      <h1>Skill Check</h1>
      <div>
        Skill:
        <select value={skill} onChange={handleSkillChange}>
          {SKILL_LIST.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
        </select>
        DC:
        <input value={DC} onChange={handleDCChange}/>
        <button onClick={handleRoll}>Roll</button>
      </div>
      {
        lastRoll
          ?
            <div>
              <div>You rolled: {lastRoll}</div>
              Skill check { calcTotalSkill(charData, skill) + lastRoll > DC ? 'succeeded' : 'failed' }
            </div>
          :
            <></>
      }
    </div>
  );
}

export default SkillCheck;
