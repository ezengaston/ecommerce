require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const items = require("./items.json");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.get("/items", (req, res) => {
  res.json(
    items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        price: item.priceInCents / 100,
        purchased: false,
      };
    })
  );
});

app.post("/create-checkout-session", async (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.body.itemId));
  if (item == null) {
    return res.status(400).json({ message: "Invalid Item" });
  }
  const session = await createCheckoutSession(item);
  res.json({ id: session.id });
});

function createCheckoutSession(item) {
  return stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/download-links.html`,
    cancel_url: process.env.CLIENT_URL,
  });
}

app.listen(3000);
