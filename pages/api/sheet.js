import { google } from "googleapis";
async function  handler(req, res) {
    if (req.method === 'POST'){
        const {Name, Email, Concern} = req.body
        console.log(Name, Email, Concern)

        const auth= new google.auth.GoogleAuth({
            projectId: "join-waitlist-431213",
        credentials:{
            client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            private_key : process.env.NEXT_PUBLIC_PRIVATE_KEY
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
        range: 'appointmentList!A:C',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[Name, Email, Concern]]
        }
      }, {});
}

}

export default handler;
