// --- ENSURE DEFAULTS ---
if (!localStorage.getItem("panicKey")) localStorage.setItem("panicKey", "p");
if (!localStorage.getItem("panicUrl")) localStorage.setItem("panicUrl", "https://google.com");

// --- SETTINGS PAGE LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
  const panicKeyInput = document.getElementById("panicKey");
  const panicUrlInput = document.getElementById("panicUrl");
  const saveBtn = document.getElementById("saveSettings");
  const resetBtn = document.getElementById("resetSettings");
  const testBtn = document.getElementById("testPanic");

  if (panicKeyInput && panicUrlInput) {
    panicKeyInput.value = localStorage.getItem("panicKey");
    panicUrlInput.value = localStorage.getItem("panicUrl");

    saveBtn?.addEventListener("click", () => {
      localStorage.setItem("panicKey", panicKeyInput.value || "p");
      localStorage.setItem("panicUrl", panicUrlInput.value || "https://google.com");
      alert("✅ Settings saved!");
    });

    resetBtn?.addEventListener("click", () => {
      localStorage.setItem("panicKey", "p");
      localStorage.setItem("panicUrl", "https://google.com");
      panicKeyInput.value = "p";
      panicUrlInput.value = "https://google.com";
      alert("🔄 Settings reset!");
    });

    testBtn?.addEventListener("click", () => {
      const testUrl = panicUrlInput.value || "https://google.com";
      const newTab = window.open("about:blank", "_blank");
      newTab.document.write(`<iframe src="${testUrl}" style="border:none;width:100%;height:100%"></iframe>`);
    });
  }

  // --- IFRAME SUPPORT ---
  const iframes = document.querySelectorAll("iframe");
  iframes.forEach((iframe) => {
    iframe.addEventListener("load", () => {
      const panicKey = (localStorage.getItem("panicKey") || "p").toLowerCase();
      const panicUrl = localStorage.getItem("panicUrl") || "https://google.com";

      try {
        // Inject panic key listener inside iframe if same-origin
        iframe.contentWindow.document.addEventListener("keydown", (e) => {
          if (e.key.toLowerCase() === panicKey) {
            window.location.href = panicUrl;
          }
        });
      } catch (err) {
        // Cross-origin iframes cannot be accessed; fallback works on parent
        console.warn("Cannot inject panic key inside iframe (cross-origin). Panic key works on parent page.");
      }
    });
  });
});

// --- GLOBAL PANIC KEY LISTENER ---
(function() {
  const panicKey = (localStorage.getItem("panicKey") || "p").toLowerCase();
  const panicUrl = localStorage.getItem("panicUrl") || "https://google.com";

  // Parent page listener
  window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === panicKey) {
      window.location.href = panicUrl;
    }
  });

  // Attempt to focus so key works immediately
  window.focus();
})();
