import inquirer from 'inquirer';
import { faker } from '@faker-js/faker';
const creaTuser = () => {
    let users = [];
    for (let i = 0; i < 5; i++) {
        let user = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(10000000 * Math.random() * 90000000),
            balance: 1000000 * i
        };
        users.push(user);
    }
    return users;
};
const atmMachine = async (users) => {
    const res = await inquirer.prompt({
        type: "number",
        message: "write pin code",
        name: "pin"
    });
    const user = users.find((val) => val.pin == res.pin);
    if (user) {
        console.log(`Welcome ${user.name}`);
        atmFunc(user);
        return;
    }
    console.log("Invalid user pin");
};
//atm function
const atmFunc = async (user) => {
    const ans = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "krna kiya chahte ho..",
        choices: ["withdraw", "balance", "exit", "deposit"]
    });
    if (ans.Select == "withdraw") {
        const amount = await inquirer.prompt({
            type: "number",
            message: "enter Amount",
            name: "rupees"
        });
        if (amount.rupees > user.balance) {
            return console.log("insuffient balance");
        }
        console.log(`withdraw amount: ${amount.rupees}`);
        console.log(`balance:${user.balance - amount.rupees}`);
    }
    if (ans.Select === "balance") { }
    if (ans.Select === "deposit") { }
    if (ans.Select === "exit") { }
};
const users = creaTuser();
atmMachine(users);
