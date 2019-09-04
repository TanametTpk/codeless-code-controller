class Template:

	def route(self , option , pathName , controller , middleware=""):
		if not middleware == "":
			middleware += " , "
		return "app.{0}('{1}', {3}{2});\n".format( option , pathName , controller , middleware )

	def call(self , controllerName , methodName):
		return controllerName + "." + methodName

	def controller(self , methodName , code):
		return "exports.{0} = async function(req , res , next)".format(methodName)+"{{\n{0}\n}}".format(code)

	def require(self , location):
		return "require(\"{0}\")".format(location)

	def importFile(self , type , varname , location):
		return "{0} {1} = {2}".format( type , varname , self.require(location) )

	def exports(self , list):
		items = ""
		for i in list:
			items += "\t" + i + ",\n"
		return "{0} = {{\n{1}}}".format( self.call("module" , "exports") , items )

	def function(self, args , code):
		args = " , ".join(args)
		return "function( {0} ){{\n\t{1}\n}}".format(args , code)

	def lamda(self, args , code):
		args = " , ".join(args)
		return "( {0} ) => {\n{1}\n}".format(args , code)
