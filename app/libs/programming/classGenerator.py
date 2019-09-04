import os
from .TemplateReader import TemplateReader

class ClassGenerator:

	def __init__(self , database):
		self.database = database
		self.methods = []
		self.name = self.database.getName().capitalize()

	def generate(self):

		# get getable var
		attList , _ = self.fetchAttributesGetable(self.database.getAttibutes())

		# get updatable var
		updatable , codeForUpdate = self.updateObj()

		# get validate
		validate = self.validateObj()

		# get hash func when create obj
		hashable , _ = self.fetchAttributesEncrypt(self.database.getAttibutes())

		# get extra export list
		export = self.generateExportFunction()

		# read prototype file
		templateReader = TemplateReader("class/class.pt")
		key = {
			"databaseNameCapital":self.name,
			"databaseName":self.database.getName(),
			"attributes":attList,
			"updatable_attributes":updatable,
			"hashable_attributes":hashable,
			"update_code":codeForUpdate,
			"extension":validate,
			"export":export
		}
		return templateReader.generate(key)

	def validateObj(self):
		code = ""
		auth = []
		encrypt = []

		for att in self.database.getAttibutes():
			if att.getIsEncrypt():
				encrypt.append(att)
			if att.getIsAuth():
				auth.append(att)

		authAtt , _ = self.fetchAttributesGetable(auth)
		for att in encrypt:
			if att.getIsEncrypt():
				templateReader = TemplateReader("options/class/validate.pt")
				key = {
					"databaseName":self.database.getName(),
					"encrypt_var":att.getName(),
					"encrypt_var_capital":att.getName().capitalize(),
					"auth_var":authAtt
				}
				code += templateReader.generate(key)
				self.methods.append("validate{0}".format(att.getName().capitalize()))

		return code

	def fetchAttributesEncrypt(self, attributes):
		code = ""
		att_list = []
		for att in attributes:
			if att.getIsEncrypt():
				code += "	{0}.set{1}(data.{2})\n".format(self.database.getName() , att.getName().capitalize() , att.getName())
				att_list.append(att)
		return code , att_list

	def updateObj(self):

		attributes , attList = self.fetchAttributes(self.database.getAttibutes())
		updateable = self.createAssignUpdate(attList)

		return attributes , updateable

	def fetchAttributes(self , attributes):
		code = ""
		att_list = []
		for att in attributes:
			if att.getIsUpdate():
				if len(code) > 0:
					code += " , "
				code += att.getName()
				att_list.append(att)
		return code , att_list

	def fetchAttributesGetable(self , attributes):
		code = ""
		att_list = []
		for att in attributes:
			if att.getIsGet():
				if len(code) > 0:
					code += " , "
				code += att.getName()
				att_list.append(att)
		return code , att_list

	def createAssignUpdate(self , attributes):
		code = ""
		for att in attributes:
			if att.getIsUpdate():
				attSet = att.getName() + " = " + att.getName()
				if att.getIsEncrypt():
					attSet = "set" + att.getName().capitalize() + "({0})".format(att.getName())
				code += "\tif ({0}) ".format(att.getName()) + "current"+ self.name + "." + attSet + ";\n"
		return code

	def generateExportFunction(self):
		code = ""
		for func in self.methods:
			code += "	" + func + ",\n"
		return code
