CREATE TABLE `goods`(
	`goodsid` VARCHAR(4) NOT NULL,
	`gname` VARCHAR(30) NOT NULL,
	`class` VARCHAR(20) NOT NULL,
	`brand` VARCHAR(20) NOT NULL,
	`price` DECIMAL(5,2) NOT NULL,
	`place` VARCHAR(30) NOT NULL,
	`note` VARCHAR(40),
	PRIMARY KEY (`goodsid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `supplier`(
	`supplierid` VARCHAR(8) NOT NULL,
	`sname` VARCHAR(36) NOT NULL,
	`phone` VARCHAR(15) NOT NULL,
	`saddress` VARCHAR(40) NOT NULL,
	`note` VARCHAR(40),
	PRIMARY KEY (`supplierid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `warehouse`(
	`warehouseid` INT(2) NOT NULL,
	`wname` VARCHAR(20) NOT NULL,
	`waddress` VARCHAR(40) NOT NULL,
	`note` VARCHAR(40),
	PRIMARY KEY (`warehouseid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE order(
	`orderid` VARCHAR(11) NOT NULL,
	`way` VARCHAR(20) NOT NULL,
	`quantity` INT(4) NOT NULL,
	`date` date NOT NULL,
	`supplierid` INT(5) NOT NULL,
	`goodid` INT(4) NOT NULL,
	`note` VARCHAR(),
	PRIMARY KEY (`orderid`),
	constraint order_goodsid_fk foreign key (goodsid) references goods(goodsid),
	constraint order_supplierid_fk foreign key (supplierid) references supplier(supplierid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE warehousewarrant(
	`warehousewarrant` INT(8) NOT NULL,
	`warehouseid` INT(2) NOT NULL,
	`goodsid` INT(4) NOT NULL,
	`date` DATE NOT NULL,
	`quantity` INT(4) NOT NULL,
	`note` VARCHAR(40),
	PRIMARY KEY (`warehousewarrant`),
	constraint warehousewarrant_goodsid_fk foreign key (goodsid) references goods(goodsid),
	constraint warehousewarrant_warehouseid_fk foreign key (warehouseid) references warehouse(warehouseid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE repertory(
	`goodsid` INT(4) NOT NULL,
	`warehouseid` INT(2) NOT NULL,
	`quantity` INT(4) NOT NULL,
	`note` VARCHAR(40),
	PRIMARY KEY (`goodsid`),
	constraint repertory_warehouseid_fk foreign key (warehouseid) references warehouse(warehouseid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE administrator(
	`administrator` VARCHAR(15) NOT NULL,
	`key` VARCHAR(64) NOT NULL,
	PRIMARY KEY (`administrator`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;