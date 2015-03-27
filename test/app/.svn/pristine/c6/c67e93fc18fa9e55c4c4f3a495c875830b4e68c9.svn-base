/**
*  for response ResourseUrl amount
*
**/


module.exports = {

  getViewPass: function(res,userId,viewUrl,title,menu){
    var sql =  "select group_concat(r.ResourceUrl) from xfjwt_User u inner join xfjwt_resource_roles__role_resources p on u.RoleId=p.role_Resources"
              +" inner join xfjwt_Resource r on r.ResourceId=p.resource_Roles"
              +" where u.UserId='"+userId+"'";
       XFJWT_User.query(sql,function(err,result){
        if(err)
          res.send({
             code: 500,
             msg: 'database error',
             data: err
          });
        var resu = result[0];
        var resu = resu["group_concat(r.ResourceUrl)"];
        return res.view(viewUrl,{data:resu,title:title,menu:menu});
     });
  },

  getViewPassSurface: function(res,userId,viewUrl,title,menu){
    var sql =  "select group_concat(r.ResourceUrl) from xfjwt_User u inner join xfjwt_resource_roles__role_resources p on u.RoleId=p.role_Resources"
              +" inner join xfjwt_Resource r on r.ResourceId=p.resource_Roles"
              +" where u.UserId='"+userId+"'";
       XFJWT_User.query(sql,function(err,result){
        if(err)
          res.send({
             code: 500,
             msg: 'database error',
             data: err
          });

        var resu = result[0];
        var resu = resu["group_concat(r.ResourceUrl)"];
        return res.view(viewUrl,{data:resu,title:title,menu:menu, layout: 'layout2'});
     });
  },

}
