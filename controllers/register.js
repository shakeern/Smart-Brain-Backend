const handleRegister = (req,res, db, bcrypt) => {
    const {email, name, password} = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email,
            })
            .into('login')
            .returning('email')
            .then(Loginemail => {
                return trx('users')
                .returning('*')
                .insert({
                email: Loginemail[0].email,
                name: name,
                joined: new Date()
            }).then(response => {
                res.json(response[0])
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        
        .catch(err => res.status(400).json('unable to register'))
    
}
module.exports = {
    handleRegister
};