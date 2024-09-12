// components/BarcodeScanner.js
import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga'; // Import QuaggaJS

const BarcodeScanner = ({ onDetected }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: scannerRef.current,
        constraints: {
          facingMode: 'environment', // Rear camera for mobile devices
        },
      },
      decoder: {
        readers: ['code_128_reader', 'ean_reader', 'upc_reader'], // Supported barcode types
      },
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((data) => {
      onDetected(data.codeResult.code);
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return <div ref={scannerRef} style={{ width: '100%', height: '400px' }} />;
};

export default BarcodeScanner;
