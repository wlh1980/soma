(function($){if($)$.onloadjson({Component:{children:[{TextPresenter:{text:"Table sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl3"],padding:[5,1,5,1]}},{StackPanel:{orientation:"Vertical",itemSpacing: 10,children:[{Component:{children:[{Anchor:{id:"5A70286F-E76F-4C96-8E04-D4A9FAF8A08D"}},{TextPresenter:{text:"Card of the table sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl4"],padding:[5,1,5,1]}},{ListView:{columnCount:2,columnWidths:["*","*",],rowHeights:["Auto","Auto","Auto",],cells:[{TextPresenter:{text:"名称",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"sys-用户角色",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"代码",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"sys_user_role",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"DBMS",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{Hyperlink:{url:"jreport://#4BCA8B2B-503C-41CD-ABBD-DD155CC90EC5",text:"Sybase SQL Anywhere 12",classes:["card-value"],padding:[5,1,5,1]}}],classes:["listview", "card-listview"]}}],classes:["card"],background:"transparent"}},{Component:{children:[{TextPresenter:{text:"表的检验约束名称sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl4"],padding:[5,1,5,1]}},{TextPresenter:{text:"CKT_SYS_USER_ROLE",classes:["propertypresenter-value"]}}],classes:["propertypresenter"],background:"transparent"}},{Component:{children:[{TextPresenter:{text:"表的服务器验证规则sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl4"],padding:[5,1,5,1]}},{TextPresenter:{text:"%RULES%",classes:["propertypresenter-value"]}}],classes:["propertypresenter"],background:"transparent"}},{Component:{children:[{TextPresenter:{text:"表的代码预览sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl4"],padding:[5,1,5,1]}},{TextPresenter:{text:"drop table if exists sys_user_role;\n\n/*==============================================================*/\n/* Table: sys_user_role                                         */\n/*==============================================================*/\ncreate table sys_user_role \n(\n   id                   bigint(20)                     not null default autoincrement,\n   user_id              bigint                         null,\n   role_id              bigint                         null,\n   constraint PK_SYS_USER_ROLE primary key (id)\n);\n\ncomment on column sys_user_role.id is \n\'主键\';\n\ncomment on column sys_user_role.user_id is \n\'用户id\';\n\ncomment on column sys_user_role.role_id is \n\'角色id\';\n",classes:["propertypresenter-value"]}}],classes:["propertypresenter"],background:"transparent"}},{Component:{children:[{TextPresenter:{text:"Extended Attribute list of table REMOVE_POS",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl4"],padding:[5,1,5,1]}},{ListView:{columnCount:4,columnWidths:["*","*","*","*",],rowHeights:["Auto","Auto","Auto","Auto","Auto",],columnHeaders:[{TextPresenter:{text:"名称",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}},{TextPresenter:{text:"数据类型",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}},{TextPresenter:{text:"值",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}},{TextPresenter:{text:"目标名称",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}}],cells:[{TextPresenter:{text:"At",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"(Physical Option)",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"Sybase SQL Anywhere 12",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"DbspaceIn",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"(Physical Option)",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"Sybase SQL Anywhere 12",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"Encrypted",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"(Physical Option)",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"false",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"Sybase SQL Anywhere 12",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"PctFree",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"(Integer)",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"Sybase SQL Anywhere 12",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"TemporaryTable",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"(String)",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"Sybase SQL Anywhere 12",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}}],classes:["listview", "list-listview"]}}],classes:["list"],background:"transparent"}},{Component:{children:[{TextPresenter:{text:"Column list of the table REMOVE_POS",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl4"],padding:[5,1,5,1]}},{ListView:{columnCount:2,columnWidths:["*","*",],rowHeights:["Auto","Auto","Auto",],columnHeaders:[{TextPresenter:{text:"名称",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}},{TextPresenter:{text:"代码",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}}],cells:[{Hyperlink:{url:"jreport://#55D6B6A4-A2AD-44A2-9A66-2431AFCE0374",text:"编号",classes:["list-value"],padding:[5,1,5,1]}},{Hyperlink:{url:"jreport://#55D6B6A4-A2AD-44A2-9A66-2431AFCE0374",text:"id",classes:["list-value"],padding:[5,1,5,1]}},{Hyperlink:{url:"jreport://#54AC5D9D-9754-474F-8DEB-5D6774824CB1",text:"用户id",classes:["list-value"],padding:[5,1,5,1]}},{Hyperlink:{url:"jreport://#54AC5D9D-9754-474F-8DEB-5D6774824CB1",text:"user_id",classes:["list-value"],padding:[5,1,5,1]}},{Hyperlink:{url:"jreport://#5A08D2E5-2ABD-4222-BA72-BBE60020BC28",text:"角色id",classes:["list-value"],padding:[5,1,5,1]}},{Hyperlink:{url:"jreport://#5A08D2E5-2ABD-4222-BA72-BBE60020BC28",text:"role_id",classes:["list-value"],padding:[5,1,5,1]}}],classes:["listview", "list-listview"]}}],classes:["list"],background:"transparent"}},{Component:{children:[{StackPanel:{orientation:"Vertical",itemSpacing: 10,children:[{Anchor:{id:"55D6B6A4-A2AD-44A2-9A66-24319276EE25"}},{Component:{children:[{TextPresenter:{text:"Column 编号 of table sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl4"],padding:[5,1,5,1]}},{StackPanel:{orientation:"Vertical",itemSpacing: 10,children:[{Component:{children:[{Anchor:{id:"55D6B6A4-A2AD-44A2-9A66-2431AFCE0374"}},{TextPresenter:{text:"Card of the column 编号 of the table sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{ListView:{columnCount:2,columnWidths:["*","*",],rowHeights:["Auto","Auto","Auto","Auto",],cells:[{TextPresenter:{text:"名称",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"编号",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"代码",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"id",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"数据类型",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"bigint(20)",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"强制",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"True",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}}],classes:["listview", "card-listview"]}}],classes:["card"],background:"transparent"}},{Component:{children:[{TextPresenter:{text:"Column Check Constraint Name",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{TextPresenter:{text:"CKC_ID_SYS_USER",classes:["propertypresenter-value"]}}],classes:["propertypresenter"],background:"transparent"}},{Component:{children:[{Anchor:{id:"55D6B6A4-A2AD-44A2-9A66-2431AFCE0374"}},{TextPresenter:{text:"Standard check of column 编号 of table sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{ListView:{columnCount:2,columnWidths:["*","*",],rowHeights:["Auto","Auto","Auto","Auto","Auto","Auto","Auto","Auto","Auto",],cells:[{TextPresenter:{text:"最小值",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"最大值",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"默认值",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"单元",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"格式",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"大写",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"False",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"小写",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"False",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"不能修改",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"False",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"List of Values",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}}],classes:["listview", "card-listview"]}}],classes:["card"],background:"transparent"}},{Component:{children:[{TextPresenter:{text:"Column Server Validation Rule",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{TextPresenter:{text:"%MINMAX% and %LISTVAL% and %CASE% and %RULES%",classes:["propertypresenter-value"]}}],classes:["propertypresenter"],background:"transparent"}},{Component:{children:[{TextPresenter:{text:"Dependent Object list of column sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{ListView:{columnCount:3,columnWidths:["*","*","*",],rowHeights:["Auto",],columnHeaders:[{TextPresenter:{text:"名称",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}},{TextPresenter:{text:"代码",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}},{TextPresenter:{text:"类名称",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}}],cells:[{Hyperlink:{url:"jreport://#B78DD1AA-F6E4-4055-9478-2E86720DF9F4",text:"Key_1",classes:["list-value"],padding:[5,1,5,1]}},{Hyperlink:{url:"jreport://#B78DD1AA-F6E4-4055-9478-2E86720DF9F4",text:"Key_1",classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"Key",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}}],classes:["listview", "list-listview"]}}],classes:["list"],background:"transparent"}},{Component:{children:[{TextPresenter:{text:"Extended Attribute List of column sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{ListView:{columnCount:4,columnWidths:["*","*","*","*",],rowHeights:["Auto","Auto",],columnHeaders:[{TextPresenter:{text:"名称",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}},{TextPresenter:{text:"数据类型",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}},{TextPresenter:{text:"值",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}},{TextPresenter:{text:"目标名称",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}}],cells:[{TextPresenter:{text:"Compressed",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"(Boolean)",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"False",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"Sybase SQL Anywhere 12",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"DefaultExt",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"(String)",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"Sybase SQL Anywhere 12",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}}],classes:["listview", "list-listview"]}}],classes:["list"],background:"transparent"}}],halign:"Left",valign:"Top"}}],classes:["titledcontainer"]}},{Anchor:{id:"54AC5D9D-9754-474F-8DEB-5D679276EE25"}},{Component:{children:[{TextPresenter:{text:"Column 用户id of table sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl4"],padding:[5,1,5,1]}},{StackPanel:{orientation:"Vertical",itemSpacing: 10,children:[{Component:{children:[{Anchor:{id:"54AC5D9D-9754-474F-8DEB-5D6774824CB1"}},{TextPresenter:{text:"Card of the column 用户id of the table sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{ListView:{columnCount:2,columnWidths:["*","*",],rowHeights:["Auto","Auto","Auto","Auto",],cells:[{TextPresenter:{text:"名称",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"用户id",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"代码",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"user_id",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"数据类型",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"bigint",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"强制",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"False",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}}],classes:["listview", "card-listview"]}}],classes:["card"],background:"transparent"}},{Component:{children:[{TextPresenter:{text:"Column Check Constraint Name",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{TextPresenter:{text:"CKC_USER_ID_SYS_USER",classes:["propertypresenter-value"]}}],classes:["propertypresenter"],background:"transparent"}},{Component:{children:[{Anchor:{id:"54AC5D9D-9754-474F-8DEB-5D6774824CB1"}},{TextPresenter:{text:"Standard check of column 用户id of table sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{ListView:{columnCount:2,columnWidths:["*","*",],rowHeights:["Auto","Auto","Auto","Auto","Auto","Auto","Auto","Auto","Auto",],cells:[{TextPresenter:{text:"最小值",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"最大值",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"默认值",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"单元",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"格式",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"大写",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"False",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"小写",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"False",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"不能修改",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"False",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"List of Values",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}}],classes:["listview", "card-listview"]}}],classes:["card"],background:"transparent"}},{Component:{children:[{TextPresenter:{text:"Column Server Validation Rule",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{TextPresenter:{text:"%MINMAX% and %LISTVAL% and %CASE% and %RULES%",classes:["propertypresenter-value"]}}],classes:["propertypresenter"],background:"transparent"}},{Component:{children:[{TextPresenter:{text:"Extended Attribute List of column sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{ListView:{columnCount:4,columnWidths:["*","*","*","*",],rowHeights:["Auto","Auto",],columnHeaders:[{TextPresenter:{text:"名称",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}},{TextPresenter:{text:"数据类型",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}},{TextPresenter:{text:"值",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}},{TextPresenter:{text:"目标名称",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}}],cells:[{TextPresenter:{text:"Compressed",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"(Boolean)",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"False",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"Sybase SQL Anywhere 12",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"DefaultExt",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"(String)",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"Sybase SQL Anywhere 12",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}}],classes:["listview", "list-listview"]}}],classes:["list"],background:"transparent"}}],halign:"Left",valign:"Top"}}],classes:["titledcontainer"]}},{Anchor:{id:"5A08D2E5-2ABD-4222-BA72-BBE69276EE25"}},{Component:{children:[{TextPresenter:{text:"Column 角色id of table sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl4"],padding:[5,1,5,1]}},{StackPanel:{orientation:"Vertical",itemSpacing: 10,children:[{Component:{children:[{Anchor:{id:"5A08D2E5-2ABD-4222-BA72-BBE60020BC28"}},{TextPresenter:{text:"Card of the column 角色id of the table sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{ListView:{columnCount:2,columnWidths:["*","*",],rowHeights:["Auto","Auto","Auto","Auto",],cells:[{TextPresenter:{text:"名称",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"角色id",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"代码",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"role_id",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"数据类型",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"bigint",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"强制",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"False",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}}],classes:["listview", "card-listview"]}}],classes:["card"],background:"transparent"}},{Component:{children:[{TextPresenter:{text:"Column Check Constraint Name",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{TextPresenter:{text:"CKC_ROLE_ID_SYS_USER",classes:["propertypresenter-value"]}}],classes:["propertypresenter"],background:"transparent"}},{Component:{children:[{Anchor:{id:"5A08D2E5-2ABD-4222-BA72-BBE60020BC28"}},{TextPresenter:{text:"Standard check of column 角色id of table sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{ListView:{columnCount:2,columnWidths:["*","*",],rowHeights:["Auto","Auto","Auto","Auto","Auto","Auto","Auto","Auto","Auto",],cells:[{TextPresenter:{text:"最小值",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"最大值",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"默认值",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"单元",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"格式",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"大写",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"False",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"小写",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"False",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"不能修改",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"False",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"List of Values",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}}],classes:["listview", "card-listview"]}}],classes:["card"],background:"transparent"}},{Component:{children:[{TextPresenter:{text:"Column Server Validation Rule",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{TextPresenter:{text:"%MINMAX% and %LISTVAL% and %CASE% and %RULES%",classes:["propertypresenter-value"]}}],classes:["propertypresenter"],background:"transparent"}},{Component:{children:[{TextPresenter:{text:"Extended Attribute List of column sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{ListView:{columnCount:4,columnWidths:["*","*","*","*",],rowHeights:["Auto","Auto",],columnHeaders:[{TextPresenter:{text:"名称",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}},{TextPresenter:{text:"数据类型",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}},{TextPresenter:{text:"值",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}},{TextPresenter:{text:"目标名称",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}}],cells:[{TextPresenter:{text:"Compressed",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"(Boolean)",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"False",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"Sybase SQL Anywhere 12",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"DefaultExt",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"(String)",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"Sybase SQL Anywhere 12",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}}],classes:["listview", "list-listview"]}}],classes:["list"],background:"transparent"}}],halign:"Left",valign:"Top"}}],classes:["titledcontainer"]}}],halign:"Left",valign:"Top"}}],halign:"Left",valign:"Top"}},{Component:{children:[{TextPresenter:{text:"Key list of the table REMOVE_POS",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl4"],padding:[5,1,5,1]}},{ListView:{columnCount:3,columnWidths:["*","*","*",],rowHeights:["Auto",],columnHeaders:[{TextPresenter:{text:"名称",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}},{TextPresenter:{text:"代码",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}},{TextPresenter:{text:"主要的",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}}],cells:[{Hyperlink:{url:"jreport://#B78DD1AA-F6E4-4055-9478-2E86720DF9F4",text:"Key_1",classes:["list-value"],padding:[5,1,5,1]}},{Hyperlink:{url:"jreport://#B78DD1AA-F6E4-4055-9478-2E86720DF9F4",text:"Key_1",classes:["list-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"True",fontfamily:"Times New Roman",fontsize:10,classes:["list-value"],padding:[5,1,5,1]}}],classes:["listview", "list-listview"]}}],classes:["list"],background:"transparent"}},{Component:{children:[{StackPanel:{orientation:"Vertical",itemSpacing: 10,children:[{Anchor:{id:"B78DD1AA-F6E4-4055-9478-2E869276EE25"}},{Component:{children:[{TextPresenter:{text:"Key Key_1 of table sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl4"],padding:[5,1,5,1]}},{StackPanel:{orientation:"Vertical",itemSpacing: 10,children:[{Component:{children:[{Anchor:{id:"B78DD1AA-F6E4-4055-9478-2E86720DF9F4"}},{TextPresenter:{text:"Card of the key Key_1 of the table sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{ListView:{columnCount:2,columnWidths:["*","*",],rowHeights:["Auto","Auto","Auto",],cells:[{TextPresenter:{text:"名称",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"Key_1",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"代码",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{TextPresenter:{text:"Key_1",fontfamily:"Times New Roman",fontsize:10,classes:["card-value"],padding:[5,1,5,1]}},{TextPresenter:{text:"表格",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["card-label"],padding:[5,1,5,1]}},{Hyperlink:{url:"jreport://#5A70286F-E76F-4C96-8E04-D4A9FAF8A08D",text:"sys-用户角色",classes:["card-value"],padding:[5,1,5,1]}}],classes:["listview", "card-listview"]}}],classes:["card"],background:"transparent"}},{Component:{children:[{TextPresenter:{text:"Key Code Preview",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{TextPresenter:{text:"if exists(\n   select 1 from sys.sysconstraint k\n      join sys.systab t on (t.object_id = k.table_object_id and t.table_name=\'sys_user_role\')\n   where\n      k.constraint_type = \'P\'\n) then\n    alter table sys_user_role\n   delete primary key\nend if;\n",classes:["propertypresenter-value"]}}],classes:["propertypresenter"],background:"transparent"}},{Component:{children:[{TextPresenter:{text:"Column list of the key sys-用户角色",fontfamily:"Arial",fontsize:10,textdecoration:"underline",classes:["tl5"],padding:[5,1,5,1]}},{ListView:{columnCount:2,columnWidths:["*","*",],rowHeights:["Auto",],columnHeaders:[{TextPresenter:{text:"名称",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}},{TextPresenter:{text:"代码",textalign:"center",fontfamily:"Times New Roman",fontsize:10,fontstyle:"Italic",classes:["list-header"],padding:[5,1,5,1]}}],cells:[{Hyperlink:{url:"jreport://#55D6B6A4-A2AD-44A2-9A66-2431AFCE0374",text:"编号",classes:["list-value"],padding:[5,1,5,1]}},{Hyperlink:{url:"jreport://#55D6B6A4-A2AD-44A2-9A66-2431AFCE0374",text:"id",classes:["list-value"],padding:[5,1,5,1]}}],classes:["listview", "list-listview"]}}],classes:["list"],background:"transparent"}}],halign:"Left",valign:"Top"}}],classes:["titledcontainer"]}}],halign:"Left",valign:"Top"}}],halign:"Left",valign:"Top"}}],halign:"Left",valign:"Top"}}],classes:["titledcontainer"]}});})(document.jdata.activeScript());