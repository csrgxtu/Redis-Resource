#!/usr/bin/env python
# coding = utf-9
#
# Author: Archer Reilly
# Date: 22/Jan/2015
# File: InsertResources.py
# Desc: batch insert resource table using api
#
# Produced By Ebang.
from Download import Download
from Utility import loadMatrixFromFile

# base url
URL = 'http://localhost:1337/'

# get resources
resources = [x[0] for x in loadMatrixFromFile('./resourcesa.txt')]

# login
url = URL + 'Authentication/loginProcessAndroid?userName=archer&password=archer'
d = Download(url)
if d.doRequest():
  print 'Cant do request'
  sys.exit(1)

# loop resources and insert
for item in resources:
  url = URL + 'Resource/save?moduleName=test&resourceName=test&resourceUrl=' + item
  d = Download(url)
  if d.doRequest():
    print item, ' Cant do request'

