// Gerador de Documento Word (.doc) Compatível com Word 97-2003 e Google Drive (Padrão Institucional Senac - Orientação Sempre Retrato A4)

import { SENAC_LOGO_BASE64 } from '../assets/logoSenac.js';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatCellText(content) {
  if (!content) return '&mdash;';
  const lines = String(content).split('\n');
  const formatted = lines
    .map((l) => escapeHtml(l.trim()))
    .filter((l) => l.length > 0)
    .join('<br/>');
  return formatted || '&mdash;';
}

export async function exportDoc(data) {
  const cleanBase64 = SENAC_LOGO_BASE64.replace(/\s+/g, '');

  const docHtml = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml"
xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="ProgId" content="Word.Document">
<meta name="Generator" content="Microsoft Word 11">
<meta name="Originator" content="Microsoft Word 11">
<title>Plano de Trabalho Docente - Senac</title>
<!--[if gte mso 9]>
<xml>
 <w:WordDocument>
  <w:View>Print</w:View>
  <w:Zoom>100</w:Zoom>
  <w:DoNotOptimizeForBrowser/>
 </w:WordDocument>
</xml>
<![endif]-->
<style>
@page Section1 {
  size: 595.3pt 841.9pt; /* A4 Retrato (210mm x 297mm) */
  mso-page-orientation: portrait;
  margin: 28.35pt 28.35pt 28.35pt 28.35pt; /* Margem de 1cm */
  mso-header-margin: 18pt;
  mso-footer-margin: 18pt;
}
div.Section1 {
  page: Section1;
}
body {
  font-family: Arial, sans-serif;
  font-size: 10pt;
  color: #1e293b;
  margin: 0;
  padding: 0;
}
table.ptd-table {
  width: 100%;
  border-collapse: collapse;
  mso-table-lspace: 0pt;
  mso-table-rspace: 0pt;
  margin-top: 0pt;
  margin-bottom: 6pt;
  border: 0.5pt solid #444444;
}
td.ptd-cell {
  border: 0.5pt solid #444444;
  padding: 5pt 7pt;
  vertical-align: top;
  font-family: Arial, sans-serif;
  font-size: 10pt;
  line-height: 1.35;
}
.cell-label {
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 10pt;
  color: #000000;
  display: block;
  margin-bottom: 2pt;
}
.cell-content {
  font-family: Arial, sans-serif;
  font-size: 10pt;
  color: #1e293b;
}
.section-header-cell {
  background-color: #F1F5F9;
  text-align: center;
  font-weight: bold;
  font-size: 11pt;
  font-family: Arial, sans-serif;
  padding: 5pt;
  border: 0.5pt solid #444444;
  color: #000000;
}
.doc-title {
  text-align: center;
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 13pt;
  margin-top: 4pt;
  margin-bottom: 10pt;
  color: #000000;
}
.header-table {
  width: 100%;
  margin-bottom: 4pt;
  border: none;
}
.header-table td {
  border: none;
  padding: 0;
  vertical-align: middle;
}
</style>
</head>
<body>
<div class="Section1">

  <!-- Cabeçalho com Logotipo Senac e Identificação Institucional -->
  <table class="header-table" cellpadding="0" cellspacing="0">
    <tr>
      <td align="left" style="width: 50%;">
        <img src="data:image/png;base64,${cleanBase64}" width="155" height="31" alt="Senac" style="width: 155px; height: 31px; border: 0;" />
      </td>
      <td align="right" style="width: 50%; font-size: 9pt; color: #64748b; font-family: Arial, sans-serif;">
        Educação Profissional Técnica de Nível Médio
      </td>
    </tr>
  </table>

  <!-- Título do Documento -->
  <div class="doc-title">
    Plano de Trabalho Docente
  </div>

  <!-- TABELA 0: Identificação e Situação de Aprendizagem -->
  <table class="ptd-table" cellpadding="0" cellspacing="0">
    <tr>
      <td colspan="2" class="ptd-cell" style="width: 100%;">
        <span class="cell-label">Nome do curso:</span>
        <span class="cell-content">${escapeHtml(data.curso) || '&mdash;'}</span>
      </td>
    </tr>
    <tr>
      <td colspan="2" class="ptd-cell" style="width: 100%;">
        <span class="cell-label">Instrutor:</span>
        <span class="cell-content">${escapeHtml(data.instrutor) || '&mdash;'}</span>
      </td>
    </tr>
    <tr>
      <td colspan="2" class="ptd-cell" style="width: 100%;">
        <span class="cell-label">Formato da aula:</span>
        <span class="cell-content">${escapeHtml(data.formato) || 'Presencial'}</span>
      </td>
    </tr>
    <tr>
      <td class="ptd-cell" style="width: 75%;">
        <span class="cell-label">Unidade Curricular:</span>
        <span class="cell-content">${escapeHtml(data.uc) || '&mdash;'}</span>
      </td>
      <td class="ptd-cell" style="width: 25%;">
        <span class="cell-label">C.H da UC:</span>
        <span class="cell-content">${escapeHtml(data.ch_uc) || '&mdash;'}</span>
      </td>
    </tr>
    <tr>
      <td colspan="2" class="ptd-cell" style="width: 100%;">
        <span class="cell-label">SITUAÇÃO DE APRENDIZAGEM:</span>
        <div class="cell-content" style="margin-top: 2pt;">${formatCellText(data.situacao_aprendizagem)}</div>
      </td>
    </tr>
    <tr>
      <td class="ptd-cell" style="width: 75%;">
        <span class="cell-label">Indicador(es) trabalhados na Situação de Aprendizagem:</span>
        <div class="cell-content" style="margin-top: 2pt;">${formatCellText(data.indicadores)}</div>
      </td>
      <td class="ptd-cell" style="width: 25%;">
        <span class="cell-label">C.H da Situação de aprendizagem:</span>
        <span class="cell-content">${escapeHtml(data.ch_situacao) || '&mdash;'}</span>
      </td>
    </tr>
  </table>

  <!-- TABELA 1: Elementos da Competência, Metodologias, Avaliação, Recursos e Referências -->
  <table class="ptd-table" cellpadding="0" cellspacing="0">
    <tr>
      <td colspan="3" class="section-header-cell" bgcolor="#F1F5F9">
        (3) Elementos da Competência
      </td>
    </tr>
    <tr>
      <td class="ptd-cell" style="width: 33.3%;">
        <span class="cell-label">Conhecimentos</span>
        <div class="cell-content" style="margin-top: 2pt;">${formatCellText(data.conhecimentos)}</div>
      </td>
      <td class="ptd-cell" style="width: 33.3%;">
        <span class="cell-label">Habilidades</span>
        <div class="cell-content" style="margin-top: 2pt;">${formatCellText(data.habilidades)}</div>
      </td>
      <td class="ptd-cell" style="width: 33.4%;">
        <span class="cell-label">Atitudes e valores</span>
        <div class="cell-content" style="margin-top: 2pt;">${formatCellText(data.atitudes_valores)}</div>
      </td>
    </tr>
    <tr>
      <td colspan="3" class="ptd-cell" style="width: 100%;">
        <span class="cell-label">(4) Metodologias ativas:</span>
        <div class="cell-content" style="margin-top: 2pt;">${formatCellText(data.metodologias_ativas)}</div>
      </td>
    </tr>
    <tr>
      <td class="ptd-cell" style="width: 33.3%;">
        <span class="cell-label">(5) Metodologias ativas: Ação inicial</span>
        <div class="cell-content" style="margin-top: 2pt;">${formatCellText(data.acao_inicial)}</div>
      </td>
      <td class="ptd-cell" style="width: 33.3%;">
        <span class="cell-label">(6) Metodologias ativas: Reflexão</span>
        <div class="cell-content" style="margin-top: 2pt;">${formatCellText(data.reflexao)}</div>
      </td>
      <td class="ptd-cell" style="width: 33.4%;">
        <span class="cell-label">(7) Metodologias ativas: Ação Final</span>
        <div class="cell-content" style="margin-top: 2pt;">${formatCellText(data.acao_final)}</div>
      </td>
    </tr>
    <tr>
      <td class="ptd-cell" style="width: 33.3%;">
        <span class="cell-label">(8) Procedimento avaliativo: Ação inicial</span>
        <div class="cell-content" style="margin-top: 2pt;">${formatCellText(data.proc_inicial)}</div>
      </td>
      <td class="ptd-cell" style="width: 33.3%;">
        <span class="cell-label">Procedimento avaliativo: Reflexão</span>
        <div class="cell-content" style="margin-top: 2pt;">${formatCellText(data.proc_reflexao)}</div>
      </td>
      <td class="ptd-cell" style="width: 33.4%;">
        <span class="cell-label">Procedimento avaliativo: Ação Final</span>
        <div class="cell-content" style="margin-top: 2pt;">${formatCellText(data.proc_final)}</div>
      </td>
    </tr>
    <tr>
      <td colspan="3" class="ptd-cell" style="width: 100%;">
        <span class="cell-label">(9) Instrumentos de avaliação:</span>
        <div class="cell-content" style="margin-top: 2pt;">${formatCellText(data.instrumentos_avaliacao)}</div>
      </td>
    </tr>
    <tr>
      <td colspan="3" class="ptd-cell" style="width: 100%;">
        <span class="cell-label">(10) Marcas(s) Formativas(s) a serem trabalhadas:</span>
        <div class="cell-content" style="margin-top: 2pt;">${formatCellText(data.marcas_formativas)}</div>
      </td>
    </tr>
    <tr>
      <td colspan="3" class="ptd-cell" style="width: 100%;">
        <span class="cell-label">(11) Materiais/recursos tecnológicos:</span>
        <div class="cell-content" style="margin-top: 2pt;">${formatCellText(data.materiais_tecnologicos)}</div>
      </td>
    </tr>
    <tr>
      <td colspan="3" class="ptd-cell" style="width: 100%;">
        <span class="cell-label">REFERÊNCIAS:</span>
        <div class="cell-content" style="margin-top: 2pt;">${formatCellText(data.referencias)}</div>
      </td>
    </tr>
  </table>

</div>
</body>
</html>`.trim();

  // Nomenclatura oficial do arquivo: "PTD [Curso] - [UC].doc"
  const cursoClean = (data.curso || 'Curso').trim();
  const ucClean = (data.uc || '').trim();
  let baseName = `PTD ${cursoClean}`;
  if (ucClean) {
    baseName += ucClean.startsWith('-') ? ` ${ucClean}` : ` - ${ucClean}`;
  }
  const fileName = `${baseName}.doc`.replace(/[\\/:*?"<>|]/g, '');

  const blob = new Blob(['\ufeff', docHtml], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return fileName;
}
