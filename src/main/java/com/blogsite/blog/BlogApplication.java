package com.blogsite.blog;

import java.util.stream.Stream;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.blogsite.blog.model.Comment;
import com.blogsite.blog.model.Post;
import com.blogsite.blog.repository.CommentRepository;
import com.blogsite.blog.repository.PostRepository;

@SpringBootApplication
@EnableJpaAuditing
public class BlogApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogApplication.class, args);
	}
	
    @Bean
    ApplicationRunner init(PostRepository repository, CommentRepository comments) {
        return args -> {
            Stream.of("Post 1", "Post 2", "Post 3", "Post 4").forEach(text -> {
            	Post post = new Post();
            	post.setText(text);
            	repository.save(post);
            	
            	Comment comment = new Comment();
            	comment.setText("some comment");
            	comment.setPost(post);
            	
            	comments.save(comment);
            });
            repository.findAll().forEach(System.out::println);
        };
    }
}
