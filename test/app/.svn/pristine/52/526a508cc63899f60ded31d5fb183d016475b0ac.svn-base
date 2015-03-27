1, 创建后台任务
  URL:/CronTask/create
  Params:
   * @param min int (0 - 59)
   * @param hour int (0 - 23)
   * @param dom int ( 1 - 31)
   * @param mon int (1 - 12)
   * @param dow int (0 - 6)
   * @param url string (/data/write)
  Return:
   参数错误，数据库错误，操作成功
  Example:
    http://localhost:1337/CronTask/create?min=*&hour=*&dom=*&mon=*&dow=*&url=/movie/get

2, 更新后台任务
  URL:/CronTask/update
  Params:
   * @param cronTaskId
   * @param min int (0 - 59)
   * @param hour int (0 - 23)
   * @param dom int ( 1 - 31)
   * @param mon int (1 - 12)
   * @param dow int (0 - 6)
   * @param url string (/data/write)
  Return:
   参数错误，数据库错误，操作成功
  Example:
    http://localhost:1337/CronTask/update?cronTaskId=1&min=*&hour=*&dom=*&mon=*&dow=*&url=/movie/put
    
3, 读取后台任务
  URL:/CronTask/read
  Params:
   * @param pageIndex int (1 - )
   * @param pageSize int
  Return:
   参数错误，数据库错误，操作成功
  Example:
    http://localhost:1337/CronTask/read?pageIndex=1&pageSize=10
    
4, 删除后台任务
  URL:/CronTask/delete
  Params:
   * @param cronTaskId int
  Return:
   参数错误，数据库错误，操作成功
  Example:
    http://localhost:1337/CronTask/delete?cronTaskId=1

5, 读取后台任务历史
  URL:/CronTask/history
  Params:
   * @param cronTaskId int
   * @param pageIndex int (1 - )
   * @param pageSize int
  Return:
   参数错误，数据库错误，操作成功
  Example:
    http://localhost:1337/CronTask/history?cronTaskId=4&pageIndex=1&pageSize=10
    
