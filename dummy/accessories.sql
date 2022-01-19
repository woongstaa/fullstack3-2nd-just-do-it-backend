insert into 
products
(style_code, name, category_id, gender_id, normal_price, sale_rate, sale_price, is_member, sub_accessories_id )
values
("CAA-0001","나이키 헤이워드 2.0",3,1,"75000",NULL,NULL,FALSE,2),
("CAA-0002","나이키 유틸리티 스피드",3,1,"89000",NULL,NULL,TRUE,2),
("CAA-0003","나이키 SB 코트하우스",3,1,"65000",NULL,NULL,FALSE,2),
("CAB-0001","조던 프로 잉곳",3,1,"39000",NULL,NULL,FALSE,1),
("CAB-0002","나이키 ACG 웜",3,1,"59000",NULL,NULL,FALSE,1),
("CAB-0003","나이키 ACG",3,1,"45000",NULL,NULL,FALSE,1),
("CAC-0001","나이키 골키퍼 매치",3,1,"39000",25,"29300",TRUE,3),
("CAC-0002","나이키 콜드 웨더",3,1,"39000",20,"31200",TRUE,3),
("CAC-0003","나이키 듀라필 4",3,1,"19000",20,"15200",FALSE,3),

("CBA-0001","나이키 헤리티지",3,2,"29000",NULL,NULL,TRUE,2),
("CBA-0002","나이키 헤리티지 힙색",3,2,"29000",30,"20300",FALSE,2),
("CBA-0003","나이키 원 럭스",3,2,"169000",10,"152100",FALSE,2),
("CBB-0001","나이키 스포츠웨어 헤리티지86 퓨추라",3,2,"29000",NULL,NULL,FALSE,1),
("CBB-0002","나이키 스포츠웨어 헤리티지 캡",3,2,"29000",NULL,NULL,FALSE,1),
("CBB-0003","나이키 스포츠웨어 워싱 캡",3,2,"31000",NULL,NULL,TRUE,1),
("CBC-0001","나이키 골키퍼 매치",3,2,"39000",30,"27300",FALSE,3),
("CBC-0002","나이키 투어 클래식 3",3,2,"35000",20,"28000",TRUE,3),
("CBC-0003","나이키 TC3",3,2,"35000",20,"28000",FALSE,3),

("CCA-0001","나이키 엘리멘탈",3,3,"39000",NULL,NULL,TRUE,2),
("CCA-0002","나이키 엘리멘탈 V",3,3,"42000",NULL,NULL,TRUE,2),
("CCA-0003","나이키 탄준",3,3,"39000",10,"35100",FALSE,2),
("CCB-0001","나이키 윈터라이즈드",3,3,"31000",NULL,NULL,FALSE,1),
("CCB-0002","나이키 비니",3,3,"24000",NULL,NULL,FALSE,1),
("CCB-0003","나이키 헤리티지86 퓨추라",3,3,"29000",NULL,NULL,FALSE,1),
("CCC-0001","나이키 주니어 골키퍼 매치",3,3,"29000",25,"21800",FALSE,3),
("CCC-0002","조던 점프맨 패치",3,3,"45000",20,"36000",FALSE,3);

insert into
product_with_sizes
(style_code,product_size_id,quantity)
values
("CAA-0001",22,50), ("CAA-0002",22,50), ("CAA-0003",22,50),
("CAB-0001",22,50), ("CAB-0002",22,50), ("CAB-0003",22,50),
("CAC-0001",22,50), ("CAC-0002",22,50), ("CAC-0003",22,50),

("CBA-0001",22,50), ("CBA-0002",22,50), ("CBA-0003",22,50),
("CBB-0001",22,50), ("CBB-0002",22,50), ("CBB-0003",22,50),
("CBC-0001",22,50), ("CBC-0002",22,50), ("CBC-0003",22,50),

("CCA-0001",22,50), ("CCA-0002",22,50), ("CCA-0003",22,50),
("CCB-0001",22,50), ("CCB-0002",22,50), ("CCB-0003",22,50),
("CCC-0001",22,50), ("CCC-0002",22,50);

insert into
product_img_urls
(name, is_main, style_code, category_id)
values
("/Images/Men/Accessories/Bag/1/1-1.png",1,"CAA-0001",3),
("/Images/Men/Accessories/Bag/1/1-2.png",0,"CAA-0001",3),
("/Images/Men/Accessories/Bag/2/2-1.png",1,"CAA-0002",3),
("/Images/Men/Accessories/Bag/2/2-2.png",0,"CAA-0002",3),
("/Images/Men/Accessories/Bag/3/3-1.png",1,"CAA-0003",3),
("/Images/Men/Accessories/Bag/3/3-2.png",0,"CAA-0003",3),

