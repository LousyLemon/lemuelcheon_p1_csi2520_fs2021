/*Database Creation*/
create database tsla;


/*Select database*/
use tsla; 


/*Create Tesla Tracker Database Table*/

create table tsla_daily(
	stock_value_id varchar(255) not null,
	symbol varchar(15) not null,
    timestamp date not null,
    open decimal (38,2),
	high decimal (38,2),
	low decimal (38,2),
    close decimal (38,2),
    volume int,
    constraint tsla_daily
		primary key (stock_value_id)
);

/*Check for successful table creation*/
show tables;

/*Select all entries from table*/
select * from tsla_daily;
