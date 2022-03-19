import { URLModel } from './db/model/URL';
import { Request, response, Response } from 'express';
const shortid = require('shortid');
import { config } from './config/Constants';

class URLController {
    public async shorten(req: Request, res :Response): Promise<void> {
        // Ver se a URL já existe
        const { originURL } = req.body;
        const url = await URLModel.findOne({ originURL });
        if (url) {
            res.json(url);
            return;
        }
        // Criar hash para a URL
        const hash = shortid.generate();
        const shortURL = `${config.API_URL}/${hash}`
        // Salvar URL no banco
        const newURL = await URLModel.create({ hash, shortURL, originURL})
        // Retornar a URL salva
        res.json(newURL)
    }

    public async redirect(req: Request, res :Response): Promise<void> {
        // pegar o hash da URL
        const { hash } = req.params;
        // encontrar a URL original
        const url = await URLModel.findOne({hash});
        if (url) {
            res.redirect(url.originURL);
            return;
        }
        // Redirecionar para a URL original pelo que encontramos no database
        res.status(400).json({ error: 'URL Not Found' })
    }
}

export default URLController;