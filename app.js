import fs from 'fs' 
import express from 'express'
const app = express()
const port = 3001
const file = 'datamodel.json'
const jsonDataModel

app.post('/api/suggest', (req, res) => {
	console.log(`Parameters: ${req.query.q}`)
	if (req.query.q === null ) {
        	res.send('Invalid query')
	} else {
         res.send('Echo ' + req.query.q)
	}
	})

app.post('/api/suggest2', (req, res) => {
	console.log(`Parameters: ${req.query.q}`)
	if (req.query.q === null ) {
        	res.send('Invalid query')
	} else {
		 console.log(suggestions)
		let reader = new FileReader()
		reader.readAsText(file) // 
	    jsonDataModel = JSON.stringify(reader)
		let newString = userInput.newString().toLowerCase()
		let tokens = tokenizeInput(newString)
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

	if (entity(userInputArray[0] == '<Entity>')) {
		tokens += '<Entity>'
		// map that this to structure
		return tokenizeInput(userInputArray.shift())
	} else if (field(userInputArray[0] == '<Field>')) {
		tokens += '<Field>'
		return tokenizeInput(userInputArray.shift())
	} else {
		tokens += '<EOF>'
	} 
	return tokens;
}

 function entity(token) {
	if ((token == jsonDataModel.model.entity.Opportunity) ||
		(token == jsonDataModel.model.entity.Account) ||
		(token == jsonDataModel.model.entity.Lead) ||
		(token == jsonDataModel.model.entityContact)) {
			return '<Entity>'
	}
}

function field(token) {
	if ((token == jsonDataModel.model.entity.field.Id) ||
	(token == jsonDataModel.model.entity.field.City) ||
	(token == jsonDataModel.model.entity.field.CreatedBy) ||
	(token == jsonDataModel.model.entity.field.ModifiedBy)) {
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

	case '<Entity><Field>':
		return "Opportunity City";
	
	case '<Field><Enity>':
		return "City Opportunity"
}
}