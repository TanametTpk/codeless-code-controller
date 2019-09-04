import os
from .TemplateReader import TemplateReader

class ControllerGenerator:

	def __init__(self , database):
		self.database = database

	def generate(self):
		code = ""
		code += self.generateCode() + "\n"
		return code

	def generateCode(self):

		# get encrypt vars
		encryptVar = self.fetchAttributesEncrypt(self.database.getAttibutes())

		# get id vars
		idVars = self.fetchAttributesId(self.database.getAttibutes())

		# get validate function
		validateFunction = self.validateObj(encryptVar , idVars)

		# read prototype file
		templateReader = TemplateReader("/controller/controller.pt")
		key = {
			"class"				:	self.database.getName(),
			"validate" 			:	validateFunction
		}

		return templateReader.generate(key)

	def fetchAttributesEncrypt(self, attributes):
		att_list = []
		for att in attributes:
			if att.getIsEncrypt():
				att_list.append(att)
		return att_list

	def fetchAttributesId(self, attributes):
		att_list = []
		for att in attributes:
			if att.getIsId():
				att_list.append(att)
				break
		return att_list

	def validateObj(self , vars , idVars):

		if len(vars) > 0 and len(vars) < 2 and len(idVars) > 0:

			# read prototype file
			templateReader = TemplateReader("/controller/validate.pt")
			key = {
				"database"				:	self.database.getName(),
				"encrypt_var" 			:	vars[0].getName(),
				"encrypt_var_capital" 	:	vars[0].getName().capitalize(),
				"id_var" 				: 	idVars[0].getName()
			}

			return templateReader.generate(key)

		else:
			return ""
