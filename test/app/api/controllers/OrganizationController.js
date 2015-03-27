	/**
 * Author: Archer Reilly
 * Date: 22/DEC/2014
 * File: OrganizationController.js
 * Desc: controller for XFJWT_Organization
 *
 * Produced By Ebang
 */
var fs = require('fs');

module.exports = {
	index: function(req,res){
		var title = '组织管理';
    	var menu = 'system';
    	return res.view('xfjwt/organization',{data:'',title: title,menu: menu});
		 /*var userId = req.session.loginInfo.userInfo.userid;
	    var viewUrl = 'organization';
	    var title = '组织架构管理';
	    var menu = '组织架构管理';
    ReviewService.getViewPass(res,userId,viewUrl,title,menu);*/
		//return res.view('filesManagement');
		//ReviewService.getViewPass(res,userId,viewUrl,title,menu);
	},
	
	/**
	 * save
	 * create or update record according to 
   */
	/*save: function(req,res){
		console.log(req.session);
		var clientCode = req.param('clientCode'),
		    organizationId = req.param('organizationId'),
		    orgLevel = req.param('orgLevel'),
		    parentOrgId = req.param('parentOrgId'),
			orgName = req.param('orgName');
		if(organizationId == '' || organizationId == null){
			var createdBy = req.session.loginInfo.userInfo.UserName,
			    createdTime = UtilityService.getCurrentTime();
			if (clientCode == null || clientCode == ''
			|| orgLevel == null || orgLevel == ''
			//|| ParentOrgId == null || ParentOrgId == ''
			|| orgName == null || orgName == ''){
				return res.send(sails.config.returnCode.LoseSomeParamters);
			}    
			
	                Organization.create({
	                	ClientCode:clientCode,
						OrgLevel: orgLevel,
						ParentOrgId: parentOrgId,
						OrgName: orgName,
						CreatedBy: createdBy,
						CreatedTime: createdTime,
				}).exec(function(err,result){
					if(err){
						return res.send(sails.config.errorCode.UnexpectedDbError)
					 }
					  return res.send(sails.config.returnCode.DataProcessingOk);
					});
				       
	            
	            

		}else{
	            var updatedBy = req.session.loginInfo.userInfo.UserName,
	            	updatedTime = UtilityService.getCurrentTime();
                if(updatedBy == '' || updatedBy == null)
                	return res.send(sails.config.returnCode.LoseSomeParamters);
                var valuesUpdate = {UpdatedBy:updatedBy,UpdatedTime:updatedTime};
                if(orgLevel != '' && orgLevel != null)
                	valuesUpdate.OrgLevel = orgLevel;
                if(parentOrgId != '' && parentOrgId != null)
                	valuesUpdate.ParentOrgId = parentOrgId;
                if(orgName != '' && orgName != null)
                	valuesUpdate.OrgName = orgName;
                
                Organization.update({OrganizationId:organizationId},valuesUpdate)
                .exec(function(err,result){
                	if(err)
                		return res.send(sails.config.errorCode.UnexpectedDbError);
                	return res.send(sails.config.returnCode.DataProcessingOk);
                })
        }
	},*/
	read: function(req,res){
		var pageIndex = req.param('pageIndex'),
			pageSize = req.param('pageSize'),
			//clientCode = req.param('clientCode'),
			orgLevel = req.param('orgLevel'),
			//userClientCode = req.session.loginInfo.userInfo.ClientCode,
			orgName = req.param('orgName');
		if ( pageIndex == null || pageIndex == '' || pageSize == null
		|| pageSize == '' || pageIndex <= 0 || pageSize <= 0) {
			return res.send({code: 400,msg: 'please set params right'});
		}
		var start = (pageIndex - 1) * pageSize;
		var criteria = {};
		
		if(orgLevel != null && orgLevel != '')
			criteria.OrgLevel = {'contains': orgLevel};
        if(orgName != null && orgName != '')
        	criteria.OrgName = {'contains': orgName};
        XFJWT_Organization.find()
        .skip(start)
        .limit(pageSize)
        .exec(function(err,result){
        	if(err)
	          return res.send(sails.config.errorCode.UnexpectedDbError);
	      	Organization
	      	.count()
        	.exec(function(err,total){
        		if(err)
	         		return res.send(sails.config.errorCode.UnexpectedDbError);
	         	return res.send({code: 200,msg: 'Successfully',total: total,data: result});
        	})
        })
	},
	delete: function(req,res){
		var organizationId = req.param('organizationId');
		if(organizationId == null || organizationId == '')
			return res.send(sails.config.returnCode.LoseSomeParamters);
		Organization.destroy({OrganizationId:organizationId})
		.exec(function(err,result){
			if(err)
				return res.send(err);//sails.config.errorCode.UnexpectedDbError);
			return res.send(sails.config.returnCode.DataProcessingOk);
		})
	},
//====================================================
	readOrgTree: function(req,res){
		var SSORGID = req.session.loginInfo.userInfo.SSORGID;
		var orgZDID = "ac688795e4694bde9016a02d2218a2c2";
		var orgYYID = "380c59ba34aa4e879f60d3fb228bb934";
		/*var HNZDsql = "select ID,SJJGID,JGJC from JGXX_XFJG where JLZT = 1 and (JGXZDM like '03%' or JGXZDM like '05%' or JGXZDM like '09%') "
					+ "and (JGLB='1' and JGTREE like "
					+ "(concat(( select JGTREE from JGXX_XFJG where ID='"+SSORGID+"'),'%' )) "
					+ "or ID='"+SSORGID+"')";*/
		var HNZDsql = "select l1.JGNBID,l1.ID,l1.JGJC,(length(l1.JGTREE)/8)  as Level, l1.JGTREE, left(l1.JGTREE,length(l1.JGTREE) - 8) as SJJJGTREE "
					+ "from JGXX_XFJG l1 where l1.JGTREE like '0100000043000000%' and l1.JLZT=1 "
					+ "order by Level,l1.JGNBID asc";
		console.log('HNZDsql = ' + HNZDsql);
		function existNode(rows,SJJJGTREE){
			for(var j = 0;j<rows.length;j++){
				if(rows[j].JGTREE == SJJJGTREE)
					return false;
			}
			return true;
		}
		function expendTREE(data,nodeList,len){
			for(var i = 0;i < nodeList.length;i++){
				for(var j = 0;j < len;j++){
					if(nodeList[i].jgtree == data[j].SJJJGTREE){
						if(!nodeList[i].hasOwnProperty('children')){
							nodeList[i].children = [];
							nodeList[i].children.push({id: data[j].ID,jgtree: data[j].JGTREE,state: 'closed',text: data[j].JGJC});
						}else{
							nodeList[i].children.push({id: data[j].ID,jgtree: data[j].JGTREE,state: 'closed',text: data[j].JGJC});
						}
					}
				}
				if(nodeList[i].hasOwnProperty('children'))
					expendTREE(data,nodeList[i].children,len);
			}
		}
		ZhiQinRenYuan.query(HNZDsql,function(err,result){
			if(err)
				return res.send({code: 500,msg: 'database err',data: err});
			if(result.length == 0)
				return res.send({code: 404,msg: 'there is nothing',data:'nothing'});
			//console.log(result);
			var nodes = [];
			var childrens = [];
			for (var i = 0;i < result.length;i++){
				if(existNode(result,result[i].SJJJGTREE)){
					nodes.push({id: result[i].ID,jgtree: result[i].JGTREE,text: result[i].JGJC})
				}
			}
			var len = result.length;
			expendTREE(result,nodes,len);
/*			for (var k = 0;k < nodes.length;k++){
				for(var f = 0; f < result.length;f++){
					if(nodes[k].jgtree == result[f].SJJJGTREE){
						child = {id: result[f].ID,jgtree: result[f].JGTREE,text: result[f].JGJC};
						if(nodes[k].children){
							nodes[k].children.push(child);
						}else{
							nodes[k].children = [child];
						}
					}
				}
			}*/
			//console.log("nodes = " + JSON.stringify(nodes));
			return res.send({code: 200,organization: result,msg: 'Successfully',data: nodes});
		})
	},
//====================================================
	getOrgTree: function(req,res){
		var orgZDID = "ac688795e4694bde9016a02d2218a2c2";
		var orgYYID = "380c59ba34aa4e879f60d3fb228bb934";
		var criteria = {};
		criteria.where = {};
		if(req.session.loginInfo.userInfo.OrganizationId != 1){
			criteria.ClientCode = req.session.loginInfo.userInfo.ClientCode;
		}
		Organization.query(criteria)
		.exec(function(err,result){
			if(err)
				return res.send(err);//sails.config.errorCode.UnexpectedDbError);
			var orgNode = {};
			orgNode.id = result[0].OrganizationId;
			orgNode.text = result[0].OrgName;
			expandTree(orgNode, result);
			return res.send({
						code: 200,
						msg: 'SUCCESSFUL',
						desc: 'Successfully read record',
						data: orgNode
					})
		})

		function expandTree(org, orgList){
			var childIndex = -1;
			for(var i = 0; i < orgList.length; i++){
				if(orgList[i].ParentOrgId == org.id){
					hasChild = true;
					if(!org.hasOwnProperty('children')){
						org.children = [];
					}
					childIndex++;
					org.children[childIndex] = {};
					org.children[childIndex].id = orgList[i].OrganizationId;
					org.children[childIndex].text = orgList[i].OrgName;
					expandTree(org.children[childIndex], orgList);
				}
			}			
			if(childIndex == -1){
				org.checked = false;
			}
		}
	}
	
}
