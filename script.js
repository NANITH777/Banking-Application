'use strict';


// Data
const account1 = {
    owner: 'Fulchany Nanith',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};
  
const account2 = {
    owner: 'Luss Huguette Chanelle',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};
  
const account3 = {
    owner: 'Lansar Bakoro',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};
  
const account4 = {
    owner: 'Grace Jackson',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};
  
const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
console.log(containerMovements);

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements, sort = false)
{
    containerMovements.innerHTML='';

    const movs = sort ? movements.slice().sort( (a, b) => a - b): movements;

    movs.forEach(function(mov, i)
    {
        const type = mov > 0 ? 'deposit':'withdrawal';

        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i +1} ${type}</div>
            <div class="movements__value">${mov}$</div>
        </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
    
};

const CalcDisplayBalance = function(account)
{
    account.balance = account.movements.reduce((acc, mov) => acc + mov , 0);
    labelBalance.textContent= `${account.balance} $`;
}


const calcDisplaySummary = function(account)
{
    const incomes= account.movements.filter(mov => mov>0).reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent=`${incomes}$`;
    
    const out = account.movements.filter(mov => mov < 0).reduce((acc, mov) => acc+ mov, 0);
    labelSumOut.textContent=`${out}$`;

    const interest = account.movements.filter(mov => mov>0).map(deposit => deposit * account.interestRate/100).reduce((acc, inter) => acc + inter, 0);
    labelSumInterest.textContent=`${Math.abs(interest)}$`;
}

const updateUI = function(account)
{
    // Display movements
    displayMovements(account.movements);

    // Display Balance
    CalcDisplayBalance(account);

    //Display Summary
    calcDisplaySummary(account);
}


/*const user ='Luss Huguette Chanelle';
const username = function(user)
{
    const name = user.toLowerCase().split(' ').map(nm=>nm[0]).join('');
    return name;
}
console.log(username(user));*/

const createUsername = function(accs)
{
    accs.forEach(function (acc)
    {
        acc.username = acc.owner.toLowerCase().split(' ').map(nm=>nm[0]).join('');
    });
};

createUsername(accounts);

let currentAccount;
btnLogin.addEventListener('click', function(e)
{
    e.preventDefault();

    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    console.log(currentAccount);

    if(currentAccount?.pin === Number(inputLoginPin.value))
    {
        // Display UI and Message
        labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;

        // Clear Input fields
        inputLoginUsername.value = inputLoginPin.value = ' ';
        inputLoginPin.blur();

        updateUI(currentAccount);
    }
});

btnTransfer.addEventListener('click', function(e)
{
    e.preventDefault();

    const amount = Number(inputTransferAmount.value);
    const receiveaccount = accounts.find(acc => acc.username === inputTransferTo.value);
    console.log(amount, receiveaccount);

    if(amount > 0 && receiveaccount && receiveaccount.username !== currentAccount.username &&
         currentAccount.balance >= amount)
    {
        // Doing the tranfer
        currentAccount.movements.push(-amount);
        receiveaccount.movements.push(amount);

        // Clear Transfer Input fields
        inputTransferTo.value = inputTransferAmount.value = ' ';
        inputTransferAmount.blur();

        // Update UI
        updateUI(currentAccount);
    }

});

btnClose.addEventListener('click', function(e)
{
    e.preventDefault();

    if(currentAccount.username === inputCloseUsername.value && currentAccount.pin ===Number(inputClosePin.value))
    {
        const index = accounts.findIndex(account => account.username === currentAccount.username);
        console.log(index);

        // Delete account
        accounts.splice(index, 1);

        // Hide UI
        containerApp.style.opacity = 0; 
        labelWelcome.textContent = 'Log in to get started';
    }

});

btnLoan.addEventListener('click', function(e)
{
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1))
    {
        currentAccount.movements.push(amount);

        updateUI(currentAccount);
    };

    inputLoanAmount.value='';
});

let sorted = false;
btnSort.addEventListener('click', function(e)
{
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
})