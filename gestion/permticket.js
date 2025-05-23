const { MessageActionRow, MessageSelectMenu } = require('discord.js')
const config = require('../config')
const db = require('quick.db')
const owner = new db.table("Owner")
const rolestaff = new db.table("Rolestaff")

module.exports = {
    name: 'permticket',
    usage: 'permticket',
    description: `Permet de configurer le rôle qui aura accès aux tickets`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {

            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])

            if (!role) return message.channel.send({ content: `Merci de spécifier le rôle à ajouter` })

            message.channel.send({ content: `Le rôle ${role} peut désormais accéder aux tickets` })
            rolestaff.set(`rolestaff_${message.guild.id}`, role.id)
        }
    }
}