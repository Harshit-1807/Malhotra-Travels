// Import the new modular SDK
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { initializeApp } from "firebase-admin/app";
import * as nodemailer from "nodemailer";
import { setGlobalOptions } from "firebase-functions/v2";
setGlobalOptions({ region: "asia-south2" });

// Initialize Firebase Admin SDK
initializeApp();

// Gmail credentials
const gmailEmail = "ymalhotra41@gmail.com";
const gmailAppPassword = "euas wrim yszn glmf";

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailAppPassword,
  },
});

const sendNotificationEmail = async (subject, htmlContent) => {
  const mailOptions = {
    from: `"Malhotra Travel" <${gmailEmail}>`,
    to: gmailEmail,
    subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

// 🔔 Booking Notification
export const notifyNewBooking = onDocumentCreated(
  {
    document: "Bookings/{bookingId}",
    region: "asia-south2",
  },
  (event) => {
    const data = event.data.data();
    return sendNotificationEmail(
      "🚗 New Booking Received",
      `<h3>Booking Details</h3>
       <p><strong>Name:</strong> ${data.name}</p>
       <p><strong>Pickup:</strong> ${data.pickup}</p>
       <p><strong>Destination:</strong> ${data.destination}</p>
       <p><strong>Date:</strong> ${data.date}</p>
       <p><strong>Trip Type:</strong> ${data.type}</p>
       <p><strong>Phone:</strong> ${data.mobile}</p>
       <p><strong>Notes:</strong> ${data.notes}</p>`
    );
  }
);

// 🔔 Affiliate Notification
export const notifyNewAffiliate = onDocumentCreated(
  {
    document: "Affiliates/{affiliateId}",
    region: "asia-south2",
  },
  (event) => {
    const data = event.data.data();
    return sendNotificationEmail(
      "🆕 New Affiliate Joined",
      `<h3>Affiliate Details</h3>
       <p><strong>Name:</strong> ${data.name}</p>
       <p><strong>Email:</strong> ${data.email || "N/A"}</p>
       <p><strong>Phone:</strong> ${data.mobile}</p>`
    );
  }
);

// 🔔 Fleet Partner Notification
export const notifyNewFleetPartner = onDocumentCreated(
  {
    document: "CarOwners/{partnerId}",
    region: "asia-south2",
  },
  (event) => {
    const data = event.data.data();
    return sendNotificationEmail(
      "🚘 New Fleet Partner Registration",
      `<h3>Fleet Partner Details</h3>
       <p><strong>Name:</strong> ${data.name}</p>
       <p><strong>Phone:</strong> ${data.mobile}</p>
       <p><strong>Car Number:</strong> ${data.carNumber}</p>
       <p><strong>Location:</strong> ${data.location}</p>
       <p><strong>Car Model:</strong> ${data.carType}</p>
       <p><strong>Availability:</strong> ${data.availability}</p>`
    );
  }
);
