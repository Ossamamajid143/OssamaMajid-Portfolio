import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

// Load EmailJS configuration from environment variables
const EJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EJS_PUB_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
const EJS_CONTACT = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID as string;
const EJS_REPLY = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID as string;

export interface ContactFormState {
  name: string;
  email: string;
  message: string;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setMessage: (message: string) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  resetForm: () => void;
}

export function useContactForm(): ContactFormState {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setIsError(true);
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setIsError(false);
    setErrorMessage('');

    const templateParams = {
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      subject: 'Portfolio Inquiry',
      reply_to: trimmedEmail,
    };

    try {
      // 1. Send inquiry notification email to site owner
      await emailjs.send(EJS_SERVICE, EJS_CONTACT, templateParams, EJS_PUB_KEY);

      // 2. Send automated confirmation reply to the visitor
      await emailjs.send(EJS_SERVICE, EJS_REPLY, templateParams, EJS_PUB_KEY);

      setIsSuccess(true);
      resetForm();

      setTimeout(() => {
        setIsSuccess(false);
      }, 6000);
    } catch (err: any) {
      console.error('EmailJS Transmission Failed:', err);
      setIsError(true);
      setErrorMessage(
        err?.text || 'Failed to transmit message. Please try again or email directly at ossamamajid143@gmail.com'
      );
      setTimeout(() => {
        setIsError(false);
      }, 7000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    email,
    message,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage,
    setName,
    setEmail,
    setMessage,
    handleSubmit,
    resetForm,
  };
}
