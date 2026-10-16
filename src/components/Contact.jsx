import ContactDetails from './ContactDetails.jsx';
import ContactForm from './ContactForm.jsx';

export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-aside">
          <h2 id="contact-title">Start a conversation</h2>
          <p>Tell us briefly about the opportunity: location, technology, stage of development and the role you envisage for Everis.</p>
          <ContactDetails />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
