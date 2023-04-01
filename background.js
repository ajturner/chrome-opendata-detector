const detectedUrls = new Set();

function stripQueryParameters(url) {
  const parsedUrl = new URL(url);
  return `${parsedUrl.origin}${parsedUrl.pathname}`;
}

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (
      (details.url.includes("MapServer") ||
        details.url.includes("FeatureServer")) &&
      details.url.includes("query")
    ) {
      const strippedUrl = stripQueryParameters(details.url);
      detectedUrls.add(strippedUrl);
      chrome.browserAction.setBadgeText({
        text: String(detectedUrls.size),
      });
    }
  },
  { urls: ["*://*/*"] },
  ["blocking"]
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "getDetectedUrls") {
    sendResponse(Array.from(detectedUrls));
  }
  return true;
});
