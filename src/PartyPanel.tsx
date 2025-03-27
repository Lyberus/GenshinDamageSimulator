import thumbs from "./assets/thumbs/dict"
import type { Character } from "./App";

type Props = {
    characters: Character[];
    addCharacter(chara: Character): void;
    removeCharacter(idx: number): void;
};

const palette: Record<string, { bg: string, thumb: string, font: string }> = {
    "불": { bg: "bg-red-100", thumb: "bg-red-300", font: "text-red-700" },
    "물": { bg: "bg-blue-100", thumb: "bg-blue-300", font: "text-blue-700" },
    "바람": { bg: "bg-green-100", thumb: "bg-green-300", font: "text-green-700" },
    "번개": { bg: "bg-purple-100", thumb: "bg-purple-300", font: "text-purple-700" },
    "얼음": { bg: "bg-sky-100", thumb: "bg-sky-300", font: "text-sky-700" },
    "바위": { bg: "bg-yellow-100", thumb: "bg-yellow-300", font: "text-yellow-700" },
    "풀": { bg: "bg-emerald-100", thumb: "bg-emerald-300", font: "text-emerald-700" },
};

function PartyPanel({ characters, addCharacter, removeCharacter } : Props) {
    return (
        <div className="bg-gray-100 p-3">
            <div className="flex flex-col gap-3 overflow-y-auto">
                {
                    characters.map((chara, idx) => (
                        <div key={ idx } className={`relative flex items-center gap-2 p-2 rounded-2xl ${palette[chara.elem].bg}`}>
                            <img src={thumbs[chara.name]} alt={chara.name} className={`w-16 h-16 rounded-2xl ${palette[chara.elem].thumb}`} />
                            <p className={`text-xl ${palette[chara.elem].font}`}>{chara.name}</p>
                            <button className="absolute top-2 right-2 w-auto h-auto px-2 py-1 bg-none text-red-400 hover:text-red-600 transition" onClick={() => removeCharacter(idx) }>X</button>
                        </div>
                    ))
                }
                <button className="bg-amber-400" onClick={() => addCharacter({ name: "다이루크", elem: "불"  }) }>캐릭터 추가</button>
            </div>
        </div>
    );
}

export default PartyPanel;