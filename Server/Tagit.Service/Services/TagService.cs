using Amazon.S3.Model;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.DTOs;
using Tagit.Core.Entities;
using Tagit.Core.Repositories;
using Tagit.Core.Services;
using File = Tagit.Core.Entities.File;
using Tag = Tagit.Core.Entities.Tag;

namespace Tagit.Service.Services
{
    public class TagService : ITagService
    {
        private readonly ITagRepository _tagRepository;
        private readonly IMapper _mapper;
        private readonly IFileRepository _fileRepository;
        public TagService(ITagRepository tagRepository, IMapper mapper, IFileRepository fileRepository)
        {
            _tagRepository = tagRepository;
            _mapper = mapper;
            _fileRepository = fileRepository;
        }

        public async Task<List<TagDTO>> GetAllTagsAsync()
        {
            return _mapper.Map<List<TagDTO>>(await _tagRepository.GetAllTagsAsync());
        }

        public async Task<TagDTO> GetTagByIdAsync(int id)
        {
            return _mapper.Map<TagDTO>(await _tagRepository.GetTagByIdAsync(id));
        }

        public async Task<TagDTO> CreateTagAsync(string tagName, int fileId)
        {
            var file = await _fileRepository.GetFileByIdAsync(fileId);
            var tag = new Tag
            {
                TagName = tagName,
                Files = new List<File> { file },
            };
            return _mapper.Map<TagDTO>(await _tagRepository.CreateTagAsync(tag));
        }

        public async Task<TagDTO> UpdateTagAsync(TagDTO tag)
        {
            return _mapper.Map<TagDTO>(await _tagRepository.UpdateTagAsync(_mapper.Map<Tag>(tag)));
        }

        public async Task<bool> DeleteTagAsync(int id)
        {
            return await _tagRepository.DeleteTagAsync(id);
        }

        public async Task<List<TagDTO>> GetTagsByUserIdAsync(int userId)
        {
            var tags = await _tagRepository.GetTagsByUserIdAsync(userId);
            return _mapper.Map<List<TagDTO>> (tags);

        }

        public async Task<IEnumerable<TagDTO>> GetPopularTagsAsync()
        {
            var tags = await _tagRepository.GetPopularTagsAsync();
            return _mapper.Map<IEnumerable<TagDTO>>(tags);
        }

    }
}
