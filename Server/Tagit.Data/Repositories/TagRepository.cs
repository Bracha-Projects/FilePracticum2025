using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Entities;
using Tagit.Core.Repositories;

namespace Tagit.Data.Repositories
{
    public class TagRepository : ITagRepository
    {
        private readonly TagitDBContext _context; 

        public TagRepository(TagitDBContext context) 
        {
            _context = context;
        }
        public async Task<List<Tag>> GetTagsByUserIdAsync(int userId)
        {
            return await _context.Files
                .Where(f => f.OwnerId == userId)
                .SelectMany(f => f.FileTags)
                .Distinct()
                .ToListAsync();
        }

        public async Task<List<Tag>> GetAllTagsAsync()
        {
            return await _context.Tags.ToListAsync();
        }

        public async Task<Tag> GetTagByIdAsync(int id)
        {
            return await _context.Tags.FindAsync(id);
        }

        public async Task<Tag> CreateTagAsync(Tag tag)
        {
            _context.Tags.Add(tag);
            await _context.SaveChangesAsync();
            return tag;
        }

        public async Task<Tag> UpdateTagAsync(Tag tag)
        {
            _context.Entry(tag).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
                return tag;
            }
            catch (DbUpdateConcurrencyException)
            {
                return null; // Handle concurrency issues
            }
        }

        public async Task<bool> DeleteTagAsync(int id)
        {
            var tag = await _context.Tags.FindAsync(id);
            if (tag == null)
            {
                return false;
            }

            _context.Tags.Remove(tag);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Tag>> GetPopularTagsAsync()
        {
            var popularTags = await _context.Tags
                .Select(t => new
                {
                    Tag = t,
                    UsageCount = t.Files.Count
                })
                .OrderByDescending(t => t.UsageCount)
                .Take(20)
                .Select(t => t.Tag) 
                .ToListAsync();
            return popularTags;
        }
    }
}
