package com.blogsite.blog.controller;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blogsite.blog.model.Post;
import com.blogsite.blog.repository.PostRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PostController {
	
	private PostRepository repository;
	
	public PostController(PostRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping("/post-list")
	@CrossOrigin(origins = "http://localhost:4200")
	public Collection<Post> postList() {
	    return repository.findAll().stream()
	            .collect(Collectors.toList());
	}

}
