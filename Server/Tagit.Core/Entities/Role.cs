using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Core.Entities
{
    public class Role
    {
        [Key]
        public int RoleId { get; set; }
        [MaxLength(255)]
        public string RoleName { get; set; }
        [MaxLength(255)]
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public List<Permission> Permissions { get; set; }
        public List<User> Users { get; set; } 
        public Role()
        {
            Permissions = new List<Permission>();
            Users = new List<User>();
        }
    }
}
