package com.blogsite.blog;

import java.util.stream.Stream;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.blogsite.blog.model.Post;
import com.blogsite.blog.repository.PostRepository;

@SpringBootApplication
public class BlogApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogApplication.class, args);
	}
	
    @Bean
    ApplicationRunner init(PostRepository repository) {
        return args -> {
            Stream.of("Post 1", "Post 2", "Post 3", "Post 4").forEach(text -> {
            	Post post = new Post();
            	post.setText(text);
            	repository.save(post);
            });
            repository.findAll().forEach(System.out::println);
        };
    }
}
