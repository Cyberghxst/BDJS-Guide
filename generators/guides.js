const { readFile, writeFile } = require('fs/promises')
const { join } = require('path')

/**
 * Generates a guide markdown file.
 * @param {string} output_dir - Output directory.
 * @param {boolean} [providing_cwd=false] - Set to "true" if your path provides a custom cwd.
 * @returns {Promise<void>}
 */
async function generateGuideSchema(output_dir, providing_cwd = false) {
    const root = providing_cwd ? '' : process.cwd()
    const rawJSON = await readFile(
        join(root, 'schemas/guide.schema.json'),
        { encoding: 'utf-8' }
    )
    /** @type {Record<string, string>} */
    const data = JSON.parse(rawJSON ?? '{}')
    /** @type {string[]} */
    const texts = []
    
    // Iteration.
    if ('data' in data) {
        for (const d in data.data) {
            /** @type {string} */
            const title = data.data[d].title

            texts.push(`- - - [${title}](guides/${title.toLowerCase().replace(/ +/g, '-')}.md)`)
        }
    }

    await writeFile(join(root, output_dir, 'guide-schemas.md'), texts.join('\n'))
}

module.exports = { generateGuideSchema }