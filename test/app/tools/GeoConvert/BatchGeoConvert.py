#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Author: Archer Reilly
# Date: 26/Jan/2015
# File: BatchGeoConvert.py
# Desc: batch convert Google geos to baidu
#
# Produced By Ebang
import sys
from Download import Download
from Utility import loadMatrixFromFile
from time import sleep

# base url
URL = 'http://localhost:1989/'

# login first
url = URL + "Authentication/loginProcessAndroid?userName=archer&password=archer"
d = Download(url)
if d.doRequest():
  print "Cant do authentication request"
  sys.exit(1)
print d.getSOURCE()

# invoke api
# process xfjwt_ShuiYuan
url = URL + 'GeoConvert/g2b?tableName=xfjwt_ShuiYuan&id='
shuiYuanIds = [x[0] for x in loadMatrixFromFile('./ShuiYuanIds.txt')]
for item in shuiYuanIds:
  newUrl = url + item
  d = Download(newUrl)
  if d.doRequest():
    print "ShuiYuan ERROR: ", newUrl
    sleep(30)
    continue
  print "ShuiYuan INFO: ", item, d.getHTTPCODE(), d.getSOURCE()

# process xfjwt_FireKeyUnit
url = URL + 'GeoConvert/g2b?tableName=xfjwt_FireKeyUnit&id='
fireKeyUnitIds = [x[0] for x in loadMatrixFromFile('./FireKeyUnitIds.txt')]
for item in fireKeyUnitIds:
  newUrl = url + item
  d = Download(newUrl)
  if d.doRequest():
    print "FireKeyUnit ERROR: ", newUrl
    sleep(30)
    continue
  print "FireKeyUnit INFO: ", item, d.getHTTPCODE(), d.getSOURCE()

# process YAGL_MHDW
url = URL + 'GeoConvert/g2ba?tableName=YAGL_MHDW&id='
mhdwIds = [x[0] for x in loadMatrixFromFile('./MHDWIds.txt')]
for item in mhdwIds:
  newUrl = url + item
  d = Download(newUrl)
  if d.doRequest():
    print "MHDW ERROR: ", newUrl
    sleep(30)
    continue
  print "MHDW INFO: ", item, d.getHTTPCODE(), d.getSOURCE()

# process JGXX_XFJG
url = URL + 'GeoConvert/g2ba?tableName=JGXX_XFJG&id='
xfjgIds = [x[0] for x in loadMatrixFromFile('./XFJGIds.txt')]
for item in xfjgIds:
  newUrl = url + item
  d = Download(newUrl)
  if d.doRequest():
    print "XFJG ERROR: ", newUrl
    sleep(30)
    continue
  print "XFJG INFO: ", item, d.getHTTPCODE(), d.getSOURCE()
