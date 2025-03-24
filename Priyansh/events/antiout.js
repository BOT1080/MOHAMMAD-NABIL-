module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "Koi Ase Pichware Mai Lath Marta Hai?";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`আহারে ${name} তাকে কেউ এড দাও তাকে ছাড়া আমার নিশ্বাস বন্ধ হয়ে যায়_🥺 :( `, event.threadID)
   } else api.sendMessage(`𝙷𝙴𝚈, ${name} ᴰᴼᴺ’ᵀ ᴸᴱᴬⱽᴱ ᴹᴱ ᴬᴸᴼᴺᴱ ᴮᴬᴮʸ_🥺 - ᴮᴱᴸᴵᴱⱽᴱ ᴹᴱ ᴵ ᴸᴼⱽᴱ ʸᴼᵁ ᵁᴹᴹᴹᴹᴹᴬᴴ`, event.threadID);
  })
 }
}
