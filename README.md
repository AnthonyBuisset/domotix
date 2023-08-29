# Domotic MQTT Dashboard

Personal domotic MQTT dashboard.

## Installation

### Minimum requirements

- [RaspbianOS (64 bits)](https://www.raspberrypi.com/software/)
- [NodeJS](https://nodejs.org/en/) 18.16.0 (You can use [nvm](https://github.com/nvm-sh/nvm))
- [Yarn](https://classic.yarnpkg.com/en/docs/install) 1.22.0
- [InfluxDB 2](https://docs.influxdata.com/influxdb/v2.7/install/?t=Raspberry+Pi)

### Install the application locally

First, install all dependencies:

```bash
yarn
```

Then, create the configuration file by copying the template:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration

Finally, start the webserver:

```bash
yarn dev
```

## Development

### Coding conventions

The coding conventions and style are enforced by the [tslint](https://palantir.github.io/tslint/) linter and the [prettier](https://prettier.io/) formatter. The configuration can be found in the [tslint.json](./tslint.json) file and the [.prettierrc](./.prettierrc) file. Your IDE should be configured to use those configurations.
To check linting errors using the command line, run `yarn lint`.

## Architectures

_TODO_