("/Images/Men/Accessories/Cap/1/1-1.png",1,"CAB-0001",3),
("/Images/Men/Accessories/Cap/1/1-2.png",0,"CAB-0001",3),
("/Images/Men/Accessories/Cap/2/2-1.png",1,"CAB-0002",3),
("/Images/Men/Accessories/Cap/2/2-2.png",0,"CAB-0002",3),
("/Images/Men/Accessories/Cap/3/3-1.png",1,"CAB-0003",3),
("/Images/Men/Accessories/Cap/3/3-2.png",0,"CAB-0003",3),

("/Images/Men/Accessories/Gloves/1/1-1.png",1,"CAC-0001",3),
("/Images/Men/Accessories/Gloves/1/1-2.png",0,"CAC-0001",3),
("/Images/Men/Accessories/Gloves/2/2-1.png",1,"CAC-0002",3),
("/Images/Men/Accessories/Gloves/2/2-2.png",0,"CAC-0002",3),
("/Images/Men/Accessories/Gloves/3/3-1.png",1,"CAC-0003",3),
("/Images/Men/Accessories/Gloves/3/3-2.png",0,"CAC-0003",3),

("/Images/Women/Accessories/Bag/1/1-1.png",1,"CBA-0001",3),
("/Images/Women/Accessories/Bag/1/1-2.png",0,"CBA-0001",3),
("/Images/Women/Accessories/Bag/2/2-1.png",1,"CBA-0002",3),
("/Images/Women/Accessories/Bag/2/2-2.png",0,"CBA-0002",3),
("/Images/Women/Accessories/Bag/3/3-1.png",1,"CBA-0003",3),
("/Images/Women/Accessories/Bag/3/3-2.png",0,"CBA-0003",3),

("/Images/Women/Accessories/Cap/1/1-1.png",1,"CBB-0001",3),
("/Images/Women/Accessories/Cap/1/1-2.png",0,"CBB-0001",3),
("/Images/Women/Accessories/Cap/2/2-1.png",1,"CBB-0002",3),
("/Images/Women/Accessories/Cap/2/2-2.png",0,"CBB-0002",3),
("/Images/Women/Accessories/Cap/3/3-1.png",1,"CBB-0003",3),
("/Images/Women/Accessories/Cap/3/3-2.png",0,"CBB-0003",3),

("/Images/Women/Accessories/Gloves/1/1-1.png",1,"CBC-0001",3),
("/Images/Women/Accessories/Gloves/1/1-2.png",0,"CBC-0001",3),
("/Images/Women/Accessories/Gloves/2/2-1.png",1,"CBC-0002",3),
("/Images/Women/Accessories/Gloves/2/2-2.png",0,"CBC-0002",3),
("/Images/Women/Accessories/Gloves/3/3-1.png",1,"CBC-0003",3),
("/Images/Women/Accessories/Gloves/3/3-2.png",0,"CBC-0003",3),

("/Images/Kids/Accessories/Bag/1/1-1.png",1,"CCA-0001",3),
("/Images/Kids/Accessories/Bag/1/1-2.png",0,"CCA-0001",3),
("/Images/Kids/Accessories/Bag/2/2-1.png",1,"CCA-0002",3),
("/Images/Kids/Accessories/Bag/2/2-2.png",0,"CCA-0002",3),
("/Images/Kids/Accessories/Bag/3/3-1.png",1,"CCA-0003",3),
("/Images/Kids/Accessories/Bag/3/3-2.png",0,"CCA-0003",3),

("/Images/Kids/Accessories/Cap/1/1-1.png",1,"CCB-0001",3),
("/Images/Kids/Accessories/Cap/1/1-2.png",0,"CCB-0001",3),
("/Images/Kids/Accessories/Cap/2/2-1.png",1,"CCB-0002",3),
("/Images/Kids/Accessories/Cap/2/2-2.png",0,"CCB-0002",3),
("/Images/Kids/Accessories/Cap/3/3-1.png",1,"CCB-0003",3),
("/Images/Kids/Accessories/Cap/3/3-2.png",0,"CCB-0003",3),

("/Images/Kids/Accessories/Gloves/1/1-1.png",1,"CCC-0001",3),
("/Images/Kids/Accessories/Gloves/1/1-2.png",0,"CCC-0001",3),
("/Images/Kids/Accessories/Gloves/2/2-1.png",1,"CCC-0002",3),
("/Images/Kids/Accessories/Gloves/2/2-2.png",0,"CCC-0002",3);
