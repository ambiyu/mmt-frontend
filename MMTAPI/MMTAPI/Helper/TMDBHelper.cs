using MMTAPI.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MMTAPI.Helper
{
    public class TMDBHelper
    {
        public static void test() {
            Console.WriteLine(getMediaById(1399, "tv"));

            // Pause the program execution
            Console.ReadLine();
        }

        private static String getTitle(dynamic jsonObj) {
            if (jsonObj["title"] != null) {
                return jsonObj["title"];
            } else if (jsonObj["name"] != null) {
                return jsonObj["name"];
            } else if (jsonObj["original_title"] != null) {
                return jsonObj["original_title"];
            } else return "$Title";
        }

        public static Media getMediaById(int media_id, String media_type) {
            String APIKey = "5001541809100a7e7385e7c891e817d2";
            String APIUrl = "https://api.themoviedb.org/3/" + media_type + "/" + media_id + "?api_key=" + APIKey;

            String movieInfoJson = new WebClient().DownloadString(APIUrl);
            dynamic jsonObj = JsonConvert.DeserializeObject<dynamic>(movieInfoJson);

            String release_date;
            if (media_type.Equals("tv")) {
                release_date = jsonObj["first_air_date"];
            } else {
                release_date = jsonObj["release_date"];
            }

            String release_year = release_date.Substring(0, 4);
            String overview = jsonObj["overview"];
            String status = jsonObj["status"];
            String poster_path = jsonObj["poster_path"];

            Media media = new Media {
                MediaId = media_id,
                MediaType = media_type,
                Title = getTitle(jsonObj),
                ReleaseDate = release_date,
                ReleaseYear = release_year,
                Overview = overview,
                Status = status,
                PosterPath = poster_path
            };

            return media;
        }
    }
}
