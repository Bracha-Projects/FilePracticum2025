using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Core.Models
{
    public class UserStatsModel
    {
        public int TotalFiles { get; set; }
        public long TotalSizeBytes { get; set; }
        public int TotalTags { get; set; }
        public int TotalFolders { get; set; }
    }
}
