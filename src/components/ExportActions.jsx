import React, { useState } from 'react';
import { FileDown, FileText, Loader2 } from 'lucide-react';
import { exportDocx } from '../services/docxGenerator';
import { exportPdf } from '../services/pdfGenerator';

export default function ExportActions({ data, onShowToast }) {
  const [loadingDocx, setLoadingDocx] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);

  const handleExportDocx = async () => {
    setLoadingDocx(true);
    try {
      const fileName = await exportDocx(data);
      onShowToast(`Documento Word baixado: ${fileName}`, 'success');
    } catch (err) {
      console.error(err);
      onShowToast(`Erro ao gerar Word: ${err.message}`, 'error');
    } finally {
      setLoadingDocx(false);
    }
  };

  const handleExportPdf = async () => {
    setLoadingPdf(true);
    try {
      const fileName = await exportPdf(data);
      onShowToast(`Documento PDF baixado: ${fileName}`, 'success');
    } catch (err) {
      console.error(err);
      onShowToast(`Erro ao gerar PDF: ${err.message}`, 'error');
    } finally {
      setLoadingPdf(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-senac-navy via-senac-blue to-senac-orange p-6 rounded-2xl shadow-xl text-white my-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl text-amber-300 shadow-inner flex-shrink-0">
            <FileDown className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-lg sm:text-xl text-white">
              Tudo pronto para exportar seu PTD Oficial!
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
              Baixe nos formatos oficiais Senac: Word editável (.docx) e documento final (.pdf).
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          {/* DOCX Button */}
          <button
            type="button"
            onClick={handleExportDocx}
            disabled={loadingDocx || loadingPdf}
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-100 text-senac-blue font-heading font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 disabled:opacity-50"
          >
            {loadingDocx ? (
              <Loader2 className="w-5 h-5 text-senac-orange animate-spin" />
            ) : (
              <FileText className="w-5 h-5 text-senac-orange" />
            )}
            <span>Gerar Documento .DOCX</span>
          </button>

          {/* PDF Button */}
          <button
            type="button"
            onClick={handleExportPdf}
            disabled={loadingDocx || loadingPdf}
            className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-heading font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 disabled:opacity-50"
          >
            {loadingPdf ? (
              <Loader2 className="w-5 h-5 text-slate-900 animate-spin" />
            ) : (
              <FileDown className="w-5 h-5 text-slate-900" />
            )}
            <span>Gerar Documento .PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
