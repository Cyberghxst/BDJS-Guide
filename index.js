const { generateGuideSchema } = require('./generators/guides')
const { getPropertiesFile } = require('./generators/properties')

generateGuideSchema('').then(() => console.log('Schema generation finished.'))
getPropertiesFile().then(() => console.log('Properties file fetched.'))