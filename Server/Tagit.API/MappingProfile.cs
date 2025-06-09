using AutoMapper;
using Tagit.API.PostModels;
using Tagit.API.Resolvers;
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
            CreateMap<File, FileDTO>()
                .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.FileTags.Select(t => t.TagName).ToList()));
            CreateMap<FileDTO, File>()
                 .ForMember(dest => dest.FileTags, opt => opt.MapFrom<TagsFromDtoResolver>());
            CreateMap<FilePostModel, FileDTO>().ReverseMap();
            CreateMap<TagDTO, TagPostModel>().ReverseMap();
            
            CreateMap<Tag, TagDTO>().ReverseMap();

            CreateMap<Folder, FolderDTO>();

            CreateMap<FolderDTO, Folder>()
                .ForMember(dest => dest.Owner, opt => opt.Ignore())          
                .ForMember(dest => dest.ParentFolder, opt => opt.Ignore())  
                .ForMember(dest => dest.SubFolders, opt => opt.Ignore())    
                .ForMember(dest => dest.Files, opt => opt.Ignore());

            CreateMap<FolderPostModel, Folder>().ReverseMap();
            CreateMap<FolderPostModel, FolderDTO>().ReverseMap();
            CreateMap<ActivityPostModel, ActivityDTO>();
            CreateMap<Activity, ActivityDTO>();
        }
    }
}
