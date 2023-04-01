document.addEventListener("DOMContentLoaded", () => {
    chrome.runtime.sendMessage(
      { type: "getDetectedUrls" },
      (detectedUrls) => {
        const urlList = document.getElementById("urlList");
        detectedUrls.forEach((url) => {
          const listItem = document.createElement("li");
          const link = document.createElement("a");
          link.href = url;
          link.target = "_blank";
          link.textContent = url;
          listItem.appendChild(link);
          urlList.appendChild(listItem);
        });
      }
    );
  });
  