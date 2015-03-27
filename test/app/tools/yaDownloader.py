#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Author: Archer Reilly
# Date: 02/Feb/2015
# File: yaDownloader.py
# Desc: download all ya given the id in yaDownloader.txt
#
# Produced By Ebang
from Utility import loadMatrixFromFile
from Utility import str2file
from Download import Download
import sys
import os
import multiprocessing

if len(sys.argv) != 3:
  print 'Usage: python yaDownloader.py dataPath toolPath'
  sys.exit(1)

URL = 'http://localhost:1989/DynamicPlan/getData?id='
path = sys.argv[1]
toolPath = sys.argv[2]
ids = [x[0] for x in loadMatrixFromFile(toolPath + '/yaDownloader.txt')]

def worker(URL, path, ids):
  for item in ids:
    url = URL + item
    fileName = path + '/' + item + '.html'
    d = Download(url)
    if d.doRequest():
      print 'ERROR: ', item
      continue
    str2file(d.getSOURCE(), fileName)
    print 'INFO: ', item

# devide the ids into 20 id
#threads = []
jobs = []
divider = len(ids) / 20
tmp = 0
for i in range(len(ids)):
  if i % divider == 0:
    #t = threading.Thread(target=worker, args=(URL, path, ids[tmp:i]))
    p = multiprocess.Process(target=worker, args=(URL, path, ids[tmp:i]))
    jobs.append(p)
    #threads.append(t)
    #t.start()
    p.start()
    #print tmp, i
    tmp = i
  if len(threads) == divider:
    #t = threading.Thread(target=worker, args=(URL, path, ids[i:]))
    p = multiprocess.Process(target=worker, args=(URL, path, ids[i:]))
    #threads.append(t)
    jobs.append(p)
    #t.start()
    p.start()
    #print i, len(ids)

# copy the css js lib
cmd = "cp -r ../assets/bootstrap " + path
os.system(cmd)

# replace /bootstrap to ./bootstrap
cmd = "sed -i 's/\/bootstrap\//\.\/bootstrap\//g' " + path + "/*.html"
os.system(cmd)

# compress the package
cmd = "tar zcvf " + path + "/../ya.tar.gz " + path
os.system(cmd)
