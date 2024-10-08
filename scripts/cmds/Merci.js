+cmd install merci.js module.exports = {
	config: {
			name: "merci",
			version: "1.0",
			author: "Shibai Otsutsuki",
			countDown: 5,
			role: 0,
			shortDescription: "sarcasm",
			longDescription: "sarcasm",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "merci") return message.reply("🌼Derien🦅? je suis là pour répondre à tout tes question écrit+botgc pour rejoindre mon groupe ✨🌿✅😇");
}
};
