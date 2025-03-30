import { Character } from "./App";
import palette from "./assets/ElementalPalette";

type Props = {
    characters: Character[];
    selected: Character | null; 
};

function ParameterPanel({ characters, selected }: Props) {
    return (
        <div className="bg-gray-100 p-3">
            { selected && (
                <div className="w-full h-full flex flex-col">
                    <div className="flex h-fit">
                        <div className={`inline-block p-1 w-30 text-center rounded-t-2xl ${palette[selected.elem].bg}`}>프리셋1</div>
                        <div className={`inline-block p-1 w-30 text-center rounded-t-2xl ${palette[selected.elem].thumb}`}>프리셋2</div>
                    </div>
                    <div className={`${palette[selected.elem].bg} h-full rounded-b-2xl rounded-tr-2xl`}>내용 영역</div>
                </div>
            )}
        </div>
    );
}

export default ParameterPanel;