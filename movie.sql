--创建数据库
CREATE DATABASE movie;

--movie表
create table movie (
id int primary key auto_increment,
uid int not null,
mname varchar(20) not null,
marea varchar(10) not null,
mtime int not null,
typeid int not null,
mtype varchar(10) not null
)ENGINE=MyISAM  DEFAULT CHARSET=utf8;

--资源表
create table resource (
rid int primary key auto_increment,
rname varchar(20) not null,
mid int not null,
uid int not null
)ENGINE=MyISAM  DEFAULT CHARSET=utf8;

--用户表
create table user (
uid int primary key auto_increment,
uname varchar(20) not null,
upwd varchar(32) not null,
role int not null
)ENGINE=MyISAM  DEFAULT CHARSET=utf8;

--type类型表
create table type (
tid int primary key auto_increment,
tname varchar(20) not null
)ENGINE=MyISAM  DEFAULT CHARSET=utf8;

--score评分表
create table score (
sid int primary key auto_increment,
uid int not null,
mid int not null,
sscore int not null 
)ENGINE=MyISAM  DEFAULT CHARSET=utf8;

--comment评论表
create table comment (
cid int primary key auto_increment,
ccontent varchar(200) not null,
fcid int not null default 0,
uid int not null,
mid int not null,
cdate int not null
)ENGINE=MyISAM  DEFAULT CHARSET=utf8;

--collect收藏表
create table collect (
cid int primary key auto_increment,
uid int not null,
mid int not null
)ENGINE=MyISAM  DEFAULT CHARSET=utf8;