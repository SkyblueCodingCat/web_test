package com.example.demo.entity;

import org.springframework.stereotype.Service;

// 一个标准的Bean实体类
@Service
public class User {
	private String userName;
	private String passWord;
	private String tell;
	public User(String userName, String passWord, String tell) {
		super();
		this.userName = userName;
		this.passWord = passWord;
		this.tell = tell;
	}
	public User() {
		super();
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassWord() {
		return passWord;
	}
	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}
	public String getTell() {
		return tell;
	}
	public void setTell(String tell) {
		this.tell = tell;
	}
	@Override
	public String toString() {
		return "User [userName=" + userName + ", passWord=" + passWord + ", tell=" + tell + "]";
	}
	
}
