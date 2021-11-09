import { getItems } from "./api";

const itemTemplate = document.getElementById("item-template");
const itemList = document.querySelector("[data-item-list]");

async function loadItems() {
  const items = await getItems();

  itemList.innerHTML = "";
  items.forEach((item) => {
    const itemElement = itemTemplate.content.cloneNode(true);
    itemElement.querySelector("[data-item-name]").textContent = item.name;
    itemElement.querySelector(
      "[data-item-price]"
    ).textContent = `$${item.price}`;

    const button = itemElement.querySelector("[data-item-btn]");
    if (item.purchased) {
      button.classList.add("download-btn");
      button.textContent = "Download";
    } else {
      button.classList.add("purchase-btn");
      button.textContent = "Purchase";
    }

    itemList.append(itemElement);
  });
}

loadItems();
