# ScaredyKitten

This project is a fork from [rss-reader](https://github.com/kevinfiol/rss-reader). The design is heavily inspired by [fraidycat](https://fraidyc.at/).

## How to build

Node `>=18.x` required.

```shell
npm install
npm run build
```

## How to host on Github Pages

1. Fork this repo!
2. Enable [Github Pages](https://pages.github.com/) for your repo (either as a project site, or user site)
3. Configure `.github/workflows/build.yml` to your liking
    * Uncomment the `schedule` section to enable scheduled builds
