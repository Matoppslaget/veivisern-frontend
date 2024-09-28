const email = 'hello@sanders.technology';
const subject = 'Feedback, UP-orakel';
const body = 'Hei!\n\nJeg har testet UP-orakel og har en tilbakemelding.\n\n';
const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export default mailtoHref;
