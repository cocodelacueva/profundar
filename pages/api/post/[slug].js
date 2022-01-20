// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//importo bd fals
import bd from '../bd';

export default function handler(req, res) {
    const { slug } = req.query;
    
    const postSelected = bd.posts.filter(post => post.slug == slug);
    if ( postSelected.length > 1 ) {
        res.status(200).json({error: true, updatedbd: bd.updated, message: 'Hay dos entradas con el mismo slug!!'})
    } else {
        res.status(200).json({error: false, updatedbd: bd.updated, body: postSelected[0]});
    }

}