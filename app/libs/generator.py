from libs.io.fileio import FileIO
from libs.io.dirio import DirIO
from libs.programming.TemplateReader import TemplateReader , PrototypeTemplateReader

# last edit
from libs.programming.database import DatabaseTemplate
from libs.programming.attribute import Attribute

# hard edit
from libs.programming.classGenerator import ClassGenerator
from libs.programming.controllerGenerator import ControllerGenerator

class Generator:

	def __init__(self , appName , port , secret = "mySecret" , output_location = "./"):
		self.appName = appName
		self.port = port
		self.databases = []
		self.secret = secret

		if len(output_location) > 0 and output_location[-1] != "/":
			output_location += "/"

		self.output_location = output_location

	def generateSetting(self , port , middlewares):
		# setting standard generator
		self.middlewares = middlewares

	def generateStructure(self , app):

		# create root
		self.root = DirIO( self.output_location + app )

		# create main folder
		self.app = DirIO("app")
		self.models = DirIO("models")
		self.controllers = DirIO("controllers")
		self.routes = DirIO("routes")
		self.classes = DirIO("classes")
		self.socket = DirIO("socket")

		# create socket folders
		self.socketController = DirIO("controllers")

		# create apiDoc
		apiDoc = DirIO("apiDoc")

		# craete config folder
		self.config = DirIO("config")
		self.env = DirIO("env")
		self.middle = DirIO("middlewares")

		# create lib folder
		self.libs = DirIO("libs")

		# create logged folder
		logged = DirIO("logged")

		# build structure
		self.app.addNode(self.models)
		self.app.addNode(self.controllers)
		self.app.addNode(self.routes)
		self.app.addNode(self.classes)

		self.root.addNode(self.app)
		self.root.addNode(apiDoc)
		self.root.addNode(self.config)
		self.root.addNode(self.socket)

		self.models.addNode(self.libs)

		self.config.addNode(self.env)

		self.socket.addNode(self.socketController)

		self.config.addNode(self.middle)
		self.root.addNode(logged)

	def generateFile(self , secret):

		# generate Config files
		templateReader = TemplateReader("config/env/awt.config.pt")
		awt = FileIO("awt.config.js" , templateReader.generate({}))

		templateReader = TemplateReader("config/env/database.env.pt")
		key = {
			"secret":"test_env_secret"
		}
		databaseConfig = FileIO("database.env.js" ,templateReader.generate(key))

		# generate framework file
		middlewares = ""
		for m in self.middlewares:
			templateReader = TemplateReader("options/middleware/middleware.pt")
			key = {
				"middleware":m,
			}
			middlewares += templateReader.generate(key)

		templateReader = TemplateReader("config/express.pt")
		key = {
			"middlewares":middlewares
		}
		express = FileIO("express.js" , templateReader.generate(key))

		templateReader = TemplateReader("config/mongoose.pt")
		mongoose = FileIO("mongoose.js", templateReader.generate({}))

		# generate server file
		templateReader = TemplateReader("server.pt")
		key = {"port":str(self.port)}
		serverStarter = FileIO("server.js" ,templateReader.generate(key))

		# generate Dockerfile
		dockerfile = FileIO("Dockerfile" , self.generateDockerfile())

		# generate lib file
		encoder = FileIO( "Encoder.js" , self.generateEncoder())

		# generate package
		package = FileIO("package.json" , self.generatePackage())

		# build structure
		self.env.addNode(awt)
		self.env.addNode(databaseConfig)

		self.config.addNode(express)
		self.config.addNode(mongoose)

		self.libs.addNode(encoder)

		self.root.addNode(package)
		self.root.addNode(dockerfile)
		self.root.addNode(serverStarter)

	def generateMiddleware(self):
		middlewares = ["customResponses" , "logger" , "validateToken" , "getterObjectId" , "getterPopulate" , "getterPagination"]
		# indexer = Indexer(middlewares)
		indexFile = FileIO("index.js" , self.indexGenerate(middlewares))
		self.middle.addNode(indexFile)

		for m in middlewares:
			templateReader = TemplateReader("config/middlewares/" + m + ".pt")
			self.middle.addNode(FileIO( m + ".js" , templateReader.generate({}) ))

	def generateController(self):
		for db in self.databases:
			generatorController = ControllerGenerator(db)
			self.controllers.addNode(FileIO( db.getName() + ".js" , generatorController.generate() ))

	def generateModel(self):
		for db in self.databases:
			file = FileIO( db.getName() + ".js" , db.generate())
			self.models.addNode(file)

	def generateRouter(self):
		for db in self.databases:

			att_list = []
			for att in db.getAttibutes():
				if att.getIsEncrypt():
					att_list.append(att)

			# error no validate Attribute
			if len(att_list) < 1 or len(att_list) > 1:
				validate = ""
			else:
				templateReader = TemplateReader("options/router/post.pt")
				key = {
					"path":"/validate",
					"controller":db.getName(),
					"method": "validate"
				}

				validate = templateReader.generate(key)

			templateReader = TemplateReader("router/router.pt")
			key = {
				"controller":db.getName(),
				"validate": validate
			}

			self.routes.addNode(FileIO( db.getName() + ".js" , templateReader.generate(key) ))

	def generateClass(self):
		for db in self.databases:
			generatorClass = ClassGenerator(db)
			self.classes.addNode(FileIO( db.getName() + ".js" , generatorClass.generate() ))

	def generateSocket(self):
		requireIndex = []
		exportIndex = []
		indexController = []

		# create socket database haddler
		for db in self.databases:
			templateReader = TemplateReader("socket/controllers/template.pt")

			# create key
			key = {
				"capitalClassName":db.getName().capitalize(),
				"className":db.getName(),
			}

			# get index for export
			requireIndex.append('const {0} = require("./{0}");'.format(db.getName()))
			exportIndex.append('	{0},'.format(db.getName()))
			indexController.append('		controller.{0}(socket)'.format(db.getName()))

			# add to socket controller folder
			self.socketController.addNode( FileIO( db.getName() + ".js" , templateReader.generate(key) ) )

		# list to string
		requireIndex = "\n".join(requireIndex)
		exportIndex = "\n".join(exportIndex)
		indexController = "\n".join(indexController)

		# create controller index
		templateReader = TemplateReader("socket/controllers/index.pt")
		key = {
			"require":requireIndex,
			"export":exportIndex
		}
		self.socketController.addNode( FileIO( "index.js" , templateReader.generate(key) ) )

		# create room controllers
		templateReader = TemplateReader("socket/controllers/room.pt")
		self.socketController.addNode( FileIO( "room.js" , templateReader.generate({}) ) )

		# create index for socket
		templateReader = TemplateReader("socket/index.pt")
		key = {
			"controller":indexController
		}
		self.socket.addNode( FileIO( "index.js" , templateReader.generate(key) ) )

	def generateDockerfile(self):
		templateReader = TemplateReader("Dockerfile.pt")
		return templateReader.generate({ "port" : str(self.port) })

	def generatePackage(self):
		templateReader = TemplateReader("package.pt")
		return templateReader.generate({ "appName" : self.appName })

	def generateEncoder(self):
		templateReader = TemplateReader("/model/libs/Encoder.pt")
		return templateReader.generate({ })

	def generateIndex(self):
		# craete app index
		fileName = "index.js"

		imports = ""
		routes = ""

		for db in self.databases:

			key = {
				"database":db.getName(),
				"route":db.getName()
			}

			templateReader = TemplateReader("options/router/require_router.pt")
			imports += templateReader.generate(key)

			templateReader = TemplateReader("options/router/router.pt")
			routes += templateReader.generate(key)

		templateReader = TemplateReader("index.pt")
		key = {
			"requires":imports,
			"routes" : routes
		}

		indexApp = FileIO(fileName , templateReader.generate(key))

		# craete model index
		dbList = []
		for db in self.databases:
			dbList.append(db.getName())
		# indexer = Indexer(dbList)
		indexModel = FileIO(fileName , self.indexGenerate(dbList) )

		# build structure
		self.app.addNode(indexApp)
		self.models.addNode(indexModel)

	def indexGenerate(self , importList):

		req = self.generateRequire(importList)
		exp = self.generateExport(importList)

		templateReader = TemplateReader("options/index/index.pt")
		return templateReader.generate({"import":req , "export" : exp})

	def generateRequire(self , importList):
		code = ""
		for il in importList:
			templateReader = TemplateReader("options/index/require.pt")
			code +=  templateReader.generate({"object":il})
		return code

	def generateExport(self , importList):
		code = ""
		for il in importList:
			code += "\t" + il + ",\n"

		templateReader = TemplateReader("options/index/export.pt")
		return templateReader.generate({"objects":code})

	def addDatabase(self , database):
		self.databases.append(database)

	def generate(self):

		# generate stardard folders and files
		self.generateSetting( self.port , ["express.json()" , "middleware.customResponses" , "middleware.logger"] )
		self.generateStructure( self.appName )
		self.generateMiddleware()
		self.generateFile( self.secret )
		self.generateModel()
		self.generateClass()
		self.generateController()
		self.generateRouter()
		self.generateIndex()
		self.generateSocket()
		self.root.run()

		return self.root

