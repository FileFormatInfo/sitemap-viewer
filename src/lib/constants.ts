
const isDevMode = process.env.NODE_ENV === 'development';

const DEMO_URL = isDevMode
    ? "http://localhost:4000/demo.xml"
    : "https://sitemap-viewer.fileformat.info/demo.xml";

export const constants = {
    DEFAULT_HOME: "Home Page",
    DEFAULT_SITEMAP_URL: "https://your-website-here/sitemap.xml",
    DEFAULT_TITLE: "Site Map",
    DEMO_URL,
};