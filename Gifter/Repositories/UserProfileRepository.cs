using Gifter.Models;
using Gifter.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gifter.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, [Name], Email, ImageUrl, Bio, DateCreated
                  FROM UserProfile
              ORDER BY DateCreated";

                    var reader = cmd.ExecuteReader();

                    var posts = new List<UserProfile>();
                    while (reader.Read())
                    {
                        posts.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
                        });
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

    }
}
