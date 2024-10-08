module.exports = {
	config: {
			name: "itachi",
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
	if (event.body && event.body.toLowerCase() == "itachi") return message.reply("protéger mon village🏕️, ma famille👪 et mes amis👫, peu importe les sacrifices💫 que je dois faire◥✇◣, ,◢✇◤_.🌼😇");
}
};
