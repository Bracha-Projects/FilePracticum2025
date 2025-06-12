using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Core.Entities
{
    public class Activity
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public string Action { get; set; } 
        public string? Metadata { get; set; } 

        public DateTime CreatedAt { get; set; }

        public User? User { get; set; } 
    }
}
