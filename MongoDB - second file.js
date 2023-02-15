// -- Aggregation & Relations



// Aggregation


// 1- insert the following documents ino a collection, then query to check your result
/*
[
    {"name": "Seoul", "country": "South Korea", "continent": "Asia", "population": 25.674 },
    {"name": "Mumbai", "country": "India", "continent": "Asia", "population": 19.980 },
    {"name": "Lagos", "country": "Nigeria", "continent": "Africa", "population": 13.463 },
    {"name": "Beijing", "country": "China", "continent": "Asia", "population": 19.618 },
    {"name": "Shanghai", "country": "China", "continent": "Asia", "population": 25.582 },
    {"name": "Osaka", "country": "Japan", "continent": "Asia", "population": 19.281 },
    {"name": "Cairo", "country": "Egypt", "continent": "Africa", "population": 20.076 },
    {"name": "Tokyo", "country": "Japan", "continent": "Asia", "population": 37.400 },
    {"name": "Karachi", "country": "Pakistan", "continent": "Asia", "population": 15.400 },
    {"name": "Dhaka", "country": "Bangladesh", "continent": "Asia", "population": 19.578 },
    {"name": "Rio de Janeiro", "country": "Brazil", "continent": "South America", "population": 13.293 },
    {"name": "São Paulo", "country": "Brazil", "continent": "South America", "population": 21.650 },
    {"name": "Mexico City", "country": "Mexico", "continent": "North America", "population": 21.581 },
    {"name": "Delhi", "country": "India", "continent": "Asia", "population": 28.514 },
    {"name": "Buenos Aires", "country": "Argentina", "continent": "South America", "population": 14.967 },
    {"name": "Kolkata", "country": "India", "continent": "Asia", "population": 14.681 },
    {"name": "New York", "country": "United States", "continent": "North America", "population": 18.819 },
    {"name": "Manila", "country": "Philippines", "continent": "Asia", "population": 13.482 },
    {"name": "Chongqing", "country": "China", "continent": "Asia", "population": 14.838 },
    {"name": "Istanbul", "country": "Turkey", "continent": "Europe", "population": 14.751 }
]
*/

		//Create DB:
		
		use PopInfo_db
		
		//insert data into collections:
	
		db.PopInfo.insertMany([
			{"name": "Seoul", "country": "South Korea", "continent": "Asia", "population": 25.674 },
			{"name": "Mumbai", "country": "India", "continent": "Asia", "population": 19.980 },
			{"name": "Lagos", "country": "Nigeria", "continent": "Africa", "population": 13.463 },
			{"name": "Beijing", "country": "China", "continent": "Asia", "population": 19.618 },
			{"name": "Shanghai", "country": "China", "continent": "Asia", "population": 25.582 },
			{"name": "Osaka", "country": "Japan", "continent": "Asia", "population": 19.281 },
			{"name": "Cairo", "country": "Egypt", "continent": "Africa", "population": 20.076 },
			{"name": "Tokyo", "country": "Japan", "continent": "Asia", "population": 37.400 },
			{"name": "Karachi", "country": "Pakistan", "continent": "Asia", "population": 15.400 },
			{"name": "Dhaka", "country": "Bangladesh", "continent": "Asia", "population": 19.578 },
			{"name": "Rio de Janeiro", "country": "Brazil", "continent": "South America", "population": 13.293 },
			{"name": "São Paulo", "country": "Brazil", "continent": "South America", "population": 21.650 },
			{"name": "Mexico City", "country": "Mexico", "continent": "North America", "population": 21.581 },
			{"name": "Delhi", "country": "India", "continent": "Asia", "population": 28.514 },
			{"name": "Buenos Aires", "country": "Argentina", "continent": "South America", "population": 14.967 },
			{"name": "Kolkata", "country": "India", "continent": "Asia", "population": 14.681 },
			{"name": "New York", "country": "United States", "continent": "North America", "population": 18.819 },
			{"name": "Manila", "country": "Philippines", "continent": "Asia", "population": 13.482 },
			{"name": "Chongqing", "country": "China", "continent": "Asia", "population": 14.838 },
			{"name": "Istanbul", "country": "Turkey", "continent": "Europe", "population": 14.751 }
		])
		
		//qyery to check the result:
		
		db.PopInfo.find({})

