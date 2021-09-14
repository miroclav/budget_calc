var generateTestData = (function() {

    var ExampleItem = function(type, description, sum) {
        this.type = type;
        this.description = description;
        this.sum = sum;
    }
    
    var testData = [
        new ExampleItem('inc', 'Зарплата', '100'),
        new ExampleItem('inc', 'Депозит', '150'),
        new ExampleItem('inc', 'Рента', '300'),
        new ExampleItem('inc', 'Дивиденты', '240'),
        new ExampleItem('exp', 'Кварплата', '60'),
        new ExampleItem('exp', 'Обучение', '300'),
        new ExampleItem('exp', 'Продукты', '150'),
        new ExampleItem('exp', 'Развлечения', '100'),
    ]
    
    insertItemInUI = function() {
        var randomItem = testData[Math.floor(Math.random() * testData.length)];
        
        document.querySelector('#input__type').value = randomItem.type;
        document.querySelector('#input__description').value = randomItem.description;
        document.querySelector('#input__value').value = randomItem.sum;
    }
    
    return {
        init: insertItemInUI
    }

})();


generateTestData.init();


