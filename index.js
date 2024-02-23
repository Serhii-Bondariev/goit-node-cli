import { program } from "commander";
import * as contacts from "./contacts.js";

program
  .option(
    "-a, --action <string>",
    "Дія, яку потрібно виконати (list, get, add, remove)"
  )
  .option("-i, --id <string>", "Ідентифікатор контакту")
  .option("-n, --name <string>", "Ім'я контакту")
  .option("-e, --email <string>", "Електронна пошта контакту")
  .option("-p, --phone <string>", "Номер телефону контакту");

program.parse();

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
        return console.log(contact) || null;

      case "add":
        const newContact = await contacts.addContact(name, email, phone);
        console.log(newContact);
        break;

      case "remove":
        const removedContact = await contacts.removeContact(id);
        if (removedContact) {
          console.log(removedContact);
        } else {
          console.warn("Контакт не знайдений!");
        }
        break;

      default:
        throw new Error("Невідомий тип дії!");
    }
  } catch (error) {
    console.error("Помилка:", error.message);
  }
}

invokeAction(options);
