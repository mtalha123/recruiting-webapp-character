import { useState } from 'react';
import { calculateModifier, calcTotalSkill } from '../util.js';

function calcSkillPointsSpent(skillsObj) {
  return Object.keys(skillsObj).reduce((sum, skillName) => sum + skillsObj[skillName].points, 0);
}

function Skills({ charData, handleSkillChange }) {
  const [skillPointsSpent, setSkillPointsSpent] = useState(calcSkillPointsSpent(charData.skills));
  
  const totalSkillPointsAvailable = 10 + (4 * calculateModifier(charData.attributes['Intelligence'])) - skillPointsSpent;

  return (
    <div className="attributes-container">
      <h1>Skills</h1>
      <h3>Total skill points available: {totalSkillPointsAvailable}</h3>
      <div>
        {
          Object.keys(charData.skills).map(
            skillName => <div key={skillName}>
              {skillName}: points - {charData.skills[skillName].points} -
              <button
                onClick={
                  (e) => {
                    if (totalSkillPointsAvailable > 0) {
                      handleSkillChange(charData.id, skillName, Math.max(0, charData.skills[skillName].points + 1));
                      setSkillPointsSpent(skillPointsSpent + 1);
                    }
                  }
                }
              >
              +
              </button>
              <button
                onClick={
                  (e) => {
                    if (charData.skills[skillName].points - 1 >= 0) {
                      handleSkillChange(charData.id, skillName, charData.skills[skillName].points - 1);
                      setSkillPointsSpent(skillPointsSpent - 1);
                    }
                  }
                }
              >
              -
              </button>
              (Modifier: {charData.skills[skillName].attributeModifier}) -- Total: {calcTotalSkill(charData, skillName)}
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Skills;
