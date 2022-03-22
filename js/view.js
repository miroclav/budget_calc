var viewController = (function() {

    var DOMstrings = {
        budgetForm: '#budget-form',
        inputType: '#input__type',
        inputDescription: '#input__description',
        inputValue: '#input__value',
        incomeLocator: '#income__list',
        expenseLocator: '#expenses__list',
        budgetLabel:'#budget-value',
        incomeLabel: '#income-label',
        expensesLabel: '#expenses-label',
        expensesPercentageLbel: '#expenses-percentage-label',
        budgetTable: "#budget-table"

    }

    function getInput() {
        return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value,
        }
    }

    function renderListItems(odj, type) {
        var locator, html;

        if (type === 'inc') {
            locator = DOMstrings.incomeLocator;
            html = `
            <li id="inc-%id%" class="budget-list__item item item--income">
            <div class="item__title">%description%</div>
            <div class="item__right">
                <div class="item__amount">%value%</div>
                <button class="item__remove">
                    <img
                        src="./img/circle-green.svg"
                        alt="delete"
                    />
                </button>
            </div>
        </li>`
        } else if (type === 'exp') {
            locator = DOMstrings.expenseLocator;
            html = `
            <li id="exp-%id%" class="budget-list__item item item--expense">
            <div class="item__title">%description%</div>
            <div class="item__right">
                <div class="item__amount">
                    %value%
                    <div class="item__badge">
                        <div class="badge badge--dark">
                            15%
                        </div>
                    </div>
                </div>
                <button class="item__remove">
                    <img src="./img/circle-red.svg" alt="delete" />
                </button>
            </div>
        </li>`
        }

        var newHtml = html.replace("%id%", odj.id);
        newHtml = newHtml.replace(`%description%`, odj.description);
        newHtml = newHtml.replace(`%value%`, odj.value);

        listItems = document.querySelector(locator).insertAdjacentHTML('beforeEnd', newHtml);
    }

    function clearFields() {
        var inputDescriptionField = document.querySelector(DOMstrings.inputDescription);
        var inputValueField = document.querySelector(DOMstrings.inputValue);

        inputDescriptionField.value = "";
        inputDescriptionField.focus();
        inputValueField.value = "";
    }

    function updateBudget(obj) {
        document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
        document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalIncome;
        document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExpenses;

        if (obj.percentageExpenses > 0) {
            document.querySelector(DOMstrings.expensesPercentageLbel).textContent = obj.percentageExpenses;
        } else {
            document.querySelector(DOMstrings.expensesPercentageLbel).textContent = "--";
        }
    }

    function deleteListItem(item) {
        document.getElementById(item).remove();
    }
        
    
    return {
        getDomStrings: function() {
            return DOMstrings;
        },
        getInput: getInput,
        renderListItems: renderListItems,
        clearFields: clearFields,
        updateBudget: updateBudget,
        deleteListItem: deleteListItem
    }

})();
