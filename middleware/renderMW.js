/* 
    Előállítja és elküldi a html-t a felhasználónak.
*/
module.exports = (objectrepository, viewName) => {
    return (req, res) => {
        res.render(viewName)
    };

};