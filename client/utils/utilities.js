export function normalizeInput(dict, input) {
    if (JSON.stringify(dict) === "" || !input) {
        return null;
    }

    return dict[input.toLowerCase()] || Object.values(dict)[0];
}