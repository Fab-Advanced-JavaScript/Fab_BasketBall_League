
module.exports = (passport, connection, LocalStrategy, bcrypt) => {

    passport.serializeUser((user, next) => {
        // Serialize the user in the session
        next(null, user);
    });
    
    passport.deserializeUser((user, next) => {
        // Use the previously serialized user
        next(null, user);
    });
    /***
    * this section implements the login page
    * with mysql
    */
    passport.use('localSignin', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, (req, email, password, next) => { // callback with email and password from our form
        console.log("checking...");
        let sql = "SELECT * FROM team_owners  WHERE email = ?";
        connection.query(sql, [email], (err, rows) => {
            console.log(rows);
            if (err) return next(err);
            //..
            if (!rows.length)
                return next(null, false, req.flash('loginMessage', 'This Email does not exist!'));
            // check if the password is valid
            if (!bcrypt.compareSync(password, rows[0].password)) {
                console.log('is pwd is not valid');
                return next(null, false, req.flash('loginMessage', 'Incorrect Password. Try again!'));
            } else {
                //return successful login if the user is found
                return next(null, rows[0]);
            }
        });
    }));
    /**
     * sign up the user
     * A named strategy is used since two local strategy are used :
        one for the registration and the other to sign-in
    */
    passport.use('localSignup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback .

    }, (req, email, password, next) => {

        const {username, firstName, lastName, password_confirm} = req.body;
        let sql = "SELECT email FROM team_owners WHERE email =?";
        connection.query(sql, [email], async(err, data) => {
            console.log('register data : ' + data);
            console.log(data);
            if(err) throw err;
            if(data.length > 0) {
                return next(null, false, req.flash('SignUpMessage', 'This Email already Exist!'))
            } else if (password != password_confirm) {
                return next(null, false, req.flash('SignUpMessage', 'The password does not match'))
            } else if (password.length === 0) {
                return next(null, false, req.flash('SignUpMessage', 'You must Enter a password'))
            } 
            //.. display the has password on the console
            let hashedPass = await bcrypt.hash(password, 8);
            console.log('encrypted password: ' + hashedPass);
            //.. insert data to users table
            let insertquery = 'INSERT INTO team_owners SET ?';
            let userData = {
                username: username, 
                first_name: firstName, 
                last_name: lastName, 
                email: email,
                password: hashedPass
            };
            console.log(userData);
            //..
            connection.query(insertquery, userData, (err, data) => {
                console.log("inserted data:  " + data);
                if (err) throw err;
                return next(null, data, req.flash('SignUpMessage', 'Account Has been succesfully created'))
            });
        });
    }));
}