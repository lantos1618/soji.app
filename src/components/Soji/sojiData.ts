
export interface SojiProps {
    name: string
    emoji?: string
    src: string
    description?: string
    tags?: string[]
}
export interface SojiItemProps extends SojiProps {
    spam: boolean
}

export interface SearchResultProps {
    sojis: Array<SojiProps>;
    // sojiCount: number;
}
export const sojiData: Array<SojiProps> = [
    {
        name: 'quack',
        emoji: "https://emojis.slackmojis.com/emojis/images/1643509076/36178/quack_talk.gif?1643509076",
        src: "https://www.myinstants.com/media/sounds/quack_5.mp3"
    },
    {
        name: 'bruh',
        emoji: "https://emojis.slackmojis.com/emojis/images/1643516566/26063/bruh.png?1643516566",
        src: "https://www.myinstants.com/media/sounds/movie_1.mp3"
    },
    {
        name: 'aeugh',
        emoji: "https://emojis.slackmojis.com/emojis/images/1643516860/29132/carrot_nom.gif?1643516860",
        src: "https://www.myinstants.com/media/sounds/aeugh-snip.mp3"
    },
    {
        name: 'china rap',
        src: "https://www.myinstants.com/media/sounds/export_ofoct_Cy3m7NF.mp3",
        // emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F922873242136485908.gif%3Fv%3D1&w=128&q=75"
        emoji: "https://c.tenor.com/xnRrTN2HlJQAAAAC/tom-ching-cheng-hanji.gif"
    },
    {
        name: 'chinese dream',
        src: "https://www.myinstants.com/media/sounds/chinese-dream.mp3",
        emoji: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV4vKCEWRrp0frbbbyvmf0uzaefrRGkPEKbQ&usqp=CAU"
    },
    {
        name: 'xue hau piao piao',
        src: "https://www.myinstants.com/media/sounds/xie-hua-piao-piao-bei-feung-shiou-shiou.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F795737868966428702.png%3Fv%3D1&w=128&q=75"
    },
    {
        name: 'bing chilling',
        src: "https://www.myinstants.com/media/sounds/bing-chilling_fcdGgUc.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F910324208125497415.png%3Fv%3D1&w=128&q=75"
    },
    {
        name: 'arigato',
        src: "https://www.myinstants.com/media/sounds/recording_15.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F853034144341950515.gif%3Fv%3D1&w=128&q=75"
    },
    {
        name: 'ara ara sayonara',
        src: "https://www.myinstants.com/media/sounds/shinobu-ara-ara-demon-slayer-kemitsu-no-yabia-2.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F850524359080804424.gif%3Fv%3D1&w=128&q=75"
    },
    {
        name: "zehaha",
        src: "https://www.myinstants.com/media/sounds/zehahaha_laugh.mp3",
        emoji: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxZSoIPYDkqjpCNTYYy9ljo4Utjj83gahnAdZzavBRTj4lQS722CSSe9E_dVe8QHJv71I&usqp=CAU"
    },
    {
        name: 'ah fuck',
        src: "https://www.myinstants.com/media/sounds/ah-fuck.mp3",
        emoji: "data:image/jpeg;base64,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"
    },
    {
        name: 'nani',
        src: "https://www.myinstants.com/media/sounds/tmph3o88c10.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F811420561515347997.gif%3Fv%3D1&w=128&q=75"
    },
    {
        name: 'chug jug with you',
        src: "https://www.myinstants.com/media/sounds/qqrlvfre9au-00_00_16.mp3",
        emoji: "https://emoji.gg/assets/emoji/7096_ChugJug.png"
    },
    {
        name: 'yare yare daze',
        src: "https://www.myinstants.com/media/sounds/yare-yare-daze_zAnWvX6.mp3",
        emoji: "https://emoji.discord.st/emojis/b041334c-9c0a-4f6a-b307-d82fef5a8eae.png"
    },
    {
        name: "Yorokobe Shounen",
        src: "https://www.myinstants.com/media/sounds/yorokobe-shounen.mp3",
        emoji: "data:image/jpeg;base64,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"
    },
    {
        name: 'kono dio da',
        src: "https://www.myinstants.com/media/sounds/kono-dio-da99.mp3",
        emoji: "https://assets.puzzlefactory.pl/puzzle/234/779/original.jpg"
    },
    {
        name: "jojo",
        src: "https://www.myinstants.com/media/sounds/jojos-bizarre-adventure-asb-ora-ora-ora.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F694045915551629333.gif%3Fv%3D1&w=128&q=75"
    },
    {
        name: "megumin explosion",
        src: "https://www.myinstants.com/media/sounds/explosion_3.mp3",
        emoji: "https://emoji.discord.st/emojis/megumin_blush.png"
    },
    {
        name: "boom",
        src: "https://www.myinstants.com/media/sounds/vine-boom.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F866458305445363752.gif%3Fv%3D1&w=128&q=75"
    },
    {
        name: 'yes',
        src: "https://www.myinstants.com/media/sounds/yes-yes-yes-yes-yes.mp3",
        // emoji: "https://emojis.slackmojis.com/emojis/images/1620547986/37041/jojo.gif?1620547986"
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F958237211487260713.gif%3Fv%3D1&w=128&q=75"
    },
    {
        name: "ehe te nandayo",
        src: "https://www.myinstants.com/media/sounds/4k-ehe-te-nandayo-paimon-green-screen-update.mp3",
        emoji: "https://emoji.discord.st/emojis/4bd4a3d9-cef7-423c-85da-56481bae7e0c.png"
    },
    {
        name: "megmin nani",
        src: "https://megumin.love/sounds/megumin/season-2/nani.mp3",
        emoji: "https://emojis.slackmojis.com/emojis/images/1643515729/17546/meow_megumin.png?1643515729"
    },
    {
        name: "megumin yes",
        src: "https://megumin.love/sounds/megumin/season-2/yes.mp3",
        emoji: "https://emoji.discord.st/emojis/21a88324-2547-45c1-8e09-f7d4f3c998d0.png"
    },
    {
        name: "megumin wahaha",
        src: "https://megumin.love/sounds/megumin/season-2/wahaha.mp3",
        emoji: "https://emoji.discord.st/emojis/LewdMegumin.png"
    },
    {
        name: "fortnite",
        src: "https://www.myinstants.com/media/sounds/fortnite-battle-pass.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F825033810273108018.gif%3Fv%3D1&w=128&q=75"
    },
    {
        name: "fart",
        src: "https://www.myinstants.com/media/sounds/perfect-fart.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F869402119810220083.gif%3Fv%3D1&w=128&q=75"
    },
    {
        name: "fart bass",
        src: "https://www.myinstants.com/media/sounds/fart-with-reverb.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F952988717725925416.gif%3Fv%3D1&w=128&q=75"

    },
    {
        name: "aughhh tiktok",
        src: "https://www.myinstants.com/media/sounds/aughhhh-tiktok.mp3",
        emoji: "https://emojis.slackmojis.com/emojis/images/1648659328/56897/homer-snore.gif?1648659328"
    },
    {
        name: "discord notification",
        src: "https://www.myinstants.com/media/sounds/discord-notification.mp3",
        emoji: "https://emojis.slackmojis.com/emojis/images/1643515146/11614/pop_cat.gif?1643515146"
    },
    {
        name: "let me in",
        src: "https://www.myinstants.com/media/sounds/eric-andre-let-me-in.mp3",
        emoji: "https://emojis.slackmojis.com/emojis/images/1643514581/5805/let_me_in.gif?1643514581"
    },
    {
        name: "welcome to the gulag",
        src: "https://www.myinstants.com/media/sounds/sequence-01_7M44IeY.mp3",
        emoji: "https://emojis.slackmojis.com/emojis/images/1643514836/8494/stalin_go_to_gulag.png?1643514836"
    },
    {
        name: "sometimes I dream about cheese",
        src: "https://www.myinstants.com/media/sounds/question06.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F423149657061851146.gif%3Fv%3D1&w=128&q=75"
    },
    {
        name: "ali-a",
        src: "https://www.myinstants.com/media/sounds/ali-a-intro-ear-rape-convertbox7.mp3",
        emoji: "https://thumbs.gfycat.com/MagnificentHomelyAfricanwilddog-size_restricted.gif"
    },
    {
        name: "bitconnect",
        src: "https://www.myinstants.com/media/sounds/bitconnnneeeeeeect.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F500969604739366923.png%3Fv%3D1&w=128&q=75"
    },
    {
        name: "bitconnect xqc",
        src: "https://www.myinstants.com/media/sounds/bitconnect.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F950483168476143616.png%3Fv%3D1&w=128&q=75"
    },
    {
        name: "what am I going to do",
        src: "https://www.myinstants.com/media/sounds/bitconect-guy-what-i-am-gonna-do-sound-effect.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F731223272724889600.png%3Fv%3D1&w=128&q=75"
    },
    {
        name: "hmm hmm no no no",
        src: "https://www.myinstants.com/media/sounds/hmm-hmm-no-no-no.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F832459427759521792.png%3Fv%3D1&w=128&q=75"
    },
    {
        name: "hey hey hey",
        src: "https://www.myinstants.com/media/sounds/hhh.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F469165831859732500.png%3Fv%3D1&w=128&q=75",

    },
    {
        name: "uwu",
        src: "https://www.myinstants.com/media/sounds/uwudaddy.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F771146663182991401.gif%3Fv%3D1&w=128&q=75",
    },
    {
        name: "xqc smash",
        src: "https://www.myinstants.com/media/sounds/xqc-smash.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F868047627650994186.gif%3Fv%3D1&w=128&q=75"
    },
    {
        name: "deja vu",
        src: "https://www.myinstants.com/media/sounds/dejavu-online-audio-converter.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F890345668126867507.gif%3Fv%3D1&w=128&q=75"
    },
    {
        name: "tactical nuke",
        src: "https://www.myinstants.com/media/sounds/tactical-nuke-ear-rape.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F758670198697492482.gif%3Fv%3D1&w=128&q=75"
    },
    {
        name: "50 thousand people use to live here now it's a ghost town",
        src: "https://www.myinstants.com/media/sounds/50-thousand-people-use-to-live-here.mp3",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F912044451076116540.gif%3Fv%3D1&w=128&q=75"

    },
    {
        name: "SXF anya waku waku",
        emoji:"https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F962438735331459132.gif%3Fv%3D1&w=64&q=75",
        src: "https://www.myinstants.com/media/sounds/sxf-anya-waku-waku.mp3"
    },
    {
        name: "Dar-ling",
        emoji: "https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F926655043065741362.gif%3Fv%3D1&w=64&q=75",
        src: "https://www.myinstants.com/media/sounds/dar-ling.mp3",
    }

]
