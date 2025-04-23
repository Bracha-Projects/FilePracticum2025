using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Core.Entities
{
    public class Folder
    {
        public int Id { get; set; } // מזהה ייחודי
        public string Name { get; set; } // שם התיקיה
        public int? ParentFolderId { get; set; } // תיקיית אב (null אם שורש)
        public int OwnerId { get; set; } // בעל התיקיה
        public DateTime CreatedAt { get; set; } // תאריך יצירה
        public DateTime UpdatedAt { get; set; } // תאריך עדכון אחרון
        public bool IsDeleted { get; set; } // דגל למחיקה רכה

        //connections
        public User Owner { get; set; }
        public Folder ParentFolder { get; set; }
    }
}
