import Informational from "../views/informational";
import Input from "../views/inputs";
import Layout from "../views/layout";
import Wrapper from "../views/wrapper";
import Other from "../views/other";

const ENTRIES = [
    ...initEntries(Informational, "Infomational"),
    ...initEntries(Input, "Input"),
    ...initEntries(Layout, "Layout"),
    ...initEntries(Wrapper, "Wrapper"),
    ...initEntries(Other, "Other"),
];

function initEntries(entries, category) {
    return entries.reduce((result, entry) => {
        return Array.isArray(entry.controlMapping) ?
            [...result, ...entry.controlMapping.map(term => {
                return {
                    ...term,
                    category: category,
                    displayName: entry.displayName || entry.name,
                    widgetName: entry.name,
                }
            })] : result;
    }, []);
}

export function matchByKeyword(value) {
    return ENTRIES.reduce((result, entry) => {
        for (const keyword of entry.keywords) {
            const _keyword = keyword.toLowerCase();
            const _value = value.toLowerCase();
            if (_keyword.indexOf(_value.toLowerCase()) > -1
                || _value.indexOf(_keyword.toLowerCase()) > -1) {
                let dupEntry = Object.assign({}, entry);
                delete dupEntry.keywords;
                return [...result, dupEntry]
            }
        }
        return result;
    }, []);
}