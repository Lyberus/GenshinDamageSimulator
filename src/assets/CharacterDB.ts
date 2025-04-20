const images = import.meta.glob("./character/*/*", { eager: true });

export type CharacterInfo = {
    elem: string;
    weapon: string;
    thumb?: string;
    attack?: string;
    skill?: string;
    burst?: string;
  };

const DB: Record<string, CharacterInfo> = {
    "다이루크": {
        elem: "불",
        weapon: "양손검"
    },
    "마비카": {
        elem: "불",
        weapon: "양손검"
    },
    "푸리나": {
        elem: "물",
        weapon: "한손검"
    },
    "나히다": {
        elem: "풀",
        weapon: "법구"
    },
    "라이덴 쇼군": {
        elem: "번개",
        weapon: "장병기"
    },
    "시틀라리": {
        elem: "얼음",
        weapon: "법구"
    },
    "벤티": {
        elem: "바람",
        weapon: "활"
    },
    "종려": {
        elem: "바위",
        weapon: "장병기"
    }
};

for (const [name, char] of Object.entries(DB))
    char.thumb = (images[`./character/${name}/thumb.webp`] as { default: string }).default;

export default DB;