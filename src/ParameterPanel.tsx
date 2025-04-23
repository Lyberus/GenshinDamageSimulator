import { Draft } from "immer";
import { Character, Spec } from "./App";
import palette from "./assets/ElementalPalette";
import ArtifactView from "./ArtifactView";
import "./Parameter.css";

type Props = {
    characters: Character[];
    selected: string | null;
    updatePreset: (recipe: (draft: Draft<Spec>) => void) => void;
    updateCharacter: (recipe: (draft: Draft<Character>) => void) => void;
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
        artifact: [
            {
                main: { kind: "HP+", value: 4780 },
                sub: [
                    { kind: "공격력%", value: 4.6 },
                    { kind: "원소 충전 효율%", value: 5.7 },
                    { kind: "치명타 확률%", value: 10.2 },
                    { kind: "치명타 피해%", value: 21.7 }
                ]
            },
            {
                main: { kind: "공격력+", value: 311 },
                sub: [
                    { kind: "공격력%", value: 4.6 },
                    { kind: "원소 충전 효율%", value: 5.7 },
                    { kind: "치명타 확률%", value: 10.2 },
                    { kind: "치명타 피해%", value: 21.7 }
                ]
            },
            {
                main: { kind: "공격력%", value: 46.6 },
                sub: [
                    { kind: "원소 마스터리+", value: 20 },
                    { kind: "원소 충전 효율%", value: 5.7 },
                    { kind: "치명타 확률%", value: 10.2 },
                    { kind: "치명타 피해%", value: 21.7 }
                ]
            },
            {
                main: { kind: "얼음 원소 피해%", value: 46.6 },
                sub: [
                    { kind: "공격력%", value: 4.6 },
                    { kind: "원소 충전 효율%", value: 5.7 },
                    { kind: "치명타 확률%", value: 10.2 },
                    { kind: "치명타 피해%", value: 21.7 }
                ]
            },
            {
                main: { kind: "치명타 피해%", value: 62.2 },
                sub: [
                    { kind: "공격력%", value: 4.6 },
                    { kind: "원소 충전 효율%", value: 5.7 },
                    { kind: "원소 마스터리+", value: 20 },
                    { kind: "치명타 피해%", value: 21.7 }
                ]
            }
        ]
    };
}

