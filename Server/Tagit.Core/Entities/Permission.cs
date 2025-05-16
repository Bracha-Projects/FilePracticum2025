using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Core.Entities
{
    public class Permission
    {
        [Key]
        public int PermissionId { get; set; }
        [MaxLength(255)]
        public string PermissionName { get; set; }
        [MaxLength(255)]
        public string Description { get; set; }
        public List<Role> Roles { get; set; } = new List<Role>();

    }
}
