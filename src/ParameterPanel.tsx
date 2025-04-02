import { Draft } from "immer";
import { Member, Spec } from "./App";
import CharDB from "./assets/CharacterDB";
import palette from "./assets/ElementalPalette";

type Props = {
    members: Member[];
    selected: string | null;
    onChange: (recipe: (draft: Draft<Member[]>) => void) => void;
};

function ParameterPanel({ members, selected, onChange }: Props) {
    if (selected === null)
        return ( <div className="bg-gray-100 p-3" /> );
    
    const char = CharDB[selected];
    const selectedPalette = palette[char.elem];
    const memberIdx = members.findIndex(elem => elem.name === selected);
    const member = members[memberIdx];
    return (
        <div className="bg-gray-100 p-3">
            <div className={`w-full h-full flex flex-col ${selectedPalette.font}`}>
                <div className="flex h-fit">
                    {
                        member.presets.map((elem, idx) => (
                            <div className={`inline-block py-1 px-5 text-center rounded-t-xl cursor-pointer ${idx == 0 ? selectedPalette.bg : selectedPalette.thumb}`}>{elem.name || `프리셋${idx + 1}`}</div>
                        ))
                    }
                    <div className={`inline-block p-1 w-10 text-center rounded-t-xl cursor-pointer ${selectedPalette.thumb}`} onClick={() => onChange(draft => {
                        draft[memberIdx].presets.push({ level: 90, maxLevel: 90 });
                    })}>
                        +
                    </div>
                </div>
                <div className={`${selectedPalette.bg} h-full rounded-b-xl rounded-tr-xl`}>내용 영역</div>
            </div>
        </div>
    );
}

export default ParameterPanel;