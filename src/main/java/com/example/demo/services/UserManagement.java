package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.DAOUserTable;
import com.example.demo.entity.User;

@Service
public class UserManagement {
	@Autowired(required=false)
	private DAOUserTable dao;
	public  boolean addUser(User u) {
		if(dao.addUser(u)) return true;
		return false; 
	}
	public  boolean checkUserName(String name) {
		if(dao.isExistence(name)==null)
			return true;//数据库中不存在该用户名。
		return false;
	}

}
