import { useEffect, useState } from 'react'
import {letters} from './helpers/letters'
import { HangImage } from './components/HangImage'
import { getRandomWord } from './helpers/getRandomWord'
import './App.css'

function App() {
  const [ word, setWord ] = useState(getRandomWord());
  const [ hiddenWord, setHiddenWord ] = useState( '_ '.repeat(word.length));
  const [attempts, setAttempts ] = useState(0);
  const [ lose, setLose ] = useState( false );
  const [ won, setWon ] = useState( false );


  //Determinar si la persona perdio
  useEffect (() => {
      if ( attempts >= 9){
        setLose ( true );
      }
  }, [ attempts ] ) ;


    //Determinar si la persona gano
    useEffect(()=> {
        //console.log(hiddenWord);_ _ _ _ _ _ _
      const currentHiddenWord = hiddenWord.split(' ').join('');//CONVERTIR A PALABRAS
      if (currentHiddenWord === word ){
        setWon ( true) ;
      }
    }, [ hiddenWord ])



const checkLetter = ( letter:string ) => {

    if ( lose ) return; // en javascript se puede quitar las llaves si solo tiene una linea
    if ( won ) return; // si gana o pierde ya no puede hacer mas click

    if ( !word.includes(letter )){ // verifica si no existe la letra
      setAttempts( Math.min (attempts + 1, 9));//validacion para que sea de 1 a 9 intentos
      return;
      }

      const hiddenWordArray = hiddenWord.split(' ');
 

    for ( let i = 0; i < word.length; i++ ){
        if ( word[i] === letter ){
            hiddenWordArray[i] = letter;
        }  
      }      

      setHiddenWord(hiddenWordArray.join(' '));
    }

    const newGame = () => {
      const newWord = getRandomWord();
      
      setWord(newWord);
      setHiddenWord( '_ '.repeat(word.length) );
      setAttempts(0);
      setLose(false);
      setWon(false);
    }
 
  return ( 
    <div className='App'>
      
      {/* Imagenes  */ }
      <HangImage imageNumber={attempts} /> 

      {/* Palabra oculta  */ }
      <h3>{hiddenWord}</h3>

      {/* Intentos  */ }
      <h3>Intentos: {attempts} </h3>

      {/* Mensaje si perdio */}
      {
        ( lose )
         ? <h2>Perdio, la palabra era: {word}</h2>
          : ''
      }

       {/* Mensaje si gano */}
       {
        ( won )
         ? <h2>Felicidades, usted gano</h2>
          : ''
      }
 

      {/* Botones de letras */ }

      {
        letters.map((letters) =>(
          <button
          onClick={ () => checkLetter(letters) }
           key = {letters}>
            { letters }
          </button>
        ))
      }

      <br /><br />
      <button onClick={newGame }>Nuevo juego</button>

    </div>
  )
}

export default App
 