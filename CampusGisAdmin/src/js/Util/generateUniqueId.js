export default function generateUnqueId(prefix) {
    if (prefix && typeof prefix === "string") {
        return prefix + "_" + Math.random().toString(36).substr(2,9);
    }

    throw new TypeError("invalid format of prefix");
}