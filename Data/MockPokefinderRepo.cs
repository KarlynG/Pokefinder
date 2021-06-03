using System;
using System.Collections.Generic;
using Pokefinder.Models;
using Pokefinder.Helpers;
using System.Linq;

namespace Pokefinder.Data
{
    public class MockPokefinderRepo : IPokefinderRepo
    {
        public IEnumerable<Pokemon> GetAppPokemons(string name)
        {
            List<string> filteredPokes = new List<string>();
            ApiHelper.InitializeClient();
            GetPokemon pokemon = new GetPokemon();

            var allnames = pokemon.PokemonNames();

            var names = from s in allnames.Result.results select s;
            foreach (var mypokes in names)
            {
                string pokename = mypokes.name;
                if (pokename.Contains(name))
                {
                    filteredPokes.Add(pokename);
                }
            };

            var pokemons = new List<Pokemon>();
            for (int i = 0; i < filteredPokes.Count; i++)
            {
                var otherdata = pokemon.OtherData(filteredPokes[i]);
                pokemons.Add(new Pokemon { Id = i,
                                            Name = filteredPokes[i], 
                                            Height = otherdata.Result.height, 
                                            Weight = otherdata.Result.weight, 
                                            Types = otherdata.Result.types,
                                            Img = "https://pokeres.bastionbot.org/images/pokemon/" + otherdata.Result.id + ".png"
                                            });
            }
            
            return pokemons;

        }
    }
}