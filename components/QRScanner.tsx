"use client";

import { Html5QrcodeScanner } from 'html5-qrcode';
import React, { useEffect, useRef } from 'react';

interface QRScannerProps {
  fps?: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
  qrCodeSuccessCallback: (decodedText: string, decodedResult: any) => void;
  qrCodeErrorCallback?: (errorMessage: string) => void;
}

const QRScanner = (props: QRScannerProps) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const elementId = "html5qr-code-full-region";

  useEffect(() => {
    // Make sure we haven't already rendered
    if (scannerRef.current) {
        return;
    }

    // Config
    const config = {
      fps: props.fps || 10,
      qrbox: props.qrbox || 250,
      aspectRatio: props.aspectRatio || 1.0,
      disableFlip: props.disableFlip || false,
    };

    // Create Scanner
    const verbose = props.verbose === true;

    // Small timeout to ensure DOM is ready
    const timer = setTimeout(() => {
        try {
            const scanner = new Html5QrcodeScanner(elementId, config, verbose);
            scannerRef.current = scanner;
        
            scanner.render(
              props.qrCodeSuccessCallback,
              props.qrCodeErrorCallback
            );
        } catch (err) {
            console.error("Failed to init QR Scanner", err);
        }
    }, 100);

    // Cleanup
    return () => {
        clearTimeout(timer);
        if (scannerRef.current) {
            try {
                scannerRef.current.clear().catch(err => console.error("Failed to clear scanner", err));
            } catch (e) {
                // ignore
            }
            scannerRef.current = null;
        }
    };
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden rounded-xl border border-white/20 bg-black/50">
      <div id={elementId} className="w-full" />
    </div>
  );
};

export default QRScanner;
