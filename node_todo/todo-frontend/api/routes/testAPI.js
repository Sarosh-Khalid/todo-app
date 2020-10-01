var express = require('express');
var router = express.Router();

const app = express();

var list = [
{"key": 1,
 "text": "do breakfast",
 "completed": true
},
{"key": 2,
 "text": "do lunch",
 "completed" : false
},
{"key": 3,
 "text": "do dinner",
 "completed" : true
}
];

router.get('/', function(req, res, next) {
    res.send(list);
});

/*
router.post('/create', function(req, res) {
	var newItem = {
		"key" : 4,
		"text" : req.text;
	}
    list.push(newItem);
});
*/

router.post('/create', (req, res) => {
    if (!req.body) return res.sendStatus(400);
	console.log(req);
	var newItem = {
		"key" : req.body.key,
		"text" : req.body.text
	}
    list.push(newItem);
    console.log(list, "body");
    res.send('welcome, ' + req.body.username)
});

router.post('/delete', (req, res) => {
    var key = req.body.key;
	let todo = list.filter(list => {
		return list.key == key;
	})[0];
	
	const index = list.indexOf(todo);
	list.splice(index, 1);
	
});

router.post('/update', (req, res) => {
    if (!req.body) return res.sendStatus(400);
	console.log(req.body);
	
	list.forEach(function(x) {
      // If the bookID is the one we are looking for, set it as null
      if (x.key === req.body.key) {
        
		x.text = req.body.text;
		
      }
    });
	
	
	
    res.send('welcome, ' + req)
});

router.post('/completed', (req, res) => {
    if (!req.body) return res.sendStatus(400);
	console.log(req.body);
	
	list.forEach(function(x) {
      // If the bookID is the one we are looking for, set it as null
      if (x.key === req.body.key) {
        
		x.completed = true;
		
      }
    });
	
	
	
    res.send('welcome, ' + req)
});



/*
router.post('/delete/:id', (req, res) => {
    if (!req.body) return res.sendStatus(400);
	console.log(req);
	console.log("paramId:"+req.params.id);
	
    console.log(list, "body");
    res.send('welcome, ' + req.body.username)
});
*/

module.exports = router;