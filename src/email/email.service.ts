import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import config from 'src/config/keys';

@Injectable()
export default class EmailService {
  private nodemailerTransport: Mail;

  constructor() {
    this.nodemailerTransport = createTransport({
      host: config.emailService, // hostname
      secure: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });
  }

  public sendMail(options: Mail.Options): Promise<any> {
    return this.nodemailerTransport.sendMail(options);
  }

  public doNothing() {
    console.warn('nothing')
  }
}
