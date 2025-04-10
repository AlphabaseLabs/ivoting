import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { throwException } from 'src/utils/utils.service';
import { Twilio } from 'twilio';

/* eslint-disable */
const phoneUtil =
  require('google-libphonenumber').PhoneNumberUtil.getInstance();

import { configService } from '../config/config.service';
import { SmsApiErrors } from './dto/errors-sms.dto';

@Injectable()
export class SmsService {
  private serviceSid: string;
  private twilioClient: Twilio;

  constructor() {

    if (configService.phoneNrVerficationEnabled()) {
      const twilioConfig = configService.getTwilioConfig();
      const accountSid = twilioConfig.TWILIO_ACCOUNT_SID;
      const authToken = twilioConfig.TWILIO_AUTH_TOKEN;

      this.twilioClient = new Twilio(accountSid, authToken);
      this.serviceSid = twilioConfig.TWILIO_VERIFICATION_SERVICE_SID;
    }
  }

  public async initiatePhoneNumberVerification(
    phoneNumber: string,
  ): Promise<void> {
    validatePhoneNumber(phoneNumber)

    await this.twilioClient.verify
      .services(this.serviceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms' })
      .then((result) => {
        return;
      })
      .catch((error) => {
        return handleTwilioErrors(error);
      });
  }

  public async confirmPhoneNumber(
    phoneNumber: string,
    verificationCode: string,
  ): Promise<void> {
    validatePhoneNumber(phoneNumber)

    await this.twilioClient.verify
      .services(this.serviceSid)
      .verificationChecks.create({ to: phoneNumber, code: verificationCode })
      .then((result) => {
        if (!result.valid || result.status !== 'approved')
          throwException(SmsApiErrors[HttpStatus.NOT_FOUND].INVALID_VERIFICAION_CODE, HttpStatus.UNAUTHORIZED);
        else
          return;
      })
      .catch((error) => {
        return handleTwilioErrors(error);
      });
  }
}

function validatePhoneNumber(phoneNumber: string): boolean {
  const phoneUtil_phone_nr = phoneUtil.parse(phoneNumber);
  const region = phoneUtil.getRegionCodeForNumber(phoneUtil_phone_nr);
  if (phoneUtil.isValidNumberForRegion(phoneUtil_phone_nr, region))
    return true;
  else
    throwException(SmsApiErrors[HttpStatus.BAD_REQUEST].INVALID_PHONE_NR, HttpStatus.BAD_REQUEST);

}

function handleTwilioErrors(err: any) {
  Logger.error(err);
  if (err.status == HttpStatus.UNAUTHORIZED)
    throwException(SmsApiErrors[HttpStatus.UNAUTHORIZED].AUTH_FAILED, HttpStatus.UNAUTHORIZED);
  else if (err.status == HttpStatus.NOT_FOUND)
    throwException(SmsApiErrors[HttpStatus.NOT_FOUND].INVALID_VERIFICAION_CODE, HttpStatus.NOT_FOUND);
  else
    throwException(SmsApiErrors[HttpStatus.INTERNAL_SERVER_ERROR].VERIFICAION_IS_NOT_WORKING, HttpStatus.INTERNAL_SERVER_ERROR);
}