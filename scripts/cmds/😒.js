+cmd install 😒.js module.exports = {
	config: {
			name: "😒",
			version: "1.0",
			author: "Jaychris Garcia",
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
	if (event.body && event.body.toLowerCase() == "😒") return message.reply("Vas te fait voir par le chien de David mpongo 😒 ");
}
};
