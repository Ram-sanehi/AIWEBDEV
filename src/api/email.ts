const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

export async function sendContactFormEmail(
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string
) {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "info@alphaaim.in",
        replyTo: email,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
