from .template import Template

class DatabaseTemplate(Template):

	def __init__(self , name):
		Template.__init__(self)
		self.name = name
		self.attributes = []
		self.methods = []
		self.requires = []
		self.indexes = []
		self.name = name
		self.schemaName = name + "Schema"
		self.isPagination = False

	def addAttribute(self , attribute):
		if attribute.getIsEncrypt():
			varName = attribute.getName()
			self.addMethod("set" + varName.capitalize() , self.function([varName] , "this.{0} = Encoder.MD5_encrypt({0});".format(varName) ))
			self.addMethod("validate" + varName.capitalize() , self.function([varName] , "return Encoder.MD5_validate({0} , this.{0});".format(varName)))
		self.attributes.append(attribute)

	def removeAttribute(self , index ):
		self.attributes.remove(index)

	def addIndex(self , option ):
		index = {
			"op" : option,
		}
		self.indexes.append(index)

	def removeIndex(self , index ):
		self.indexes.remove(index)

	def addMethod(self , name , code):
		method = {
			"name" : name,
			"code" : code
		}
		self.methods.append(method)

	def removeMethod(self , index):
		self.methods.remove(index)

	def addRequire(self , name , location):
		req = {
			"name" : name,
			"loc" : location
		}
		self.requires.append(req)

	def removeRequire(self , index):
		self.requires.remove(index)

	def initRequire(self):
		code = ""
		code += "var mongoose = require(\"mongoose\");" + "\n"
		code += "var Schema = require(\"mongoose\").Schema;" + "\n"
		for req in self.requires:
			code += self.importFile( "var" , req["name"] , req["loc"] ) + "\n"
		return code + "\n"

	def initSchema(self):
		code = ""
		for att in self.attributes:
			code += "\t" + self.createAttribute(att.getName() , att.generate()) + "\n"
		return self.schema( self.schemaName , code ) + "\n\n"

	def initIndex(self):
		code = ""
		unique = ""
		for i in self.attributes:
			if i.getIsUnique():
				if len(unique) > 0:
					unique += " , "
				unique += i.getName() + ":1"

		if len(unique) > 0:
			unique = "{ " + unique + " } , {unique: true}"
			code += self.schemaIndex( self.schemaName , unique) + "\n\n"
		return code

	def initMethod(self):
		code = ""
		for m in self.methods:
			code += self.schemaMethod( self.schemaName , m["name"] , m["code"] ) + "\n\n"

		return code


	def initExport(self):
		return self.call("module" , "exports") + " = mongoose.model('{0}', {1})".format(self.name , self.schemaName)

	def generate(self):
		self.addRequire("Encoder" , "./libs/Encoder" )
		fileData = ""
		fileData += self.initRequire()
		fileData += self.initSchema()
		fileData += self.initIndex()
		fileData += self.initMethod()
		fileData += self.initExport()
		return fileData

	def createAttribute(self , name , type ):
		return "{0} : {1},".format( name , type )

	def schema(self , name , attribute):
		return "var {0} = Schema({{\n\n{1}\n}})".format( name , attribute )

	def schemaIndex(self , name , index):
		return "{0}.index({1});".format( name , index )

	def schemaMethod(self , schemaName , methodName , function ):
		return "{0}.methods.{1} = {2}".format(schemaName , methodName , function)

	def getName(self):
		return self.name

	def getAttibutes(self):
		return self.attributes

	def pagination(self):
		self.isPagination = True
		return self

	def getIsPagination(self):
		return self.isPagination
