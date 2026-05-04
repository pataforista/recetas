import fs from 'fs';

const filePath = 'data/recipes.js';
let content = fs.readFileSync(filePath, 'utf8');

const mappings = {
    'frutas': 'platano_dulce',
    'ensalada': 'lechuga',
    'cebolla_verde': 'cebollin',
    'masa_tamal': 'tamal_masa',
    'mandioca': 'yuca',
    'pimiento': 'pimiento_rojo',
    'leche_descremada': 'leche',
    'chile_de_arbol': 'chile_seco_molido',
    'rabano': 'rábano',
    'chile_güero': 'chile_serrano',
    'biber_sivri': 'chile_serrano'
};

Object.entries(mappings).forEach(([oldId, newId]) => {
    const regex = new RegExp(`"${oldId}"`, 'g');
    content = content.replace(regex, `"${newId}"`);
    const regexProp = new RegExp(`id: "${oldId}"`, 'g');
    content = content.replace(regexProp, `id: "${newId}"`);
});

fs.writeFileSync(filePath, content);
console.log("Additional replacements complete in recipes.js");
