import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.SERVER_URL,
});
const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY);

export async function getItems() {
  const res = await apiInstance.get("/items");
  return res.data;
}

export function purchaseItem(itemId) {
  return apiInstance
    .post("/create-checkout-session", {
      itemId,
    })
    .then((res) => {
      return stripe.redirectToCheckout({ sessionId: res.data.id });
    })
    .then(function (result) {
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert(error);
    });
}
