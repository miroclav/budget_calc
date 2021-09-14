var controller = (function(modelCtrl, uiCtrl) {

    var setupEventListeners = function() {
        var DOM = uiCtrl.getDomStrings();
        document.querySelector(DOM.budgetForm).addEventListener('submit', ctrlAddItem);
        document.querySelector(DOM.budgetTable).addEventListener('click', ctrlDeleteItem);
    }

    //Функция,срабатывающая при добавлении расхода/дохода
    function ctrlAddItem() {
        event.preventDefault();

        // Получить данные из формы
        var input = uiCtrl.getInput();

        // Выполнить валидацию введенных значений
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            // Добавить полученные данные в модель
            newItem = modelCtrl.addItem(input.type, input.description, input.value);

            // Добавить новую запись в UI
            uiCtrl.renderListItems(newItem, input.type);
            
            uiCtrl.clearFields();
            generateTestData.init();

            // Посчитать бюджет
            updateBudget();
        }
    }

    // Пересчитать бюджет, обновить в модели и отобразить во view
    function updateBudget() {
        modelCtrl.calculateBudget();
        budgetObj = modelCtrl.getBudget();

        uiCtrl.updateBudget(budgetObj);

    }

    function ctrlDeleteItem(event) {
        var itemId, splitId, type, ID
        if (event.target.closest('.item__remove')) {
            itemId = event.target.closest('li.budget-list__item').id;
            splitId = itemId.split("-");
            type = splitId[0];
            ID = parseInt(splitId[1]);
            
            modelCtrl.deleteItem(type , ID);

            uiCtrl.deleteListItem(itemId);
            updateBudget();
        }
    }

    return {
        init: function() {
            console.log('App started');
            setupEventListeners();
            uiCtrl.updateBudget({
                budget: 0,
                totalIncome: 0,
                totalExpenses: 0,
                percentageExpenses: 0
            })
        }
    }

})(modelController, viewController);


controller.init()

