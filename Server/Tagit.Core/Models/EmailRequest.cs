﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Core.Models
{
    public class EmailRequest
    {
        public string To { get; set; }           
        public string Subject { get; set; }      
        public string Body { get; set; }
    }
}
