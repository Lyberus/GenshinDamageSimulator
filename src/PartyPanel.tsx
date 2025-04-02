import { Member } from "./App";
import CharDB from "./assets/CharacterDB"
import palette from "./assets/ElementalPalette"
import { useState } from "react";

type Props = {
    characters: Member[];
    addCharacter(name: string): void;
    removeCharacter(name: string): void;
    selectCharacter(name: string): void;
};

function PartyPanel({ characters, addCharacter, removeCharacter, selectCharacter } : Props) {
    const [panelOpen, setPanelOpen] = useState<boolean>(false);

    return (
        <div className="bg-gray-100 p-3">
            <div className="flex flex-col gap-3 overflow-y-auto">
                {
                    characters.map((member, idx) => (
                        <div key={ idx } className={`relative flex items-center gap-2 p-2 rounded-2xl ${palette[CharDB[member.name].elem].bg} ${palette[CharDB[member.name].elem].hover} cursor-pointer`} onClick={() => { selectCharacter(member.name); setPanelOpen(false); }}>
                            <img src={CharDB[member.name].thumb} alt={member.name} className={`w-16 h-16 rounded-2xl ${palette[CharDB[member.name].elem].thumb}`} />
                            <p className={`text-xl ${palette[CharDB[member.name].elem].font}`}>{member.name}</p>
                            <button className="absolute top-2 right-2 w-auto h-auto px-2 py-1 bg-none text-gray-500 hover:text-gray-700 cursor-pointer" onClick={(evt) => { removeCharacter(member.name); evt.stopPropagation(); } }>X</button>
                        </div>
                    ))
                }
                <button className="bg-amber-400 p-2 rounded-2xl hover:bg-amber-500 cursor-pointer" onClick={() => setPanelOpen(!panelOpen) }>캐릭터 추가</button>
            </div>
            {panelOpen && (
                <div className="fixed left-70 top-0 h-full w-70 bg-gray-100 p-4">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold text-blue-400">캐릭터 선택</h2>
                        <button className="pb-1 text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => setPanelOpen(false)}>X</button>
                    </div>
                    <div className="mt-4 flex flex-col space-y-2 overflow-y-auto">
                        {
                            Object.entries(CharDB).filter(([name]) => characters.find(member => member.name === name) === undefined).map(([name, char], idx) => (
                                <div key={ idx } className={`relative flex items-center gap-2 p-2 rounded-2xl ${palette[char.elem].bg} ${palette[char.elem].hover} cursor-pointer`} onClick={() => addCharacter(name) }>
                                    <img src={char.thumb} alt={name} className={`w-16 h-16 rounded-2xl ${palette[char.elem].thumb}`} />
                                    <p className={`text-xl ${palette[char.elem].font}`}>{name}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default PartyPanel;