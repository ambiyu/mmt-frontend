using MMTAPI.Controllers;
using MMTAPI.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
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
                Title = "Yes",
                PosterPath = "/a23132dsadsa",
                ReleaseDate = "2000-12-23",
                ReleaseYear = "2000",
                Overview = "HAHA no",
                Status = "Released"
            },
            new Media()
            {
                MediaId = 299534,
                MediaType = "movie",
                Title = "Avengers",
                PosterPath = "/path123",
                ReleaseDate = "2015-03-23",
                ReleaseYear = "2015",
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

                Assert.AreEqual(media[0].Title, result.Value.First().Title);
                Assert.AreEqual(media[1].Title, result.Value.Last().Title);
            }
        }

        /*
        [TestMethod]
        public async Task TestGetFavourites() {
            using (var context = new MyMovieTrackerContext(options)) {
                context.Users.Add(new Users() {
                    UserId = 1,
                    Username = "hello"
                });

                MediaController mediaController = new MediaController(context);
                ActionResult<IEnumerable<Media>> result = await mediaController.GetFavourites(1);
                Assert.IsNull(result);

                context.UserFavourites.Add(new UserFavourites() {
                    UserId = 1,
                    MediaType = "tv",
                    MediaId = 1399
                });

                result = await mediaController.GetFavourites(1);
                Assert.IsNotNull(result);
            }
        }
        */

        [TestMethod]
        public async Task TestGetSuccessful() {
            using (var context = new MyMovieTrackerContext(options)) {
                MediaController mediaController = new MediaController(context);

                ActionResult<Media> result = await mediaController.GetMedia("tv", 1399);

                Assert.IsNotNull(result.Value);
                Assert.AreEqual(media[0].Title, result.Value.Title);
                
                result = await mediaController.GetMedia("movie", 299534);

                Assert.IsNotNull(result.Value);
                Assert.AreEqual(media[1].Title, result.Value.Title);
            }
        }

        [TestMethod]
        public async Task TestGetOnInvalidMedia() {
            using (var context = new MyMovieTrackerContext(options)) {
                MediaController mediaController = new MediaController(context);

                ActionResult<Media> result = await mediaController.GetMedia("tv", 123);

                Assert.IsNull(result.Value);
                Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
            }
        }

        [TestMethod]
        public async Task TestSuccessfulPost() {
            using (var context = new MyMovieTrackerContext(options)) {
                MediaController mediaController = new MediaController(context);
                MediaController.MediaDTO dto = new MediaController.MediaDTO() {
                    media_id = 335983,
                    media_type = "movie"
                };

                ActionResult<Media> result = await mediaController.PostMedia(dto);

                Assert.IsNotNull(result);
                Assert.IsNotNull(result.Result);
                Assert.IsInstanceOfType(result.Result, typeof(CreatedAtActionResult));
            }
        }

        [TestMethod]
        public async Task TestPostConflict() {
            using (var context = new MyMovieTrackerContext(options)) {
                MediaController mediaController = new MediaController(context);

                MediaController.MediaDTO dto = new MediaController.MediaDTO() {
                    media_id = 1399,
                    media_type = "tv"
                };

                try {
                    ActionResult<Media> result = await mediaController.PostMedia(dto);
                    Assert.Fail();
                } catch (ArgumentException e) {
                    Console.WriteLine(e.Message);
                }
            }
        }

        [TestMethod]
        public async Task TestDelete() {
            using (var context = new MyMovieTrackerContext(options)) {
                MediaController mediaController = new MediaController(context);

                ActionResult<Media> result = await mediaController.DeleteMedia("movie", 299534);

                Assert.IsNotNull(result);
                Assert.IsNotNull(result.Value);
                Assert.AreEqual(media[1].Title, result.Value.Title);
                Assert.AreEqual(media[1].MediaId, result.Value.MediaId);
                Assert.AreEqual(media[1].MediaType, result.Value.MediaType);
            }
        }

        [TestMethod]
        public async Task TestDeleteNotFound() {
            using (var context = new MyMovieTrackerContext(options)) {
                MediaController mediaController = new MediaController(context);

                ActionResult<Media> result = await mediaController.DeleteMedia("tv", 123);

                Assert.IsNotNull(result);
                Assert.IsNotNull(result.Result);
                Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
            }
        }
    }
}
