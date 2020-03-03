function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let expression = expr.replace(/ /g, '').replace(/-/g, '~');
    let leftBracketsCount = checkBrackets(expression, /[\(]/g);
    let rightBracketsCount = checkBrackets(expression, /[)]/g);  
    let bracketsCount = leftBracketsCount;

    if (leftBracketsCount !== rightBracketsCount) throw Error("ExpressionError: Brackets must be paired"); 

    function checkBrackets(string, regBracket) {
        try {
            return string.match(regBracket).length
        } catch {
            return 0;
        }
    }
      
    while(bracketsCount > 0) {
        let indexLeftBracket = expression.split('').indexOf('(');
        let indexRightBracket = expression.split('').indexOf(')');
        let deleteCount = indexRightBracket - indexLeftBracket + 1;
        let expressionInsideBrackets = expression.slice(indexLeftBracket + 1, indexRightBracket);
        

        expression = expression.split('');
        expression.splice(indexLeftBracket, deleteCount, getSum(expressionInsideBrackets));
        expression = expression.join('');
        bracketsCount--;
    }
    
    let result = getSum(expression);

    if(!isFinite(result)) {
        throw Error('TypeError: Division by zero.')
    } else {
        return result;
    }

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
        return expression.split('/')
                         .reduce( (acum, value) => acum / value);
    }
}

module.exports = {
    expressionCalculator
}