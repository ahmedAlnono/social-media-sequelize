<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# Models

## User Model

The <span style="color:#008080">User</span> model represents a user in the system.

### Properties

- <span style="color:#008080">name</span> (`string`): The name of the user.
- <span style="color:#008080">email</span> (`string`): The email address of the user. It must be unique and in a valid email format.
- <span style="color:#008080">hash</span> (`string`): The hashed password of the user.

### Associations

- <span style="color:#008080">posts</span> (`hasMany`): A user can have multiple posts.

---

## Post Model

The <span style="color:#800080">Post</span> model represents a post in the system.

### Properties

- <span style="color:#800080">title</span> (`string`): The title of the post.
- <span style="color:#800080">description</span> (`string`): The description of the post.
- <span style="color:#800080">watches</span> (`number`): The number of watches/views of the post.
- <span style="color:#800080">edited</span> (`boolean`): Indicates whether the post has been edited.
- <span style="color:#800080">photos</span> (`string`): The URL or path to the post's photos.

### Associations

- <span style="color:#800080">user</span> (`belongsTo`): The user who created the post.
- <span style="color:#800080">comments</span> (`hasMany`): The comments associated with the post.

---

## Comment Model

The <span style="color:#0000FF">Comment</span> model represents a comment on a post.

### Properties

- <span style="color:#0000FF">title</span> (`string`): The title of the comment.
- <span style="color:#0000FF">description</span> (`string`): The description of the comment.
- <span style="color:#0000FF">photos</span> (`string`): The URL or path to the comment's photos.
- <span style="color:#0000FF">hasRebly</span> (`boolean`): Indicates whether the comment has a reply.
- <span style="color:#0000FF">views</span> (`number`): The number of views of the comment.

### Associations

- <span style="color:#0000FF">post</span> (`belongsTo`): The post to which the comment belongs.
- <span style="color:#0000FF">user</span> (`belongsTo`): The user who posted the comment.
- <span style="color:#0000FF">reblys</span> (`hasMany`): The replies to the comment.

---

## Scopes

The models have two predefined scopes: <span style="color:#008000">deleted</span> and <span style="color:#008000">active</span>.

- <span style="color:#008000">deleted</span>: Returns records where the `deletedAt` field is not null.
- <span style="color:#008000">active</span>: Returns records where the `deletedAt` field is null.

These scopes can be used to filter the records based on their deletion status.

---

## Additional Notes

- The models use the `sequelize-typescript` library for Sequelize integration.
- The tables associated with the models have the following attributes:
  - `paranoid: true`: Enables soft deletion, where records are not physically deleted but marked as deleted using the `deletedAt` field.
  - `underscored: true`: Uses snake_case for table and column names in the database.

