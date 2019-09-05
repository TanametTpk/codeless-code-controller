import json
from libs.programming.attribute import Attribute
from libs.programming.database import DatabaseTemplate
from libs.model import File , Prototype , Key

class JsonReader:
	def __init__(self , string):
		self.json = json.loads(string)

	def getJson(self):
		return self.json

	def generateDatabases(self):
		databases = []
		ele_dbs = 'databases'
		ele_db_name = 'name'
		ele_att = 'attributes'

		for json_db in self.json[ele_dbs]:
			if json_db.get(ele_db_name):
				db = DatabaseTemplate(json_db.get(ele_db_name))
				for att in json_db.get(ele_att):
					attribute = self.generateAttribute(att)
					if attribute is None:
						continue
					db.addAttribute(attribute)
				databases.append(db)

		return databases

	def generateAttribute(self , attribute):
		if not attribute.get('name'):
			return None

		att = Attribute(attribute.get('name'))
		self.getAttributeType(att , attribute)

		if attribute.get('default'):
			att.default(attribute.get('default'))

		if attribute.get('require'):
			att.require()

		if attribute.get('lowercase'):
			att.lowercase()

		if attribute.get('trim'):
			att.trim()

		if attribute.get('max'):
			att.setMax(attribute.get('max'))

		if attribute.get('min'):
			att.setMin(attribute.get('min'))

		if attribute.get('unique'):
			att.unique()

		if attribute.get('encrypt'):
			att.encrypt()

		if attribute.get('disable_get'):
			att.disableGet()

		if attribute.get('disable_update'):
			att.disableUpdate()

		if attribute.get('auth'):
			att.auth()

		if attribute.get('id'):
			att.id()

		return att

	def getAttributeType(self , att , json , level=0):

		type = json.get('type')

		if type == "string":
			att.setTypeString()
		elif type == "id":
			ref = json.get('ref')
			if ref:
				att.setTypeID(ref)
		elif type == "date":
			att.setTypeDate()
		elif type == "number":
			att.setTypeNumber()
		elif type == "buffer":
			att.setTypeBuffer()
		elif type == "mixed":
			att.setTypeMixed()
		elif type == "boolean":
			att.setTypeBoolean()
		elif type == "decimal128":
			att.setTypeDecimal128()
		elif type == "object":
			# max recursive is 10
			if level < 10:
				level += 1
				objects = []
				for obj in json['sub_objects']:
					name = obj.get('name')
					if name is None:
						continue
					newAtt = Attribute(name)
					self.getAttributeType(newAtt , obj , level)
					objects.append(newAtt)
				if len(objects) > 0:
					att.setTypeObject(objects)

		elif type == "array":
			arr_option = json.get('array_option')
			if arr_option and not (arr_option == "array"):
				self.getAttributeType(att , arr_option)
				att.setTypeToArray()
