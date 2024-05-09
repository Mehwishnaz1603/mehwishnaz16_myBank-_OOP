#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
class customer {
    constructor(a, b, c, d, e, f) {
        this.FirstName = a;
        this.LastName = b;
        this.age = c;
        this.gender = d;
        this.AccountNumber = e;
        this.Balance = f;
    }
}
console.log(chalk_1.default.bold.bgBlueBright("PayPal"));
class myBank {
    constructor() {
        this.customers = [];
    }
    createAcc() {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, age, gender, accountNumber, balance } = yield inquirer_1.default.prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: chalk_1.default.bold.blueBright("Enter your first name:"),
                },
                {
                    type: "input",
                    name: "lastName",
                    message: chalk_1.default.bold.blueBright("Enter your last name:"),
                },
                {
                    type: "input",
                    name: "age",
                    message: chalk_1.default.bold.blueBright("Enter your age:"),
                },
                {
                    type: "input",
                    name: "gender",
                    message: chalk_1.default.bold.blueBright("Enter your gender:"),
                },
                {
                    type: "input",
                    name: "accountNumber",
                    message: chalk_1.default.bold.blueBright("Enter your new account number:"),
                },
                {
                    type: "input",
                    name: "balance",
                    message: chalk_1.default.bold.blueBright("Add initial balance:"),
                },
            ]);
            const cus = new customer(firstName, lastName, age, gender, accountNumber, parseFloat(balance));
            this.customers.push(cus);
            console.log(chalk_1.default.bold.italic.yellowBright(`congratulations, Mr/s ${cus.FirstName} ${cus.LastName} your account has been created successfully.`));
        });
    }
    details() {
        return __awaiter(this, void 0, void 0, function* () {
            const { accountNumber } = yield inquirer_1.default.prompt({
                type: "input",
                name: "accountNumber",
                message: chalk_1.default.bold.cyan("Enter your account number:"),
            });
            const cus = this.customers.find((z) => z.AccountNumber === accountNumber);
            if (cus) {
                console.log(chalk_1.default.bold.greenBright.underline(`Account Details:
        Name: ${cus.FirstName} ${cus.LastName}
        Age: ${cus.age}
        Gender: ${cus.gender}
        Account Number: ${cus.AccountNumber}
        Balance: ${cus.Balance}`));
            }
            else {
                console.log(chalk_1.default.bold.red(`Account not found!`));
            }
        });
    }
    debit() {
        return __awaiter(this, void 0, void 0, function* () {
            const { accountNumber, amount } = yield inquirer_1.default.prompt([
                {
                    type: "input",
                    name: "accountNumber",
                    message: chalk_1.default.bold.cyan("Enter your account number:"),
                },
                {
                    type: "input",
                    name: "amount",
                    message: chalk_1.default.bold.cyan("Enter amount to debit:"),
                },
            ]);
            const cus = this.customers.find((z) => z.AccountNumber === accountNumber);
            if (cus) {
                if (cus.Balance >= parseFloat(amount)) {
                    cus.Balance -= parseFloat(amount);
                    console.log(chalk_1.default.bold.italic.greenBright(`Debited ${amount} from account ${accountNumber}. New balance: ${cus.Balance}`));
                }
                else {
                    console.log(chalk_1.default.bold.red("Insufficient balance"));
                }
            }
            else {
                console.log(chalk_1.default.red.bold("Account not found:"));
            }
        });
    }
    credit() {
        return __awaiter(this, void 0, void 0, function* () {
            const { accountNumber, amount } = yield inquirer_1.default.prompt([
                {
                    type: "input",
                    name: "accountNumber",
                    message: chalk_1.default.bold.cyan("Enter your account number:"),
                },
                {
                    type: "input",
                    name: "amount",
                    message: chalk_1.default.bold.cyan("Enter amount to credit:"),
                },
            ]);
            const cus = this.customers.find((z) => z.AccountNumber === accountNumber);
            if (cus) {
                cus.Balance += parseFloat(amount);
                console.log(chalk_1.default.bold.italic.greenBright(`Credited ${amount} to account ${accountNumber}. New balance: ${cus.Balance}`));
            }
            else {
                console.log(chalk_1.default.red("Account not found"));
            }
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const { choice } = yield inquirer_1.default.prompt({
                    type: "list",
                    name: "choice",
                    message: "Select an option:",
                    choices: [
                        "Create Account",
                        "View Account Details",
                        "Debit",
                        "Credit",
                        "Exit",
                    ],
                });
                if (choice === "Create Account") {
                    yield this.createAcc();
                }
                else if (choice === "View Account Details") {
                    yield this.details();
                }
                else if (choice === "Debit") {
                    yield this.debit();
                }
                else if (choice === "Credit") {
                    yield this.credit();
                }
                else if (choice === "Exit") {
                    console.log(chalk_1.default.underline.red.italic("Yor are exit"));
                    process.exit();
                }
            }
        });
    }
}
const a = new myBank();
a.start();
