import React, { useState } from 'react';
import { FileDown, FileText, Loader2 } from 'lucide-react';
import { exportDoc } from '../services/docGenerator';
import { exportDocx } from '../services/docxGenerator';
import { exportPdf } from '../services/pdfGenerator';

export default function ExportActions({ data, onShowToast }) {
  const [loadingDoc, setLoadingDoc] = useState(false);
  const [loadingDocx, setLoadingDocx] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);

  const handleExportDoc = async () => {
    setLoadingDoc(true);
    try {
      const fileName = await exportDoc(data);
      onShowToast(`Documento Word (.doc) baixado: ${fileName}`, 'success');
    } catch (err) {
      console.error(err);
      onShowToast(`Erro ao gerar Word (.doc): ${err.message}`, 'error');
    } finally {
      setLoadingDoc(false);
    }
  };

  const handleExportDocx = async () => {
    setLoadingDocx(true);
    try {
      const fileName = await exportDocx(data);
      onShowToast(`Documento Word (.docx) baixado: ${fileName}`, 'success');
    } catch (err) {
      console.error(err);
      onShowToast(`Erro ao gerar Word (.docx): ${err.message}`, 'error');
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

  const isBusy = loadingDoc || loadingDocx || loadingPdf;

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
              Baixe nos formatos oficiais Senac: Word editável (.doc 97-2003 ou .docx para Google Drive) e documento final (.pdf).
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          {/* DOC Button (Word 97-2003 / Universal) */}
          <button
            type="button"
            onClick={handleExportDoc}
            disabled={isBusy}
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-100 text-senac-blue font-heading font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 disabled:opacity-50"
            title="Baixar em formato Word (.doc)"
          >
            {loadingDoc ? (
              <Loader2 className="w-5 h-5 text-senac-orange animate-spin" />
            ) : (
              <FileText className="w-5 h-5 text-senac-orange" />
            )}
            <div className="flex items-center gap-1.5">
              <span>Gerar .DOC</span>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded border border-amber-300 uppercase tracking-tight">
                Word 97-2003
              </span>
            </div>
          </button>

          {/* DOCX Button (Google Drive / Docs & Word 365) */}
          <button
            type="button"
            onClick={handleExportDocx}
            disabled={isBusy}
            className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-heading font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 border border-blue-400/40"
            title="Exportar no formato .DOCX oficial compatível 100% com Google Drive / Google Docs e Microsoft 365"
          >
            {loadingDocx ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
              <FileText className="w-5 h-5 text-amber-300" />
            )}
            <div className="flex items-center gap-1.5">
              <span>Gerar .DOCX</span>
              <span className="text-[10px] bg-white/20 text-white font-bold px-1.5 py-0.5 rounded border border-white/30 uppercase tracking-tight">
                Google Drive
              </span>
            </div>
          </button>

          {/* PDF Button */}
          <button
            type="button"
            onClick={handleExportPdf}
            disabled={isBusy}
            className="w-full sm:w-auto px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-heading font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50"
            title="Baixar documento final em formato PDF"
          >
            {loadingPdf ? (
              <Loader2 className="w-5 h-5 text-slate-900 animate-spin" />
            ) : (
              <FileDown className="w-5 h-5 text-slate-900" />
            )}
            <span>Gerar .PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
