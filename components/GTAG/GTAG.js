"use client"
import { useEffect } from "react";

const TrackingScripts = () => {
  useEffect(() => {
    // Google Analytics Script
    const googleAnalyticsScript = document.createElement("script");
    googleAnalyticsScript.src =
      "https://www.googletagmanager.com/gtag/js?id=G-RH2R51LETQ";
    googleAnalyticsScript.async = true;
    document.head.appendChild(googleAnalyticsScript);

    googleAnalyticsScript.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-RH2R51LETQ");
    };

    // Facebook Pixel Script
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );

    fbq("init", "1440926753428710");
    fbq("track", "PageView");
  }, []);

  return null;
};

export default TrackingScripts;
