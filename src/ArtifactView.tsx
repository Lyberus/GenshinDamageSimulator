import FlowerIcon from "./assets/artifact/flower.webp"
import PlumeIcon from "./assets/artifact/plume.webp"
import SandsIcon from "./assets/artifact/sands.webp"
import GobletIcon from "./assets/artifact/goblet.webp"
import CircletIcon from "./assets/artifact/circlet.webp"

const ArtifactIcon = [FlowerIcon, PlumeIcon, SandsIcon, GobletIcon, CircletIcon];

import { Artifact, Stat } from "./App";
import { Draft } from "immer"
import { useEffect, useRef, useState } from "react"

const MainOptions: string[][] = [
    ['체력+'], // 꽃
    ['공격력+'], // 깃털
    ['공격력%', '방어력%', '체력%', '원소 마스터리+', '원소 충전 효율%'], // 시계
    ['공격력%', '방어력%', '체력%', '원소 마스터리+', '물리 피해%', '불 원소 피해%', '물 원소 피해%', '얼음 원소 피해%', '바람 원소 피해%', '바위 원소 피해%', '번개 원소 피해%', '풀 원소 피해%'], // 성배
    ['공격력%', '방어력%', '체력%', '원소 마스터리+', '치명타 확률%', '치명타 피해%', '치유 보너스%'], // 왕관관
];

const SubOptions: string[] = [
    '체력+'
];

function getStatName(stat: Stat) {
    return stat.kind.substring(0, stat.kind.length - 1);
}

function getStatValue(stat: Stat) {
    if (stat.kind[stat.kind.length - 1] == "+")
        return "+" + stat.value.toLocaleString();
    else if (stat.kind[stat.kind.length - 1] == "%")
        return "+" + stat.value.toFixed(1) + "%";
    else
        return "none";
}

type OptionSelectorProps = {
    isMain: boolean;
    kind: number;
    stat: Stat;
    updateStat: (recipe: (draft: Draft<Stat>) => void) => void;
};

function OptionSelector({isMain, kind, stat, updateStat}: OptionSelectorProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(stat.value);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(evt: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(evt.target as Node)) {
                setIsEditing(false);
                setTempValue(stat.value);
            }
        }
        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => { document.removeEventListener('mousedown', handleClickOutside); };
    }, [isEditing]);

    function handleSelect(newValue: string) {
        updateStat(draft => { draft.kind = newValue; });
    }

    function handleValueChange(newValue: string) {
        const num = parseFloat(newValue);
        if (!isNaN(num)) setTempValue(num);
    }

    function handleValueBlur() {
        updateStat(draft => { draft.value = tempValue; });
        setIsEditing(false);
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <div className={isMain ? 'cursor-pointer inline text-lg font-medium' : 'cursor-pointer flex justify-between'} onDoubleClick={() => setIsEditing(true)}>
                <span>{getStatName(stat)}</span> <span className="font-bold">{getStatValue(stat)}</span>
            </div>
            {
                isEditing && (
                    <div className="absolute z-10 mt-1 bg-white border rounded-lg shadow text-sm w-40">
                        {
                            (isMain ? MainOptions[kind] : SubOptions).map(opt => (
                                <div key={opt} className="px-3 py-1 hover:bg-blue-100 cursor-pointer" onClick={() => handleSelect(opt)}>
                                    {opt}
                                </div>
                            ))
                        }
                    </div>

                    // 인풋 추가!!
                )
            }
        </div>
    )
};

type ArtifactViewProps = {
    kind: number;
    artifact: Artifact;
    updateArtifact: (recipe: (draft: Draft<Artifact>) => void) => void;
};

function ArtifactView({kind, artifact, updateArtifact}: ArtifactViewProps) {
    return (
        <div className="w-72 rounded-xl border bg-white shadow-sm px-4 py-3 space-y-3" title="더블클릭으로 수정">
            <div className="flex justify-between items-end">
                <OptionSelector isMain={true} kind={kind} stat={artifact.main} updateStat={recipe => updateArtifact(draft => recipe(draft.main))} />
                <img src={ArtifactIcon[kind]} className="inline-block w-8 h-8" />
            </div>
            <div className="space-y-1 text-sm">
                {
                    artifact.sub.map((elem, idx) => (
                        <OptionSelector isMain={false} kind={kind} stat={elem} updateStat={recipe => updateArtifact(draft => recipe(draft.sub[idx]))}/>
                    ))
                }
            </div>
        </div>
    );
}

export default ArtifactView;