// 2- get the data for the North America continent only

	//aggregation:
	
		db.PopInfo.aggregate(
			[ { $match : { continent : "North America" } } ]
		)
		
	//CRUD:
	
		db.PopInfo.find({ continent : "North America" })


// 3- get the data for the North America, or Asia continent using two different methods

	//aggreagation:
		//OR:
		
			db.PopInfo.aggregate(
				[ { $match : { $or:[{"continent": "North America"}, {"continent": "Asia"}]}} ]
			)
			
		//IN:
		
		db.PopInfo.aggregate(
			[ { $match : { continent:{$in:["North America", "Asia"]}}}]
		)
		
	//CRUD:
		//OR:

			db.PopInfo.find({ $or:[{"continent": "North America"}, {"continent": "Asia"}]})
		//IN:
			db.PopInfo.find({ continent:{$in:["North America", "Asia"]}})
			
// 4- sort the data in descending order according to the number of population

	//Aggregation:

		db.PopInfo.aggregate(
		   [
			 { $sort : { population : -1 } }
		   ]
		)
	
	//CRUD:
		db.PopInfo.find({}).sort({ population : -1 })


// 5- sort the data in ascending order according to the number of population for North America continent

	//Aggregation

	db.PopInfo.aggregate(
			   [
			   { $match: { continent: "North America"}},
				 { $sort : { population : 1 } }
			   ]
			)
	//CRUD
	
		db.PopInfo.find({ continent: "North America"}).sort({ population : 1 })
	
	


// 6- get the distinct continent using two different methods

	//using group

		db.PopInfo.aggregate( [ { $group : { _id : "$continent" } } ] )
		
	//using distinct
		db.PopInfo.distinct("continent")


// 7- get the distinct continent-countery

	db.PopInfo.aggregate( 
				[
					{$group: { "_id": { continent: "$continent", country: "$country" } } }
				]
			)


// 8- get max number of population per continent-countery, and count the number of cites per continent-countery

db.PopInfo.aggregate( 
					[
						{$group: { _id: { continent: "$continent", country: "$country" }, max:{$max: "$population" }, count:{$sum: 1 }}},
					]
				)


// 9- view the document in that format { "location" : { "country" : "South Korea", "continent" : "Asia" }, "name" : "Seoul", "population" : 25.674 }

	db.PopInfo.aggregate([
				{$project: { _id: 0, location:{country:"$country" , continent:"$continent"}, name:"$name", population:"$population"}}
			])


// 10- find the most populated city for each continent-country Asia and North America and return both its name and population. The results should be sorted by the highest population, and you are interested only in countries where the most populated city crosses the threshold of 20 million people


	db.PopInfo.aggregate([ 
	{$match: { continent: { $in: [ "North America", "Asia" ] } } } ,
	{$sort: {population: -1} } ,
	{$group: {_id: { continent: "$continent" , country: "$country" } , city: { $last: "$name"},population: {$max: "$population"}  } } , 
	{$match: {population: {$gt: 20} } } ,
	])


// 11- modify your last query to make the result look like the following:
/*
    "location" : {
        "country" : "Japan",
        "continent" : "Asia"
    },
    "most_populated_city" : {
        "name" : "Tokyo",
        "population" : 37.4
    }
}
*/

/*

*/
	db.PopInfo.aggregate([ 
		{$match: { continent: { $in: [ "North America", "Asia" ] } } } ,
		{$sort: {population: -1} } ,
		{$group: {_id: { continent: "$continent" , country: "$country" }, continent: {$last: "$continent"} , country:{$last: "$country"} , city: { $last: "$name" }  , population: {$max: "$population"}  } } , 
		{$match: {population: {$gt: 20} } } ,
		{$project: {"location" : { "country" : "$country", "continent" : "$continent"}, "most_populated_city" : { "name" : "$city", "population" : "$population" } , _id: 0 } }
	]) 



// ----------------------------------------------------------------------------------
// Relations


