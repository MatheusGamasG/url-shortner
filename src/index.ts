const express = require('express');
import URLController from './URLController';
import { Request, Response } from 'express';
import { MongoConnection } from './db/mongoconnection';

const api = express();
api.use(express.json());

const database = new MongoConnection();
database.connect();


const urlController = new URLController();
api.post('/shorten', urlController.shorten);
api.get('/:hash', urlController.redirect);


api.listen(4000, () => console.log("Server is running!"))