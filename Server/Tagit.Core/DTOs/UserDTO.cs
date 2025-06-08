using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Entities;

namespace Tagit.Core.DTOs
{
    public class UserDTO
    {
            public int Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Password { get; set; } 
            public string Email { get; set; }
            public int RootFolderId { get; set; }
            public RoleType Role { get; set; }
            public bool IsActive { get; set; }
            public string? ProfileImageUrl { get; set; }
            public DateTime? LastLoginAt { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
    }
}
