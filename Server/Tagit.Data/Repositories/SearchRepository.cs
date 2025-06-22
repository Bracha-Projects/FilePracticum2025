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

        private async Task<List<int>> GetDescendantFolderIdsAsync(int rootFolderId)
        {
            var result = new List<int> { rootFolderId };
            var queue = new Queue<int>();
            queue.Enqueue(rootFolderId);

            while (queue.Any())
            {
                var current = queue.Dequeue();
                var children = await _context.Folders
                    .Where(f => f.ParentFolderId == current)
                    .Select(f => f.Id)
                    .ToListAsync();

                foreach (var child in children)
                {
                    result.Add(child);
                    queue.Enqueue(child);
                }
            }

            return result;
        }

        public async Task<List<File>> SearchFilesAsync(FileSearchModel model)
        {
            var query = _context.Files
                .Include(f => f.FileTags) 
                .Where(f => f.OwnerId == model.OwnerId && !f.IsDeleted);

            // סינון לפי מזהי תגיות
            if (model.TagsIds != null && model.TagsIds.Any())
            {
                query = query.Where(f =>
                    model.TagsIds.All(tagId => f.FileTags.Any(t => t.Id == tagId))
                );
            }

            // סינון לפי שם קובץ או שם תגית
            if (!string.IsNullOrEmpty(model.FileNameContains))
            {
                var term = model.FileNameContains.ToLower();
                query = query.Where(f =>
                    f.FileName.ToLower().Contains(term) ||
                    f.FileTags.Any(t => t.TagName.ToLower().Contains(term))
                );
            }

            if (model.FromDate.HasValue)
            {
                query = query.Where(f => f.DateCreated >= model.FromDate.Value);
            }

            if (model.ToDate.HasValue)
            {
                query = query.Where(f => f.DateCreated <= model.ToDate.Value);
            }

            if (model.FolderId.HasValue)
            {
                var folderIds = await GetDescendantFolderIdsAsync(model.FolderId.Value);
                folderIds.Add(model.FolderId.Value); 
                query = query.Where(f => folderIds.Contains(f.FolderId));
            }

            return await query.ToListAsync();
        }




    }
}
