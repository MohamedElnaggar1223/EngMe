import functions from 'firebase-functions'
import admin from 'firebase-admin'
import { google } from 'googleapis'

admin.initializeApp();

exports.createMeetingLink = functions.https.onCall(async (data, context) => {
  try {
    // Validate the user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'Authentication required.');
    }

    // Extract start and end times from the data passed from the client
    const { startTime, endTime, requestId } = data;

    // Get the user's email using the ID token
    const idToken = context.auth.token.idToken;
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    const userEmail = decodedIdToken.email;

    // Create a Google Calendar API client
    const calendar = google.calendar({ version: 'v3', auth: import.meta.env.VITE_GOOGLE_API_KEY }); // Set up API key

    // Fetch the user's calendars
    const calendarList = await calendar.calendarList.list({ minAccessRole: 'owner' });
    
    // Find the user's primary calendar
    const primaryCalendar = calendarList.data.items.find((item) => item.primary);

    if (!primaryCalendar) {
      throw new functions.https.HttpsError('not-found', 'Primary calendar not found.');
    }

    // Create a Google Meet link event on the primary calendar
    const event = {
      summary: 'Google Meet',
      description: 'Meeting link created with Firebase Cloud Function',
      start: { dateTime: startTime.toISOString() },
      end: { dateTime: endTime.toISOString() },
      conferenceData: {
        createRequest: { requestId },
      },
    };

    const createdEvent = await calendar.events.insert({
      calendarId: primaryCalendar.id,
      resource: event,
    });

    const meetLink =
      createdEvent.data.conferenceData.createRequest.conferenceSolution.key.uri;
    return { meetLink };
  } catch (error) {
    console.error('Error creating Google Meet link:', error);
    throw new functions.https.HttpsError('internal', 'Internal Server Error.');
  }
});