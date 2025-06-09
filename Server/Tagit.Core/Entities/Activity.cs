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
        public string Action { get; set; } // לדוגמה: "uploaded file", "deleted folder", וכו'
        public string? Metadata { get; set; } // JSON או טקסט חופשי אם תרצי

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public User? User { get; set; } // ניווט אופציונלי 
    }
}
