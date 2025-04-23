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

namespace Tagit.Service.Services
{
    public class TagService : ITagService
    {
        private readonly ITagRepository _tagRepository;
        private readonly IMapper _mapper;
        public TagService(ITagRepository tagRepository, IMapper mapper)
        {
            _tagRepository = tagRepository;
            _mapper = mapper;
        }

        public async Task<List<TagDTO>> GetAllTagsAsync()
        {
            return _mapper.Map<List<TagDTO>>(await _tagRepository.GetAllTagsAsync());
        }

        public async Task<TagDTO> GetTagByIdAsync(int id)
        {
            return _mapper.Map<TagDTO>(await _tagRepository.GetTagByIdAsync(id));
        }

        public async Task<TagDTO> CreateTagAsync(TagDTO tag)
        {
            return _mapper.Map<TagDTO>(await _tagRepository.CreateTagAsync(_mapper.Map<Tag>(tag)));
        }

        public async Task<TagDTO> UpdateTagAsync(TagDTO tag)
        {
            return _mapper.Map<TagDTO>(await _tagRepository.UpdateTagAsync(_mapper.Map<Tag>(tag)));
        }

        public async Task<bool> DeleteTagAsync(int id)
        {
            return await _tagRepository.DeleteTagAsync(id);
        }

    }
}
