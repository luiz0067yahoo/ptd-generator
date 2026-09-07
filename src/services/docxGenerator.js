// Gerador de Documento Word (.docx) no Padrão Institucional Senac (Orientação Paisagem A4)

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  PageOrientation,
  AlignmentType,
  Header,
  ImageRun,
  VerticalAlign,
  ShadingType
} from 'docx';
import { SENAC_LOGO_BASE64 } from '../assets/logoSenac';

export async function exportDocx(data) {
  const thinBorder = {
    style: BorderStyle.SINGLE,
    size: 4, // 0.5 pt
    color: "444444"
  };
  const cellBorders = {
    top: thinBorder,
    bottom: thinBorder,
    left: thinBorder,
    right: thinBorder
  };

  // Convert base64 logo to Uint8Array
  let headerImageRun = null;
  try {
    const raw = atob(SENAC_LOGO_BASE64);
    const u8 = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
      u8[i] = raw.charCodeAt(i);
    }
    headerImageRun = new ImageRun({
      data: u8,
      transformation: {
        width: 155,
        height: 31
      }
    });
  } catch (e) {
    console.warn('Erro ao carregar imagem no header DOCX:', e);
  }

  function makeCell(label, content, colSpan = 1, widthPercent = null, bgHex = null) {
    const paragraphs = [];
    if (label) {
      paragraphs.push(new Paragraph({
        children: [
          new TextRun({
            text: label,
            bold: true,
            font: "Arial",
            size: 20 // 10pt
          })
        ],
        spacing: { before: 40, after: 30 }
      }));
    }

    const lines = (content || "").split('\n');
    lines.forEach(l => {
      if (l.trim().length > 0) {
        paragraphs.push(new Paragraph({
          children: [
            new TextRun({
              text: l.trim(),
              font: "Arial",
              size: 20 // 10pt
            })
          ],
          spacing: { before: 20, after: 20 }
        }));
      }
    });

    if (paragraphs.length === 0) {
      paragraphs.push(new Paragraph({ children: [new TextRun({ text: " ", font: "Arial", size: 20 })] }));
    }

    const cellProps = {
      children: paragraphs,
      borders: cellBorders,
      margins: { top: 120, bottom: 120, left: 140, right: 140 },
      verticalAlign: VerticalAlign.TOP
    };

    if (colSpan > 1) {
      cellProps.columnSpan = colSpan;
    }
    if (widthPercent) {
      cellProps.width = { size: widthPercent, type: WidthType.PERCENTAGE };
    }
    if (bgHex) {
      cellProps.shading = { fill: bgHex, type: ShadingType.CLEAR };
    }

    return new TableCell(cellProps);
  }

  // Header Paragraph
  const headerParas = [];
  if (headerImageRun) {
    headerParas.push(new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [headerImageRun],
      spacing: { after: 120 }
    }));
  } else {
    headerParas.push(new Paragraph({
      children: [new TextRun({ text: "SENAC - Serviço Nacional de Aprendizagem Comercial", font: "Arial", bold: true, size: 20 })]
    }));
  }

  // Table 0
  const table0 = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [makeCell("Nome do curso: ", data.curso || "", 2, 100)]
      }),
      new TableRow({
        children: [makeCell("Instrutor: ", data.instrutor || "", 2, 100)]
      }),
      new TableRow({
        children: [makeCell("Formato da aula: ", data.formato || "Presencial", 2, 100)]
      }),
      new TableRow({
        children: [
          makeCell("Unidade Curricular: ", data.uc || "", 1, 75),
          makeCell("C.H da UC: ", data.ch_uc || "", 1, 25)
        ]
      }),
      new TableRow({
        children: [makeCell("SITUAÇÃO DE APRENDIZAGEM:", data.situacao_aprendizagem || "", 2, 100)]
      }),
      new TableRow({
        children: [
          makeCell("Indicador(es) trabalhados na Situação de Aprendizagem:", data.indicadores || "", 1, 75),
          makeCell("C.H da Situação de aprendizagem:", data.ch_situacao || "", 1, 25)
        ]
      })
    ]
  });

  // Table 1
  const table1 = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            columnSpan: 3,
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: cellBorders,
            shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
            margins: { top: 100, bottom: 100, left: 140, right: 140 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "(3) Elementos da Competência", font: "Arial", bold: true, size: 22 })]
              })
            ]
          })
        ]
      }),
      new TableRow({
        children: [
          makeCell("Conhecimentos", data.conhecimentos || "", 1, 33.3),
          makeCell("Habilidades", data.habilidades || "", 1, 33.3),
          makeCell("Atitudes e valores", data.atitudes_valores || "", 1, 33.4)
        ]
      }),
      new TableRow({
        children: [makeCell("(4) Metodologias ativas:", data.metodologias_ativas || "", 3, 100)]
      }),
      new TableRow({
        children: [
          makeCell("(5) Metodologias ativas: Ação inicial", data.acao_inicial || "", 1, 33.3),
          makeCell("(6) Metodologias ativas: Reflexão", data.reflexao || "", 1, 33.3),
          makeCell("(7) Metodologias ativas: Ação Final", data.acao_final || "", 1, 33.4)
        ]
      }),
      new TableRow({
        children: [
          makeCell("(8) Procedimento avaliativo: Ação inicial", data.proc_inicial || "", 1, 33.3),
          makeCell("Procedimento avaliativo: Reflexão", data.proc_reflexao || "", 1, 33.3),
          makeCell("Procedimento avaliativo: Ação Final", data.proc_final || "", 1, 33.4)
        ]
      }),
      new TableRow({
        children: [makeCell("(9) Instrumentos de avaliação:", data.instrumentos_avaliacao || "", 3, 100)]
      }),
      new TableRow({
        children: [makeCell("(10) Marcas(s) Formativas(s) a serem trabalhadas:", data.marcas_formativas || "", 3, 100)]
      }),
      new TableRow({
        children: [makeCell("(11) Materiais/recursos tecnológicos:", data.materiais_tecnologicos || "", 3, 100)]
      }),
      new TableRow({
        children: [makeCell("REFERÊNCIAS:", data.referencias || "", 3, 100)]
      })
    ]
  });

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size: {
            orientation: PageOrientation.LANDSCAPE,
            width: 16838, // 297mm
            height: 11906 // 210mm
          },
          margin: { top: 720, bottom: 720, left: 720, right: 720 }
        }
      },
      headers: {
        default: new Header({ children: headerParas })
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 180 },
          children: [
            new TextRun({
              text: "Plano de Trabalho Docente",
              font: "Arial",
              bold: true,
              size: 26
            })
          ]
        }),
        table0,
        new Paragraph({
          spacing: { before: 140, after: 140 },
          children: [new TextRun({ text: "", font: "Arial" })]
        }),
        table1
      ]
    }]
  });

  const blob = await Packer.toBlob(doc);

  // File naming: "PTD " + Nome do curso + " - " + Unidade Curricular + ".docx"
  const cursoClean = (data.curso || 'Curso').trim();
  const ucClean = (data.uc || '').trim();
  let baseName = `PTD ${cursoClean}`;
  if (ucClean) {
    baseName += ucClean.startsWith('-') ? ` ${ucClean}` : ` - ${ucClean}`;
  }
  const fileName = `${baseName}.docx`.replace(/[\\/:*?"<>|]/g, '');

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
