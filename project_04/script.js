'use strict'

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
}

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
}

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
}

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
}

const accounts = [account1, account2, account3, account4]

// Elements
const labelWelcome = document.querySelector('.welcome')
const labelDate = document.querySelector('.date')
const labelBalance = document.querySelector('.balance__value')
const labelSumIn = document.querySelector('.summary__value--in')
const labelSumOut = document.querySelector('.summary__value--out')
const labelSumInterest = document.querySelector('.summary__value--interest')
const labelTimer = document.querySelector('.timer')

const containerApp = document.querySelector('.app')
const containerMovements = document.querySelector('.movements')

const btnLogin = document.querySelector('.login__btn')
const btnTransfer = document.querySelector('.form__btn--transfer')
const btnLoan = document.querySelector('.form__btn--loan')
const btnClose = document.querySelector('.form__btn--close')
const btnSort = document.querySelector('.btn--sort')

const inputLoginUsername = document.querySelector('.login__input--user')
const inputLoginPin = document.querySelector('.login__input--pin')
const inputTransferTo = document.querySelector('.form__input--to')
const inputTransferAmount = document.querySelector('.form__input--amount')
const inputLoanAmount = document.querySelector('.form__input--loan-amount')
const inputCloseUsername = document.querySelector('.form__input--user')
const inputClosePin = document.querySelector('.form__input--pin')

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov} €</div>
        </div>
        `

    containerMovements.insertAdjacentHTML('afterbegin', html)
    // containerMovements.insertAdjacentHTML('beforeend', html)
  })
}

const calcPrintBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0)
  labelBalance.textContent = `${account.balance} €`
}

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)

  labelSumIn.textContent = `${incomes}€`

  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0)

  labelSumOut.textContent = `${outcomes}€`

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1
    })
    .reduce((acc, mov) => acc + mov, 0)

  labelSumInterest.textContent = `${interest}€`
}

const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(arr => arr[0])
      .join('')
  })
}

createUsernames(accounts)

const updateUI = function (account) {
  // Display movements
  displayMovements(account.movements)
  // Display balance
  calcPrintBalance(account)
  // Display summary
  calcDisplaySummary(account)
}

// Event handler
let currentAccount

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault()

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  )

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`
    containerApp.style.opacity = 100

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''
    inputLoginPin.blur()

    // Update UI
    updateUI(currentAccount)
  }
})

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault()
  const amount = Number(inputTransferAmount.value)
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  )

  inputTransferTo.value = inputTransferAmount.value = ''

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    // doing the transfer
    currentAccount.movements.push(-amount)
    receiverAcc.movements.push(amount)

    // Update UI
    updateUI(currentAccount)
  }
})

btnLoan.addEventListener('click', function (e) {
  e.preventDefault()

  const amount = Number(inputLoanAmount.value)

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount)

    // Update UI
    updateUI(currentAccount)
  }
  inputLoanAmount.value = ''
})

btnClose.addEventListener('click', function (e) {
  e.preventDefault()

  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    )

    // Delete account
    accounts.splice(index, 1)

    // Hide UI
    containerApp.style.opacity = 0
  }

  inputClosePin.value = inputCloseUsername.value = ''
})

let sorted = false
btnSort.addEventListener('click', function (e) {
  e.preventDefault()
  displayMovements(currentAccount.movements, !sorted)
  sorted = !sorted
})

