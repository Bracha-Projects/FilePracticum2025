using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Entities;
using Tagit.Core.Models;
using Tagit.Core.Repositories;
using File = Tagit.Core.Entities.File;

namespace Tagit.Data.Repositories
{
    public class SearchRepository : ISearchRepository
    {
        private readonly TagitDBContext _context;
        public SearchRepository(TagitDBContext context)
        {
            _context = context; 
        }
        public async Task<List<File>> SearchFilesAsync(FileSearchModel model)
        {
            var query = _context.Files
                .Include(f => f.FileTags)
                .Where(f => f.OwnerId == model.OwnerId && !f.IsDeleted);

            if (!string.IsNullOrEmpty(model.Tag))
                query = query.Where(f => f.FileTags.Any(t => t.TagName == model.Tag));

            if (!string.IsNullOrEmpty(model.FileNameContains))
                query = query.Where(f => f.FileName.Contains(model.FileNameContains));

            if (model.FromDate.HasValue)
                query = query.Where(f => f.DateCreated >= model.FromDate.Value);

            if (model.ToDate.HasValue)
                query = query.Where(f => f.DateCreated <= model.ToDate.Value);

            return await query.ToListAsync();
        }

    }
}
