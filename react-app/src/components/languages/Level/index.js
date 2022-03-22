import { levelsWithValues } from "../../../utils";
import './Level.css'

const Level =({level}) => {
    const length = []
    for (let i = 0; i < levelsWithValues[level]; i++) {
        length.push(i);
    }

    return (
        <div id='progress'>
            {length.map(element => (
                <div className='level-container'></div>
            ))}
        </div>
    )
}

export default Level;
