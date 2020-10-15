using System;
using System.Collections.Generic;
using Gifter.Repositories;
using Gifter.Models;
using System.Text;
using System.Linq;

namespace Gifter.Tests.Mocks
{
    class InMemoryUserProfileRepository : IUserProfileRepository
    {
        private readonly List<UserProfile> _data;

        public List<UserProfile> InternalData
        {
            get
            {
                return _data;
            }
        }
        public InMemoryUserProfileRepository(List<UserProfile> startingData)
        {
            _data = startingData;
        }

        public void Add(UserProfile userProfile)
        {
            var lastUserProfile = _data.Last();
            userProfile.Id = lastUserProfile.Id + 1;
            _data.Add(userProfile);
        }

        public void Delete(int id)
        {
            var userProfileToDelete = _data.FirstOrDefault(u => u.Id == id);
            if (userProfileToDelete == null)
            {
                return;
            }

            _data.Remove(userProfileToDelete);
        }

        public List<UserProfile> GetAll()
        {
            return _data;
        }

        public UserProfile GetById(int id)
        {
            return _data.FirstOrDefault(u => u.Id == id);
        }

        public UserProfile GetByFirebaseUserId(string firebaseId)
        {
            return _data.FirstOrDefault(u => u.FirebaseUserId == firebaseId);
        }

        public UserProfile GetUserByIdWithPosts(int id)
        {
            return _data.FirstOrDefault(u => u.Id == id);
        }

        public void Update(UserProfile userProfile)
        {
            var postToUpdate = _data.FirstOrDefault(u => u.Id == userProfile.Id);

            if (postToUpdate == null)
            {
                return;
            }
        }
    }
}
