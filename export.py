#!/usr/bin/python3

import sys

if not(len(sys.argv) == 2):
  exit()

inputFileName = sys.argv[1]

outputLines = []

def removeIdMarker(s):
  token = "<div ID=\" "
  tokenLen = len (token)
  startIdx = s.find(token)
  if startIdx >= 0:
    endIdx = s.find("\"", startIdx + tokenLen)
    if endIdx >= 0:
      return s[0: startIdx] + "<div" + s[endIdx + 1:]
  return s

try:
  inputFile = open(inputFileName)
  outputLines = inputFile.readlines()
  inputFile.close()
except BaseException:
  print("Can not open file: " + inputFileName)
  pass

outputLines = [removeIdMarker(l) for l in outputLines]

try:
  outputFile = open(inputFileName + 'l', "w+")
  for l in outputLines:
    outputFile.write(l)
  outputFile.close()
except BaseException:
  print("Can not write file: " + outputFile)
  pass
