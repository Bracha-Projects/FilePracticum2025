using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Core.Models
{
    public class FileSearchModel
    {
            public int OwnerId { get; set; }
            public int? FolderId { get; set; }
            public List<string>? Tags { get; set; }
            public DateTime? FromDate { get; set; }
            public DateTime? ToDate { get; set; }
            public string? FileNameContains { get; set; }
    }
}
