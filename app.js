var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
methodOverride = require("method-override"),
books = [],
id = 1;

//setting middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get("/", function(req, res){
	res.redirect("/books");
})

app.get("/books", function(req, res){
	res.render("index", {books:books});
});

app.post("/books", function(req, res){
	var book = {};
	book.title = req.body.title;
	book.author = req.body.author;
	book.date = req.body.date;
	book.id = id;
	id++;
	books.push(book);
	res.redirect("/");
})

app.get("/books/new", function(req, res){
	res.render("new");
})

app.get("/books/:id", function(req, res){
	books.forEach(function(book){
			if(book.id === Number(req.params.id)){
				var bookChoice = book;
				res.render("show", {bookChoice: bookChoice});
			} 
	})
})


app.delete("/books/:id", function(req, res){
		//find a book by req.params.id
				books.forEach(function(book){
	//delete that book object from the books array
			if(book.id === Number(req.params.id)){
				var bookChoice = book;
				books.splice(books.indexOf(bookChoice), 1);
				console.log(books);
				res.redirect("/");
			}
	})
})

app.get("/books/:id/edit", function(req, res){
		books.forEach(function(book){
			if(book.id === Number(req.params.id)){
				var bookChoice = book;
				res.render("edit", {bookChoice:bookChoice});
			}
		})	
})

app.put("/books/:id", function(req,res){
  books.forEach(function(book){
    if(book.id === Number(req.params.id)) {
      book.title = req.body.title;
      book.author = req.body.author;
      book.date = req.body.date;
      res.redirect('/books');
    }
  })
});


app.listen(3000, function(){
	console.log("Server started");
});