//////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]
/*
let arr = ['a', 'b', 'c', 'd', 'e']

// SLICE
console.log(arr.slice(2))
console.log(arr.slice(2, 4))
console.log(arr.slice(-2))
console.log(arr.slice(-1))
console.log(arr.slice(1, -2))
console.log(arr.slice())
// spread
console.log([...arr])
console.log('======================')

// SPLICE
// console.log(arr.splice(2))
arr.splice(-1)
console.log(arr)
arr.splice(1, 2)
console.log(arr)
console.log('======================')

// REVERSE
arr = ['a', 'b', 'c', 'd', 'e']
const arr2 = ['j', 'i', 'h', 'g', 'f']
console.log(arr2.reverse())
console.log(arr2)
console.log('======================')

// CONCAT
const letters = arr.concat(arr2)
console.log(letters)
console.log([...arr, ...arr2])
console.log('======================')

// JOIN
console.log(letters.join(' - '))

const arr = [23, 11, 64]
console.log(arr[0])
console.log(arr.at(0))

//getting last array element
console.log(arr[arr.length - 1])
console.log(arr.slice(-1)[0])
console.log(arr.at(-1))

console.log('jonas'.at(0))
console.log('jonas'.at(-1))



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}. You deposited ${movement}`)
  } else {
    console.log(`Movement ${i + 1}. You withdrew ${Math.abs(movement)}`)
  }
}

console.log('------- FOREACH --------')
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Index movement: ${index}. You deposited ${movement}`)
  } else {
    console.log(`Index movement: ${index}. You withdrew ${Math.abs(movement)}`)
  }
})



// MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
  [666, 'ups'],
])

currencies.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`)
})

// SET
const currenciesUnique = new Set([
  'USD',
  'EUR',
  'RU',
  'RU',
  'RU',
  'USD',
  'GBR',
  'EUR',
])
console.log(currenciesUnique)

currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value} : ${value}`)
})


const eurToUsd = 1.1

const movementsUSD = movements.map(function (value) {
  return value * eurToUsd
})
console.log(movements)
console.log(movementsUSD)

const movementsUSDarr = movements.map(val => val * eurToUsd)
console.log(movementsUSDarr)

const movementsUSDfor = []
for (const mov of movements) {
  movementsUSDfor.push(mov * eurToUsd)
}

console.log(movementsUSDfor)

const movementsDescriptions = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1}. You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
)
console.log(movementsDescriptions)



const deposits = movements.filter(mov => mov > 0)
console.log(movements)
console.log(deposits)

const depositFor = []
for (const mov of movements) {
  if (mov > 0) {
    depositFor.push(mov)
  }
}
console.log(depositFor)

const withdrawals = movements.filter(val => val < 0)
console.log(withdrawals)


console.log(movements)

// accumulator -> SMOWBALL
const balance = movements.reduce((accumulator, current, index) => {
  console.log(`Iteration ${index}: ${accumulator} plus: ${current}`)
  return accumulator + current
}, 0)

let balance2 = 0
for (const mov of movements) {
  balance2 += mov
}

console.log(balance2)



// Maximum value
const max = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
)
console.log(max)



const eurToUsd = 1.1

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr)
    return mov * eurToUsd
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0)
console.log(totalDepositsUSD)


const firstWithdrawal = movements.find(mov => mov < 0)
console.log(movements)
console.log(firstWithdrawal)

console.log(accounts)
const account = accounts.find(acc => acc.owner === 'Jessica Davis')
console.log(account)


console.log(movements)

// EQUALITY
console.log(movements.includes(-130))

// SOME CONDITION
console.log(movements.some(mov => mov === -130))

const anyDeposits = movements.some(mov => mov > 1500)
console.log(anyDeposits)


// EVERY
console.log(movements.every(mov => mov > 0))

console.log(account4.movements)
console.log(account4.movements.every(mov => mov > 0))

// Separate callback
const deposit = mov => mov > 0
console.log(movements.some(deposit))
console.log(movements.every(deposit))
console.log(movements.filter(deposit))


const arr = [[1, 2, 3], [4, 5, 6], 7, 8]
console.log(arr.flat())

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8]
console.log(arrDeep.flat(2))

// flat
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0)
console.log(overalBalance)

// flatMap
const overalBalanceTwo = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0)
console.log(overalBalanceTwo)



// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha']
console.log(owners.sort())
console.log(owners)

// nUmbers
console.log(movements)
// console.log(movements.sort())

// return < 0, A, B (keep order)
// return > 0, B, A (swith order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1
//   if (b > a) return -1
// })
movements.sort((a, b) => a - b)
console.log(movements)

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1
//   if (b > a) return 1
// })
movements.sort((a, b) => b - a)
console.log(movements)


const arr = [1, 2, 3, 4, 5, 6, 7]
console.log(new Array(1, 2, 3, 4, 5, 6, 7))

// Empty arrays + fill method
const x = new Array(7)
console.log(x)
// console.log(x.map(() => 5))
x.fill(1, 3, 5)
x.fill(1)
console.log(x)

arr.fill(23, 2, 6)
console.log(arr)

// Array.from
const y = Array.from({ length: 7 }, () => 9)
console.log(y)

const z = Array.from({ length: 7 }, (_, i) => i + 1)
console.log(z)

labelBalance.addEventListener('click', function () {
  const movementUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace(' €', ''))
  )

  console.log(movementUI)
})

const movementsUI2 = [...document.querySelectorAll('.movements__value')]
console.log(movementsUI2)



// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, curr) => sum + curr, 0)
console.log(bankDepositSum)

// 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 1000).length

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, current) => (current >= 1000 ? ++count : count), 0)

console.log(numDeposits1000)

// Prefixed ++ operator
let a = 10
console.log(++a)
console.log(a)

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur)
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur
      return sums
    },
    { deposits: 0, withdrawals: 0 }
  )

console.log(deposits, withdrawals)

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with']

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ')
  return titleCase
}

console.log(convertTitleCase('this is a nice title'))
console.log(convertTitleCase('this is a LONG title but not too long'))
console.log(convertTitleCase('and here is another title with an EXAMPLE'))
*/
