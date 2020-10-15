using System;
using System.Collections.Generic;
using System.Linq;
using Gifter.Models;
using Gifter.Controllers;
using Gifter.Tests.Mocks;
using System.Text;
using Xunit;
using Microsoft.AspNetCore.Mvc;

namespace Gifter.Tests
{
    public class UserProfileControllerTests
    {
        [Fact]
        public void Get_Returns_All_UserProfiles()
        {
            var userProfileCount = 20;
            var userProfiles = CreateTestUserProfiles(userProfileCount);

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            var result = controller.Get();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualUserProfiles = Assert.IsType<List<UserProfile>>(okResult.Value);

            Assert.Equal(userProfileCount, actualUserProfiles.Count);
            Assert.Equal(userProfiles, actualUserProfiles);
        }

        [Fact]
        public void Get_By_Id_Returns_Correct_UserProfile()
        {
            var testUserId = 99;
            var userProfiles = CreateTestUserProfiles(5);
            userProfiles[0].Id = testUserId;

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            var result = controller.Get(testUserId);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualUserProfile = Assert.IsType<UserProfile>(okResult.Value);

            Assert.Equal(testUserId, actualUserProfile.Id);

        }

        [Fact]
        public void Post_Method_Add_A_New_UserProfile()
        {
            var userProfileCount = 20;
            var userProfiles = CreateTestUserProfiles(userProfileCount);

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            var newUserProfile = new UserProfile()
            {
                Name = "Name",
                Email = "Email@email.com",
                FirebaseUserId = "abcdefghijklmnopqrstuvwxyzaa",
                ImageUrl = "http://user.image.com",
                Bio = "I am the very model of a modern major general.",
                DateCreated = DateTime.Today
            };

            controller.Post(newUserProfile);

            Assert.Equal(userProfileCount + 1, repo.InternalData.Count);
        }

        [Fact]
        public void Put_Method_Updates_A_Post()
        {
            var testUserProfileId = 99;
            var userProfiles = CreateTestUserProfiles(5);
            userProfiles[0].Id = testUserProfileId;

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            var userToUpdate = new UserProfile()
            {
                Id = testUserProfileId,
                Name = "Name",
                Email = "Email@email.com",
                FirebaseUserId = "abcdefghijklmnopqrstuvwxyzaa",
                ImageUrl = "http://user.image.com",
                Bio = "I am the very model of a modern major general.",
                DateCreated = DateTime.Today
            };

            controller.Put(testUserProfileId, userToUpdate);

            var userFromDb = repo.InternalData.FirstOrDefault(u => u.Id == testUserProfileId);
            Assert.NotNull(userFromDb);

            Assert.Equal(userToUpdate.Name, userFromDb.Name);
            Assert.Equal(userToUpdate.Email, userFromDb.Email);
            Assert.Equal(userToUpdate.FirebaseUserId, userFromDb.FirebaseUserId);
            Assert.Equal(userToUpdate.ImageUrl, userFromDb.ImageUrl);
            Assert.Equal(userToUpdate.Bio, userFromDb.Bio);
            Assert.Equal(userToUpdate.DateCreated, userFromDb.DateCreated);
        }

        [Fact]
        public void Delete_Method_Removes_A_UserProfile()
        {
            var testUserProfileId = 99;
            var userProfiles = CreateTestUserProfiles(5);
            userProfiles[0].Id = testUserProfileId;

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            controller.Delete(testUserProfileId);

            var userFromDb = repo.InternalData.FirstOrDefault(u => u.Id == testUserProfileId);
            Assert.Null(userFromDb);
        }


        private List<UserProfile> CreateTestUserProfiles(int count)
        {
            var userProfiles = new List<UserProfile>();
            for (int i = 1; i <= count; i++)
            {
                userProfiles.Add(new UserProfile()
                {
                    Id = 1,
                    Name = $"User {i}",
                    Email = $"user{i}@test.com",
                    ImageUrl = $"http://userprofile.image.com/{i}",
                    DateCreated = DateTime.Today.AddDays(-i),
                    Bio = "About user {i}",
                    FirebaseUserId = $"abcdefghijklmnopqrstuvwxyz{100 - i}"
                });
            }

            return userProfiles;
        }
    }
}
