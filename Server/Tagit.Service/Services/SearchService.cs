using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.DTOs;
using Tagit.Core.Models;
using Tagit.Core.Repositories;
using Tagit.Core.Services;

namespace Tagit.Service.Services
{
    public class SearchService : ISearchService
    {
        private readonly ISearchRepository _searchRepository;
        private readonly IMapper _mapper; 
        public SearchService(ISearchRepository searchRepository, IMapper mapper)
        {
            _searchRepository = searchRepository;
            _mapper = mapper;
        }
        public async Task<List<FileDTO>> SearchFilesAsync(FileSearchModel searchModel)
        {
            var files = await _searchRepository.SearchFilesAsync(searchModel);
            return _mapper.Map<List<FileDTO>>(files);
        }
    }
}
