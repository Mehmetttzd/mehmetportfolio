from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from fastapi.responses import JSONResponse
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Router setup
router = APIRouter(prefix="/contact", tags=["Contact"])

# Pydantic model for validation
class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str

# POST route
@router.post("/")
async def send_message(contact: ContactMessage):
    try:
        # Config from .env
        smtp_host = os.getenv("SMTP_HOST")
        smtp_port = int(os.getenv("SMTP_PORT", 587))
        smtp_user = os.getenv("SMTP_USER")
        smtp_pass = os.getenv("SMTP_PASS")
        email_from = os.getenv("EMAIL_FROM")
        email_to = os.getenv("EMAIL_TO")

        # Log to console (still useful for debugging)
        print("📩 New Contact Message Received:")
        print(f"Name: {contact.name}")
        print(f"Email: {contact.email}")
        print(f"Message: {contact.message}")

        # Build email
        msg = MIMEMultipart()
        msg["From"] = email_from
        msg["To"] = email_to
        msg["Subject"] = f"📩 New portfolio message from {contact.name}"

        body = f"""
        You have received a new message from your portfolio website:

        Name: {contact.name}
        Email: {contact.email}

        Message:
        {contact.message}
        """
        msg.attach(MIMEText(body, "plain"))

        # Send email via Gmail SMTP
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(email_from, email_to, msg.as_string())

        return JSONResponse(
            content={"success": True, "message": "Message sent to Gmail! 🚀"},
            status_code=200,
        )

    except Exception as e:
        print("❌ Error sending email:", e)
        raise HTTPException(status_code=500, detail="Failed to send message")
