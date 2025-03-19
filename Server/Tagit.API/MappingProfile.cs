using AutoMapper;
using Tagit.Core.DTOs;
using Tagit.Core.Entities;
using Tagit.Core.PostModels;
using File = Tagit.Core.Entities.File;

namespace Tagit.API
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<UserPostModel, UserDTO>().ReverseMap();
            CreateMap<File, FileDTO>().ReverseMap();
            CreateMap<FilePostModel, File>().ReverseMap();
            CreateMap<Tag, TagPostModel>().ReverseMap();
            CreateMap<Tag, TagDTO>().ReverseMap();
        }
    }
}
