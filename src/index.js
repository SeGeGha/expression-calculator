function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let expression = expr.replace(/ /g, '').replace(/-/g, '~');
    let leftBracketsCount = checkBrackets(expression, /[\(]/g);
    let rightBracketsCount = checkBrackets(expression, /[)]/g);  
    let bracketsCount = leftBracketsCount;
    let result = 0;

    if (leftBracketsCount !== rightBracketsCount) throw Error("ExpressionError: Brackets must be paired"); 

    while(bracketsCount > 0) {
        let indexLeftBracket = expression.split('').lastIndexOf('(');
        let indexRightBracket = expression.split('').indexOf(')', indexLeftBracket);
        let deleteCount = indexRightBracket - indexLeftBracket + 1;
        let expressionInsideBrackets = expression.slice(indexLeftBracket + 1, indexRightBracket);
        let resultInsideBrackets = getSum(expressionInsideBrackets);

        expression = expression.split('');
        expression.splice(indexLeftBracket, deleteCount, resultInsideBrackets);
        expression = expression.join('');
        bracketsCount--;
    }
    
    return result = getSum(expression);

    function getSum(expression) {
        return expression.split('+')
                         .map( item => getDifference(item))
                         .reduce( (acum, value) => +acum + +value);
    }

    function getDifference(expression) {
        return expression.split('~')
                         .map( item => getMultiply(item))
                         .reduce( (acum, value) => acum - value);
    }

    function getMultiply(expression) {
        return expression.split('*')
                         .map( item => getDivision(item))
                         .reduce( (acum, value) => acum * value);
    }

    function getDivision(expression) {
        let resultDivision = expression.split('/')
                                       .reduce( (acum, value) => acum / value);
        if(!isFinite(resultDivision)) {
        throw Error('TypeError: Division by zero.')
        } else {
            return resultDivision;
        }
    }

    function checkBrackets(string, regBracket) {
        try {
            return string.match(regBracket).length
        } catch {
            return 0;
        }
    }
}

module.exports = {
    expressionCalculator
}