function ParameterPanel({ characters, selected, updatePreset, updateCharacter }: Props) {
    if (selected === null)
        return ( <div className="bg-gray-100 p-3" /> );

    const selectedIdx = characters.findIndex(elem => elem.name === selected);
    const char = characters[selectedIdx];
    const selectedPalette = palette[char.info.elem];
    const currentPreset = char.selectedPreset < char.presets.length ? char.presets[char.selectedPreset] : null;

    function renamePreset(presetNumber: number) {
        const newName = prompt("이름을 입력하세요.\n빈 칸으로 입력하면 선택된 프리셋이 삭제됩니다.", char.presets[presetNumber].name);
        if (newName === null) return;
        if (newName === '') {
            updateCharacter(draft => {
                draft.presets.splice(presetNumber, 1);
                draft.selectedPreset = 0;
            });
        }
        else if (newName.trim() !== '')
            updateCharacter(draft => { draft.presets[presetNumber].name = newName; });
    }

    return (
        <div className="bg-gray-100 w-150 p-3">
            <div className={`w-full h-full flex flex-col ${selectedPalette.font}`}>
                <div className="flex h-fit">
                    {
                        char.presets.map((elem, idx) => (
                            <div key={idx} className={`inline-block py-1 px-5 text-center rounded-t-xl cursor-pointer ${idx == char.selectedPreset ? selectedPalette.bg : selectedPalette.thumb}`} title="더블 클릭으로 이름 변경" onDoubleClick={() => renamePreset(idx)} onClick={() => updateCharacter(draft => { draft.selectedPreset = idx; })}>
                                {elem.name}
                            </div>
                        ))
                    }
                    <div className={`inline-block p-1 w-10 text-center rounded-t-xl cursor-pointer ${selectedPalette.thumb}`} onClick={() => updateCharacter(draft => {
                        draft.presets.push(makeSpec(`프리셋${draft.presets.length + 1}`));
                    })}>
                        +
                    </div>
                </div>
                <div className={`${selectedPalette.bg} w-full flex-1 min-h-0 flex justify-between gap-6 space-y-6 p-4 h-screen rounded-b-xl rounded-tr-xl overflow-y-auto`}>
                    {
                        currentPreset && (
                            <>
                                <div>
                                    <div>
                                        <label htmlFor="maxLevelSelector" className="block font-medium mb-1">캐릭터 최대 레벨 : </label>
                                        <select id="maxLevelSelector" className="w-full border rounded px-2 py-1" value={currentPreset.maxLevel} onChange={e => updatePreset(draft => {
                                            const maxLevel = Number(e.target.value);
                                            draft.maxLevel = maxLevel;
                                            draft.level = Math.max(maxLevel - 10, Math.min(maxLevel, draft.level));
                                        })}>
                                            <option value="90">90레벨</option>
                                            <option value="80">80레벨</option>
                                            <option value="70">70레벨</option>
                                        </select>

                                        <label htmlFor="levelSelector" className="block mt-4 mb-1">캐릭터 현재 레벨 : <span className="font-semibold">{currentPreset.level}레벨</span></label>
                                        <input id="levelSelector" className={`w-full ${selectedPalette.range}`} type="range" step="1" min={currentPreset.maxLevel - 10} max={currentPreset.maxLevel} value={currentPreset.level} onChange={e => updatePreset(draft => { draft.level = Number(e.target.value); })}/>
                                    </div>
                                    <div className="pt-6">
                                        <label htmlFor="maxWeaponLevelSelector" className="block font-medium mb-1">무기 최대 레벨 : </label>
                                        <select id="maxWeaponLevelSelector" className="w-full border rounded px-2 py-1" value={currentPreset.maxWeaponLevel} onChange={e => updatePreset(draft => {
                                            const maxWeaponLevel = Number(e.target.value);
                                            draft.maxWeaponLevel = maxWeaponLevel;
                                            draft.weaponLevel = Math.max(maxWeaponLevel - 10, Math.min(maxWeaponLevel, draft.weaponLevel));
                                        })}>
                                            <option value="90">90레벨</option>
                                            <option value="80">80레벨</option>
                                            <option value="70">70레벨</option>
                                        </select>
                                        <label htmlFor="weaponLevelSelector" className="block mt-4 mb-1">무기 현재 레벨 : <span className="font-semibold">{currentPreset.weaponLevel}레벨</span></label>
                                        <input id="weaponLevelSelector" className={`w-full ${selectedPalette.range}`} type="range" step="1" min={currentPreset.maxWeaponLevel - 10} max={currentPreset.maxWeaponLevel} value={currentPreset.weaponLevel} onChange={e => updatePreset(draft => { draft.weaponLevel = Number(e.target.value); })}/>
                                    </div>
                                    <div className="space-y-4 pt-6">
                                        <h2>특성</h2>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <img src={char.info.attack} className="w-6 h-6" />
                                                <label htmlFor="attackLevelSelector">일반 공격 특성 레벨 : <span className="font-semibold">{currentPreset.attackLevel}</span></label>
                                            </div>
                                            <input id="attackLevelSelector" className={`w-full ${selectedPalette.range}`} type="range" step="1" min="1" max="10" value={currentPreset.attackLevel} onChange={e => updatePreset(draft => { draft.attackLevel = Number(e.target.value); })}/>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <img src={char.info.skill} className="w-6 h-6" />
                                                <label htmlFor="skillLevelSelector">원소 스킬 특성 레벨 : <span className="font-semibold">{currentPreset.skillLevel}</span></label>
                                            </div>
                                            <input id="skillLevelSelector" className={`w-full ${selectedPalette.range}`} type="range" step="1" min="1" max="10" value={currentPreset.skillLevel} onChange={e => updatePreset(draft => { draft.skillLevel = Number(e.target.value); })}/>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <img src={char.info.burst} className="w-6 h-6" />
                                                <label htmlFor="burstLevelSelector">원소 폭발 특성 레벨 : <span className="font-semibold">{currentPreset.burstLevel}</span></label>
                                            </div>
                                            <input id="burstLevelSelector" className={`w-full ${selectedPalette.range}`} type="range" step="1" min="1" max="10" value={currentPreset.burstLevel} onChange={e => updatePreset(draft => { draft.burstLevel = Number(e.target.value); })}/>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="font-medium">성유물</h2>
                                    <div className="space-y-2">
                                        {
                                            currentPreset.artifact.map((elem, idx) => (
                                                <ArtifactView key={idx} kind={idx} artifact={elem} updateArtifact={recipe => updatePreset(draft => recipe(draft.artifact[idx]))} />
                                            ))
                                        }
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