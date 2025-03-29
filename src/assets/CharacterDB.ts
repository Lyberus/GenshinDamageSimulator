import { Character } from "../App";

const images = import.meta.glob("./thumbs/*.webp", { eager: true });
const imageMap: Record<string, string> = {};

for (const path in images) {
    const src = (images[path] as { default: string }).default;
    imageMap[path.substring(9, path.length - 5)] = src;
}

const DB: Character[] = [
    {
        name: "다이루크",
        elem: "불",
        thumb: imageMap["다이루크"]
    },
    {
        name: "마비카",
        elem: "불",
        thumb: imageMap["마비카"]
    },
    {
        name: "푸리나",
        elem: "물",
        thumb: imageMap["푸리나"]
    },
    {
        name: "나히다",
        elem: "풀",
        thumb: imageMap["나히다"]
    },
    {
        name: "라이덴 쇼군",
        elem: "번개",
        thumb: imageMap["라이덴 쇼군"]
    },
    {
        name: "시틀라리",
        elem: "얼음",
        thumb: imageMap["시틀라리"]
    },
    {
        name: "벤티",
        elem: "바람",
        thumb: imageMap["벤티"]
    },
    {
        name: "종려",
        elem: "바위",
        thumb: imageMap["종려"]
    }
];

export default DB;