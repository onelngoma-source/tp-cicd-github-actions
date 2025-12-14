const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      },
      ecmaVersion: 2022,
      sourceType: "commonjs",
    },
    rules: {
      "no-unused-vars": "warn", // Avertissement si une variable est déclarée mais pas utilisée
      "no-console": "off",      // On autorise les console.log pour ce TP
    },
    ignores: ["node_modules/", "dist/", "coverage/"] // On ignore ces dossiers
  }
];