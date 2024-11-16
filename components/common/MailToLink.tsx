const email = 'hallo@matoppslaget.no';
const subject = 'Feedback, Matoppslaget';
const body =
  'Hei!\n\nJeg har testet Matoppslaget og har en tilbakemelding.\n\n';
const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export default mailtoHref;
