import thumbs from "./assets/thumbs/dict"
import type { Character } from "./App";

type Props = {
    characters: Character[];
    addCharacters(chara: Character): void;
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

function PartyPanel({ characters, addCharacters } : Props) {
    return (
        <div className="bg-gray-100 p-3">
            <div className="flex flex-col gap-3 overflow-y-auto">
                {
                    characters.map((chara, idx) => (
                        <div key={ idx } className={`flex items-center gap-2 p-2 rounded-2xl ${palette[chara.elem].bg}`}>
                            <img src={thumbs[chara.name]} alt={chara.name} className={`w-16 h-16 rounded-2xl ${palette[chara.elem].thumb}`} />
                            <p className={`text-xl ${palette[chara.elem].font}`}>{chara.name}</p>
                        </div>
                    ))
                }
                <div onClick={() => addCharacters({ name: "다이루크", elem: "불"  }) }>캐릭터 추가</div>
            </div>
        </div>
    );
}

export default PartyPanel;