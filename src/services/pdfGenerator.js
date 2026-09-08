// Gerador de Documento PDF no Padrão Institucional Senac (Orientação Sempre Retrato A4)
// Baseado na estrutura e layout oficial de PTD_exemplo_official_senac.doc

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SENAC_LOGO_BASE64 } from '../assets/logoSenac';

export async function exportPdf(data) {
  // A4 Retrato (Portrait): 210mm x 297mm
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 14;

  // 1. Logo Senac Oficial
  try {
    const cleanBase64 = (SENAC_LOGO_BASE64 || '').replace(/\s+/g, '');
    const logoData = `data:image/png;base64,${cleanBase64}`;
    doc.addImage(logoData, 'PNG', marginX, 8, 38, 7.6);
  } catch (e) {
    console.warn('Erro ao inserir logo no PDF:', e);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('SENAC', marginX, 13);
  }

  // 2. Subtítulo Institucional Superior Direito
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Educação Profissional Técnica de Nível Médio', pageWidth - marginX, 13, { align: 'right' });

  // 3. Título Central
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Plano de Trabalho Docente', pageWidth / 2, 20, { align: 'center' });

  // 4. TABELA 0: Identificação e Situação de Aprendizagem (2 colunas: 75% e 25% no Retrato)
  const table0Body = [
    [
      { content: `Nome do curso:  ${data.curso || ''}`, colSpan: 2 }
    ],
    [
      { content: `Instrutor:  ${data.instrutor || ''}`, colSpan: 2 }
    ],
    [
      { content: `Formato da aula:  ${data.formato || 'Presencial'}`, colSpan: 2 }
    ],
    [
      { content: `Unidade Curricular:  ${data.uc || ''}` },
      { content: `C.H da UC:  ${data.ch_uc || ''}` }
    ],
    [
      {
        content: `SITUAÇÃO DE APRENDIZAGEM:\n\n${data.situacao_aprendizagem || ''}`,
        colSpan: 2
      }
    ],
    [
      {
        content: `Indicador(es) trabalhados na Situação de Aprendizagem:\n\n${data.indicadores || ''}`
      },
      {
        content: `C.H da Situação de aprendizagem:\n\n${data.ch_situacao || ''}`
      }
    ]
  ];

  autoTable(doc, {
    startY: 24,
    margin: { left: marginX, right: marginX },
    theme: 'plain',
    styles: {
      font: 'helvetica',
      fontSize: 8,
      textColor: [30, 41, 59],
      lineColor: [68, 68, 68],
      lineWidth: 0.2,
      cellPadding: 2,
      valign: 'top',
      overflow: 'linebreak'
    },
    columnStyles: {
      0: { cellWidth: 136.5 }, // 75% de 182mm
      1: { cellWidth: 45.5 }   // 25% de 182mm
    },
    didParseCell: (dataHook) => {
      // Destaque nos campos de identificação principais
      if (dataHook.row.index < 4) {
        dataHook.cell.styles.fontStyle = 'bold';
      }
    },
    body: table0Body
  });

  // 5. TABELA 1: Elementos, Metodologias, Avaliação, Recursos e Referências (3 colunas iguais)
  const table1Body = [
    [
      {
        content: '(3) Elementos da Competência',
        colSpan: 3,
        styles: {
          halign: 'center',
          fontStyle: 'bold',
          fillColor: [241, 245, 249],
          textColor: [0, 0, 0],
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
    startY: doc.lastAutoTable.finalY + 2,
    margin: { left: marginX, right: marginX, bottom: 14 },
    theme: 'plain',
    styles: {
      font: 'helvetica',
      fontSize: 8,
      textColor: [30, 41, 59],
      lineColor: [68, 68, 68],
      lineWidth: 0.2,
      cellPadding: 2,
      valign: 'top',
      overflow: 'linebreak'
    },
    columnStyles: {
      0: { cellWidth: 60.66 },
      1: { cellWidth: 60.66 },
      2: { cellWidth: 60.68 }
    },
    body: table1Body,
    didDrawPage: (dataHook) => {
      // Rodapé institucional padronizado em todas as páginas (Retrato)
      const pWidth = doc.internal.pageSize.getWidth();
      const pHeight = doc.internal.pageSize.getHeight();
      doc.setDrawColor(210, 215, 220);
      doc.setLineWidth(0.2);
      doc.line(marginX, pHeight - 10, pWidth - marginX, pHeight - 10);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(120, 130, 140);
      doc.text('Senac • Plano de Trabalho Docente', marginX, pHeight - 6.5);
      doc.text(`Página ${dataHook.pageNumber}`, pWidth - marginX, pHeight - 6.5, { align: 'right' });
    }
  });

  // Nomenclatura dinâmica: "PTD " + Nome do curso + " - " + Unidade Curricular + ".pdf"
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
