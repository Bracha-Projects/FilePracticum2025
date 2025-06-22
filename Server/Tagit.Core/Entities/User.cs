using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Core.Entities
{
    public class User
    {
        public int Id { get; set; }
        [MaxLength(255)]
        public string FirstName { get; set; }
        [MaxLength(255)]
        public string LastName { get; set; }
        [MaxLength(255)]
        public string Email { get; set; }
        [MaxLength(255)]
        public string? PasswordHash { get; set; }
        public RoleType Role { get; set; }
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; } 
        public bool IsActive { get; set; } 
        [MaxLength(255)]
        public string? ProfileImageUrl { get; set; } 
        public DateTime? LastLoginAt { get; set; }
        public int RootFolderId { get; set; }
        public string? Provider { get; set; } 
        public string? ProviderId { get; set; } 


        public List<File> Files { get; set; }
        public List<Log> Logs { get; set; }
        public List<Role> Roles { get; set; }

        public User()
        {
            Roles = new List<Role>();
        }

    }
}
