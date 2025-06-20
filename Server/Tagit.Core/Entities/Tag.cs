using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Core.Entities
{
    public class Tag
    {
        public int Id { get; set; }

        [MaxLength(255)]
        public string TagName { get; set; }

        public List<File> Files { get; set; } 
        public Tag()
        {
            Files = new List<File>();
        }
    }
}
