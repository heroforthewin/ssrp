const config = {
    "botToken": "OTc5NDAxNTk3MDM5ODA4NTgz.GV24g1.g6efEX9prrIDfDZ9e1nBxtipWF4rgtbgZzodMU", // Your bots token
    "botPort": 30120, // Ex: 50001
    "botLicenseKey": "0", // License key provided in bot portal (https://bots.synapse-hosting.xyz/login)

    "ticketCap": 5, // Set to the number of max tickets you want a user to be able to open

    "useLegacyTranscripts": true, // Stores all files locally (on bot) instead of in the cloud. We highly recommend using our new transcripts system instead, which has improved speed & reliability.
    "transcriptUrl": "localhost", // Ex: transcripts.synapse-hosting.xyz
    "useSSL": false, // SSL is used for secure connections (HTTPS), https://help.synapse-hosting.xyz/article/2
    "privateKeyFile": "private.pem", // private.pem file stored inside of "ssl" folder
    "certificateFile": "certificate.pem", // certificate.pem file stored inside of "ssl" folder

    "deleteInviteLinks": false, // Still a WIP. This will not work as of now
    "blacklistedWords": [""], // Still a WIP. This will not work as of now

    "superUsers": ["954801191492157501", "799740796210905093","935712175773843456"], // Ex: ["10000000000000000","20000000000000000"] (Must be user IDs)

    "botCross": ":x:", // X/Cross Emoji
    "botTick": ":white_check_mark", // Check Emoji
    "botLoad": ":arrows_clockwise:" // Loading Emoji
}

module.exports = config