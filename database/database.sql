-- Base de datos en postgres sql

create table users(
	id varchar(200) primary key,
	name varchar(100) not null,
	lastname varchar(100) not null,
	email varchar(200) not null,
	password varchar(200) not null
);

