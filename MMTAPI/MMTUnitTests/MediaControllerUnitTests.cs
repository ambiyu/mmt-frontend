using MMTAPI.Controllers;
using MMTAPI.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace MMTUnitTests
{
    [TestClass]
    public class MediaControllerUnitTests {
        public static readonly DbContextOptions<MyMovieTrackerContext> options
            = new DbContextOptionsBuilder<MyMovieTrackerContext>()
            .UseInMemoryDatabase(databaseName: "testDatabase")
            .Options;

        public static readonly IList<Media> media = new List<Media>
        {
            new Media()
            {
                MediaId = 1399,
                MediaType = "tv",
                Title = "Ayylmao",
                PosterPath = "/l23132dsadsa",
                ReleaseDate = "1999-12-23",
                ReleaseYear = "1999",
                Overview = "HAHA",
                Status = "Released"
            },
            new Media()
            {
                MediaId = 299534,
                MediaType = "movie",
                Title = "Avengers",
                PosterPath = "/323213123",
                ReleaseDate = "2019-12-23",
                ReleaseYear = "2019",
                Overview = "too good",
                Status = "Released"
            }
        };

        [TestInitialize]
        public void SetupDb() {
            using (var context = new MyMovieTrackerContext(options)) {
                // populate the db
                context.Media.Add(media[0]);
                context.Media.Add(media[1]);
                context.SaveChanges();
            }
        }

        [TestCleanup]
        public void ClearDb() {
            using (var context = new MyMovieTrackerContext(options)) {
                // clear the db
                context.Media.RemoveRange(context.Media);
                context.SaveChanges();
            };
        }

        [TestMethod]
        public async Task TestGetAll() {
            using (var context = new MyMovieTrackerContext(options)) {
                MediaController mediaController = new MediaController(context);
                ActionResult<IEnumerable<Media>> result = await mediaController.GetMedia();

                Assert.IsNotNull(result);
            }
        }



    }
}
