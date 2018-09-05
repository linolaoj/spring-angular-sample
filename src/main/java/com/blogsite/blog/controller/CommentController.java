package com.blogsite.blog.controller;

import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.boot.json.JsonParserFactory;
import org.springframework.hateoas.Resource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.blogsite.blog.model.Comment;
import com.blogsite.blog.model.Post;
import com.blogsite.blog.repository.CommentRepository;
import com.blogsite.blog.repository.PostRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CommentController {
	private CommentRepository repository;
	private PostRepository postRepository;	
	
	public CommentController(CommentRepository repository, PostRepository postRepository) {
		this.repository = repository;
		this.postRepository = postRepository;
	}

	@GetMapping("posts/{id}/comments") 
	public Collection<Comment> commentList(@PathVariable Long id) {
		return this.repository.findByPostId(id, null)
				.stream().collect(Collectors.toList());
	}
	
	@PostMapping("posts/{id}/comments") 
	public Resource<Comment> commentList(@PathVariable Long id, @RequestBody String content) {
		Map<String, Object> contentJson = JsonParserFactory.getJsonParser().parseMap(content);
		
		String text = (String) contentJson.get("text");

		Post post = postRepository.findById(id).get();
		
		Comment comment = new Comment();
		comment.setText(text);
		comment.setPost(post);
		
		repository.save(comment);
		
		return new Resource<>(comment);
	}
	
}
