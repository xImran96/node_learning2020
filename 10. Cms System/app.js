// labs
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const { static } = require('express');
const exphbs = require('express-handlebars');
const hbs = require('handlebars');
const methodOverride = require('method-override');
const upload = require('express-fileupload');
const flash = require('connect-flash')
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
//DB Connection

mongoose.connect('mongodb://localhost:27017/cms', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false});
mongoose.connection
		.once('open', () => console.log('Database Connected'))
		.on('error', (err)=>{

			console.log('Could not Connected.', err)
		});




// init
const app = express();
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));


app.use(cookieParser());
app.use(session({
	secret: 'secret',
	resave: true,
    saveUninitialized: true,
}));


//passport and express


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//middleware for Flash
app.use((req, res, next)=>{

		res.locals.user = req.user || null;
		res.locals.success_message = req.flash('success_message');
		res.locals.err_message = req.flash('err_message');
		res.locals.form_error = req.flash('form_error');
		res.locals.error = req.flash('error');
		next();
});

//static
app.use(express.static(path.join(__dirname, 'public')));

//helper
const{select, GenerateTime} = require('./helpers/handlebars-helpers')

//view engine
app.engine('handlebars', exphbs({
	defaultLayout: 'home',
	 helpers:{select: select, GenerateTime: GenerateTime},
	 handlebars: allowInsecurePrototypeAccess(hbs)
	}));
app.set('view engine', 'handlebars');
//upload middleware
app.use(upload());

//routes
const main = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');
const categories = require('./routes/admin/categories');
const comments = require('./routes/admin/comments');

// Routes Use
app.use('/', main);
app.use('/admin', admin);
app.use('/admin/posts', posts);
app.use('/admin/categories', categories);
app.use('/admin/comments', comments);







app.listen(4000, ()=>{
    console.log('Server Connected.');
});