const handleSignin = (req, res, postgresdB, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json("Incorrect form submission');")
    }
    postgresdB.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValidLogin = bcrypt.compareSync(password, data[0].hash);
                if (isValidLogin) {
                    return postgresdB.select('*').from('users')
                        .where('email', '=', email)
                        .then(user => {
                            res.json(user[0])
                        })
                            .catch(err => res.status(400).json("Unable to find user."))
                } else {
                res.status(400).json("Oops! Your login credentials are incorrect.")
                }
        })
    .catch(err => res.status(400).json("Error! Wrong email or password."))
}

module.exports = {
    handleSignin: handleSignin
};

