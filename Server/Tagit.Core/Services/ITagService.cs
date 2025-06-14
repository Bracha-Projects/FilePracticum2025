﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.DTOs;
using Tagit.Core.Entities;

namespace Tagit.Core.Services
{
    public interface ITagService
    {
        Task<List<TagDTO>> GetAllTagsAsync();
        Task<TagDTO> GetTagByIdAsync(int id);
        Task<TagDTO> CreateTagAsync(string tagName, int fileId);
        Task<TagDTO> UpdateTagAsync(TagDTO tag);
        Task<bool> DeleteTagAsync(int id);
        Task<List<TagDTO>> GetTagsByUserIdAsync(int userId);
        Task<IEnumerable<TagDTO>> GetPopularTagsAsync();


    }
}
