const images = import.meta.glob("./*.webp", { eager: true });
const imageMap: Record<string, string> = {};

for (const path in images) {
    const src = (images[path] as { default: string }).default;
    imageMap[path.substring(2, path.length - 5)] = src;
}

export default imageMap;