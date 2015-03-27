/**
 * Author: Archer Reilly
 * Date: 26/Sep/2014
 * File: returnCode.js
 * Desc: some json data that will be used in this project.
 *
 * Produced By Ebang.
 */
module.exports.returnCode = {
/*****************************************************************
 *                         OK SECTION                            *
 *****************************************************************/
  /**
   * for read, create, delete, update etc, if ok
   */
  DataProcessingOk:{
    code:200,
    msg:'Successful',
    desc:'',
    data: null,
  },
  
  QUERY_OK: {
    code: 200,
    msg: 'SUCCESSFUL',
    desc: '数据操作成功',
    data: null,
  },
  
  QUERY_ERROR: {
    code: 403,
    msg: 'ERROR',
    desc: '数据操作出错',
    data: null,
  },
  
  /**
   * for file operation ok
   */
  FILE_OK: {
    code: 200,
    msg: 'SUCCESSFUL',
    desc: '文件操作成功',
    data: null,
  },
  
  /**
   * for FreeSwitch reloadxml ok
   */
  FREESWITCH_OK: {
    code: 200,
    msg: 'FREESWITCH OK',
    desc: 'FreeSwitch 语音服务器操作成功',
    data: null,
  },
  
  
/*****************************************************************
 *                       ERROR SECTION                           *
 *****************************************************************/
  /**
   * for action parameters
   */
  INVALID_PARAM: {
    code: 403,
    msg: 'Invalid Param',
    desc: '参数错误',
    data: null,
  },
  
  /**
   * for query, update, delete etc not exist
   */ 
  NOT_FOUND: {
    code: 404,
    msg: 'NOT FOUND',
    desc: '数据或者操作缺失',
    data: null,
  },
  
  /**
   * for CRUD operations that have database error
   */
  DB_ERROR: {
    code: 500,
    msg: 'DATABASE ERROR',
    desc: '数据库异常，请重试',
    data: null,
  },
  
  /**
   * for Rule based permission check fails
   */
  NOT_AUTHORIZED: {
    code: 403,
    msg: 'NOT_AUTHORIZED',
    desc: '用户操作受限',
    data: null,
  },
  
  /**
   * for file operation fails
   */
  FILE_ERROR: {
    code: 500,
    msg: 'FILE ERROR',
    desc: '文件操作失败',
    data: null,
  },
  
  /**
   * for FreeSwitch reloadxml fails
   */
  FREESWITCH_ERROR: {
    code: 500,
    msg: 'FREESWITCH ERROR',
    desc: 'FreeSwitch 语音服务器错误',
    data: null,
  },
  
  /**
   * for locked users, a notification
   */
  LOCKED: {
    code: 403,
    msg: 'LOCKED',
    desc: '用户锁定',
    data: null,
  },
}
