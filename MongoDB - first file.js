// -- CRUD, Query and Indexes



// CRUD


// 1- insert the following documents ino a collection, then query to check your result
/*
[
	{"name": "The Valley of the Kings", "city": "Luxor", "country": "Egypt", "gps": { "lat": 25.746424, "lng": 32.605309 }},
	{"name": "Arc de Triomphe", "city": "Paris", "country": "France", "gps": { "lat": 48.873756, "lng": 2.294946 }},
	{"name": "The Eiffel Tower", "city": "Paris", "country": "France", "gps": { "lat": 48.858093, "lng": 2.294694 }},
	{"name": "Acropolis", "city": "Athens", "country": "Greece", "gps": { "lat": 37.970833, "lng": 23.726110 }},
	{"name": "The Great Wall of China", "city": "Huairou", "country": "China", "gps": { "lat": 40.431908, "lng": 116.570374 }},
	{"name": "The Statue of Liberty", "city": "New York", "country": "USA", "gps": { "lat": 40.689247, "lng": -74.044502 }}
]
*/



	// Create Database
	use ArchAreas_db
	
	// create emp collection and insert data

	db.ArchAreas.insertMany([
		{"name": "The Valley of the Kings", "city": "Luxor", "country": "Egypt", "gps": { "lat": 25.746424, "lng": 32.605309 }},
		{"name": "Arc de Triomphe", "city": "Paris", "country": "France", "gps": { "lat": 48.873756, "lng": 2.294946 }},
		{"name": "The Eiffel Tower", "city": "Paris", "country": "France", "gps": { "lat": 48.858093, "lng": 2.294694 }},
		{"name": "Acropolis", "city": "Athens", "country": "Greece", "gps": { "lat": 37.970833, "lng": 23.726110 }},
		{"name": "The Great Wall of China", "city": "Huairou", "country": "China", "gps": { "lat": 40.431908, "lng": 116.570374 }},
		{"name": "The Statue of Liberty", "city": "New York", "country": "USA", "gps": { "lat": 40.689247, "lng": -74.044502 }}
	])
	
	//Query Data
	db.ArchAreas.find()




// 2- count the number of documents in the collection


	db.ArchAreas.count()
	
// show collections, shows the collections that you have within a database
	show collections


// 3- view the collection in the normal way, and the formatted way

	//normal way: 
	
	db.ArchAreas.find( {} )
	
	//formatted way:
	db.ArchAreas.find().pretty()


// 4- fiter the collection to get only "The Valley of the Kings" monument using two different methods (one of them shoud use _id)


	//first
	
	db.ArchAreas.find( { "name": "The Valley of the Kings" } )

	//second
	
	db.ArchAreas.find({"_id": ObjectId("63c9bdae2bc734060cbe09f7")})

// 5- fiter the collection to get only monuments belong to France

	db.ArchAreas.find( { "country": "France" } )

// 6- update the name of "Arc de Triomphe" monument to "Arc de Triomphe de l'Étoile", then query to check your result

	//update
	
	db.ArchAreas.updateMany({"name" : "Arc de Triomphe"},{$set: { "name" : "Arc de Triomphe de l'Étoile"}})
	//query and check
	
	db.ArchAreas.find( { "name": "Arc de Triomphe" } )
	db.ArchAreas.find( { "name": "Arc de Triomphe de l'Étoile" } )

// 7- Add a new field to the whole collection as the editor of the collection
	
	db.ArchAreas.updateMany(
		  {},
		  { $set: {"collection editor": 'edit'} },
		  false,
		  true
		)

// 8- delete the "name": "The Valley of the Kings" monument, then query to check your result

	//delete
	
	db.ArchAreas.deleteMany({"name": "The Valley of the Kings"})
	//query
	
	db.ArchAreas.find( { "name": "The Valley of the Kings" } )


// 9- delete all monuments belong to France, then query to check your result

	//delete
	
	db.ArchAreas.deleteMany({"country": "France"})
	//query
	
	db.ArchAreas.find( { "country": "France" } )


// 10- delete all monuments, then query to check your result 

	//delete
	
	db.ArchAreas.deleteMany({})
	//query
	
	db.ArchAreas.find({})


// ----------------------------------------------------------------------------------
// Query


// 11- insert the following documents into a collection
[
	{"name": "Everest","height": 8848,"location": ["Nepal", "China"],"ascents": {"first": {"year": 1953},"first_winter": {"year": 1980},"total": 5656}},
	{"name": "K2","height": 8611,"location": ["Pakistan", "China"],"ascents": {"first": {"year": 1954},"first_winter": {"year": 1921},"total": 306}},
	{"name": "Kangchenjunga","height": 8586,"location": ["Nepal", "India"],"ascents": {"first": {"year": 1955},"first_winter": {"year": 1986},"total": 283}},
	{"name": "Lhotse","height": 8516,"location": ["Nepal", "China"],"ascents": {"first": {"year": 1956},"first_winter": {"year": 1988},"total": 461}},
	{"name": "Makalu","height": 8485,"location": ["China", "Nepal"],"ascents": {"first": {"year": 1955},"first_winter": {"year": 2009},"total": 361}}
]

	db.HighestAreas.insertMany([
		{"name": "Everest","height": 8848,"location": ["Nepal", "China"],"ascents": {"first": {"year": 1953},"first_winter": {"year": 1980},"total": 5656}},
		{"name": "K2","height": 8611,"location": ["Pakistan", "China"],"ascents": {"first": {"year": 1954},"first_winter": {"year": 1921},"total": 306}},
		{"name": "Kangchenjunga","height": 8586,"location": ["Nepal", "India"],"ascents": {"first": {"year": 1955},"first_winter": {"year": 1986},"total": 283}},
		{"name": "Lhotse","height": 8516,"location": ["Nepal", "China"],"ascents": {"first": {"year": 1956},"first_winter": {"year": 1988},"total": 461}},
		{"name": "Makalu","height": 8485,"location": ["China", "Nepal"],"ascents": {"first": {"year": 1955},"first_winter": {"year": 2009},"total": 361}}
	])


