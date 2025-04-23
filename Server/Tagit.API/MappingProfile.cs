using AutoMapper;
using Tagit.API.PostModels;
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
            CreateMap<FilePostModel, FileDTO>().ReverseMap();
            CreateMap<TagDTO, TagPostModel>().ReverseMap();
            CreateMap<Tag, TagDTO>().ReverseMap();
            CreateMap<Folder, FolderDTO>()
                .ForMember(dest => dest.OwnerName, opt => opt.MapFrom(src => src.Owner.FirstName))
                .ForMember(dest => dest.ParentFolderName, opt => opt.MapFrom(src => src.ParentFolder.Name)).ReverseMap();

            CreateMap<FolderPostModel, Folder>().ReverseMap();
            CreateMap<FolderPostModel, FolderDTO>().ReverseMap();
        }
    }
}
