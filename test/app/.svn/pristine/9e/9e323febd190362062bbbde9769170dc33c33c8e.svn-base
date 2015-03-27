#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Author: Archer Reilly
# Date: 22/Jan/2015
# File: InsertResourceRole.py
# Desc: Insert into xfjwt_resource_roles__role_resources
#
# Produced By Ebang
import sys
from Download import Download

# base url
URL = "http://localhost:1989/"

# login first
url = URL + "Authentication/loginProcessAndroid?userName=archer&password=archer"
d = Download(url)
if d.doRequest():
  print "Cant do authentication request"
  sys.exit(1)

# insert into table by api
url = URL + "Role/save?roleName=系统管理员&descriptiion=administrator&resources="
for i in range(1, 62):
  url = url + str(i) + ","
url = url[:-1]
print "DEBUG: ", url
d = Download(url)
if d.doRequest():
  print "Cant do insert request"
  sys.exit(1)
print d.getSOURCE()
