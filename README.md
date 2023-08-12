# **Transaction Ledge System**
This repository contains the backend for handling transactions and its payouts at the back end along with generating a report at the end of the day with the data.






## Table of content

- [Installation](#installation)
  - [Node](#Node)
- [Backend](#running_backend)
- [Code Explanation]
- [Architecture Diagram](#architecture_diagram)
- [Architecture Diagram Explanation](#architecture_diagram_Explanation)


## Installation

### Node

Clone this repository :
`git clone https://github.com/tejasvivig29/TransactionLedgeChallenge.git`

Make sure you have these installed :

- **NodeJS** - v12 or above (recommended)
- **npm** - v3 or above (recommended)

## Running Backend Server

Navigate to "backend" folder</br>
Run `npm install` to download all the dependencies</br>
Run `npm run start` to compile the code and run the server/compiled code</br>

## Database Design Explanation

## Code Explanation

Our backend code has two APIs

1. /webhook/transaction

	Pay load required: 
	
	{
		"amount": 3000,
		"merchantId": "M3701",
		"transactionType": "AUTH" 
	}

	The payload contains the amount of the transaction, the merchantId which specifically starts with M in this case, and
	the transaction type that can be AUTH, DISPUTE, REFUND.
	
	The transaction is being saved in the database (MongoDB in our case) where we have two separate schemas, 
	transaction schema and payout schema.
	
	Once we receive the payload for the AUTH transaction, which should be hypothetically first be authorized using visa cards
	(here we assume that transaction type already has auth, refund or dispute), we process the payout for that particular transaction.
	
	For payout processing, we deduct 5% amount from the transaction amount and pay it into the deposit account of "valpay" 
	and the remaining amount is paid into the deposit account of the merchant.
	

2. /webhook/generateReport

	This API request is a get request which is basically triggered after end of the day and generates a report "transactionLedgeDayReport.csv"
	which contains the entries from both the documents (transaction and payout) and are added into the csv report.

## Architecture Diagram

![Transaction Ledge System](https://github.com/tejasvivig29/TransactionLedgeChallenge/assets/38378458/243646ba-9694-44f1-a806-df1039caadd5)

## Architecture Diagram Explanation
