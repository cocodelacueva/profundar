// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//importo bd fals
import bd from '../bd';

export default function handler(req, res) {
    const { slug } = req.query;
    
    const temaSelected = bd.temas.filter(tema => tema.slug == slug);

    if ( temaSelected.length > 1 ) {
        res.status(200).json({error: true, updatedbd: bd.updated, message: 'Hay dos entradas con el mismo slug!!'})
    } else {
        res.status(200).json({error: false, updatedbd: bd.updated, body: temaSelected});
    }

}