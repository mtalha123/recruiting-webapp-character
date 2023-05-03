import { calculateModifier } from '../util.js';

function Attributes({ handleAttrChange, charId, charAttributes}) {
  const sumAllAttributes = Object.keys(charAttributes).reduce((sum, attrVal) => sum + charAttributes[attrVal], 0)

  return (
    <div className="attributes-container">
      <h1>Attributes</h1>
      <div>
        {
          Object.keys(charAttributes).map(
            charAttr => <div key={charAttr}>
              {charAttr}: {charAttributes[charAttr]} (Modifier: {calculateModifier(charAttributes[charAttr])})
              <button onClick={(e) => sumAllAttributes < 70 ? handleAttrChange(charId, charAttr, charAttributes[charAttr] + 1) : alert("Can't allocate more than 70 points")}>+</button>
              <button onClick={(e) => handleAttrChange(charId, charAttr, Math.max(0, charAttributes[charAttr] - 1))}>-</button>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Attributes;
