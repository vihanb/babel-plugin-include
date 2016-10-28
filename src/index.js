import fs from 'fs';
import path from 'path';

export default function ({
    types: t
}) {
    return {
        visitor: {
            CallExpression(p, state) {
                let name = p.node.callee.name;
                let args = p.node.arguments;

                if (name === "include") {
                    // Get the path of file
                    let filename = this.file.parserOpts.sourceFileName || this.file.parserOpts.filename;

                    // User settings
                    let root = state.opts.root || path.dirname(filename);
                    let encoding = state.opts.encoding === 'buffer' || !state.opts.encoding ? 'utf8' : state.opts.encoding;
                    let normalizeNewline = state.opts.normalizeNewline || true;

                    // Require first arg to be string
                    t.assertStringLiteral(args[0]);

                    // Error if filename is not found
                    if (filename === undefined || filename === "unknown") throw new Error("`include` function called outside of file");

                    // Generate and locate the file
                    let fileRelPath = args[0].value; // Get literal string value
                    let filePath = path.join(root, fileRelPath);
                    let fileSrc = fs.readFileSync(filePath, { encoding });

                    // Convert from a buffer to a string if so
                    if (fileSrc instanceof Buffer) fileSrc = fileSrc.toString(encoding);

                    // Normalize newlines
                    fileSrc = fileSrc.replace(/\r\n/g, "\n").replace(/\r?\n$/, "");

                    p.replaceWith(
                        t.stringLiteral(
                            fileSrc
                        )
                    );
                }
            }
        }
    };
}

