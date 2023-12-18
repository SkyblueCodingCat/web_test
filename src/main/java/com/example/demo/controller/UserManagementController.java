package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.services.UserManagement;

//@Controller
//@ResponseBody
@RestController
@RequestMapping("/user")
public class UserManagementController {
	@Autowired
	private UserManagement um;
	@RequestMapping("/userNameCheck")
	//@RequestMapping(value = "userNameCheck", method= RequestMethod.GET)
	public String checkUserName(String name)
	 {
		
		String returnString="数据库异常";
		try{if(um.checkUserName(name)) returnString="ok";
			else returnString="err";
		}catch(Exception e) {}
		return returnString;
	}
	@RequestMapping("/register")
	public String register(@RequestBody User user ) {
		System.out.println(user.toString());
		//return um.addUser(user);
		String returnString="数据库异常";
		try{if(um.addUser(user)) returnString="ok";
			else  returnString="err";
		}catch(Exception e) {}
		return returnString;
	}

}
