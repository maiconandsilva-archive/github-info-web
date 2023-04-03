
const { request: octoRequest } = require('@octokit/request');
const { appConf, requestConf } = require('@/config');

const requestGithubAPI = octoRequest.defaults(requestConf);

const parseLinkHeader = (header) => {
    const links = {};
    if (header) {
      const parts = header.split(",");
      parts.forEach((part) => {
        console.log("OK");
        const link = part.split(";");
        const url = link[0].replace(/[<>]/g, "").trim();
        const rel = link[1].replace(/rel=/gi, "").replace(/[\"\' ]/g, "");
        const queryParams = url.includes("?") ? url.split("?")[1] : "";
        const pageParam = queryParams.split("&").find((param) => {
            return param.includes("page=") || param.includes("since=");
        });
        const page = pageParam ? parseInt(pageParam.split("=")[1]) : null;
        links[rel] = { url, page };
      });
    }
    return links;
  }

module.exports = {
    requestGithubAPI,
    parseLinkHeader,
};