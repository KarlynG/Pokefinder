using System;
using System.Collections;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using System.Linq;

namespace Pokefinder.Helpers{
    public class ApiHelper
    {
        public static HttpClient ApiClient {get; set; }

        public static void InitializeClient()
        {
            ApiClient = new HttpClient();
            ApiClient.DefaultRequestHeaders.Accept.Clear();
            ApiClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }
        
    }

    public class GetPokemon
    {

        public async Task<Root> PokemonNames()
        {
            string url = "https://pokeapi.co/api/v2/pokemon?limit=898";

            using (HttpResponseMessage response = await ApiHelper.ApiClient.GetAsync(url))
            {
                if (response.IsSuccessStatusCode)
                {
                    Root pokenames = await JsonSerializer.DeserializeAsync<Root>(await response.Content.ReadAsStreamAsync());
                    return pokenames;
                }
                else
                {
                    throw new System.Exception(response.ReasonPhrase);
                }
            }
        }

        public async Task<Root2> OtherData(string name)
        {
            string url = "https://pokeapi.co/api/v2/pokemon/" + name;

            using (HttpResponseMessage response = await ApiHelper.ApiClient.GetAsync(url))
            {
                if (response.IsSuccessStatusCode)
                {
                    Root2 pokenames = await JsonSerializer.DeserializeAsync<Root2>(await response.Content.ReadAsStreamAsync());
                    return pokenames;
                }
                else
                {
                    throw new System.Exception(response.ReasonPhrase);
                }
            }
        }
    }

    

    public class Result
    {
        public string name { get; set; }
        public string url { get; set; }
    }
    public class Root
    {
        public int count { get; set; }
        public string next { get; set; }
        public object previous { get; set; }
        public List<Result> results { get; set; }
    }

    public class Type2
    {
        public string name { get; set; }
        public string url { get; set; }
    }

    public class Type
    {
        public int slot { get; set; }
        public Type2 type { get; set; }
    }
    public class Root2
    {
        public int height { get; set; }
        public int id { get; set; }
        public List<Type> types { get; set; }
        public int weight { get; set; }
    }
}