class Attribute:

	def __init__(self , name):
		self.name = name
		self.type = "String"
		self.defaultValue = ""
		self.isDefault = False
		self.array = False
		self.isRequire = False
		self.isLowercase = False
		self.isTrim = False
		self.max = 0
		self.min = 0
		self.isMax = False
		self.isMin = False
		self.isUnique = False
		self.isEncrypt = False
		self.isGet = True
		self.isUpdate = True
		self.isAuth = False
		self.isId = False

	def setTypeString(self):
		self.type = "String"
		return self

	def setTypeID(self , ref):
		self.type = "mongoose.Schema.Types.ObjectId , ref: '{0}'".format(ref)
		return self

	def setTypeDate(self):
		self.type = "Date"
		return self

	def setTypeNumber(self):
		self.type = "Number"
		return self

	def setTypeBuffer(self):
		self.type = "Buffer"
		return self

	def setTypeMixed(self):
		self.type = "mongoose.Schema.Types.Mixed"
		return self

	def setTypeBoolean(self):
		self.type = "Boolean"
		return self

	def setTypeMap(self):
		self.type = "Map"
		return self

	def setTypeDecimal128(self):
		self.type = "mongoose.Schema.Types.Decimal128"
		return self

	def setTypeObject(self , objs):
		obj = ""
		for o in objs:
			obj += "{ "+ o.generate() +" },"
		self.type = obj
		return self

	def setTypeToArray(self):
		self.array = True
		return self

	def clearType(self):
		self.type = "String"
		self.defaultValue = ""
		self.isDefault = False
		self.array = False
		self.isRequire = False
		self.isLowercase = False
		self.isTrim = False
		self.max = 0
		self.min = 0
		self.isMax = False
		self.isMin = False
		self.isUnique = False
		self.isEncrypt = False
		self.isGet = True
		self.isUpdate = True
		self.isAuth = False
		self.isId = False
		return self

	def require(self):
		self.isRequire = True
		return self

	def default(self , value):
		self.defaultValue = str(value)
		self.isDefault = True
		return self

	def lowercase(self):
		self.isLowercase = True
		return self

	def trim(self):
		self.isTrim = True
		return self

	def setMax(self , value):
		self.max = value
		self.isMax = True
		return self

	def setMin(self , value):
		self.min = value
		self.isMin = True
		return self

	def unique(self):
		self.isUnique = True
		return self

	def encrypt(self):
		self.isEncrypt = True
		return self

	def auth(self):
		self.isAuth = True
		return self

	def id(self):
		self.isId = True
		return self

	def getIsAuth(self):
		return self.isAuth

	def disableGet(self):
		self.isGet = False
		return self

	def disableUpdate(self):
		self.isUpdate = False
		return self

	def getIsGet(self):
		return self.isGet

	def getIsUpdate(self):
		return self.isUpdate

	def getIsEncrypt(self):
		return self.isEncrypt

	def getIsUnique(self):
		return self.isUnique

	def getName(self):
		return self.name

	def getIsId(self):
		return self.isId

	def generate(self):
		code = self.type

		if self.isRequire:
			code += ", required : true"

		if self.isDefault:
			code += " , default :" + self.defaultValue

		if self.isLowercase:
			code += ", lowercase : true"

		if self.isTrim:
			code += ", trim : true"

		if self.isMax:
			code += ", max : " + str(self.max)

		if self.isMin:
			code += ", min :" + str(self.min)

		code = "{ type:" + code + "}"

		if self.array:
			code = "[" + code + "]"

		return code
