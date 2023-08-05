let words: string[] = [
    'COMPUTADORA',
    'PALTA',
    'CELULAR',
    'ANIMAL',
    'TELEFONO',
    'VEHICULO'
];




export function getRandomWord(){

    const randomIndex =   Math.floor( Math.random() * words.length);

    return words[randomIndex];
}