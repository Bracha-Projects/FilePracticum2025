﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Core.Entities
{
    public class Log
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        [MaxLength(255)]
        public string Action { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        // connections
        public User User { get; set; }
    }
}
