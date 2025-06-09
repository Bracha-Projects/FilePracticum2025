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
    public class ActivityService : IActivityService
    {
        private readonly IActivityRepository _repository;
        private readonly IMapper _mapper;

        public ActivityService(IActivityRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task LogActivityAsync(int userId, string action, string? metadata = null)
        {
            var activity = new Activity
            {
                UserId = userId,
                Action = action,
                Metadata = metadata,
                CreatedAt = DateTime.UtcNow
            };

            await _repository.AddAsync(activity);
        }

        public async Task<List<ActivityDTO>> GetRecentByUserAsync(int userId, int limit)
        {
            var activities = await _repository.GetRecentByUserAsync(userId, limit);
            return _mapper.Map<List<ActivityDTO>>(activities);
        }
    }
}
