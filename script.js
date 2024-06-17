'use strict';


// Data
const account1 = {
    owner: 'Fulchany Nanith',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  
    movementsDates: [
      '2023-11-18T21:31:17.178Z',
      '2023-12-23T07:42:02.383Z',
      '2024-01-28T09:15:04.904Z',
      '2024-04-01T10:17:24.185Z',
      '2024-05-08T14:11:59.604Z',
      '2024-05-27T17:01:17.194Z',
      '2024-06-10T23:36:17.929Z',
      '2024-06-16T10:51:36.790Z',
    ],
    currency: 'TRY',
    locale: 'tr-TR',
};
  
const account2 = {
    owner: 'Luss Huguette Chanelle',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  
    movementsDates: [
      '2022-11-01T13:15:33.035Z',
      '2022-11-30T09:48:16.867Z',
      '2023-12-25T06:04:23.907Z',
      '2023-01-25T14:18:46.235Z',
      '2024-02-05T16:33:06.386Z',
      '2024-04-10T14:43:26.374Z',
      '2024-06-03T18:49:59.371Z',
      '2024-07-16T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};
  
const accounts = [account1, account2];

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


const formatMovementDate = function(date)
{
    const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    const daysPassed = calcDaysPassed(new Date(), date);
    console.log(daysPassed);

    if (daysPassed === 0) return "Today";
    if (daysPassed === 1) return "Yesterday";
    if (daysPassed <= 7) return `${daysPassed} days ago`;
    else
    {
        const day = `${date.getDate()}`.padStart(2, 0);
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
};

const displayMovements = function(account, sort = false)
{
    containerMovements.innerHTML='';

    const movs = sort ? account.movements.slice().sort( (a, b) => a - b): account.movements;

    movs.forEach(function(mov, i)
    {
        const type = mov > 0 ? 'deposit':'withdrawal';

        const date = new Date(account.movementsDates[i]);
        const displayDate = formatMovementDate(date);
        

        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i +1} ${type}</div>
            <div class="movements__date">${displayDate}</div>
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
    displayMovements(account);

    // Display Balance
    CalcDisplayBalance(account);

    //Display Summary
    calcDisplaySummary(account);
}

const createUsername = function(accs)
{
    accs.forEach(function (acc)
    {
        acc.username = acc.owner.toLowerCase().split(' ').map(nm=>nm[0]).join('');
    });
};

createUsername(accounts);

let currentAccount;
// FAKE ALWAYS LOGGED
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;


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

        // Login Date
        const day = `${now.getDate()}`.padStart(2, 0);
        const month = `${now.getMonth() + 1}`.padStart(2, 0);
        const year = now.getFullYear();
        const hour = `${now.getHours()}`.padStart(2, 0);
        const min = `${now.getMinutes()}`.padStart(2, 0);
        labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

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

        // Transfer Date
        currentAccount.movementsDates.push(new Date().toDateString());
        receiveaccount.movementsDates.push(new Date().toISOString());

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
        currentAccount.movementsDates.push(new Date().toISOString());

        updateUI(currentAccount);
    };

    inputLoanAmount.value='';
});

let sorted = false;
btnSort.addEventListener('click', function(e)
{
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
})