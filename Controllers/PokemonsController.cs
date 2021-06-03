using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Pokefinder.Data;
using Pokefinder.Models;

namespace Pokefinder.Controllers
{
    [Route("api/pokemons")]
    [ApiController]
    public class PokemonsController : ControllerBase
    {
        private readonly IPokefinderRepo _repository;

        public PokemonsController(IPokefinderRepo repository)
        {
            _repository = repository;
        }
        
        [HttpGet("{name}")]
        public ActionResult <IEnumerable<Pokemon>> GetAppPokemons(string name)
        {
            var pokemonItems = _repository.GetAppPokemons(name);

            return Ok(pokemonItems);            
        }
    }
}