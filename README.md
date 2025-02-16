# Sitemap Viewer [<img alt="Sitemap Viewer logo" src="public/favicon.svg" height="90" align="right" />](https://sitemap-viewer.fileformat.info/)

[![NodePing status](https://img.shields.io/nodeping/status/9rpjcz1i-8nzx-442d-8yzk-tm7l5zfhbllw?label=Current%20status)](https://nodeping.com/reports/checks/9rpjcz1i-8nzx-442d-8yzk-tm7l5zfhbllw)
[![NodePing uptime](https://img.shields.io/nodeping/uptime/9rpjcz1i-8nzx-442d-8yzk-tm7l5zfhbllw?label=30-day%20uptime)](https://nodeping.com/reports/uptime/9rpjcz1i-8nzx-442d-8yzk-tm7l5zfhbllw)
[![deploy](https://github.com/FileFormatInfo/sitemap-viewer/actions/workflows/gcr-deploy.yaml/badge.svg)](https://github.com/FileFormatInfo/sitemap-viewer/actions/workflows/gcr-deploy.yaml)

This is a graphical viewer for `sitemap.xml` files.  Try it at
[sitemap-viewer.fileformat.info](https://sitemap-viewer.fileformat.info/).

See how to integrate it into your `sitemap.xml` file so it displays automatically at
[Sitemap.Style](https://www.sitemap.style/)!

## Running locally

```
./run.sh
```

## License

[GNU Affero General Public License v3.0 or later](LICENSE.txt)

## Credits

[![Google CloudRun](https://www.vectorlogo.zone/logos/google_cloud_run/google_cloud_run-ar21.svg)](https://cloud.google.com/run/ "Hosting")
[![Docker](https://www.vectorlogo.zone/logos/docker/docker-ar21.svg)](https://www.docker.com/ "Deployment")
[![ESLint](https://www.vectorlogo.zone/logos/eslint/eslint-ar21.svg)](https://eslint.org/ "Linting")
[![Git](https://www.vectorlogo.zone/logos/git-scm/git-scm-ar21.svg)](https://git-scm.com/ "Version control")
[![Github](https://www.vectorlogo.zone/logos/github/github-ar21.svg)](https://github.com/ "Code hosting")
[![MUI](https://www.vectorlogo.zone/logos/mui/mui-ar21.svg)](https://mui.com/material-ui/ "React components")
[![next-intl](https://www.vectorlogo.zone/logos/next-intldev/next-intldev-ar21.svg)](https://next-intl.dev/ "i18n")
[![Next.js](https://www.vectorlogo.zone/logos/nextjs/nextjs-ar21.svg)](https://nextjs.com/ "React Framework")
[![Node.js](https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg)](https://nodejs.org/ "Application Server")
[![NodePing](https://www.vectorlogo.zone/logos/nodeping/nodeping-ar21.svg)](https://nodeping.com?rid=201109281250J5K3P "Uptime monitoring")
[![npm](https://www.vectorlogo.zone/logos/npmjs/npmjs-ar21.svg)](https://www.npmjs.com/ "JS Package Management")
[![react.js](https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg)](https://reactjs.org/ "UI Framework")
[![Twitter](https://www.vectorlogo.zone/logos/twitter/twitter-ar21.svg)](https://github.com/twitter/twemoji "favicon")
[![TypeScript](https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-ar21.svg)](https://www.typescriptlang.org/ "Programming Language")
[![VectorLogoZone](https://www.vectorlogo.zone/logos/vectorlogozone/vectorlogozone-ar21.svg)](https://www.vectorlogo.zone/ "Logos")

## To Do

- [ ] structured logging
- [ ] custom xml namespace: open/closed, allopen, style, title
- [ ] label transforms: do not change if custom label
- [ ] sort option `homefirst` to be name, but "Home" at top
- [ ] more demo options (from real sites)
- [ ] "report an issue" in footer of debug dialog (link to GH issues)
- [ ] test/cleanup error pages
- [ ] use favicon (or custom icon) in navbar (instead of MdMap)
- [ ] better 404 page formatting
- [ ] customize initial light/dark mode (or maybe not?)
- [ ] customize initial language (or maybe not?)
