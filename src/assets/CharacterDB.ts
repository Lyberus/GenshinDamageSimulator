const images = import.meta.glob("./thumbs/*.webp", { eager: true });
const imageMap: Record<string, string> = {};

for (const path in images) {
    const src = (images[path] as { default: string }).default;
    imageMap[path.substring(9, path.length - 5)] = src;
}

export type Character = {
    elem: string;
    thumb?: string;
  };

const DB: Record<string, Character> = {
    "다이루크": {
        elem: "불",
    },
    "마비카": {
        elem: "불",
    },
    "푸리나": {
        elem: "물",
    },
    "나히다": {
        elem: "풀",
    },
    "라이덴 쇼군": {
        elem: "번개",
    },
    "시틀라리": {
        elem: "얼음",
    },
    "벤티": {
        elem: "바람",
    },
    "종려": {
        elem: "바위",
    }
};

for (const [name, char] of Object.entries(DB))
    char.thumb = imageMap[name];

export default DB;