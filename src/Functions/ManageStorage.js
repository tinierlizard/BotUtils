/* eslint-disable no-case-declarations */
const fs = require("fs");

/**
 *
 * @param {string} path The path of the json store - "def" becomes "store.json"
 * @param {string} type Read/write
 * @param {string} index The index of the information being manipulated
 * @param {string} val OPTIONAL - If writing, the new value for the index
 * @returns
 */
function Storage (path, type, index, val = "") {
    if (path === "def" || path == null) {
        path = "store.json";
    }

    switch (type) {
    case "read":
        let json = JSON.parse(fs.readFileSync(path));
        return json[index];
    case "write":
        let prev = JSON.parse(fs.readFileSync(path));
        prev[index] = val;
        fs.writeFileSync(path, JSON.stringify(prev));
        break;
    }
}

module.exports = Storage;