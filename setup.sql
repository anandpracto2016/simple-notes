drop database if exists nanonets;
create database nanonets;
use nanonets;

create table folders (
  id integer(10) AUTO_INCREMENT primary key,
  name varchar(50),
  created_at DATETIME,
  updated_at DATETIME,
  public tinyint(1),
  deleted tinyint(1)
);

insert into folders values(1, "folder1", now(), now(), 1, 0);
insert into folders values(2, "folder2", now(), now(), 1, 0);
insert into folders values(3, "folder3", now(), now(), 0, 1);

create table notes (
  id integer(10) AUTO_INCREMENT  primary key,
  folder_id integer(10),
  public tinyint(1) DEFAULT 1,
  deleted tinyint(1) DEFAULT 0,
  url varchar(150),
  created_at DATETIME,
  updated_at DATETIME,
  title varchar(50),
  content LONGTEXT,
  FOREIGN KEY folder_link (folder_id) REFERENCES folders(id)
);

insert into notes values(1, 1, 1, 0, "", now(), now(), "note1", "content1");
insert into notes values(2, 1, 1, 0, "", now(), now(), "note2", "content2");
insert into notes values(3, 2, 1, 0, "", now(), now(), "note3", "content3");
insert into notes values(4, null, 1, 0, "", now(), now(), "orphan note", "orphan content");

create table user (
  id integer(10) AUTO_INCREMENT primary key,
  name varchar(10),
  pwd varchar(200),
  email varchar(100) unique,
  priviledge enum("root", "user", "admin", "guest")
);

insert into user values(1, "Sunil", MD5("12345"), "sunil@gmail.com", "root");
insert into user values(2, "Anand", MD5("12345"), "anand@gmail.com", "admin");

create table user_notes (
  id integer(10) AUTO_INCREMENT primary key,
  user_id integer(10),
  note_id integer(10),
  read_access tinyint(1),
  write_access tinyint(1),
  isowner tinyint(1),
  FOREIGN KEY user_link_ (user_id) REFERENCES user(id)
);

insert into user_notes values(1, 1, 1, 1, 1, 1);
insert into user_notes values(2, 1, 2, 1, 1, 1);
insert into user_notes values(3, 2, 3, 1, 1, 1);
insert into user_notes values(4, 2, 4, 1, 1, 1);

create table user_folders (
  id integer(10) AUTO_INCREMENT primary key,
  user_id integer(10),
  folder_id integer(10),
  read_access tinyint(1),
  write_access tinyint(1),
  isowner tinyint(1),
  FOREIGN KEY user_link_ (user_id) REFERENCES user(id)
);

insert into user_folders values(1, 1, 1, 1, 1, 1);
insert into user_folders values(2, 1, 2, 1, 1, 1);
insert into user_folders values(3, 2, 2, 1, 1, 1);