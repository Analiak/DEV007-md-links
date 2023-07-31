// funcion stats
const statsLinks = (links) => {
  return {
    Total: links.length,
    Unique: new Set(links.map((link) => link.href)).size,
  };
};

// funcion validate
const validateLinks = (link) => {
  return fetch(link.url)
    .then((response) => {
      if (response.status >= 200 && response.status < 400) {
        link.status = response.status;
        link.ok = "ok";
        return link;
      } else {
        link.status = response.status;
        link.ok = "fail";
        return link;
      }
    })
    .catch((error) => {
      link.status = "Error";
      link.ok = "fail";
      return link;
    });
};

// funcion validate y stats
const statsValidateLinks = (links) => {
  const brokenLinks = links.filter((link) => link.ok !== "ok").length;
  return {
    Total: links.length,
    Unique: new Set(links.map((link) => link.href)).size,
    Broken: brokenLinks,
  };
};

module.exports = { statsLinks, validateLinks, statsValidateLinks };
