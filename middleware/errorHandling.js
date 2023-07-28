
const errorHandler = (req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode:500;

    switch(statusCode){
        case "404":
            res.json({title:"validation failed"});
    }
}

module.exports = errorHandler;