using System.Collections.Generic;
using Pokefinder.Helpers;

namespace Pokefinder.Models{
    public class Pokemon{
        public int Id { get; set; }
        public string Name { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public List<Type> Types { get; set; }
        public string Img { get; set; }
    }
}