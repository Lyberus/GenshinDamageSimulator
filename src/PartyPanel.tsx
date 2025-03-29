import CharacterDB from "./assets/CharacterDB"
import type { Character } from "./App";
import { useState } from "react";

type Props = {
    characters: Character[];
    addCharacter(chara: Character): void;
    removeCharacter(idx: number): void;
};

const palette: Record<string, { bg: string, hover: string, thumb: string, font: string }> = {
    "불": { bg: "bg-red-100", hover: "hover:bg-red-200", thumb: "bg-red-300", font: "text-red-700" },
    "물": { bg: "bg-blue-100", hover: "hover:bg-blue-200", thumb: "bg-blue-300", font: "text-blue-700" },
    "바람": { bg: "bg-teal-100", hover: "hover:bg-teal-200", thumb: "bg-teal-300", font: "text-teal-700" },
    "번개": { bg: "bg-purple-100", hover: "hover:bg-purple-200", thumb: "bg-purple-300", font: "text-purple-700" },
    "얼음": { bg: "bg-sky-100", hover: "hover:bg-sky-200", thumb: "bg-sky-300", font: "text-sky-700" },
    "바위": { bg: "bg-yellow-100", hover: "hover:bg-yellow-200", thumb: "bg-yellow-300", font: "text-yellow-700" },
    "풀": { bg: "bg-green-100", hover: "hover:bg-green-200", thumb: "bg-green-300", font: "text-green-700" },
};

function PartyPanel({ characters, addCharacter, removeCharacter } : Props) {
    const [panelOpen, setPanelOpen] = useState<boolean>(false);

    return (
        <div className="bg-gray-100 p-3">
            <div className="flex flex-col gap-3 overflow-y-auto">
                {
                    characters.map((chara, idx) => (
                        <div key={ idx } className={`relative flex items-center gap-2 p-2 rounded-2xl ${palette[chara.elem].bg} ${palette[chara.elem].hover} cursor-pointer`}>
                            <img src={chara.thumb} alt={chara.name} className={`w-16 h-16 rounded-2xl ${palette[chara.elem].thumb}`} />
                            <p className={`text-xl ${palette[chara.elem].font}`}>{chara.name}</p>
                            <button className="absolute top-2 right-2 w-auto h-auto px-2 py-1 bg-none text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => removeCharacter(idx) }>X</button>
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
                            CharacterDB.filter((chara) => !characters.includes(chara)).map((chara, idx) => (
                                <div key={ idx } className={`relative flex items-center gap-2 p-2 rounded-2xl ${palette[chara.elem].bg} ${palette[chara.elem].hover} cursor-pointer`} onClick={() => addCharacter(chara) }>
                                    <img src={chara.thumb} alt={chara.name} className={`w-16 h-16 rounded-2xl ${palette[chara.elem].thumb}`} />
                                    <p className={`text-xl ${palette[chara.elem].font}`}>{chara.name}</p>
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