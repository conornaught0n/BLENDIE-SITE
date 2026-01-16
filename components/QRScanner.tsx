"use client";

import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner({
  fps,
  qrbox,
  disableFlip,
  qrCodeSuccessCallback,
}: {
  fps: number;
  qrbox: number;
  disableFlip: boolean;
  qrCodeSuccessCallback: (decodedText: string) => void;
}) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    // Only initialize if not already initialized
    if (!scannerRef.current) {
        scannerRef.current = new Html5QrcodeScanner(
            "reader",
            { fps, qrbox, disableFlip },
            false
        );
        
        scannerRef.current.render(
            (decodedText) => {
                qrCodeSuccessCallback(decodedText);
                // Auto-clear after scan to prevent multi-trigger
                scannerRef.current?.clear().catch(console.error);
            },
            (errorMessage) => {
                // Ignore errors (scanning in progress)
            }
        );
    }

    return () => {
        // Cleanup on unmount
        if (scannerRef.current) {
            scannerRef.current.clear().catch(console.error);
            scannerRef.current = null;
        }
    };
  }, []); // Empty dependency array to run once

  return <div id="reader" className="w-full h-full bg-black/5" />;
}
