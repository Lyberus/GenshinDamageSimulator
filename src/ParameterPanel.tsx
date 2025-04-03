import { Draft } from "immer";
import { Character, Spec } from "./App";
import palette from "./assets/ElementalPalette";

type Props = {
    characters: Character[];
    selected: string | null;
    onChange: (recipe: (draft: Draft<Character[]>) => void) => void;
};

function makeSpec(name: string): Spec {
    return {
        name: name,
        level: 90,
        maxLevel: 90,
        weaponLevel: 90,
        attackLevel: 9,
        skillLevel: 9,
        burstLevel: 9,
        flower: {
            main: { kind: "ATK%", value: 50 },
            sub: []
        },
        plume: {
            main: { kind: "ATK%", value: 50 },
            sub: []
        },
        sands: {
            main: { kind: "ATK%", value: 50 },
            sub: []
        },
        goblet: {
            main: { kind: "ATK%", value: 50 },
            sub: []
        },
        circlet: {
            main: { kind: "ATK%", value: 50 },
            sub: []
        }
    };
}

function ParameterPanel({ characters, selected, onChange }: Props) {
    if (selected === null)
        return ( <div className="bg-gray-100 p-3" /> );
    
    const idx = characters.findIndex(elem => elem.name === selected);
    const char = characters[idx];
    const selectedPalette = palette[char.info.elem];
    return (
        <div className="bg-gray-100 p-3">
            <div className={`w-full h-full flex flex-col ${selectedPalette.font}`}>
                <div className="flex h-fit">
                    {
                        char.presets.map((elem, idx) => (
                            <div className={`inline-block py-1 px-5 text-center rounded-t-xl cursor-pointer ${idx == 0 ? selectedPalette.bg : selectedPalette.thumb}`}>{elem.name}</div>
                        ))
                    }
                    <div className={`inline-block p-1 w-10 text-center rounded-t-xl cursor-pointer ${selectedPalette.thumb}`} onClick={() => onChange(draft => {
                        draft[idx].presets.push(makeSpec(`프리셋${draft[idx].presets.length + 1}`));
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