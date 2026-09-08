import React from 'react';
import { SENAC_LOGO_BASE64 } from '../assets/logoSenac';
import '../styles/preview.css';

export default function DocumentPreview({ data }) {
  return (
    <div className="document-sheet-container my-6">
      <div className="flex items-center justify-between mb-3 text-white px-2">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Pré-visualização Oficial Senac (Folha Retrato A4)</span>
        </div>
        <span className="text-[11px] text-slate-300">
          Simulação fiel do documento .DOC (Word 97-2003) e .PDF
        </span>
      </div>

      <div className="document-sheet-portrait">
        {/* Header with Senac Logo */}
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <img 
            src={`data:image/png;base64,${SENAC_LOGO_BASE64}`} 
            alt="Senac" 
            className="h-10 w-auto object-contain"
          />
          <span className="text-[9pt] text-slate-500 font-sans">
            Educação Profissional Técnica de Nível Médio
          </span>
        </div>

        {/* Title */}
        <h2 className="doc-header-title">
          Plano de Trabalho Docente
        </h2>

        {/* TABLE 0: Identificação e Situação de Aprendizagem */}
        <table className="doc-table">
          <tbody>
            <tr>
              <td colSpan="2">
                <span className="doc-label">Nome do curso:</span>
                <span className="doc-content-text">{data.curso || '—'}</span>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <span className="doc-label">Instrutor:</span>
                <span className="doc-content-text">{data.instrutor || '—'}</span>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <span className="doc-label">Formato da aula:</span>
                <span className="doc-content-text">{data.formato || 'Presencial'}</span>
              </td>
            </tr>
            <tr>
              <td style={{ width: '75%' }}>
                <span className="doc-label">Unidade Curricular:</span>
                <span className="doc-content-text">{data.uc || '—'}</span>
              </td>
              <td style={{ width: '25%' }}>
                <span className="doc-label">C.H da UC:</span>
                <span className="doc-content-text">{data.ch_uc || '—'}</span>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <span className="doc-label">SITUAÇÃO DE APRENDIZAGEM:</span>
                <div className="doc-content-text mt-1">{data.situacao_aprendizagem || '—'}</div>
              </td>
            </tr>
            <tr>
              <td style={{ width: '75%' }}>
                <span className="doc-label">Indicador(es) trabalhados na Situação de Aprendizagem:</span>
                <div className="doc-content-text mt-1">{data.indicadores || '—'}</div>
              </td>
              <td style={{ width: '25%' }}>
                <span className="doc-label">C.H da Situação de aprendizagem:</span>
                <span className="doc-content-text">{data.ch_situacao || '—'}</span>
              </td>
            </tr>
          </tbody>
        </table>

        {/* TABLE 1: Elementos da Competência, Metodologias, Avaliação, Recursos, Referências */}
        <table className="doc-table">
          <tbody>
            <tr>
              <th colSpan="3" className="doc-section-header">
                (3) Elementos da Competência
              </th>
            </tr>
            <tr>
              <td style={{ width: '33.3%' }}>
                <span className="doc-label">Conhecimentos</span>
                <div className="doc-content-text mt-1">{data.conhecimentos || '—'}</div>
              </td>
              <td style={{ width: '33.3%' }}>
                <span className="doc-label">Habilidades</span>
                <div className="doc-content-text mt-1">{data.habilidades || '—'}</div>
              </td>
              <td style={{ width: '33.4%' }}>
                <span className="doc-label">Atitudes e valores</span>
                <div className="doc-content-text mt-1">{data.atitudes_valores || '—'}</div>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <span className="doc-label">(4) Metodologias ativas:</span>
                <div className="doc-content-text mt-1">{data.metodologias_ativas || '—'}</div>
              </td>
            </tr>
            <tr>
              <td style={{ width: '33.3%' }}>
                <span className="doc-label">(5) Metodologias ativas: Ação inicial</span>
                <div className="doc-content-text mt-1">{data.acao_inicial || '—'}</div>
              </td>
              <td style={{ width: '33.3%' }}>
                <span className="doc-label">(6) Metodologias ativas: Reflexão</span>
                <div className="doc-content-text mt-1">{data.reflexao || '—'}</div>
              </td>
              <td style={{ width: '33.4%' }}>
                <span className="doc-label">(7) Metodologias ativas: Ação Final</span>
                <div className="doc-content-text mt-1">{data.acao_final || '—'}</div>
              </td>
            </tr>
            <tr>
              <td style={{ width: '33.3%' }}>
                <span className="doc-label">(8) Procedimento avaliativo: Ação inicial</span>
                <div className="doc-content-text mt-1">{data.proc_inicial || '—'}</div>
              </td>
              <td style={{ width: '33.3%' }}>
                <span className="doc-label">Procedimento avaliativo: Reflexão</span>
                <div className="doc-content-text mt-1">{data.proc_reflexao || '—'}</div>
              </td>
              <td style={{ width: '33.4%' }}>
                <span className="doc-label">Procedimento avaliativo: Ação Final</span>
                <div className="doc-content-text mt-1">{data.proc_final || '—'}</div>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <span className="doc-label">(9) Instrumentos de avaliação:</span>
                <div className="doc-content-text mt-1">{data.instrumentos_avaliacao || '—'}</div>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <span className="doc-label">(10) Marcas(s) Formativas(s) a serem trabalhadas:</span>
                <div className="doc-content-text mt-1">{data.marcas_formativas || '—'}</div>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <span className="doc-label">(11) Materiais/recursos tecnológicos:</span>
                <div className="doc-content-text mt-1">{data.materiais_tecnologicos || '—'}</div>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <span className="doc-label">REFERÊNCIAS:</span>
                <div className="doc-content-text mt-1">{data.referencias || '—'}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
