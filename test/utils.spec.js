const {
  statsLinks,
  statsValidateLinks,
  validateLinks,
} = require("../utils.js");

require("jest-fetch-mock").enableMocks();

describe("statsValidateLinks", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("debe retornar stats con formato correcto", () => {
    const links = [
      { href: "https://es.wikipedia.org/wiki/Markdown", ok: "ok" },
      { href: "https://nodejs.org/", ok: "ok" },
      {
        href: "https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg",
        ok: "ok",
      },
      { href: "https://wwww.google.com", ok: "fail" },
      { href: "https:www.malformada.com", ok: "fail" },
      { href: "https:www.malformada.com", ok: "fail" },
      { href: "https://wwww.youtube.com", ok: "fail" },
      { href: "https:wwww.analiaklein.com", ok: "fail" },
    ];

    const result = statsLinks(links);
    expect(result.Total).toBe(8);
    expect(result.Unique).toBe(7);
  });

  it("deberia retornar stats con formato correcto y validaciones", () => {
    const links = [
      { href: "https://es.wikipedia.org/wiki/Markdown", ok: "ok" },
      { href: "https://nodejs.org/", ok: "ok" },
      {
        href: "https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg",
        ok: "ok",
      },
      { href: "https://wwww.google.com", ok: "fail" },
      { href: "https:www.malformada.com", ok: "fail" },
      { href: "https:www.malformada.com", ok: "fail" },
      { href: "https://wwww.youtube.com", ok: "fail" },
      { href: "https:wwww.analiaklein.com", ok: "fail" },
    ];

    const result = statsValidateLinks(links);
    expect(result.Total).toBe(8);
    expect(result.Unique).toBe(7);
    expect(result.Broken).toBe(5);
  });

  it("debe fallar la validacion del link", () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    const link = { url: "https://noexiste.link" };
    validateLinks(link).then((result) => {
      expect(result).toEqual({
        url: "https://noexiste.link",
        ok: "fail",
        status: "Error",
      });
    });
  });

  it("debe pasar la validacion del link", () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 200 }));
    const link = { url: "https://existe.link" };
    validateLinks(link).then((result) => {
      expect(result).toEqual({
        url: "https://existe.link",
        ok: "ok",
        status: 200,
      });
    });
  });
});
