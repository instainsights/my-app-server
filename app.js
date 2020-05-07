
var fs = require('fs')
var express = require('express')
const args = require('minimist')(process.argv.slice(2));


const app = express()
const port = 3001

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
		let tokens = classifyInput(req.query.q.toLowerCase().split(' '))
		console.log('Tokens '+ tokens)
		res.send(parseTokens(tokens))
	}
	})

// Catch routes with no functionality
app.use(function (req, res, next) {
        res.status(404).send('Please POST to /api/suggest')
        })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

let cTokens = ''

function classifyInput(tokens) {

	if (tokens.length == 0) {
		cTokens = cTokens + '<EOF>'
		return cTokens;
	} else if (entity(tokens[0])) { 
		cTokens = cTokens + '<Entity>'
		tokens.shift()
		return classifyInput(tokens)
	} else if (field(tokens[0] == '<Field>')) {
		cTokens = cTokens + '<Field>'
		tokens.shift()
		return classifyInput(tokens)
	} else {
		if (tokens.length != 1) {
			tokens.shift()
		}
		return classifyInput(tokens)
	} 
	return cTokens;
}

function searchKey(obj, key) {
	return Object.keys(obj).reduce((finalObj, objKey) => {
		if (objKey !== key) {
			return searchKey(obj[objKey]);
		} else {
			return finalObj = obj[objKey];
		}
	}, [])
}

function entity(token) {
	entity = JSON.parse(datamodelFile, function(key, value) {
		console.log("found entity")
		if (key == token) return true
	})
	
	return false
}

function field(token) {
	entity = JSON.parse(datamodelFile, function(key, value) {
		console.log("found field")
		if (key == token) return true
	})
	return false
	/*
	if ((token == jsonDataModel.datamodel.Entities.Opportunity.Fields.Id) ||
	(token == jsonDataModel.datamodel.Entities.Opportunity.Fields.City) ||
	(token == jsonDataModel.datamodel.Entities.Opportunity.Fields.CreatedBy) ||
	(token == jsonDataModel.datamodel.Entities.Opportunity.Fields.ModifiedBy)) {
		return '<Field>'
	}
	*/
}

function parseTokens(tokens) {
	// super restrictive rules.
	switch(tokens)
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