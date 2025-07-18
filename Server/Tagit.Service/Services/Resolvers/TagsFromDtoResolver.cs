﻿using AutoMapper;
using Tagit.Core.DTOs;
using Tagit.Core.Entities;
using Tagit.Core.Repositories;
using File = Tagit.Core.Entities.File;

public class TagsFromDtoResolver : IValueResolver<FileDTO, File, List<Tag>>
{
    private readonly ITagRepository _tagRepository;

    public TagsFromDtoResolver(ITagRepository tagRepository)
    {
        _tagRepository = tagRepository;
    }

    public List<Tag> Resolve(FileDTO source, File destination, List<Tag> destMember, ResolutionContext context)
    {
        var tags = new List<Tag>();

        foreach (var tagDto in source.Tags ?? Enumerable.Empty<TagDTO>())
        {
            var existingTag = _tagRepository.GetAllTagsAsync().Result
                .FirstOrDefault(t => t.Id == tagDto.Id);

            if (existingTag != null)
            {
                tags.Add(existingTag);
            }
            else
            {
                tags.Add(new Tag
                {
                    Id = tagDto.Id,
                    TagName = tagDto.TagName
                });
            }
        }

        return tags;
    }
}
