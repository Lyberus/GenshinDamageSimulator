import { useState } from "react";
import thumbs from "./assets/thumbs/dict"

function PartyPanel() {
    const [selectMode, setSelectMode] = useState<boolean>(false);
    const [party, setParty] = useState<Array<string | undefined>>([undefined, undefined, undefined, undefined]);
    
    if (party[0] == undefined) setParty(["앰버", undefined, undefined, undefined]);

    function open() {
        setSelectMode(true);
    }
    
    return (
        <div>
            <img src={ party[0] && thumbs[party[0]] } className="inline-block m-2 w-30 h-30 border rounded-2xl" onClick={ () => open() }/>
            <img src={ party[1] && thumbs[party[1]] } className="inline-block m-2 w-30 h-30 border rounded-2xl" onClick={ () => open() } />
            <img src={ party[2] && thumbs[party[2]] } className="inline-block m-2 w-30 h-30 border rounded-2xl" onClick={ () => open() } />
            <img src={ party[3] && thumbs[party[3]] } className="inline-block m-2 w-30 h-30 border rounded-2xl" onClick={ () => open() } />
            <div className={`${selectMode ? '' : 'hidden'} grid grid-cols-4 gap-3`}>
                { Object.entries(thumbs).map(arg => ( <img key={arg[1]} src={arg[1]} className="w-30 h-30"/> )) }
            </div>
        </div>
    );
}

export default PartyPanel;