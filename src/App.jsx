import { useEffect, useState } from "react";
import "./App.css";
import { fetchPokeDex } from "./api/fetchPokedex";

function App() {
  const [valueOption, setValueOption] = useState("");
  const [imgPoke, setImgPoke] = useState("");
  const [imgPokeEnemy, setImgPokeEnemy] = useState("lugia");
  const [actions, setAction] = useState([])

  useEffect(() => {
    fetchPokemon();
    enemyPoke();
    return () => {};
  }, [valueOption]);

  const enemyPoke = async () =>{
    let data = await fetchPokeDex(imgPokeEnemy);
    setImgPokeEnemy(data.sprites.front_default);
  }

  const fetchPokemon = async () => {
    let pokemon = await fetchPokeDex(valueOption.toLocaleLowerCase());
    /* console.log("name: ", pokemon.name); */
    setImgPoke(pokemon.sprites.back_default);
    
    pokemon.stats.forEach((e) => {
      console.log(e.stat);      
    });
    setAction(pokemon.moves)
  };

  function handleSelect(e) {
    setValueOption(e.target.value);
  }

  function RenderAction(names) {    
    return (      
      <div className="action-name" key={`${names+1}`}>
        <div>{names.move.name}</div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="header">
          <h2>Pokemon Battle of Century</h2>
        </div>

        <div className="battleField">
          <div className="enemy_pet">
            <img src={imgPokeEnemy}/>
          </div>
          <div>
              <select className="selectPokemon" onChange={handleSelect}>
                <option value="Charizard">Charizard</option>
                <option value="Blastoise">Blastoise</option>
                <option value="Kakuna">Kakuna</option>
                <option value="Weedle">Weedle</option>
                <option value="Pikachu">Pikachu</option>
                <option value="Psyduck">Psyduck</option>
                <option value="Cubone">Cubone</option>
                <option value="Magikarp">Magikarp</option>
                <option value="Gyarados">Gyarados</option>
                <option value="Eevee">Eevee</option>
              </select>
            </div>
          <div className="my_pet">
            
            <div className="img_myPet">
              <img src={imgPoke} />
            </div>
            <div className="name_pokemon">
              <h1>{valueOption}</h1>
            </div>
            <div className="action_attack" >
                {actions.slice(0,4).map((e) =>{
                  return RenderAction(e)
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
