CREATE TABLE `goods`(
	`gid` VARCHAR(13) NOT NULL,
	`gname` VARCHAR(30) NOT NULL,
	`gclass` VARCHAR(20) NOT NULL,
	`gbrand` VARCHAR(20),
	`gprice` DECIMAL(6,2) NOT NULL,
	`gunit` VARCHAR(8) NOT NULL,
	`gshelf` INT(4),
	`gplace` VARCHAR(30),
	`gnote` VARCHAR(40),
	PRIMARY KEY (`gid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `supplier`(
	`sid` VARCHAR(5) NOT NULL,
	`sname` VARCHAR(20) NOT NULL,
	`sphone` VARCHAR(15) NOT NULL,
	`saddress` VARCHAR(40) NOT NULL,
	`snote` VARCHAR(40),
	PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `warehouse`(
	`hid` VARCHAR(2) NOT NULL,
	`hname` VARCHAR(20) NOT NULL,
	`hnote` VARCHAR(40),
	PRIMARY KEY (`hid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `order`(
	`oid` VARCHAR(12) NOT NULL,
	`ogid` VARCHAR(9) NOT NULL,
	`otime` DATETIME NOT NULL,
	`sid` VARCHAR(5) NOT NULL,
	`gid` VARCHAR(13) NOT NULL,
	`onumber` INT(4) NOT NULL,
	`onote` VARCHAR(40),
	PRIMARY KEY (`oid`),
	CONSTRAINT o_gid_fk FOREIGN KEY (`gid`) REFERENCES goods(`gid`),
	CONSTRAINT o_sid_fk FOREIGN KEY (`sid`) REFERENCES supplier(`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `wrecord`(
	`rid` VARCHAR(12) NOT NULL,
	`rgid` VARCHAR(9) NOT NULL,
	`rtype` INT(1) NOT NULL,
	`hid` VARCHAR(2) NOT NULL,
	`gid` VARCHAR(13) NOT NULL,
	`rtime` DATETIME NOT NULL,
	`rnumber` INT(4) NOT NULL,
	`rnote` VARCHAR(40),
	PRIMARY KEY (`rid`),
	constraint r_gid_fk foreign key (`gid`) references goods(`gid`),
	constraint r_hid_fk foreign key (`hid`) references warehouse(`hid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `wwarrant`(
	`gid` VARCHAR(13) NOT NULL,
	`hid` VARCHAR(2) NOT NULL,
	`wnumber` DECIMAL(7,3) NOT NULL,
	`wnote`	VARCHAR(40),
	PRIMARY KEY (`gid`,`hid`),
	constraint w_gid_fk foreign key (`gid`) references goods(`gid`),
	constraint w_hid_fk foreign key (`hid`) references warehouse(`hid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `import`(
	`gid` VARCHAR(13) NOT NULL,
	`sid` VARCHAR(5) NOT NULL,
	`iprice` DECIMAL(6,2) NOT NULL,
	`inote`	VARCHAR(40),
	PRIMARY KEY (`gid`,`sid`),
	constraint i_gid_fk foreign key (`gid`) references goods(`gid`),
	constraint i_sid_fk foreign key (`sid`) references supplier(`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `user`(
	`uid` VARCHAR(15) NOT NULL,
	`uhash` VARCHAR(64) NOT NULL,
	`uname` VARCHAR(20) NOT NULL,
	`utype` INT(2) NOT NULL,
	PRIMARY KEY (`uid`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;