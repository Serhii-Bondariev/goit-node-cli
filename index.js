import { Command } from "commander";
import * as contacts from "./contacts.js";

const program = new Command();

program
  .option(
    "-a, --action <string>",
    "Дія, яку потрібно виконати (list, get, add, remove)"
  )
  .option("-i, --id <string>", "Ідентифікатор контакту")
  .option("-n, --name <string>", "Ім'я контакту")
  .option("-e, --email <string>", "Електронна пошта контакту")
  .option("-p, --phone <string>", "Номер телефону контакту");

program.parse(process.argv);

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    if (!action) {
      throw new Error("Не вказано дію!");
    }
    switch (action.toLowerCase()) {
      case "list":
        const contactsList = await contacts.listContacts();
        console.table(contactsList);
        break;

      case "get":
        const contact = await contacts.getContactById(id);
        console.log(contact !== null ? contact : null);
        break;

      case "add":
        const newContact = await contacts.addContact(name, email, phone);
        console.log(newContact);
        break;

      case "remove":
        const removedContact = await contacts.removeContact(id);
        console.log(removedContact !== null ? removedContact : null);
        break;

      default:
        throw new Error("Невідомий тип дії!");
    }
  } catch (error) {
    console.error("Помилка:", error.message);
  }
}

invokeAction(options);
