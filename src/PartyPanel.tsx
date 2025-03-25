import { useState } from "react";
import thumbs from "./assets/thumbs/dict"

function PartyPanel() {
    const [selectMode, setSelectMode] = useState<number>(0);
    const [party, setParty] = useState<string[]>(['none', 'none', 'none', 'none']);

    function open(num: number) {
        setSelectMode(num);
    }

    function selectCharacter(target: string) {
        const old = party.indexOf(target);
        const newParty = party.slice();
        if (target !== 'none' && old >= 0)
            newParty[old] = newParty[selectMode - 1];
        newParty[selectMode - 1] = target;
        setParty(newParty);
        setSelectMode(0);
    }
    
    return (
        <div className="select-none">
            <div>파티 구성</div>
            <img src={ thumbs[party[0]] } className={`inline-block m-2 w-30 h-30 border-4 rounded-2xl ${ selectMode == 1 ? 'border-amber-200' : '' }`} onClick={ () => open(1) }/>
            <img src={ thumbs[party[1]] } className={`inline-block m-2 w-30 h-30 border-4 rounded-2xl ${ selectMode == 2 ? 'border-amber-200' : '' }`} onClick={ () => open(2) } />
            <img src={ thumbs[party[2]] } className={`inline-block m-2 w-30 h-30 border-4 rounded-2xl ${ selectMode == 3 ? 'border-amber-200' : '' }`} onClick={ () => open(3) } />
            <img src={ thumbs[party[3]] } className={`inline-block m-2 w-30 h-30 border-4 rounded-2xl ${ selectMode == 4 ? 'border-amber-200' : '' }`} onClick={ () => open(4) } />
            <div className={`${selectMode ? '' : 'hidden'} m-2 grid grid-cols-4 gap-4 absolute`}>
                { Object.entries(thumbs).map(([name, path]) => ( <img key={path} src={path} className="w-30 h-30 border-4 rounded-2xl" onClick={ () => selectCharacter(name) } /> )) }
            </div>
            <div>테스트 텍스트</div>
        </div>
    );
}

export default PartyPanel;