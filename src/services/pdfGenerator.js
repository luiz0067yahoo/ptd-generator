// Gerador de Documento PDF no Padrão Institucional Senac (Orientação Paisagem A4)

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SENAC_LOGO_BASE64 } from '../assets/logoSenac';

export async function exportPdf(data) {
  // A4 Landscape: 297mm x 210mm
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 14;
  let startY = 12;

  // Add Senac Logo Header
  try {
    const logoData = `data:image/png;base64,${SENAC_LOGO_BASE64}`;
    doc.addImage(logoData, 'PNG', marginX, startY, 40, 8);
  } catch (e) {
    console.warn('Erro ao inserir logo no PDF:', e);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('SENAC', marginX, startY + 6);
  }

  // Document Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Plano de Trabalho Docente', pageWidth / 2, startY + 12, { align: 'center' });

  // TABLE 0: Identificação e Situação de Aprendizagem
  const table0Body = [
    [
      { content: `Nome do curso:  ${data.curso || ''}`, colSpan: 2, styles: { fontStyle: 'bold' } }
    ],
    [
      { content: `Instrutor:  ${data.instrutor || ''}`, colSpan: 2, styles: { fontStyle: 'bold' } }
    ],
    [
      { content: `Formato da aula:  ${data.formato || 'Presencial'}`, colSpan: 2, styles: { fontStyle: 'bold' } }
    ],
    [
      { content: `Unidade Curricular:  ${data.uc || ''}`, styles: { fontStyle: 'bold' } },
      { content: `C.H da UC:  ${data.ch_uc || ''}`, styles: { fontStyle: 'bold' } }
    ],
    [
      {
        content: `SITUAÇÃO DE APRENDIZAGEM:\n${data.situacao_aprendizagem || ''}`,
        colSpan: 2,
        styles: { fontStyle: 'normal' }
      }
    ],
    [
      {
        content: `Indicador(es) trabalhados na Situação de Aprendizagem:\n${data.indicadores || ''}`,
        styles: { fontStyle: 'normal' }
      },
      {
        content: `C.H da Situação de aprendizagem:\n${data.ch_situacao || ''}`,
        styles: { fontStyle: 'bold' }
      }
    ]
  ];

  autoTable(doc, {
    startY: startY + 16,
    margin: { left: marginX, right: marginX },
    theme: 'plain',
    tableWidth: 'auto',
    styles: {
      font: 'helvetica',
      fontSize: 8.5,
      textColor: [30, 41, 59],
      lineColor: [80, 80, 80],
      lineWidth: 0.2,
      cellPadding: 2.5,
      valign: 'top',
      overflow: 'linebreak'
    },
    columnStyles: {
      0: { cellWidth: 200 },
      1: { cellWidth: 69 }
    },
    body: table0Body
  });

  // TABLE 1: Elementos, Metodologias, Momentos, Avaliação, Recursos, Referências
  const table1Body = [
    [
      {
        content: '(3) Elementos da Competência',
        colSpan: 3,
        styles: {
          halign: 'center',
          fontStyle: 'bold',
          fillColor: [241, 245, 249],
          fontSize: 9
        }
      }
    ],
    [
      { content: `Conhecimentos\n\n${data.conhecimentos || ''}` },
      { content: `Habilidades\n\n${data.habilidades || ''}` },
      { content: `Atitudes e valores\n\n${data.atitudes_valores || ''}` }
    ],
    [
      {
        content: `(4) Metodologias ativas:\n\n${data.metodologias_ativas || ''}`,
        colSpan: 3
      }
    ],
    [
      { content: `(5) Metodologias ativas: Ação inicial\n\n${data.acao_inicial || ''}` },
      { content: `(6) Metodologias ativas: Reflexão\n\n${data.reflexao || ''}` },
      { content: `(7) Metodologias ativas: Ação Final\n\n${data.acao_final || ''}` }
    ],
    [
      { content: `(8) Procedimento avaliativo: Ação inicial\n\n${data.proc_inicial || ''}` },
      { content: `Procedimento avaliativo: Reflexão\n\n${data.proc_reflexao || ''}` },
      { content: `Procedimento avaliativo: Ação Final\n\n${data.proc_final || ''}` }
    ],
    [
      {
        content: `(9) Instrumentos de avaliação:\n\n${data.instrumentos_avaliacao || ''}`,
        colSpan: 3
      }
    ],
    [
      {
        content: `(10) Marcas(s) Formativas(s) a serem trabalhadas:\n\n${data.marcas_formativas || ''}`,
        colSpan: 3
      }
    ],
    [
      {
        content: `(11) Materiais/recursos tecnológicos:\n\n${data.materiais_tecnologicos || ''}`,
        colSpan: 3
      }
    ],
    [
      {
        content: `REFERÊNCIAS:\n\n${data.referencias || ''}`,
        colSpan: 3
      }
    ]
  ];

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 4,
    margin: { left: marginX, right: marginX, bottom: 12 },
    theme: 'plain',
    styles: {
      font: 'helvetica',
      fontSize: 8.5,
      textColor: [30, 41, 59],
      lineColor: [80, 80, 80],
      lineWidth: 0.2,
      cellPadding: 2.5,
      valign: 'top',
      overflow: 'linebreak'
    },
    columnStyles: {
      0: { cellWidth: 89.6 },
      1: { cellWidth: 89.6 },
      2: { cellWidth: 89.8 }
    },
    body: table1Body
  });

  // File naming: "PTD " + Nome do curso + " - " + Unidade Curricular + ".pdf"
  const cursoClean = (data.curso || 'Curso').trim();
  const ucClean = (data.uc || '').trim();
  let baseName = `PTD ${cursoClean}`;
  if (ucClean) {
    baseName += ucClean.startsWith('-') ? ` ${ucClean}` : ` - ${ucClean}`;
  }
  const fileName = `${baseName}.pdf`.replace(/[\\/:*?"<>|]/g, '');

  doc.save(fileName);
  return fileName;
}