/*
12- Autors, and Books have a Many-To-Many relationship, also Book and Genres have a Many-To-Many relationship given the data as the following:
authors:
id,name,age
1,author1,25
2,author2,30
3,author3,35
4,author4,40

books:
id,title
1,title1
2,title2
3,title3
4,title4

genres
id,name
1,drama
2,crime
3,animated

author_book
author_id, book_id
1,1
1,2
1,3
2,1
3,2
2,3
3,4
4,4

genre_book
genre_id,book_id
1,1
1,2
1,3
1,4
2,1
2,2
3,1


- show how you can model it in mongoDB by creating your collections, and explain why did you choose that model
- in many cases queries uses these fields to answer questions:
	name of the author, title of the book, and name of the genre
- write queries that answer the following querstions:
	who are the authors of the book "title1" ?
	what are the books written by "author1" ?
	what are the genres of the book "title2" ?
	what are the books that have "crime" genre ?
*/


	//Each author have many books, and each book can be written by multipl authors, so i'll use refrences many to many realtioln:


	//insert tables:
	
	//1- Authors table:
	
		db.authors.insertMany([
		  {"_id": 1, "name": "author1", "age": 25},
		  {"_id":2, "name": "author2", "age": 30},
		  {"_id":3, "name": "author3", "age":35 },
		  {"_id": 4, "name": "author4", "age": 40}
		  ])
		  
	//2- Book table:
	
	db.books.insertMany([
	  {_id: 1, title: "title1"},
	  {_id: 2, title: "title2"},
	  {_id: 3, title: "title3"},
	  {_id: 4, title: "title4"}
	  ])
		  
	//3- Genres table:

	db.genres.insertMany([
	  {_id: 1, name: "drama"},
	  {_id: 2, name: "crime"},
	  {_id: 3, name: "animated"}
	  ])
	  

/*	
//-- if author got new book, then you can add it to the author collection by modifying the array field books
//-- usually genre is fixed per book and it is present during the insert
*/
		  
	//Add refrence book key to the Authors collection:
	
	db.authors.updateOne({name: "author1"}, {$set: {books: [1,2,3]}})
	db.authors.updateOne({name: "author2"}, {$set: {books: [1,3]}})
	db.authors.updateOne({name: "author3"}, {$set: {books: [2,4]}})
	db.authors.updateOne({name: "author4"}, {$set: {books: [4]}})
	
	//Add refrence genre key to Books collection:
	db.books.updateOne({_id: 1}, {$set: {genre: [1,2,3]}})
	db.books.updateOne({_id: 2}, {$set: {genre: [1,2]}})
	db.books.updateOne({_id: 3}, {$set: {genre: [1]}})
	db.books.updateOne({_id: 4}, {$set: {genre: [1]}})
	

	//Create indexes:
	db.authors.createIndex({name: 1}, {name: "author_index"})
	db.authors.createIndex({books: 1}, {name: "books_index"})
	db.books.createIndex({title: 1}, {name: "books_title_index"})
	db.books.createIndex({genre: 1}, {name: "genre_index"})
	db.genres.createIndex({_id: 1}, {name: "genre_id_index"})
	
	
	//Questions:


	
		//who are the authors of the book "title1"

		
	db.authors.aggregate([{
	   $lookup:
		 {
		   from: "books",
		   localField: "books",
		   foreignField: "_id",
		   as: "booksA"
		 }
	},
	{$match: { "booksA.title": "title1"}
	},
	{$project: {name: 1, _id:0}}
	])
	
		//what are the books written by "author1"
	
		db.authors.aggregate([{
			   $lookup:
				 {
				   from: "books",
				   localField: "books",
				   foreignField: "_id",
				   as: "booksA"
				 }
			},
			{$match: { "name": "author1"}
			},
			{$project: {"booksA.title": 1, _id:0}}
			])
		
		//what are the genres of the book "title2" ?
	

		db.books.aggregate([{
				   $lookup:
					 {
					   from: "genres",
					   localField: "genre",
					   foreignField: "_id",
					   as: "genreB"
					 }
				},
				{$match: { "title": "title2"}
				},
				{$project: {"genreB.name": 1, _id:0}}
				])
				
		//what are the books that have "crime" genre ?
		
		db.books.aggregate([{
				   $lookup:
					 {
					   from: "genres",
					   localField: "genre",
					   foreignField: "_id",
					   as: "genreB"
					 }
				},
				{$match: { "genreB.name": "crime"}
				},
				{$project: {"title": 1, _id:0}}
				])

