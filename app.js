//BUDGET CONTROLLER
var budgetController = (function() {
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: [],
            id: [],
        },
            totals: {
            exp: 0,
            inc: 0,
            }
        };

        return {
            //function to add item to list
            addItem: function(type, des, val) {
                var newItem, ID;
                //Create new ID
                if (data.allItems[type].length > 0){
                    ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
                } else {
                    ID = 0;
                }
                //Create new item based on inc or exp type
                if (type === 'exp') {
                    newItem = new Expense(ID, des, val);
                } else if (type === 'inc') {
                    newItem = new Income(ID, des, val);
                }

                //push it into our data structure
                data.allItems[type].push(newItem);

                //return the new element
                return newItem;
            },

            testing: function() {
                console.log(data);
            }
        };

}) ();
//UI CONTROLLER 
var UIController = (function() {
    // Ui Code
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
    };
    

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat( document.querySelector(DOMstrings.inputValue).value),
            };
        },

        allListItem: function(obj, type) {
            var html, newHtml, element;
            //create HTML string
            if (type === 'inc'){
                element = DOMstrings.incomeContainer; 

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html= '<div class="item clearfix" id="expense-%id%"><div    class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button   class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            //replace the placeholder text with data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            //insert html into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        clearFields: function() { 
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();
         },
        getDOMstrings: function() {
            return DOMstrings;
        },

    };

}) ();

//GLOBAL APP CONTROLLER -Controls the connection between ui and data
var controller = (function(budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDOMstrings();

    var updateBudget = function() {
        // 1. calculate the budget

        // 2. Return the budget

        // 3. display the budget on the UI
    };

    var ctrlAddItem = function() {
        var input, newItem;
        // 1. Get the filed input data
        input = UICtrl.getInput();
        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value );
        // 3. add the item to the UI
        UICtrl.allListItem(newItem, input.type);
        // 4. Clear the fields
        UICtrl.clearFields();
        // 5. Calculate and update the budget
        updateBudget();

    };

    // We use this to find out what button was pressed, 13 is enter
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {
        // We use this to find out what button was pressed, 13 is enter
        if(e.keyCode === 13 || e.which === 13) {
            ctrlAddItem();
        }
    });

}) (budgetController, UIController);