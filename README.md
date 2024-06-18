# Banking Application

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [Dependencies](#dependencies)
- [Acknowledgements](#Acknowledgements)
- [License](#license)

## Description

The Banking Application is a web-based application that allows users to manage their bank accounts online. It offers functionalities such as viewing transactions, transferring money, requesting loans, and closing accounts. The application uses date and currency formats according to the user's locale.

## Features

- **Authentication**: Secure login with username and PIN.
- **Transaction Display**: View transactions with formatted dates.
- **Balance Display**: Check the current account balance.
- **Operations Summary**: Calculate incoming, outgoing sums, and interest.
- **Money Transfer**: Transfer money between accounts.
- **Loan Request**: Request a loan with minimum amount verification.
- **Account Closure**: Delete the user's account.
- **Logout Timer**: Automatic logout after a period of inactivity.
- **Transaction Sorting**: Sort transactions by amount.

## Prerequisites

- Modern web browser (Google Chrome, Firefox, Safari, etc.)
- Basic knowledge of JavaScript, HTML, and CSS.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/NANITH777/Banking-Application.git
   ```

2. **Navigate to the directory**:

   ```bash
   cd Bank-App
   ```

3. **Open the `index.html` file**:

   Open the `index.html` file in a browser to see the application in action.

## Usage

1. **Login**:

   - Enter your username (e.g., `fn`) and PIN to log in.
   - You can use the pre-configured accounts for testing:
     - Username: `fn` (PIN: `1111`)
     - Username: `lhc` (PIN: `2222`)

2. **Money Transfer**:

   - Enter the recipient's username and the amount to transfer.
   - Click the transfer button to send the money.

3. **Loan Request**:

   - Enter the desired loan amount.
   - Click the loan request button to submit the application.

4. **Close Account**:

   - Enter your username and PIN to confirm account closure.
   - Click the close account button to close your account.

5. **Sort Transactions**:

   - Click the sort button to organize transactions by ascending or descending amounts.

## Code Structure

- `index.html`: The main HTML file of the application.
- `style.css`: The stylesheet for the application's styling.
- `script.js`: The main JavaScript file containing the application's logic.

## Dependencies

There are no external dependencies for this project. The JavaScript, HTML, and CSS code is self-contained.

### Acknowledgements

- **Udemy Course**: This project was inspired by the [Udemy course on JavaScript](https://www.udemy.com/share/101WeY3@lYNIT8YI9vLYSHtIilYx6ZUxBPyX-SEMuJ6j0tPuKGQ6N5XL5OacYiJNtgx7_mNnDA==/). Special thanks to the instructor for providing valuable insights and knowledge that contributed to the development of this application.
