const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
    apiKey: 'bc0e8d5eac624f8a9a5cef10ee8e4c03'
   });

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("Can't connect to API."))
}

const handleImage = (req, res, postgresdB) => {
    const { id } = req.body;
   postgresdB('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('Unable to update entries count.'));
}

module.exports = {
    handleImage,
    handleApiCall
}
