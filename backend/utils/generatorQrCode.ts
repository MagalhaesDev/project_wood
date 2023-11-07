import QRCode from 'qrcode';

export async function generatorQrCode(id: String, title: String) {
  const url = `http://localhost:5173/actives/${id}`; // Substitua com o URL do seu site
  const qrCodePath = `${title}.png`; // Nome do arquivo de saída

  await QRCode.toFile(qrCodePath, url);
}