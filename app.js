
var fs = require('fs')
var express = require('express')
const args = require('minimist')(process.argv.slice(2));


const app = express()
const port = 3001

logArray('Parameters: ', args)

const jsonDataModel = JSON.parse(fs.readFileSync(args.f))

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
		let tokens = tokenizeInput(req.query.q.toLowerCase().split(' '))
		res.send(parseTokens(tokens))
	}
	})

// Catch routes with no functionality
app.use(function (req, res, next) {
        res.status(404).send('Please POST to /api/suggest')
        })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

let tokens = new String()

function tokenizeInput(userInputArray) {
	console.log(userInputArray)
	console.log(userInputArray[0])
	console.log(tokens)
	if (entity(userInputArray[0] == '<Entity>')) {
		tokens += '<Entity>'
		// map that this to structure
		userInputArray.shift()
		return tokenizeInput(userInputArray)
	} else if (field(userInputArray[0] == '<Field>')) {
		tokens += '<Field>'
		userInputArray.shift()
		return tokenizeInput(userInputArray)
	} else if (userInputArray.length == 0) {
		tokens += '<EOF>'
	} else {
		userInputArray.shift()
		return tokenizeInput(userInputArray)
	} 
	return tokens;
}

 function entity(token) {
	if ((token == JSON.stringify(jsonDataModel.datamodel.Entities.Opportunity)) ||
		(token == jsonDataModel.datamodel.Entities.Account) ||
		(token == jsonDataModel.datamodel.Entities.Lead) ||
		(token == jsonDataModel.datamodel.Entities.Contact)) {
			return '<Entity>'
	}
}

function field(token) {
	if ((token == jsonDataModel.datamodel.Entities.Opportunity.Fields.Id) ||
	(token == jsonDataModel.datamodel.Entities.Opportunity.Fields.City) ||
	(token == jsonDataModel.datamodel.Entities.Opportunity.Fields.CreatedBy) ||
	(token == jsonDataModel.datamodel.Entities.Opportunity.Fields.ModifiedBy)) {
		return '<Field>'
	}
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