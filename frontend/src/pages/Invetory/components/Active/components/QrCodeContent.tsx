/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import QRCode from 'qrcode.react';
import { useLocation } from 'react-router-dom';

interface QrCodeContentProps {
  name: string;
}

export function QrCodeContent({name}: QrCodeContentProps) {
  const [qrData, setQRData] = useState(''); 
  const location = useLocation();

  const generateQRCode = () => {
    const dataToEncode = `http://localhost:5173${location.pathname}`;
    console.log(dataToEncode)
    setQRData(dataToEncode);
  };

  const downloadQRCode = () => {
    const qrCodeCanvas: any = document.getElementById('qrcode');
    const qrCodeURL = qrCodeCanvas.toDataURL('image/png');

    const downloadLink = document.createElement('a');
    downloadLink.href = qrCodeURL;
    downloadLink.download = `${name}.png`;
    downloadLink.click();
  };

  return (
    <div className='flex flex-col gap-3 items-center justify-center'>
      <button onClick={generateQRCode} className="font-bold text-zinc-100 bg-green-500 px-2 py-1 rounded-md">Gerar QR Code</button>
      {qrData && (
      <>
          <QRCode
            id="qrcode"
            value={qrData}
            size={128}
            level={'H'}
          />
          <button onClick={downloadQRCode} className='font-bold text-zinc-100 bg-green-500 px-2 py-1 rounded-md mb-10'>Download </button>
      </>
      )}
    </div>
  );
}
