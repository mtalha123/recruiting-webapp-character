import { CLASS_LIST } from '../consts.js';

function ClassMinRequirements({ charClassName, onCloseRequirements }) {
  return (
    <div className="class-min-req-container">
      <h1>{charClassName} Minimum Requirements</h1>
      <div>
        {
          Object.keys(CLASS_LIST[charClassName]).map(
            attr => <div key={attr}>{attr}: {CLASS_LIST[charClassName][attr]}</div>
          )
        }
      <button onClick={onCloseRequirements}>Close Requirements</button>
      </div>
    </div>
  );
}

export default ClassMinRequirements;
