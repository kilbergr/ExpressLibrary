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
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
	res.redirect("/books");
})

app.get("/books", function(req, res){
	res.render("pages/index", {books:books});
});

app.get("/books/sort", function(req, res){
	books.sort(function(bookA, bookB){
      var titleA= bookA.title.toLowerCase();
      var titleB= bookB.title.toLowerCase();
      {
        if (titleA<titleB){
          return -1;
        }
        if (titleA>titleB){
          return 1;
        }
        else return 0;
      }	
	})
res.render("pages/alph", {books: books});
});


app.post("/books", function(req, res){
	var book = {};
	if(req.body.title){
		book.title = req.body.title;
	book.author = req.body.author;
	book.date = req.body.date;
	book.id = id;
	id++;
	books.push(book);
	res.redirect("/books");
	}
	else{
		res.redirect("/books");
	}
})

app.get("/books/new", function(req, res){
	res.render("pages/new");
})

app.get("/books/:id", function(req, res){
	books.forEach(function(book){
			if(book.id === Number(req.params.id)){
				var bookChoice = book;
				res.render("pages/show", {bookChoice: bookChoice});
			} 
			else{
				res.render("pages/404");
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
			}
				else{
				res.render("pages/404");
			}
	})
		res.redirect("/books");
})

app.get("/books/:id/edit", function(req, res){
		books.forEach(function(book){
			if(book.id === Number(req.params.id)){
				var bookChoice = book;
				res.render("pages/edit", {bookChoice:bookChoice});
			}
				else{
				res.render("pages/404");
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

app.get('*', function(req, res){
  res.render("pages/404");
});

app.listen(3000, function(){
	console.log("Server started");
});