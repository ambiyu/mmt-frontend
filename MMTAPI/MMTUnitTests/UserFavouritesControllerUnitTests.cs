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
    public class UserFavouritesControllerUnitTests {
        public static readonly DbContextOptions<MyMovieTrackerContext> options
            = new DbContextOptionsBuilder<MyMovieTrackerContext>()
            .UseInMemoryDatabase(databaseName: "testDatabase")
            .Options;

        public static readonly IList<UserFavourites> fav = new List<UserFavourites>
        {
            new UserFavourites()
            {
                UserId = 5,
                MediaType = "tv",
                MediaId = 123
            },
            new UserFavourites()
            {
                UserId = 25,
                MediaType = "movie",
                MediaId = 1023
            }
        };

        [TestInitialize]
        public void SetupDb() {
            using (var context = new MyMovieTrackerContext(options)) {
                // populate the db
                context.UserFavourites.Add(fav[0]);
                context.UserFavourites.Add(fav[1]);
                context.SaveChanges();
            }
        }

        [TestCleanup]
        public void ClearDb() {
            using (var context = new MyMovieTrackerContext(options)) {
                // clear the db
                context.UserFavourites.RemoveRange(context.UserFavourites);
                context.SaveChanges();
            };
        }

        [TestMethod]
        public async Task TestFavouritesGetAll() {
            using (var context = new MyMovieTrackerContext(options)) {
                UserFavouritesController favController = new UserFavouritesController(context);

                ActionResult<IEnumerable<UserFavourites>> result = await favController.GetUserFavourites();

                Assert.AreEqual(fav[0].UserId, result.Value.First().UserId);
                Assert.AreEqual(fav[0].MediaType, result.Value.First().MediaType);
                Assert.AreEqual(fav[0].MediaId, result.Value.First().MediaId);

                Assert.AreEqual(fav[1].UserId, result.Value.Last().UserId);
                Assert.AreEqual(fav[1].MediaType, result.Value.Last().MediaType);
                Assert.AreEqual(fav[1].MediaId, result.Value.Last().MediaId);
            }
        }

        [TestMethod]
        public async Task TestFavouritesGet() {
            using (var context = new MyMovieTrackerContext(options)) {
                UserFavouritesController favController = new UserFavouritesController(context);

                ActionResult<UserFavourites> result = await favController.GetUserFavourites(5, "tv", 123);

                Assert.AreEqual(fav[0].UserId, result.Value.UserId);
                Assert.AreEqual(fav[0].MediaType, result.Value.MediaType);
                Assert.AreEqual(fav[0].MediaId, result.Value.MediaId);
            }
        }

        [TestMethod]
        public async Task TestFavouritesGetNotFound() {
            using (var context = new MyMovieTrackerContext(options)) {
                UserFavouritesController favController = new UserFavouritesController(context);

                var result = await favController.GetUserFavourites(123213, "tv", 33323);

                Assert.IsNotNull(result);
                Console.WriteLine(result.Result);
                Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
            }
        }

        [TestMethod]
        public async Task TestFavouritesPost() {
            using (var context = new MyMovieTrackerContext(options)) {
                UserFavouritesController favController = new UserFavouritesController(context);

                UserFavourites fav = new UserFavourites() {
                    UserId = 8,
                    MediaType = "tv",
                    MediaId = 100
                };

                ActionResult<UserFavourites> result = await favController.PostUserFavourites(fav);

                Assert.IsNotNull(result);
                Assert.IsNotNull(result.Result);
                Assert.IsInstanceOfType(result.Result, typeof(CreatedAtActionResult));
            }
        }

        [TestMethod]
        public async Task TestFavouritesPostConflict() {
            using (var context = new MyMovieTrackerContext(options)) {
                UserFavouritesController favController = new UserFavouritesController(context);

                UserFavourites fav = new UserFavourites() {
                    UserId = 5,
                    MediaType = "tv",
                    MediaId = 123
                };

                try {
                    ActionResult<UserFavourites> result = await favController.PostUserFavourites(fav);
                    Assert.Fail();
                } catch (ArgumentException e) {
                    Console.WriteLine(e.Message);
                }
            }
        }

        [TestMethod]
        public async Task TestFavouritesDelete() {
            using (var context = new MyMovieTrackerContext(options)) {
                UserFavouritesController favController = new UserFavouritesController(context);

                var result = await favController.DeleteUserFavourites(25, "movie", 1023);

                Assert.IsNotNull(result);
                Assert.IsNotNull(result.Value);
                Assert.AreEqual(fav[1].UserId, result.Value.UserId);
                Assert.AreEqual(fav[1].MediaId, result.Value.MediaId);
                Assert.AreEqual(fav[1].MediaType, result.Value.MediaType);
            }
        }

        [TestMethod]
        public async Task TestFavouritesDeleteNotFound() {
            using (var context = new MyMovieTrackerContext(options)) {
                UserFavouritesController favController = new UserFavouritesController(context);

                var result = await favController.DeleteUserFavourites(999, "movie", 99);

                Assert.IsNotNull(result);
                Assert.IsNotNull(result.Result);
                Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
            }
        }
    }
}
