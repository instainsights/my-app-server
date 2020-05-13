
var fs = require('fs')
var express = require('express')
const args = require('minimist')(process.argv.slice(2));
const debug = true
const app = express()
const port = 3001
let cTokens = ''

const datamodelFile = fs.readFileSync(args.f)

//const jsonDataModel = JSON.parse(fs.readFileSync(args.f))

app.post('/api/suggest', (req, res) => {
	//console.log(`Parameters: ${req.query.q}`)
	if (req.query.q === null ) {
        	res.send('Invalid query')
	} else {
         res.send('Echo ' + req.query.q)
	}
	})

app.post('/api/suggest2', (req, res) => {
	//console.log(`Parameters: ${req.query.q}`)
	if (req.query.q === null ) {
        	res.send('Invalid query')
	} else {
		query = req.query.q.toLowerCase().split(' ')
		classifyInput(query)
		console.log('cTokens : '+ cTokens)
		res.send(parseTokens())
	}
	})

// Catch routes with no functionality
app.use(function (req, res, next) {
        res.status(404).send('Please POST to /api/suggest')
        })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


function classifyInput(tokens) {

	if (tokens.length == 0) {
		cTokens += '<EOF>'
		//return cTokens;
	} else if (isEntityOrField(tokens[0])) { 
		tokens.shift()
		return classifyInput(tokens)
	} else {
		tokens.shift()
		return classifyInput(tokens)
	}
}

function isEntityOrField(token) {
	// move this to a const
	cur_entity = JSON.parse(datamodelFile, function(key, value) {
		if (key == token) {
			switch (key) {
				case 'opportunity':
				case 'case':
				case 'account':
					cTokens += '<Entity>'
				break
				case 'id':
				case 'createdby':
				case 'city':
					cTokens += '<Field>'
				break
			}
			return new String(value)
		}
		return value
	})
}

function parseTokens() {
	// super restrictive rules.
	switch(cTokens)
	{
		case '<Entity><EOF>':
			return "Account";

		case '<Entity><EOF>':
			return "City";

		case '<Entity><Field><EOF>':
			return "Opportunity City";
		
		case '<Field><Enity><EOF>':
			return "City Opportunity"
	}
}

function logArray(tag, arrayToLog) {
	for (let j = 0; j < arrayToLog.length; j++) {
		console.log(tag + j + ' -> ' + (arrayToLog.argv[j]));
	}
}