// Type definitions for JavaScript (as JSDoc comments for reference)

/**
 * @typedef {Object} Language
 * @property {string} code - Language code (e.g., 'en', 'hi')
 * @property {string} name - English name of the language
 * @property {string} nativeName - Native name of the language
 */

/**
 * @typedef {Object} TranslationMode
 * @property {'text' | 'voice' | 'document'} id - Mode identifier
 * @property {string} label - Display label for the mode
 * @property {string} icon - Icon name or identifier
 */

// For JavaScript projects, you can use these JSDoc comments above your functions/components
// to get type hints in supported editors like VS Code

// Example usage:
// /** @type {Language} */
// const myLanguage = { code: 'en', name: 'English', nativeName: 'English' };

// Or for function parameters:
// /**
//  * @param {Language} sourceLanguage
//  * @param {Language} targetLanguage
//  */
// function translateText(sourceLanguage, targetLanguage) { ... }