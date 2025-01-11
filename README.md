# Sitemap Viewer [<img alt="Sitemap Viewer logo" src="public/favicon.svg" height="90" align="right" />](https://view.sitemap.style/)

[![deploy](https://github.com/fileformat/view.sitemap.style/actions/workflows/gcr-deploy.yaml/badge.svg)](https://github.com/fileformat/view.sitemap.style/actions/workflows/gcr-deploy.yaml)

This is a graphical sitemap viewer for [Sitemap.Style](https://www.sitemap.style/).

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
[![Next.js](https://www.vectorlogo.zone/logos/nextjs/nextjs-ar21.svg)](https://nextjs.com/ "React Framework")
[![Node.js](https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg)](https://nodejs.org/ "Application Server")
[![NodePing](https://www.vectorlogo.zone/logos/nodeping/nodeping-ar21.svg)](https://nodeping.com?rid=201109281250J5K3P "Uptime monitoring")
[![npm](https://www.vectorlogo.zone/logos/npmjs/npmjs-ar21.svg)](https://www.npmjs.com/ "JS Package Management")
[![react.js](https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg)](https://reactjs.org/ "UI Framework")
[![TypeScript](https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-ar21.svg)](https://www.typescriptlang.org/ "Programming Language")
[![VectorLogoZone](https://www.vectorlogo.zone/logos/vectorlogozone/vectorlogozone-ar21.svg)](https://www.vectorlogo.zone/ "Logos")

* [MUI](https://mui.com/material-ui/) - React components
* [Twemoji](https://github.com/twitter/twemoji) - favicon

## To Do

- [ ] 404 page formatting
- [ ] loading spinner
- [ ] custom xml namespace: open/closed, allopen, style (and title, etc?)
- [ ] exit url to default to root of sitemap.xml URL
- [ ] `title` to allow markdown
- [ ] `title` to have variables for `host`, `barehost`
- [ ] name: punctuation to space
- [ ] name option: title case
- [ ] flag for show debug icon in navbar: shows `messages[]`
- [ ] move ModeSwitch someplace unobtrusive
- [ ] sort option `homefirst` to be name, but "Home" at top
- [ ] demo button that loads local test sitemap.xml
- [ ] translations (and language picker)
