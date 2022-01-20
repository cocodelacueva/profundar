// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//importo bd fals
import bd from './bd';

export default function handler(req, res) {
    //ajusto cantidad de items
    bd.totalItems = bd.temas.length

    res.status(200).json({error: false, updatedbd: bd.updated, body:bd})
}