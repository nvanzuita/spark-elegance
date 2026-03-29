import { useState } from "react";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import { motion } from "framer-motion";
import { Download, CheckCircle, Loader2 } from "lucide-react";

interface CertificateProps {
  nomeAluno: string;
  cursoNome: string;          // ex: "Masterclass Lash Design"
  dataConclusao?: string;     // opcional, usa data atual se não passar
  certificadoId?: string;     // pra QR code de verificação
  onGerado?: () => void;
}

export default function CertificateGenerator({
  nomeAluno,
  cursoNome,
  dataConclusao,
  certificadoId = "BRUNA-BEAUTY-" + Date.now().toString(36).slice(-6),
  onGerado,
}: CertificateProps) {
  const [gerando, setGerando] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const gerarCertificado = async () => {
    setGerando(true);

    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // Fundo preto luxury
      doc.setFillColor(26, 22, 18); // #1A1612
      doc.rect(0, 0, 297, 210, "F");

      // Borda gold
      doc.setDrawColor(212, 175, 55); // gold
      doc.setLineWidth(1.5);
      doc.rect(10, 10, 277, 190);

      // Título principal
      doc.setFont("helvetica", "bold");
      doc.setTextColor(212, 175, 55);
      doc.setFontSize(42);
      doc.text("Certificado de Conclusão", 148.5, 50, { align: "center" });

      // Subtítulo
      doc.setFontSize(24);
      doc.setTextColor(255, 255, 255);
      doc.text(cursoNome.toUpperCase(), 148.5, 75, { align: "center" });

      // Texto principal
      doc.setFontSize(18);
      doc.setTextColor(220, 220, 220);
      doc.text("É concedido a", 148.5, 105, { align: "center" });

      // Nome da aluna (grande e em gold)
      doc.setFontSize(36);
      doc.setTextColor(212, 175, 55);
      doc.text(nomeAluno.toUpperCase(), 148.5, 130, { align: "center" });

      // Data
      const dataFinal = dataConclusao || new Date().toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      doc.setFontSize(16);
      doc.setTextColor(180, 180, 180);
      doc.text(`Emitido em ${dataFinal}`, 148.5, 155, { align: "center" });

      // Assinatura
      doc.setFontSize(14);
      doc.setTextColor(212, 175, 55);
      doc.text("Bruna Beauty", 220, 180);
      doc.setLineWidth(0.5);
      doc.line(180, 175, 260, 175);

      // QR Code de verificação (opcional)
      const qrDataUrl = await QRCode.toDataURL(
        `https://brunabeauty.eu/verificar?cert=${certificadoId}`,
        { margin: 1, width: 80 }
      );
      doc.addImage(qrDataUrl, "PNG", 20, 160, 30, 30);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text("Verifique autenticidade", 35, 195, { align: "center" });

      // Salva e gera URL pra preview/download
      const pdfBlob = doc.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);

      if (onGerado) onGerado();
    } catch (err) {
      console.error("Erro ao gerar certificado:", err);
      alert("Erro ao gerar o certificado. Tente novamente.");
    } finally {
      setGerando(false);
    }
  };

  return (
    <div className="text-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={gerarCertificado}
        disabled={gerando}
        className="inline-flex items-center gap-3 bg-gold text-black px-10 py-5 font-bold uppercase tracking-[0.3em] hover:bg-white transition-all shadow-2xl disabled:opacity-50"
      >
        {gerando ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Gerando Certificado...
          </>
        ) : (
          <>
            <CheckCircle size={20} />
            Baixar Certificado
          </>
        )}
      </motion.button>

      {pdfUrl && (
        <div className="mt-6">
          <a
            href={pdfUrl}
            download={`Certificado_${cursoNome.replace(/\s+/g, "_")}_${nomeAluno}.pdf`}
            className="text-gold hover:underline text-sm uppercase tracking-widest"
          >
            Clique aqui se o download não iniciar automaticamente
          </a>
        </div>
      )}
    </div>
  );
}