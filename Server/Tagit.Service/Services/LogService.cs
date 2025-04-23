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
    public class LogService : ILogService
    {
        private readonly ILogRepository _logRepository;
        private readonly IMapper _mapper;

        public LogService(ILogRepository logRepository, IMapper mapper)
        {
            _logRepository = logRepository;
            _mapper = mapper;
        }

        public async Task<List<LogDTO>> GetAllLogsAsync()
        {
            return _mapper.Map<List<LogDTO>>(await _logRepository.GetAllLogsAsync());
        }

        public async Task<LogDTO> GetLogByIdAsync(int id)
        {
            return _mapper.Map<LogDTO>(await _logRepository.GetLogByIdAsync(id));
        }
    }
}
