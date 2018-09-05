package com.blogsite.blog.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "posts")
@Getter @Setter
@NoArgsConstructor
@ToString @EqualsAndHashCode
public class Post extends AuditModel{
	@Id 
	@GeneratedValue
	private Long id;
	
	@NonNull 
	@Lob
	private String text;
}
