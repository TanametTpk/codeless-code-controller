import os
import re

class TemplateReader:
	def __init__(self , file):
		self.file = file

	def generate(self , dict):
		path = os.path.dirname(os.path.abspath(__file__))
		if "\\" in path:
			path = path + "\\prototypes\\" + self.file.replace('/' , '\\')
		else:
			path = path + "/prototypes/" + self.file.replace('\\' , '/')

		# read file
		data = self.readFile(path)

		return self.place(data , dict)

	def place(self ,data , dict):
		for key , val in dict.items():

			# replace
			data = re.sub( "{\|" + key + "\??\|}" , val , data)

		# remove all unfill optional
		data = re.sub( "{\|.*\?\|}" , "" , data)

		return data

	def readFile(self , path):
		f = open(path , "r")
		data = f.read()
		f.close()
		return data

class PrototypeTemplateReader:
	def __init__(self , prototype):
		self.prototype = prototype

	def generate(self , key):
		return self.place(self.prototype , key )
