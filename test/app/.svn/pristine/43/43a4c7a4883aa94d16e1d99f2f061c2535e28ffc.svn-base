1, 指定主页面
  URL:/Role/index
  Params:
  Return:
    视图, JSON代码
  Example:

2, 创建更新Role
  URL:/Role/save
  Params:
   * @param roleId int (optional)
   * @param roleName string
   * @param description string
   * @param resources csv string
  Return:
    参数错误，数据库错误，操作成功
  Example:
    http://csrgxtu.com:1989/Role/save?roleName=系统管理员&description=administrator task&resources=1,2,3,4
    
3, 查询功能
  URL:/Role/read
  Params:
   * @param pageIndex int
   * @param pageSize int
   * @param roleName string (optional)
  Return:
    参数错误，数据库错误，操作成功
  Example:
    http://localhost:1337/Role/read?pageIndex=1&pageSize=10
4, 删除Role
  URL:/Role/delete
  Params:
    * @param roleId int
  Return:
    参数错误，数据库错误，操作成功
  Example:
    http://localhost:1337/Role/delete?roleId=19
    
5, 查询属于某个Role下的User
  URL:/Role/getUserListByRoleId
  Params:
    * @param roleId int
  Return:
    参数错误，数据库错误，操作成功
  Example:
    http://localhost:1337/Role/getUserListByRoleId?roleId=19
