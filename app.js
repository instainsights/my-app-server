CustomElementRegistry fs = require('fs');
const express = require('express')
const app = express()
const port = 3001
const file = 'datamodel.json'

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
		let jsonDataModel = JSON.stringify(reader)
		let newString = userInput.newString().toLowerCase()
		suggestions = parseInput(newString)
		res.send(suggestions)
	}
	})

// Catch routes with no functionality
app.use(function (req, res, next) {
        res.status(404).send('Please POST to /api/suggest')
        })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

function parseInputAndTokenize(userInput) {
	const fs.readFile('datamodel.json)')
	let newString = userInput.newString().toLowerCase()
	let token = ' '
	tokenizedString = newString.split(token)  // thisis now an array
	// now make a new array/class that classifies each tokern
	for (int i=0; i<tokenizedString.length; i++) {
	}
	// recursive descent parser goes here
}

let suggestion = new String()

function parseInput(userInputArray, index) {

	if (entity(userInputArray[index] == '<Entity>') {
		suggestion =+ ' <Entity> '
		index++
		return parseInput(userInputArray, index)
	} else if (field(userInputArray[index] == '<Field>') {
		suggestion =+ ' <Field> '
		index ++
		return parseInput(userInputArray, index)
	} else {
		suggestion =+ ' <EOF> '
	} 
	return suggestion;
}
// need a datstructure so I can match what I am seeing on each token 
// with what I belive it to be 
 function entity(token) {
	if ((token == jsonDataModel.Opportunity) ||
		(token == jsonDataModel.Account) ||
		(token == jsonDataModel.Lead) ||
		(token == jsonDataModel.Contact)) {
			return '<Entity>'
	}
}

function field(token) {
	if ((token == jsonDataModel.Id) ||
	(token == jsonDataModel.CreatedBy) ||
	(token == jsonDataModel.ModifiedBy)) {
		return '<Field>'
	}
}
