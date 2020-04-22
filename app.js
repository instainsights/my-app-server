const express = require('express')
const app = express()
const port = 3001

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
         res.send(suggestions)
	}
	})

// Catch routes with no functionality
app.use(function (req, res, next) {
        res.status(404).send('Please POST to /api/suggest')
        })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

const suggestions = [
 	{ object: 'Account' },
	{ object: 'Opportunity' },
	{ object: 'Lead' },
	{ object: 'Report' }
];
