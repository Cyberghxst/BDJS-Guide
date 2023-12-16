const { generateGuideSchema } = require('./generators/guides')

generateGuideSchema('').then(() => console.log('Schema generation finished.'))