package com.example.demo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.example.demo.entity.User;





/*@Mapper注解的意思：当客户代码需要DAOUserTable实现类的对象时，会自动提供该接口的实现类，
* 实际上底层用动态代理方式,用户可以用以下方式，实现功能，
* DAOUserTable dao;声明一个接口，实际上，系统自动注入一个该接口实现类的对象。
* 则，可以有：dao.addUser(new User());以前讲过的自己的DAO层代码不需要写，1行都不需要。
* 
* 
*/
@Mapper
public interface DAOUserTable {
	//String sql="insert into tb_user(userName,password,tell) values(?,?,?)";
		//采用注解方法，实际上把DAO层与相应的mapper.xml合成了。
		@Insert("insert into tb_user(userName,passWord,tell) values (#{userName},#{passWord},#{tell})")
		public boolean addUser(User u);
		
		//String sql="SELECT * FROM tb_user WHERE userName=? ";
		@Select("SELECT * FROM tb_user WHERE userName=#{name}")
		public  User isExistence(String userName);
		
		//sql="SELECT * FROM tb_user WHERE userName=? and passWord=?";
		//@Select("SELECT * FROM tb_user WHERE userName=#{userName} and passWord=#{passWord}")
		//public boolean isExistence(String userName,String passWord);
		
		
		//String sql="SELECT * FROM tb_user WHERE userName=? ";
		@Select("SELECT * FROM tb_user WHERE userName=#{name}")
		public User getUserByName(String name);
		
		@Select("SELECT * FROM tb_user")
		public List<User> getAllUser();

}
