import { Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { USER_MODEL } from 'constants/constants';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { User } from 'src/models/user.model';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(USER_MODEL)
    private user: typeof User,
  ) {
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
    const CreateUser = await this.user.create({
      emial: profile.email,
      password: profile.password,
    });
    done(null, user);
  }
}