// 12- get the data of "Everest" peak only


	db.HighestAreas.find({"name": "Everest"})


// 13- get the data for all peaks except those contain "Everest" peak


	db.HighestAreas.find({"name": {$ne: "Everest"}})

// 14- get the data for "Everest" or "K2" peaks only, using two different methods

	//first
	
	db.HighestAreas.find({$or:[{"name": "Everest"}, {"name": "K2"}]})
	//second
	
	db.HighestAreas.find( { "name": { $in: [ "K2", "Everest" ] } } )


// - which peaks have height greater then 8500 ?

	db.HighestAreas.find({"height": {$gt:8500}})



// 15- repeat the previous query, but only show the the necessary data (name, ascents.first_winter, ascents.total)

// previous query is not this one, but what we care about here is the projection which is correct

	db.HighestAreas.find({ "name": { $in: [ "K2", "Everest" ] } }, {"name": 1, "ascents.first_winter": 1, "ascents.total": 1, "_id": 0} )


// 16- get the data for peaks that is partially located in Nepal 

	db.HighestAreas.find({"location": {$in: [ "Nepal" ]}})


// 17- get the data for peaks that is located in China, and Nepal, using two differnt methods

	//first
	
	db.HighestAreas.find({$and:[{"location": "China"}, {"location": "Nepal"}]})
	
	//second
	
	db.HighestAreas.find({$or:[{"location":['China', 'Nepal']}, {"location": ['Nepal', 'China']}]})


// 18- which peaks that have number of successful ascents greater than 1000 ?

	db.HighestAreas.find({"ascents.total":{$gt: 1000}})


// 19- get highest 3 peaks, but only show the the necessary data (name, height)

	db.HighestAreas.find({},{"name":1, "height":1, "_id":0}).sort({"height": -1}).limit(3)


// ----------------------------------------------------------------------------------
// Indexes

// 20- create index on the height field

	db.HighestAreas.createIndex({"height": -1})


// 21- does this query (db.peaks.find({name: "Everest"})) cause a collection scan ? verify your answer with a query then explain it

	db.HighestAreas.find(({name: "Everest"}))
	db.HighestAreas.find(({name: "Everest"})).explain()
	Yes, cause there's no index, and that isn't the key of the stored values


// 22- create unique index on the name field

	db.HighestAreas.createIndex({"name": 1}, {name: "name_index", unique: true})


// 23- does the same query (db.peaks.find({name: "Everest"})) cause a collection scan now ? verify your answer with a query then explain it

	db.HighestAreas.find(({name: "Everest"})).explain()
	No, It query the data using the name field only and just one time.

// 24- modeify the last query ((db.peaks.find({name: "Everest"}))) to become a covered query, verify your answer with a query then explain it

	db.HighestAreas.find(({name: "Everest"}, {"name": 1, "_id":0})).explain()
	covered query because we only name is needed and part of the name index, so the id not included.
	all the fields in the query are part of the index name, and
	all the fields returned in the results are in the same index.

// 25- insert the following document, check the result, and explain it
// {name: "Everest", height: 9200, location: ["India"], ascents: {first: {year: 2020}, first_winter: {year: 2021}, total: 2}}

//-- insertOne function would be better since it is one document
	db.HighestAreas.insertOne([{name: "Everest", height: 9200, location: ["India"], ascents: {first: {year: 2020}, first_winter: {year: 2021}, total: 2}}
	])

	An error occured:(E11000 duplicate key error collection: lap1.emp index: name_index dup key: { name: "Everest" })
	because the name field has a unique index, so its values can't be dublicated.


// 26- create embedded field index that will be useful filter & sort data using "ascents.total"

	db.HighestAreas.createIndex({"ascents.total": 1}, {name: "embeded f index"})


// 27- does the following query do index IXSCAN ? verify your answer with a query then explain it
// db.peaks.find({$and :[{"ascents.first_winter.year": {$gt: 1950}, height: {$lt: 8600}}]})

	db.HighestAreas.find({$and :[{"ascents.first_winter.year": {$gt: 1950}, height: {$lt: 8600}}]}).explain()

	Yes, id to IXSCAN using the index on hieght column.

// 28- can you create a better index to support this query ? verify your answer with a query then explain it


	db.HighestAreas.createIndex( { "ascents.first_winter.year": 1, "height": 1 } )
	db.HighestAreas.find({$and :[{"ascents.first_winter.year": {$gt: 1950}, height: {$lt: 8600}}]}).explain()

	By Creating Compound index on the all fields used in the query, it will reduce the execution time

// 29- create a multikey index for this collection

	db.HighestAreas.createIndex( { "location": 1 }, {name: "multi-ket index"})


// 30- show all indexes for peaks collection

	db.HighestAreas.getIndexes()


// 31- drop the hight index using two different methods

	//1- using document:
	
	db.HighestAreas.dropIndex({"height": 1})
	
	//2- using name
	
	db.items.dropIndex("height_1")









