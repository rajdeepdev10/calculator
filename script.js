/*
Rajdeep Dev
Halifax, NS
Sept 01, 2020
*/

function add(a, b)
{
    return a + b;
}

function subtract(a, b)
{
    return a - b;
}

function multiply(a, b)
{
    return a * b;
}

function divide(a, b)
{
    return a / b;
}

function operate(a, b, operator)
{
    if (operator === '+')
    {
        return add(a, b);
    }

    else if (operator === '-')
    {
        return subtract(a, b);
    }

    else if (operator === '*')
    {
        return multiply(a, b);
    }

    else if (operator === '/')
    {
        return divide(a, b);
    }

    else
    {
        return null;
    }
}

let displayValue = 0;
let operating_symbol;
let new_operating_symbol;
let first_value;
let second_value;
let did_first_calculation = false;
let isFirst = true;

number_btn = document.querySelectorAll(".number");
operator_btn = document.querySelectorAll(".operator");
clear_btn = document.querySelector("#clear");
equal_btn = document.querySelector("#equal");

number_btn.forEach(btn => {
    btn.addEventListener("click", insert);
});

function insert()
{
    if (displayValue == 0)      //if the display shows 0, overwrite and also unable to add more zeros; update displayValue
    {
        document.querySelector("input").value = this.value;
        displayValue = this.value;
        second_value = displayValue;
    }
    else        //insert string of numbers and store in displayValue
    {
        document.querySelector("input").value = document.querySelector("input").value + this.value;
        displayValue = document.querySelector("input").value;
        second_value = displayValue;
    }

}


function display()
{
    document.querySelector("input").value = displayValue;
}

display();      //shows 0 in the display as page is loaded

operator_btn.forEach(btn => {
    btn.addEventListener("click", operation);
    });

function operation()
{
    if (isFirst == true)
    {
        if (did_first_calculation == false)
        {
            first_value = displayValue;
        }
        operating_symbol = this.value;
        isFirst = false;
        console.log("first value: " + first_value);
        if (did_first_calculation == true)
        {
            second_value = displayValue;
            console.log("second value: " + second_value);
            first_value = operate(parseFloat(first_value), parseFloat(second_value), new_operating_symbol);
            console.log("first value: " + first_value);
            document.querySelector("input").value = first_value;
        }
        console.log("operating symbol: " + operating_symbol);
        displayValue = 0;
    }

    else if (isFirst == false)
    {
        displayValue = 0;
        new_operating_symbol = this.value;
        console.log("second_value: " + second_value);
        first_value = operate(parseFloat(first_value), parseFloat(second_value), operating_symbol);
        document.querySelector("input").value = first_value;
        console.log("first value: " + first_value);
        console.log("new operating symbol: " + new_operating_symbol);
        isFirst = true;
        did_first_calculation = true;
    }

}

clear_btn.addEventListener("click", clear);
equal_btn.addEventListener("click", equal);


function clear()
{
    displayValue = 0;
    first_value = 0;
    second_value = 0;
    operating_symbol = "";
    new_operating_symbol = "";
    did_first_calculation = false;
    isFirst = true;
    document.querySelector("input").value = displayValue;
    number_btn.forEach(btn => {
        btn.disabled = false;
    });
    operator_btn.forEach(btn => {
        btn.disabled = false;
    });
    console.log("All cleared!");
}

function equal()
{
    if (isFirst == false)
    {
        document.querySelector("input").value = operate(parseFloat(first_value), parseFloat(second_value), operating_symbol);
    }
    else if (isFirst == true)
    {
         document.querySelector("input").value = operate(parseFloat(first_value), parseFloat(second_value), new_operating_symbol);
    }
    number_btn.forEach(btn => {
        btn.disabled = true;
    });
    operator_btn.forEach(btn => {
        btn.disabled = true;
    });
}