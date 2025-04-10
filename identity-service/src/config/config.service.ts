import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/* eslint-disable */
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {
    const conf = {
      'Phone Number Verification Enabled: ': this.phoneNrVerficationEnabled(),
      'Max Votes To Case: ': this.getMaxVotesToCast(),
      'Questions Verification Enabled: ': this.questionsVerficationEnabled(),
      'Number of Questions To Ask: ': this.getNumberOfQuestionsToAsk(),
      'Bycrypt Salt Rounds': this.getBycryptSaltRounds(),
      'File Upload Size MB: ': this.getFileUploadSize()
    }

    if (!this.isProduction())
      console.log(conf);

  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', false) || 3000;
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      logging: false,

      host: this.getValue('POSTGRES_HOST', false) || 'localhost',
      port: parseInt(this.getValue('POSTGRES_PORT', false) || '5432'),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DB', false) || 'idp',

      entities: [__dirname + '/../**/*.entity{.ts,.js}'],

      migrationsTableName: 'migration',

      migrations: [__dirname + '/../migration/*.{ts,js}'],

      cli: {
        migrationsDir: 'src/migration',
      },

      // ssl: this.isProduction(),
    };
  }

  public getTwilioConfig() {
    return {
      TWILIO_ACCOUNT_SID: this.getValue('TWILIO_ACCOUNT_SID'),
      TWILIO_AUTH_TOKEN: this.getValue('TWILIO_AUTH_TOKEN'),
      TWILIO_VERIFICATION_SERVICE_SID: this.getValue(
        'TWILIO_VERIFICATION_SERVICE_SID',
      ),
      TWILIO_SENDER_PHONE_NUMBER: this.getValue('TWILIO_SENDER_PHONE_NUMBER'),
    };
  }

  public defaultPassword() {
    return process.env.DEFAULT_LOGIN_PASSWORD;
  }

  public phoneNrVerficationEnabled() {
    return _phoneNrVerficationEnabled();
  }

  public getMaxVotesToCast(): number {
    return parseInt(this.getValue('MAX_VOTES_ALLOWED', false) || '2');
  }

  public questionsVerficationEnabled() {
    return _questionsVerficationEnabled();
  }

  public getNumberOfQuestionsToAsk(): number {
    return parseInt(this.getValue("NUMBER_OF_QUESTIONS_TO_ASK", false) || '2');
  }

  public getBycryptSaltRounds(): number {
    return parseInt(this.getValue("SALT_ROUNDS", false) || '10');
  }

  public getFileUploadSize(): number {
    return parseInt(this.getValue("FILE_UPLOAD_SIZE_MB", false) || '10');
  }

  public getPrivateKey(): string {
    return this.getValue("PRIVATE_KEY");
  }

  public getSignatureExpiryTimeSeconds(): number {
    const time = parseInt(this.getValue("SIGNATURE_EXPIRY_MINUTES", false)) || 15;
    return time * 60
  }

  public getSignatureExpiryTimeMinutes(): number {
    const time = parseInt(this.getValue("SIGNATURE_EXPIRY_MINUTES", false)) || 15;
    return time;
  }

  public getAdminLoginSignatureExpiryTime(): number {
    return parseInt(this.getValue("ADMIN_LOGIN_SIGNATURE_EXPIRY", false)) || 3600;
  }

  public getJWTSecret(): string {
    return this.getValue("JWT_SECRET");
  }

  public getJwtExpiryFor2FARequest(): string {
    const time = this.getValue("JWT_EXPIRY_FOR_2FA_REQUEST", false) || '300s';
    return time;
  }

  public getJwtExpiryForUser(): string {
    const time = this.getValue("JWT_EXPIRY_FOR_USER", false) || '30m';
    return time;
  }

  public getJwtExpiryForAdmin(): string {
    const time = this.getValue("JWT_EXPIRY_FOR_ADMIN", false) || '30m';
    return time;
  }

  public is2FAEnabled(): boolean {
    return _phoneNrVerficationEnabled() || _questionsVerficationEnabled()
  }

  public getContract(contractName): string {
    return this.getValue(contractName);
  }
}

function _phoneNrVerficationEnabled() {
  return Boolean(
    JSON.parse(process.env.ENABLE_PHONE_NR_VERIFICATION?.toLowerCase() || "true"),
  );
}

function _questionsVerficationEnabled() {
  return Boolean(
    JSON.parse(process.env.ENABLE_QUESTIONS_VERIFICATION.toLowerCase() || "true"),
  );
}

const requiredConfig = [
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'PRIVATE_KEY'
];

const smsConfig =
  ['TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
    'TWILIO_VERIFICATION_SERVICE_SID',
    'TWILIO_SENDER_PHONE_NUMBER'
  ]

const configService = new ConfigService(process.env).ensureValues(
  _phoneNrVerficationEnabled() ?
    requiredConfig.concat(...smsConfig) :
    requiredConfig.concat('DEFAULT_LOGIN_PASSWORD', 'JWT_SECRET'));

export { configService };