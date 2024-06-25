const { useState } = require("react");

const ContactForm = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = () => {
    if (!name || !lastName || !email || !message) return;
    fetch(process.env.DISCORD_WEBHOOK_URL?.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        content:
          "||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| @everyone",
        embeds: [
          {
            title: `Nouveau message de ${name} ${lastName.toUpperCase()}`,
            color: "1055556",
            description: message,
            fields: [
              {
                name: "Email",
                value: email,
              },
            ],
          },
        ],
      }),
    });
    setEmail("");
    setName("");
    setLastName("");
    setMessage("");
  };

  return (
    <div class="container mx-auto">
      <div class="row mx-auto my-6 w-full max-w-xl">
        <div class="col-xs-12 mb-4">
          <div class="relative">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              placeholder="Prénom"
              class="w-full p-6 bg-gray-800 text-white rounded-md focus:outline-none"
            />
          </div>
        </div>
        <div class="col-xs-12 mb-4">
          <div class="relative">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Nom"
              class="w-full p-6 bg-gray-800 text-white rounded-md focus:outline-none"
            />
          </div>
        </div>
        <div class="col-xs-12 mb-4">
          <div class="relative">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              class="w-full p-6 bg-gray-800 text-white rounded-md focus:outline-none"
            />
          </div>
        </div>
        <div class="col-xs-12 mb-4">
          <div class="relative">
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              class="w-full p-6 bg-gray-800 text-white rounded-md min-h-[15em] focus:outline-none"
              placeholder="Message"
            ></textarea>
          </div>
        </div>
        <div class="col-xs-12 ">
          <div
            onClick={() => submit()}
            class="inline-block float-right px-7 py-2.5 rounded-full bg-blue-500 text-white text-lg cursor-pointer shadow transition-all duration-300 ease hover:translate-y-0.5 hover:shadow-sm"
          >
            Send Message
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
