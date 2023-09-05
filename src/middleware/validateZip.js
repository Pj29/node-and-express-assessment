function validateZip(req, res, next) {
    const { zip } = req.params;
  
    if (zip === "all") {
      return next();
    }

    if (zip.length !== 5) {
        return res.send(`Zip (${zip}) is invalid!`);
    }
    
    if (!/^\d+$/.test(zip)) {
        return res.send(`Zip (${zip}) is invalid!`);
    }

    next();
}

module.exports = validateZip;
