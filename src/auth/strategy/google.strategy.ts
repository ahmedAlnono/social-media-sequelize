import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '946583904276-l9spf0t8kcl5mmv8c94uv72akbo3vma7.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstname: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    console.log(profile);
    done(null, user);
  }
}
