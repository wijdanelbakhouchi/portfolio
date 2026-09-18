export const contactLimits = { name: 100, email: 254, subject: 160, message: 5000 } as const;
export type ContactField = keyof typeof contactLimits;
export type ContactData = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export function validateContact(input: unknown): { data: ContactData; errors: ContactErrors } {
  const source = input && typeof input === 'object' ? input as Record<string, unknown> : {};
  const data = {} as ContactData;
  const errors: ContactErrors = {};
  const labels = { name: 'your name', email: 'your email address', subject: 'a subject', message: 'your message' };
  for (const field of Object.keys(contactLimits) as ContactField[]) {
    data[field] = typeof source[field] === 'string' ? source[field].trim() : '';
    if (!data[field]) errors[field] = `Please enter ${labels[field]}.`;
    else if (data[field].length > contactLimits[field]) errors[field] = `Please use no more than ${contactLimits[field]} characters.`;
    else if (field !== 'message' && /[\r\n]/.test(data[field])) errors[field] = 'Please use a single line.';
  }
  if (data.email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email)) errors.email = 'Please enter a valid email address.';
  return { data, errors };
}
