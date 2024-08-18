"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric);
    switch (metric.name) {
      case "TTFB": {
        // Time to First Byte
        console.log(`TTFB time: ${metric.value}`);
        // 处理 TTFB 结果
        break;
      }
      case "FCP": {
        // First Contentful Paint
        console.log(`FCP time: ${metric.value}`);
        // 处理 FCP 结果
        break;
      }
      case "LCP": {
        // Largest Contentful Paint
        console.log(`LCP time: ${metric.value}`);
        // 处理 LCP 结果
        break;
      }
      case "FID": {
        // First Input Delay
        console.log(`FID time: ${metric.value}`);
        // 处理 FID 结果
        break;
      }
      case "CLS": {
        // Cumulative Layout Shift
        console.log(`CLS time: ${metric.value}`);
        // 处理 CLS 结果
        break;
      }
      // ...
    }
  });
  return null;
}
