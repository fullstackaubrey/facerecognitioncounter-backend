const handleProfileGet = (req, res) => { 
    const { id } = req.params;
    postgresdB.select('*').from('users').where({id})
        .then(user => {
                if (user.length) {
                    res.json(user[0])
                } else {
                    res.status(400).json('User not found!')
                }   
    })
        .catch(err => res.status(400).json('Error finding user.'));
}

module.exports = {
    handleProfileGet
}