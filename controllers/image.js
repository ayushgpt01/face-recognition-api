const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '1fabd297ff474907933ebdd8d4498bcc'
   });
const handleAPIcall = (req,res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(res.status(400).json("unable to work with api"))
}

const handleImage = (req,res,db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleAPIcall
}