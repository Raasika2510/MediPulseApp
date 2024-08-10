import { google } from "googleapis";
async function handle(req, res) {
    if (req.method === 'POST'){
        const {Name, Email } = req.body
        console.log(Name, Email )

        const auth= new google.auth.GoogleAuth({
            projectId: "join-waitlist-431213",
        credentials:{
            client_email: process.env.CLIENT_EMAIL1,
            client_id: process.env.CLIENT_ID1,
            private_key : process.env.PRIVATE_KEY1.replace(/\\n/g, "\n")
        },
        scopes:[
            'https://www.googleapis.com/auth/drive',
              'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/spreadsheets'
        ]
    })
    const sheets = google.sheets({
        auth,
        version: 'v4'
    })
    const spreadsheetId= '1-bQKFXTXpPOt69IlCaweUOqKxkthQoJMFpfRdkOpIjM'

    const response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'rsvp!A:B',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[Name, Email]]
        }
      }, {});
}

}

export default handle;
