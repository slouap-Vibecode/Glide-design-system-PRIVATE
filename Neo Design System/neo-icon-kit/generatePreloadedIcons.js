const fs = require("fs/promises");
const path = require("path");

let generatedFile = "export function generateNeoIconsPromiseMap(prefixPath) { \n \tconst neoIconsPromiseMap = new Map();\n";

fs.readdir("./icons")
    .then(async (dirContent) => {
        const filePromises = dirContent.filter(fileName => fileName.endsWith(".svg")).map((fileName) => {
            return fs.readFile(path.join("./icons", fileName), { encoding: "utf-8" })
                .then((fileContent) => {
                    return `\tneoIconsPromiseMap.set(prefixPath + "${fileName}", Promise.resolve(\`${fileContent}\`));\n`;
                });
        });

        generatedFile += (await Promise.all(filePromises)).join("") + "\treturn neoIconsPromiseMap;\n}\n";

        await fs.writeFile("preloadedIcons.js", generatedFile, { encoding: "utf-8" });
    });

