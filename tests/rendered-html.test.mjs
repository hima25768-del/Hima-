import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  return response;
}

test("renders the HIM BAZ home page", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>HIM BAZ \| Digital Growth &amp; Technology<\/title>/);
  assert.match(html, /نحوّل فكرتك إلى نمو رقمي حقيقي/);
  assert.match(html, /href="\/contact"/);
});

test("renders the verified contact details and consent", async () => {
  const response = await render("/contact");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /050 335 8014/);
  assert.match(html, /a\.eae2010@icloud\.com/);
  assert.match(html, /name="privacyConsent"/);
  assert.match(html, /href="\/privacy"/);
});

test("renders the privacy and terms pages", async () => {
  const privacy = await render("/privacy");
  const terms = await render("/terms");

  assert.equal(privacy.status, 200);
  assert.equal(terms.status, 200);
  assert.match(await privacy.text(), /سياسة الخصوصية/);
  assert.match(await terms.text(), /الشروط والأحكام/);
});
