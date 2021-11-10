const apiInstance = require("./sendInBlueApiInstance");

function sendDownloadLink(email, downloadLinkCode, item) {
  const downloadLink = `${process.env.SERVER_URL}/download/${downloadLinkCode}`;
  return sendEmail({
    email,
    subject: `Download ${item.name}`,
    htmlContent: `<h1>Thank you for purchasing ${item.name}</h1>
    <a href="${downloadLink}">Download it now</a>`,
    textContent: `Thank you for purchasing ${item.name}
Download it now. ${downloadLink}`,
  });
}

function sendEmail({ email, ...options }) {
  const sender = {
    name: "Ezen",
    email: "ezen.gaston@gmail.com",
  };

  return apiInstance.post("/smtp/email", {
    sender,
    replyTo: sender,
    to: [{ email }],
    ...options,
  });
}

module.exports = { sendDownloadLink };
