var modelController = (function() {

    var Income = function(id, drscription, value) {
        this.id = id,
        this.description = drscription,
        this.value = value
    }

    var Expense = function(id, drscription, value) {
        this.id = id,
        this.description = drscription,
        this.value = value
    }

    var addItem = function(type, description, value) {
        var newItem, lastIndex, ID = 0;

        if (data.allItems[type].length > 0) {
            lastIndex = data.allItems[type].length - 1;
            ID = data.allItems[type][lastIndex].id + 1;
        }
        
        if (type === "inc") {
            newItem = new Income(ID, description, parseFloat(value));
        } else if (type === "exp") {
            newItem = new Expense(ID, description, parseFloat(value));
        }

        data.allItems[type].push(newItem);
        return newItem;
    }

    function calculateBudget(){
        data.totals.inc = calculateTotalSum('inc');
        data.totals.exp = calculateTotalSum('exp');

        // Посчитать общий бюджет
        data.budget = data.totals.inc - data.totals.exp;

        // Посчитать процент расходов
        if (data.totals.inc > 0 ) {
            data.percentage = Math.round((data.totals.exp /  data.totals.inc) * 100);
        }
    }

    function calculateTotalSum(type) {
        var sum = 0;
        
        data.allItems[type].forEach( function (item) {
            sum = sum + item.value;
        })
        return sum;
    }

    function getBudget() {
        return {
            budget: data.budget,
            totalIncome: data.totals.inc,
            totalExpenses: data.totals.exp,
            percentageExpenses: data.percentage
        }
    }

    // Удалить запись с переданным типом и id
    function deleteItem(itemType, itemId) {
        const index = data.allItems[itemType].findIndex(item => item.id === itemId);

        if (index !== -1) {
            data.allItems[itemType].splice(index, 1);
        }
    }

    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percentage: -1
    }

    return{
        addItem: addItem,
        calculateBudget: calculateBudget,
        getBudget: getBudget,
        deleteItem: deleteItem
    }

})()
