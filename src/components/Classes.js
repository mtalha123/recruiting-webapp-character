import { CLASS_LIST } from '../consts.js';

function meetsClassReq(clName, charAttributes) {
  for (const attr in CLASS_LIST[clName]) {
    if (charAttributes[attr] < CLASS_LIST[clName][attr]) {
      return false;
    }
  }

  return true;
}

function Classes({ charAttributes, onClassClicked }) {
  return (
    <div className="classes-container">
      <h1>Classes</h1>
      <div>
        {
          Object.keys(CLASS_LIST).map(
            clName => <div key={clName} style={{color: `${meetsClassReq(clName, charAttributes) ? 'red' : 'white'}`, cursor: 'pointer'}} onClick={onClassClicked}>
              {clName}
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Classes;
