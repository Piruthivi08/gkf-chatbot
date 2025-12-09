const { getSession, saveSession, clearSession } = require("../utils/chatState");
 // For API calls

const API_BASE = process.env.API_URL || "http://localhost:5000"; // CHANGE THIS IF NEEDED

exports.sendMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({ message: "message and sessionId required" });
    }

    let session = getSession(sessionId) || {
      intent: null,
      step: 0,
      data: {},
    };

    const text = message.toLowerCase().trim();
    let botResponse = "";

    // USE THIS FUNCTION FOR POST REQUESTS
    async function apiPost(path, data) {
      const response = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      return await response.json();
    }

    // -------------------------------------------------------
    // 1️⃣ APPOINTMENT FLOW (USES /api/appointments ROUTE)
    // -------------------------------------------------------
    async function handlePatientFlow(text) {
      switch (session.step) {
        case 1:
          session.data.name = text;
          session.step = 2;
          return "Great! What is your age?";

        case 2:
          session.data.age = Number(text);
          session.step = 3;
          return "What is your gender? (male / female / other)";

        case 3:
          session.data.gender = text;
          session.step = 4;
          return "Please enter your phone number.";

        case 4:
          session.data.phone = text;
          session.step = 5;
          return "Please enter your email (or type 'skip').";

        case 5:
          if (text !== "skip") session.data.email = text;
          session.step = 6;
          return "Please describe the reason for your appointment.";

        case 6:
          session.data.message = text;
          session.step = 7;

          return `
Here is your appointment summary:

• Name: ${session.data.name}
• Age: ${session.data.age}
• Gender: ${session.data.gender}
• Phone: ${session.data.phone}
• Email: ${session.data.email ?? "Not provided"}
• Reason: ${session.data.message}

Type **confirm** to book or **cancel** to restart.
`;

        case 7:
          if (text === "confirm") {
            const result = await apiPost("/api/appointments", session.data);

            clearSession(sessionId);

            return `✅ Appointment booked!\nID: ${result?.appointment?._id || "N/A"}`;
          }

          if (text === "cancel") {
            clearSession(sessionId);
            return "Appointment cancelled.";
          }

          return "Please type **confirm** or **cancel**.";
      }
    }

    // -------------------------------------------------------
    // 2️⃣ INTERNSHIP / VOLUNTEERING FLOW
    // -------------------------------------------------------
    async function handleProgramFlow(text) {
      switch (session.step) {
        case 1:
          if (!["internship", "volunteering"].includes(text)) {
            return "Please type **internship** or **volunteering**.";
          }
          session.data.programType = text;
          session.step = 2;
          return "Your name?";

        case 2:
          session.data.name = text;
          session.step = 3;
          return "Your age?";

        case 3:
          session.data.age = Number(text);
          session.step = 4;
          return "Your phone number?";

        case 4:
          session.data.phone = text;
          session.step = 5;

          return `
Summary:
• Name: ${session.data.name}
• Age: ${session.data.age}
• Phone: ${session.data.phone}
• Applying For: ${session.data.programType}
Type **confirm** or **cancel**.
`;

        case 5:
          if (text === "confirm") {
            const result = await apiPost("/api/internship", session.data);

            clearSession(sessionId);
            return `✅ Application submitted!\nID: ${result?.application?._id}`;
          }

          if (text === "cancel") {
            clearSession(sessionId);
            return "Cancelled.";
          }

          return "Please type confirm or cancel.";
      }
    }

    // -------------------------------------------------------
    // 3️⃣ ADOPTION ENQUIRY FLOW
    // -------------------------------------------------------
    async function handleAdoptionFlow(text) {
      switch (session.step) {
        case 1:
          session.data.name = text;
          session.step = 2;
          return "Your phone number?";

        case 2:
          session.data.phone = text;
          session.step = 3;
          return "Your email?";

        case 3:
          session.data.email = text;
          session.step = 4;
          return "Your address? (or type skip)";

        case 4:
          if (text !== "skip") session.data.address = text;
          session.step = 5;
          return "Any message or reason? (or skip)";

        case 5:
          if (text !== "skip") session.data.message = text;
          session.step = 6;

          return `
Summary:
• Name: ${session.data.name}
• Phone: ${session.data.phone}
• Email: ${session.data.email}
• Address: ${session.data.address ?? "Not provided"}
• Message: ${session.data.message ?? "Not provided"}

Type **confirm** or **cancel**.
`;

        case 6:
          if (text === "confirm") {
            const result = await apiPost("/api/adoption", session.data);

            clearSession(sessionId);
            return `✅ Enquiry submitted!\nID: ${result?.enquiry?._id}`;
          }

          if (text === "cancel") {
            clearSession(sessionId);
            return "Cancelled.";
          }

          return "Please type confirm or cancel.";
      }
    }

    // -------------------------------------------------------
    // 4️⃣ MEDICAL REPRESENTATIVE VISIT FLOW
    // -------------------------------------------------------
    async function handleMedRepFlow(text) {
      switch (session.step) {
        case 1:
          session.data.companyName = text;
          session.step = 2;
          return "Representative name?";

        case 2:
          session.data.repName = text;
          session.step = 3;
          return "Email?";

        case 3:
          session.data.email = text;
          session.step = 4;
          return "Phone number?";

        case 4:
          session.data.phone = text;
          session.step = 5;
          return "Products?";

        case 5:
          session.data.productList = text;
          session.step = 6;
          return "Preferred date (YYYY-MM-DD)?";

        case 6:
          session.data.preferredDate = text;
          session.step = 7;
          return "Preferred time?";

        case 7:
          session.data.preferredTime = text;
          session.step = 8;
          return "Any notes? (or skip)";

        case 8:
          if (text !== "skip") session.data.notes = text;
          session.step = 9;

          return `
Summary:
• Company: ${session.data.companyName}
• Rep: ${session.data.repName}
• Email: ${session.data.email}
• Phone: ${session.data.phone}
• Products: ${session.data.productList}
• Date: ${session.data.preferredDate}
• Time: ${session.data.preferredTime}
• Notes: ${session.data.notes ?? "None"}

Type confirm or cancel.
`;

        case 9:
          if (text === "confirm") {
            const result = await apiPost("/api/medrep", session.data);

            clearSession(sessionId);
            return `✅ Visit request submitted!\nID: ${result?.visit?._id}`;
          }

          if (text === "cancel") {
            clearSession(sessionId);
            return "Cancelled.";
          }

          return "Please type confirm or cancel.";
      }
    }

    // -------------------------------------------------------
    // INTENT DETECTION
    // -------------------------------------------------------
    if (!session.intent) {
      if (text.includes("appointment")) {
        session.intent = "appointment";
        session.step = 1;
        saveSession(sessionId, session);
        return res.json({ botResponse: "Sure! What's your name?" });
      }

      if (text.includes("intern") || text.includes("volunteer")) {
        session.intent = "program";
        session.step = 1;
        saveSession(sessionId, session);
        return res.json({ botResponse: "Internship or volunteering?" });
      }

      if (text.includes("adopt")) {
        session.intent = "adoption";
        session.step = 1;
        saveSession(sessionId, session);
        return res.json({ botResponse: "Your full name?" });
      }

      if (text.includes("medical rep") || text.includes("pharma")) {
        session.intent = "medrep";
        session.step = 1;
        saveSession(sessionId, session);
        return res.json({ botResponse: "Company name?" });
      }

      return res.json({
        botResponse: `
Hello! I can help you with:

• Book Appointment  
• Internship / Volunteering  
• Adoption Enquiry  
• Medical Representative Visit  

What would you like to do?
        `,
      });
    }

    // ROUTE TO CORRECT FLOW
    switch (session.intent) {
      case "appointment":
        botResponse = await handlePatientFlow(text);
        break;

      case "program":
        botResponse = await handleProgramFlow(text);
        break;

      case "adoption":
        botResponse = await handleAdoptionFlow(text);
        break;

      case "medrep":
        botResponse = await handleMedRepFlow(text);
        break;
    }

    saveSession(sessionId, session);
    res.status(200).json({ botResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Chatbot internal error" });
  }
};
