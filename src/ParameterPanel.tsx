import { Draft } from "immer";
import { Character, Spec } from "./App";
import palette from "./assets/ElementalPalette";
import "./Parameter.css";

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
        maxWeaponLevel: 90,
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

    const selectedIdx = characters.findIndex(elem => elem.name === selected);
    const char = characters[selectedIdx];
    const selectedPalette = palette[char.info.elem];
    const currentPreset = char.selectedPreset < char.presets.length ? char.presets[char.selectedPreset] : null;

    const getPresetDraft = (draft: Draft<Character[]>) => draft[selectedIdx].presets[char.selectedPreset];

    function renamePreset(presetNumber: number) {
        const newName = prompt("이름을 입력하세요.\n빈 칸으로 입력하면 선택된 프리셋이 삭제됩니다.", char.presets[presetNumber].name);
        if (newName === null) return;
        if (newName === '') {
            onChange(draft => {
                draft[selectedIdx].presets.splice(presetNumber, 1);
                draft[selectedIdx].selectedPreset = 0;
            });
        }
        else if (newName.trim() !== '')
            onChange(draft => { draft[selectedIdx].presets[presetNumber].name = newName; });
    }

    return (
        <div className="bg-gray-100 p-3">
            <div className={`w-full h-full flex flex-col ${selectedPalette.font}`}>
                <div className="flex h-fit">
                    {
                        char.presets.map((elem, idx) => (
                            <div key={idx} className={`inline-block py-1 px-5 text-center rounded-t-xl cursor-pointer ${idx == char.selectedPreset ? selectedPalette.bg : selectedPalette.thumb}`} title="더블 클릭으로 이름 변경" onDoubleClick={() => renamePreset(idx)} onClick={() => onChange(draft => { draft[selectedIdx].selectedPreset = idx; })}>
                                {elem.name}
                            </div>
                        ))
                    }
                    <div className={`inline-block p-1 w-10 text-center rounded-t-xl cursor-pointer ${selectedPalette.thumb}`} onClick={() => onChange(draft => {
                        draft[selectedIdx].presets.push(makeSpec(`프리셋${draft[selectedIdx].presets.length + 1}`));
                    })}>
                        +
                    </div>
                </div>
                <div className={`${selectedPalette.bg} space-y-6 p-4 h-full rounded-b-xl rounded-tr-xl`}>
                    {
                        currentPreset && (
                            <>
                                <div>
                                    <label htmlFor="maxLevelSelector" className="block font-medium mb-1">캐릭터 최대 레벨 : </label>
                                    <select id="maxLevelSelector" className="w-full border rounded px-2 py-1" value={currentPreset.maxLevel} onChange={e => onChange(draft => {
                                        const maxLevel = Number(e.target.value);
                                        const presetDraft = getPresetDraft(draft);
                                        presetDraft.maxLevel = maxLevel;
                                        presetDraft.level = Math.max(maxLevel - 10, Math.min(maxLevel, presetDraft.level));
                                    })}>
                                        <option value="90">90레벨</option>
                                        <option value="80">80레벨</option>
                                        <option value="70">70레벨</option>
                                    </select>

                                    <label htmlFor="levelSelector" className="block mt-4 mb-1">캐릭터 현재 레벨 : <span className="font-semibold">{currentPreset.level}레벨</span></label>
                                    <input id="levelSelector" className={`w-full ${selectedPalette.range}`} type="range" step="1" min={currentPreset.maxLevel - 10} max={currentPreset.maxLevel} value={currentPreset.level} onChange={e => onChange(draft => { getPresetDraft(draft).level = Number(e.target.value); })}/>
                                </div>
                                <div>
                                    <label htmlFor="maxWeaponLevelSelector" className="block font-medium mb-1">무기 최대 레벨 : </label>
                                    <select id="maxWeaponLevelSelector" className="w-full border rounded px-2 py-1" value={currentPreset.maxWeaponLevel} onChange={e => onChange(draft => {
                                        const maxWeaponLevel = Number(e.target.value);
                                        const presetDraft = getPresetDraft(draft);
                                        presetDraft.maxWeaponLevel = maxWeaponLevel;
                                        presetDraft.weaponLevel = Math.max(maxWeaponLevel - 10, Math.min(maxWeaponLevel, presetDraft.weaponLevel));
                                    })}>
                                        <option value="90">90레벨</option>
                                        <option value="80">80레벨</option>
                                        <option value="70">70레벨</option>
                                    </select>
                                    <div className="flex items-center gap-2 mt-4">
                                        <img src="/weaponIcon.webp" className="w-6 h-6" />
                                        <label htmlFor="weaponLevelSelector">무기 현재 레벨 : <span className="font-semibold">{currentPreset.weaponLevel}레벨</span></label>
                                    </div>
                                    <input id="weaponLevelSelector" className={`w-full ${selectedPalette.range}`} type="range" step="1" min={currentPreset.maxWeaponLevel - 10} max={currentPreset.maxWeaponLevel} value={currentPreset.weaponLevel} onChange={e => onChange(draft => { getPresetDraft(draft).weaponLevel = Number(e.target.value); })}/>
                                </div>
                                <div className="space-y-4 pt-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <img src="/attackIcon.webp" className="w-6 h-6" />
                                            <label htmlFor="attackLevelSelector">일반 공격 특성 레벨 : <span className="font-semibold">{currentPreset.attackLevel}</span></label>
                                        </div>
                                        <input id="attackLevelSelector" className={`w-full ${selectedPalette.range}`} type="range" step="1" min="1" max="10" value={currentPreset.attackLevel} onChange={e => onChange(draft => { getPresetDraft(draft).attackLevel = Number(e.target.value); })}/>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <img src="/skillIcon.webp" className="w-6 h-6" />
                                            <label htmlFor="skillLevelSelector">원소 전투 스킬 특성 레벨 : <span className="font-semibold">{currentPreset.skillLevel}</span></label>
                                        </div>
                                        <input id="skillLevelSelector" className={`w-full ${selectedPalette.range}`} type="range" step="1" min="1" max="10" value={currentPreset.skillLevel} onChange={e => onChange(draft => { getPresetDraft(draft).skillLevel = Number(e.target.value); })}/>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <img src="/burstIcon.webp" className="w-6 h-6" />
                                            <label htmlFor="burstLevelSelector">원소 폭발 특성 레벨 : <span className="font-semibold">{currentPreset.burstLevel}</span></label>
                                        </div>
                                        <input id="burstLevelSelector" className={`w-full ${selectedPalette.range}`} type="range" step="1" min="1" max="10" value={currentPreset.burstLevel} onChange={e => onChange(draft => { getPresetDraft(draft).burstLevel = Number(e.target.value); })}/>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ParameterPanel;