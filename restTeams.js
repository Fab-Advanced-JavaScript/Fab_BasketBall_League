const express = require("express");
const Router = require('router')
const path = require('path');
const router = express.Router();

/**
 * fbl team rest page information 
 * 
 */

 // this is atlanto team info
router.get('/fbl/teams/atlanta',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/hawks.html'));
});
// ....
router.get('/fbl/teams/boston',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/boston.html'));
});
// ....
router.get('/fbl/teams/brooklyn',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/brooklyn.html'));
});
// ....
router.get('/fbl/teams/charlotte',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/charlotte.html'));
});
// ....
router.get('/fbl/teams/chicago',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/chicago.html'));
});
// ....
router.get('/fbl/teams/cleveland',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/cleveland.html'));
});
// ....
router.get('/fbl/teams/dallas',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/dallas.html'));
});
// ....
router.get('/fbl/teams/denver',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/denver.html'));
});
// ....
router.get('/fbl/teams/detroit',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/detroit.html'));
});
// ....
router.get('/fbl/teams/goldenState',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/golden.html'));
});

// ....
router.get('/fbl/teams/houston',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/houston.html'));
});
// ....
router.get('/fbl/teams/indiana',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/indiana.html'));
});
// ....
router.get('/fbl/teams/clippers',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/clipper.html'));
});
// ....
router.get('/fbl/teams/lakers',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/laker.html'));
});
// ....
router.get('/fbl/teams/memphis',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/memphis.html'));
});
// ....
router.get('/fbl/teams/miami',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/miami.html'));
});
// ....
router.get('/fbl/teams/milwaukee',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/milwaukee.html'));
});
// ....
router.get('/fbl/teams/minesota',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/minesota.html'));
});
// ....
router.get('/fbl/teams/newOrleans',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/newOrleans.html'));
});
// ....
router.get('/fbl/teams/newyork',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/newYork.html'));
});
// ....
router.get('/fbl/teams/oklahoma',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/oklahoma.html'));
});
// ....
router.get('/fbl/teams/orlando',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/orlando.html'));
});
// ....
router.get('/fbl/teams/philadelphia',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/phili.html'));
});
// ....
router.get('/fbl/teams/phoenix',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/phoenix.html'));
});
// ....
router.get('/fbl/teams/portland',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/portland.html'));
});
// ....
router.get('/fbl/teams/sacramento',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/sacramento.html'));
});
// ....
router.get('/fbl/teams/sanAntono',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/sanAntonio.html'));
});
// ....
router.get('/fbl/teams/toronto',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/toronto.html'));
});
// ....
router.get('/fbl/teams/utah',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/utah.html'));
});
// ....
router.get('/fbl/teams/washington',(req, res) =>{      
    res.sendFile(path.join(__dirname + '/teams/washington.html'));
});


module.exports = router;
