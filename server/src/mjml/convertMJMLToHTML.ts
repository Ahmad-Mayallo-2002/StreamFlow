import { readFileSync } from 'fs';
import { join } from 'path';
import mjml2html from 'mjml';

const emailTemplate = readFileSync(join(__dirname, './verificationCode.mjml'), {
  encoding: 'utf-8',
});

export const getEmailTemplate = async (code: string) => {
  const template = emailTemplate.replace('{{ code }}', code);
  const result = await mjml2html(template);
  return result.html;
};