class StructureGenerator:

	def __init__(self , appName , structures , keys):
		self.root = DirIO( "./" + self.appName )
		self.structures = structures.sort(key=lambda s: s.level , reverse = False)
		self.keys = {}
		self.selected_dir = {}
		self.prototype_cache = {}

		# store key by file id
		for key in keys:
			if key.file in self.keys:
				self.keys[key.file][key.name] = key.val
			else:
				self.keys[key.file] = { key.name : key.val }

	def savePrototype(self , prototype):
		if not prototype.id in self.prototype_cache:
			self.prototype_cache[prototype.id] = prototype

	def addFile(self , structure_file , file):
		# is subfolder or root
		if structure_file.level > 0 and structure_file.subfolder in dirs :
			# add file to parent folder
			self.selected_dir[structure_file.subfolder].addNode(file)
		else:
			self.root.addNode(file)

	def generate(self):

		for s in structure:
			file = -1

			if s.filetype == "file":
				# init state
				prototype = s.prototype
				template = PrototypeTemplateReader( prototype )

				# cache prototype
				self.savePrototype(prototype)

				# don't have key, just ignore it
				if not s.id in self.keys:
					continue

				# generate file
				key = self.keys[s.id]
				file = FileIO(s.name , template.generate(key) )

			else:
				# init dir
				file = DirIO(str(s.name))

				# save dir
				self.selected_dir[s.id] = file

			# add file in folder
			self.addFile(s , file)

		# generate
		self.root.run()
		return self.root
