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
    ['HP+'], // 꽃
    ['공격력+'], // 깃털
    ['공격력%', '방어력%', 'HP%', '원소 마스터리+', '원소 충전 효율%'], // 시계
    ['공격력%', '방어력%', 'HP%', '원소 마스터리+', '물리 피해%', '불 원소 피해%', '물 원소 피해%', '얼음 원소 피해%', '바람 원소 피해%', '바위 원소 피해%', '번개 원소 피해%', '풀 원소 피해%'], // 성배
    ['공격력%', '방어력%', 'HP%', '원소 마스터리+', '치명타 확률%', '치명타 피해%', '치유 보너스%'], // 왕관관
];

const SubOptions: string[] = [
    'Empty', 'HP+', 'HP%', '공격력+', '공격력%', '방어력+', '방어력%', '원소 마스터리+', '원소 충전 효율%', '치명타 확률%', '치명타 피해%'
];

function getStatName(stat: Stat) {
    if (stat.kind[stat.kind.length - 1] === "+" || stat.kind[stat.kind.length - 1] === "%")
        return stat.kind.substring(0, stat.kind.length - 1);
    else
        return stat.kind;
}

function getStatValue(stat: Stat) {
    if (stat.kind[stat.kind.length - 1] == "+")
        return "+" + stat.value.toLocaleString('en-US', { maximumFractionDigits: 0 });
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
    const dropdownRef = useRef<HTMLDivElement>(null);

    function handleSelect(newValue: string) {
        updateStat(draft => { draft.kind = newValue; });
        setIsEditing(false);
    }

    function isOnlyFloat(str: string) {
        return /^-?(\d+(\.\d*)?|\.\d+)$/.test(str.trim());
      }

    function changeStatValue() {
        setIsEditing(false);
        if (stat.kind === 'Empty') return;
        const ret = prompt('수정할 값을 입력해주세요.', stat.value.toString());
        if (ret === null || !isOnlyFloat(ret)) return;
        const num = parseFloat(ret);
        if (isNaN(num) || num < 0) return;
        updateStat(draft => { draft.value = num; });
    }

    if (isMain && kind <= 1 && isEditing) setIsEditing(false);

    useEffect(() => {
        const handleClickOutside = (evt: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(evt.target as Node))
                setIsEditing(false);
        };

        if (isEditing)
            document.addEventListener('mousedown', handleClickOutside);

        return () => { document.removeEventListener('mousedown', handleClickOutside); }
    }, [isEditing]);

    return (
        <div className="relative" ref={dropdownRef}>
            <div className={isMain ? "cursor-pointer inline-block text-lg font-medium" : "cursor-pointer flex justify-between"} onClick={() => setIsEditing(true)}>
                <span>{getStatName(stat)}</span><span className="inline-block pl-1 font-bold" onClick={e => { e.stopPropagation(); changeStatValue(); }}>{getStatValue(stat)}</span>
            </div>
            {
                isEditing && (
                    <div className="absolute z-10 top-full bg-white border rounded-lg shadow text-sm w-35">
                        {
                            (isMain ? MainOptions[kind] : SubOptions).map(opt => (
                                <div key={opt} className="px-3 py-1 hover:bg-blue-100 cursor-pointer" onClick={() => handleSelect(opt)}>
                                    {opt}
                                </div>
                            ))
                        }
                    </div>
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
        <div className="w-72 rounded-xl border bg-white shadow-sm px-4 py-3 space-y-3" title="클릭하여여 수정">
            <div className="flex justify-between items-end">
                <OptionSelector isMain={true} kind={kind} stat={artifact.main} updateStat={recipe => updateArtifact(draft => recipe(draft.main))} />
                <img src={ArtifactIcon[kind]} className="inline-block w-8 h-8" />
            </div>
            <div className="space-y-1 text-sm">
                {
                    artifact.sub.map((elem, idx) => (
                        <OptionSelector key={idx} isMain={false} kind={kind} stat={elem} updateStat={recipe => updateArtifact(draft => recipe(draft.sub[idx]))}/>
                    ))
                }
            </div>
        </div>
    );
}

export default ArtifactView;