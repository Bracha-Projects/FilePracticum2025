﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Core.Entities
{
    public class PasswordResetToken
    {
        public int Id { get; set; }
        public Guid Token { get; set; }
        public string Email { get; set; }
        public DateTime Expiration { get; set; }
    }
}
