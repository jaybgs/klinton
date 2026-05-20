"use client";

import { FormEvent, useState } from "react";

type ContactActionsProps = {
  email: string;
  instagramHandle: string;
  phone: string;
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true">
      <circle cx="256" cy="255.833" r="80" />
      <path d="M177.805 176.887c21.154-21.154 49.28-32.93 79.195-32.93s58.04 11.838 79.195 32.992c13.422 13.42 23.01 29.55 28.232 47.55H448.5v-113c0-26.51-20.49-47-47-47h-288c-26.51 0-49 20.49-49 47v113h85.072c5.222-18 14.81-34.19 28.233-47.614zM416.5 147.7c0 7.07-5.73 12.8-12.8 12.8h-38.4c-7.07 0-12.8-5.73-12.8-12.8v-38.4c0-7.07 5.73-12.8 12.8-12.8h38.4c7.07 0 12.8 5.73 12.8 12.8v38.4zm-80.305 187.58c-21.154 21.153-49.28 32.678-79.195 32.678s-58.04-11.462-79.195-32.616c-21.115-21.115-32.76-49.842-32.803-78.842H64.5v143c0 26.51 22.49 49 49 49h288c26.51 0 47-22.49 47-49v-143h-79.502c-.043 29-11.687 57.664-32.803 78.78z" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16.02 3.2A12.75 12.75 0 0 0 5.1 22.52L3.55 28.8l6.43-1.5A12.77 12.77 0 1 0 16.02 3.2Zm0 22.9a10.04 10.04 0 0 1-5.12-1.4l-.37-.22-3.82.9.92-3.72-.24-.38a10.06 10.06 0 1 1 8.63 4.82Zm5.51-7.52c-.3-.15-1.79-.88-2.07-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.67-2.09-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.68-1.64-.93-2.24-.25-.59-.5-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.52s1.08 2.92 1.23 3.12c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.79-.73 2.04-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true">
      <path d="M64 112h384c26.5 0 48 21.5 48 48v192c0 26.5-21.5 48-48 48H64c-26.5 0-48-21.5-48-48V160c0-26.5 21.5-48 48-48Zm384 56.8-181.2 132a18 18 0 0 1-21.2 0L64 168.8V352h384V168.8ZM91.6 160 256 279.6 420.4 160H91.6Z" />
    </svg>
  );
}

export function ContactIconLinks({ email, instagramHandle, phone }: ContactActionsProps) {
  const normalizedHandle = instagramHandle.replace("@", "");
  const normalizedPhone = phone.replace(/\D/g, "");
  const whatsappText = encodeURIComponent(
    "Hi Nadon, I would love to make an enquiry about photography coverage."
  );
  const emailSubject = encodeURIComponent("Photography enquiry");
  const emailBody = encodeURIComponent(
    [
      "Hi Nadon,",
      "",
      "I would like to enquire about photography coverage.",
      "",
      "Name:",
      "Mobile:",
      "Event type:",
      "Event date:",
      "Event location:",
      "Referrer:",
      "",
      "A little more about the day:",
      ""
    ].join("\n")
  );

  return (
    <div className="nadon-contact-options" aria-label="Contact options">
      <a
        href={`https://ig.me/m/${normalizedHandle}`}
        target="_blank"
        rel="noreferrer"
        aria-label={`Message ${instagramHandle} on Instagram`}
      >
        <InstagramIcon />
      </a>
      <a
        href={`https://wa.me/${normalizedPhone}?text=${whatsappText}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Message Nadon on WhatsApp"
      >
        <WhatsappIcon />
      </a>
      <a href={`mailto:${email}?subject=${emailSubject}&body=${emailBody}`} aria-label="Email Nadon">
        <MailIcon />
      </a>
    </div>
  );
}

export function ContactActions({ email }: Pick<ContactActionsProps, "email">) {
  const [message, setMessage] = useState("");

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const lines = [
      `First Name: ${form.get("First Name") || ""}`,
      `Last Name: ${form.get("Last Name") || ""}`,
      `Email: ${form.get("Email") || ""}`,
      `Mobile: ${form.get("Mobile") || ""}`,
      `Event Type: ${form.get("Event Type") || ""}`,
      `Event date: ${form.get("Event date") || ""}`,
      `Event Location: ${form.get("Event Location") || ""}`,
      `Referrer: ${form.get("Referrer") || ""}`,
      "",
      `I'd love to hear a little more about your day: ${form.get("Message") || ""}`
    ];
    const subject = encodeURIComponent("Photography enquiry");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="nadon-contact-actions">
      <form className="nadon-contact-form" onSubmit={submitForm}>
        <div className="nadon-contact-form-row nadon-contact-form-row-two">
          <label>
            <span>First Name <b>*</b></span>
            <input name="First Name" required type="text" />
          </label>
          <label>
            <span>Last Name <b>*</b></span>
            <input name="Last Name" required type="text" />
          </label>
        </div>
        <label>
          <span>Email <b>*</b></span>
          <input name="Email" required type="email" />
        </label>
        <label>
          <span>Mobile <b>*</b></span>
          <input name="Mobile" required type="text" />
        </label>
        <label>
          <span>Event Type <b>*</b></span>
          <select name="Event Type" required defaultValue="">
            <option value="" disabled />
            <option value="PREWEDDING SESSION">PREWEDDING SESSION</option>
            <option value="FAMILY SESSION">FAMILY SESSION</option>
            <option value="WEDDING PHOTOGRAPHY">WEDDING PHOTOGRAPHY</option>
            <option value="COUPLE'S LIFESTYLE">COUPLE'S LIFESTYLE</option>
            <option value="BIRTHDAYS">BIRTHDAYS</option>
          </select>
        </label>
        <label>
          <span>Event date <b>*</b></span>
          <input name="Event date" required type="date" />
        </label>
        <label>
          <span>Event Location <b>*</b></span>
          <input name="Event Location" required type="text" />
        </label>
        <label>
          <span>How did you find out about us?</span>
          <select name="HOW DID YOU FIND OUT ABOUT US?" defaultValue="">
            <option value="" disabled />
            <option value="REFERRAL">REFERRAL</option>
            <option value="INSTAGRAM">INSTAGRAM</option>
            <option value="FACEBOOK">FACEBOOK</option>
            <option value="GOOGLE SEARCH">GOOGLE SEARCH</option>
            <option value="BILLBOARD">BILLBOARD</option>
            <option value="OTHERS">OTHERS</option>
          </select>
        </label>
        <label className="nadon-contact-message">
          <span>I&apos;d love to hear a little more about your day... <b>*</b></span>
          <textarea
            maxLength={5000}
            name="Message"
            onChange={(event) => setMessage(event.target.value)}
            required
          />
          <em>{message.length}/5000</em>
        </label>
        <button className="nadon-contact-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
