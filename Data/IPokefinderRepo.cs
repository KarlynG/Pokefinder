using System.Collections.Generic;
using Pokefinder.Models;

namespace Pokefinder.Data{
    public interface IPokefinderRepo{
        IEnumerable<Pokemon> GetAppPokemons(string name);
    }
}