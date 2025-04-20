import swords from "./weapon/swords.webp";
import claymores from "./weapon/claymores.webp";
import polearms from "./weapon/polearms.webp";
import catalysts from "./weapon/catalysts.webp";
import bows from "./weapon/bows.webp";

const WeaponIcon: Record<string, string> = {
    "한손검": swords,
    "양손검": claymores,
    "장병기": polearms,
    "법구": catalysts,
    "활": bows
};

export default WeaponIcon;