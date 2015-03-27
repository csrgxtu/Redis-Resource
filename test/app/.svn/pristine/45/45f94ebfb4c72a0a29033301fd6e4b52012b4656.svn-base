主要内容：
  1、指定登录页面位置
     在config/router中配置
  2、指定主页面
    url:/Authentication/main
  3、手机端登录
    url:/Authentication/loginProcessAndroid
  4、web登录
    url:/Authentication/loginProcess
  5、注销登录
   url:/Authentication/logout
1、指定登录页面位置
    在config/router中已配置
2、指定主页面
    url:/Authentication/main
3、手机端登录
    url:/Authentication/loginProcessAndroid
    method: post
    parameters:
        userName  varchar(20)  not null
        password  varchar(32)  not null
    response:
        success:
            {
              "title": "index",
              "userInfo": {
              "userid": 1,
              "UserName": "WW",
              "DisplayName": "王伟",
              "Title": "无",
              "OrganizationId": 1,
              "SessionId": "7209b9f0-3339-11e4-8479-398b263813b3"
              }
            }   
       userIsLocked:
            {
              "title": "login",
              "erroInfo": "帐号锁定",
              "layout": null,
              "userInfo": {
              "userid": null,
              "UserName": null,
              "DisplayName": null,
              "Password": null,
              "Title": null,
              "OrganizationId": null,
              "SessionId": null,
              }
            }
       paramsErr:
            {
                "code": 403,
                "msg": "Invalid Param",
                "description": "参数错误",
                "data": null
            }
       dbErr:
             {
                  "code": 500,
                  "msg": "DATABASE ERROR",
                  "description": "数据库异常，请重试"
              }
       userNotFond:
              {
                  "code": 404,
                  "msg": "Not found",
                  "description": "Target do not exist",
                  "data": null
              }
4、web登录
    url:/Authentication/loginProcess
    method: post
    parameters:
        userName  varchar(20)  not null
        password  varchar(32)  not null
    response:
        success:
           返回主页
           res.redirect('/authentication/main');
        userIsLocked:
           返回登录页
           res.view("login/login",{erroInfo: '帐号锁定', title: '登陆', layout: null})
        paramsErr:
           {
            "code": 403,
            "msg": "Invalid Param",
            "description": "参数错误",
            "data": null
           }
        dbErr:
           {
                "code": 500,
                "msg": "DATABASE ERROR",
                "description": "数据库异常，请重试"
            } 
        userNotFond：
            返回登录页
           res.view("login/login",{erroInfo: '帐号或密码不存在', title: '登陆', layout: null});
   参考例子：192.168.1.119:1337/Authentication/loginProcess?userName=archer&password=archer
5、注销登录
   url:/Authentication/logout
   response:
        res.view('login/login');
