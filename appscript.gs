// ================================================================= //
// SCRIPT FINAL v3.2 - PROJETO APRENDIZ (Notificação para Professores Aprimorada) //
// ================================================================= //

// --- Início da Seção de Configuração ---

const NOME_DA_ABA = "Página1";
const LIMITE_DE_CURSOS = 3;
const SIGNATURE_IMAGE_ID = '1LcUrDrvha5RO2XNkIu8zH3bvWTTZluTh';
const adminEmail = 'icmprojetoaprendizsalvador@gmail.com';
// Links de WhatsApp e e-mails dos professores por curso e local
const courseData = {
  "Teoria Musical": {
    "Remoto": { link: "https://chat.whatsapp.com/H67Mz9Aw0OW2138hohZHhx", teacher_email: "bsantos.tiago@icloud.com" }
  },
  "Bateria": {
    "Lauro de Freitas": { link: "https://chat.whatsapp.com/KUEx9slmjWeL3mIEFgB3oC", teacher_email: "rios.dan4002@gmail.com" },
    "Vista Alegre (remoto)": { link: "https://chat.whatsapp.com/BpfOU0KJKEYFoZPeaYO1mJ", teacher_email: "bds.marcelotecboatt.digital@gmail.com" }
  },
  "Canto Coral": {
    "Pituba": { link: "https://chat.whatsapp.com/C8Da7o8LmnbCfBkYPEvKN3", teacher_email: "anedai_barros@yahoo.com.br" }
  },
  "Contrabaixo": {
    "Pituba": { link: "https://chat.whatsapp.com/CS3otQ2OlYl1W7vpbLQMSL", teacher_email: "flaviofranzin1976@gmail.com" },
    "Alto de Coutos": { link: "https://chat.whatsapp.com/GViEqHtTkBcJZR2l3n0XvK", teacher_email: "sukasantana0@gmail.com" }
  },
  "Escaleta": {
    "Itinga": { link: "https://chat.whatsapp.com/HaabQxxN0nB0VeWwHvEkPO", teacher_email: "r.pedreira88@gmail.com" },
    "Lauro de Freitas": { link: "https://chat.whatsapp.com/G9JfJIOXeHqAJ7A0BVEzkK", teacher_email: "caualopes.icm@gmail.com" },
    "Mirantes de Periperi": { link: "https://chat.whatsapp.com/IpSr8xXYMe00tGkb8GdrTA", teacher_email: "cachoeira405@gmail.com" }
  },
  "Flauta Doce": {
    "Jardim Valéria": { link: "https://chat.whatsapp.com/GML81jYX8lY9mY9LWqxAxU", teacher_email: "alexandre.magnos.br@gmail.com" }
  },
  "Flauta Transversal": {
    "Brotas": { link: "https://chat.whatsapp.com/FrHcPC9BvcKIraU5PCTsCx", teacher_email: "tonylucas10@gmail.com" },
    "Boca do Rio": { link: "https://chat.whatsapp.com/EpLNhn42HV4DIw3gvZDuno", teacher_email: "guimaraesanajuli@gmail.com" }
  },
  "Saxofone": {
    "Brotas": { link: "https://chat.whatsapp.com/FrHcPC9BvcKIraU5PCTsCx", teacher_email: "tonylucas10@gmail.com" }
  },
  "Teclado": {
    "Brotas": { link: "https://chat.whatsapp.com/FrHcPC9BvcKIraU5PCTsCx", teacher_email: "tonylucas10@gmail.com" },
    "Guarani": { link: "https://chat.whatsapp.com/BSt37MafkdoL8ye8n9H1oo", teacher_email: "queirozd013@gmail.com" },
    "Lauro de Freitas": { link: "https://chat.whatsapp.com/DIoZk6CQMRr7I3P0fClIju", teacher_email: "leonardobomfimsantos1@gmail.com" },
    "Pituba": { link: "https://chat.whatsapp.com/DcqSNXdygHc4akQ1MUvc5h", teacher_email: "cvitor.sousa98@gmail.com" }
  },
  "Violão I": {
    "Alto de Coutos": { link: "https://chat.whatsapp.com/KqRQ78xxsq26uyDr6Pqmsn", teacher_email: "sukasantana0@gmail.com" },
    "Boca do Rio": { link: "https://chat.whatsapp.com/EeRFqsZeT3dAqQ3E3xb2Zc", teacher_email: "alana.cruzsilva1@gmail.com" },
    "Brotas": { link: "https://chat.whatsapp.com/FrHcPC9BvcKIraU5PCTsCx", teacher_email: "tonylucas10@gmail.com" },
    "Fazenda Coutos": { link: "https://chat.whatsapp.com/CHpFobzzkJKJ1TslBfnQFw", teacher_email: "milenapinheiro365@gmail.com" },
    "Guarani": { link: "https://chat.whatsapp.com/JevDMwLZGQvLaKXj0HYcMx", teacher_email: "geoicm@gmail.com" },
    "Jardim Valéria": { link: "https://chat.whatsapp.com/DCGLdd6k0VVCEiCZTOJpaW", teacher_email: "alanmaranata33@gmail.com" },
    "Lauro de Freitas": { link: "https://chat.whatsapp.com/EKiRbsFWsfq7Hc7fkfvcmt", teacher_email: "bralsantos18@gmail.com" },
    "Mirantes de Periperi": { link: "https://chat.whatsapp.com/SEU_LINK_AQUI", teacher_email: "cleyton.icm1225@gmail.com" } // LINK PENDENTE
  },
  "Violão II": {
    "Pituba": { link: "https://chat.whatsapp.com/HKrdlJyi56gGXLRlBXpF4R", teacher_email: "flaviofranzin1976@gmail.com" }
  },
  "Violino": {
    "Brotas": { link: "https://chat.whatsapp.com/C96Ivg4x39wArFtDH6OlUv", teacher_email: "tonylucas10@gmail.com" }
  }
};
const map = {
  'nome-completo': 'Nome Completo', 'email-inscricao': 'E-mail', 'telefone-inscricao': 'Telefone', 'tem-experiencia': 'Tem Experiência',
  'experiencia-relate': 'Relato - Experiência', 'igreja': 'Igreja', 'classe': 'Classe', 'instrumento': 'Curso de Interesse', 'local': 'Local do Curso',
  'possui-instrumento': 'Possui Instrumento?'
};

// --- Fim da Seção de Configuração ---

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOME_DA_ABA);
    if (!sheet) throw new Error("Aba '" + NOME_DA_ABA + "' não foi encontrada.");

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const formData = e.parameter;

    const nomeCompleto = formData['nome-completo'];
    const email = formData['email-inscricao'];
    const cursoInstrumento = formData['instrumento'];
    const localInstrumento = formData['local'];
    // VALIDAÇÃO: Curso de Instrumento
    if (isDuplicateCourse(sheet, headers, nomeCompleto, email, cursoInstrumento)) {
      return ContentService.createTextOutput(JSON.stringify({ "result": "duplicate_course", "message": "Você já está inscrito(a) neste curso!" })).setMimeType(ContentService.MimeType.JSON);
    }
    const courseCount = countUserCourses(sheet, headers, nomeCompleto, email);
    if (courseCount >= LIMITE_DE_CURSOS) {
      return ContentService.createTextOutput(JSON.stringify({ "result": "limit_reached", "message": `Limite atingido! Só é possível se inscrever em até ${LIMITE_DE_CURSOS} cursos.` })).setMimeType(ContentService.MimeType.JSON);
    }

    // AÇÃO: Salva e envia e-mail do curso principal
    const newRowInstrumento = createSheetRow(headers, map, formData);
    sheet.appendRow(newRowInstrumento);
    sendConfirmationEmail(email, nomeCompleto, cursoInstrumento, localInstrumento, formData);

    // LÓGICA DE TEORIA MUSICAL
    if (cursoInstrumento !== "Teoria Musical") {
      const cursoTeoria = "Teoria Musical";
      if (!isDuplicateCourse(sheet, headers, nomeCompleto, email, cursoTeoria)) {
        if (countUserCourses(sheet, headers, nomeCompleto, email) < LIMITE_DE_CURSOS) {
          let formDataTeoria = JSON.parse(JSON.stringify(formData));
          formDataTeoria['instrumento'] = cursoTeoria;
          formDataTeoria['local'] = "Remoto";
          formDataTeoria['possui-instrumento'] = 'N/A';
          formDataTeoria['experiencia-relate'] = 'Inscrição Automática';
          const newRowTeoria = createSheetRow(headers, map, formDataTeoria);
          sheet.appendRow(newRowTeoria);

          const triggerData = { email: email, nome: nomeCompleto, curso: cursoTeoria, local: "Remoto", formData: formDataTeoria };
          PropertiesService.getScriptProperties().setProperty(Utilities.getUuid(), JSON.stringify(triggerData));
          ScriptApp.newTrigger('sendDelayedTheoryEmail').timeBased().after(60 * 1000).create();
        }
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ "result": "success" })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log(error.toString());
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ================================================================= //
//                           FUNÇÕES AUXILIARES                      //
// ================================================================= //

function sendDelayedTheoryEmail() {
  const properties = PropertiesService.getScriptProperties();
  const keys = properties.getKeys();

  if (keys.length > 0) {
    const key = keys[0];
    const triggerData = JSON.parse(properties.getProperty(key));
    sendConfirmationEmail(triggerData.email, triggerData.nome, triggerData.curso, triggerData.local, triggerData.formData);
    properties.deleteProperty(key);
    const allTriggers = ScriptApp.getProjectTriggers();
    for (const trigger of allTriggers) {
      if (trigger.getHandlerFunction() === 'sendDelayedTheoryEmail') {
        ScriptApp.deleteTrigger(trigger);
        break;
      }
    }
  }
}

function sendConfirmationEmail(email, nomeCompleto, curso, local, formData) {
  if (!email || !curso || !local || !courseData[curso] || !courseData[curso][local]) {
    Logger.log(`Dados insuficientes para enviar e-mail para ${email} no curso ${curso}`);
    return;
  }

  const { link: whatsappLink, teacher_email } = courseData[curso][local];
  // Busca a imagem da assinatura no Google Drive
  let signatureBlob = null;
  let inlineImages = {};
  try {
    signatureBlob = DriveApp.getFileById(SIGNATURE_IMAGE_ID).getBlob();
    inlineImages['signatureImage'] = signatureBlob;
  } catch (err) {
    Logger.log("Erro ao buscar imagem da assinatura: " + err.toString());
  }

  // --- E-MAIL PARA O ALUNO ---
  const subjectAluno = `Confirmação de Inscrição: Curso de ${curso}`;
  const emailBodyAluno = `
    <div style="max-width: 600px; margin: 20px auto; font-family: Arial, sans-serif; color: #333333; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #b71c1c; color: white; padding: 20px; text-align: center;">
        <h2 style="margin: 0; font-size: 24px;">Inscrição Confirmada!</h2>
      </div>
      <div style="padding: 25px; line-height: 1.7; font-size: 16px;">
        <p>A paz do Senhor Jesus, irmão(a) <strong>${nomeCompleto.split(' ')[0]}</strong>!</p>
        <p>Sua inscrição no <strong>Curso de ${curso} ${local ? `(Local: ${local})` : ''}</strong> foi concluída com sucesso.</p>
        <p>Para receber orientações, avisos e materiais de apoio, é muito importante que você participe do grupo oficial no WhatsApp.</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${whatsappLink}" target="_blank" style="background-color: #8c1212; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            👉 Entrar no Grupo do WhatsApp
          </a>
        </p>
        <p>Deus abençoe sua dedicação e empenho no aprendizado!</p>
        <p>Fraternal abraço,</p>
      </div>
      ${signatureBlob
      ?
      `<div style="
          background-image: url('cid:signatureImage'); 
          background-size: cover; 
          background-position: center; 
          background-repeat: no-repeat; 
          height: 150px; 
          width: 100%;
          ">
          </div>`
      : `<div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <p><strong>Projeto Aprendiz</strong><br>Departamento de Inscrição</p>
          </div>`
    }
    </div>
  `;
  GmailApp.sendEmail(email, subjectAluno, '', {
    htmlBody: emailBodyAluno,
    name: 'Projeto Aprendiz',
    inlineImages: inlineImages
  });
  // --- E-MAIL DE NOTIFICAÇÃO PARA PROFESSOR/ADMIN (VERSÃO MODERNIZADA) ---
  const notificationSubject = `Nova Inscrição: ${curso} (${local}) - ${nomeCompleto}`;
  const notificationBody = `
    <div style="max-width: 600px; margin: 20px auto; font-family: Arial, sans-serif; color: #333333; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #4a5568; color: white; padding: 20px; text-align: center;">
        <h2 style="margin: 0; font-size: 24px;">Notificação de Nova Inscrição</h2>
      </div>
      <div style="padding: 25px; line-height: 1.7; font-size: 16px;">
        <p>A paz do Senhor,</p>
        <p>Uma nova inscrição foi realizada para o <strong>Curso de ${curso}</strong> no local <strong>${local}</strong>. Seguem os dados do(a) aluno(a):</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; margin-bottom: 20px; font-size: 15px;">
          <tbody>
            <tr style="border-bottom: 1px solid #eeeeee;"><td style="padding: 10px; font-weight: bold; color: #555;">Nome:</td><td style="padding: 10px;">${nomeCompleto}</td></tr>
            <tr style="border-bottom: 1px solid #eeeeee;"><td style="padding: 10px; font-weight: bold; color: #555;">E-mail:</td><td style="padding: 10px;">${email}</td></tr>
            <tr style="border-bottom: 1px solid #eeeeee;"><td style="padding: 10px; font-weight: bold; color: #555;">Telefone:</td><td style="padding: 10px;">${formData['telefone-inscricao'] || 'Não informado'}</td></tr>
            <tr style="border-bottom: 1px solid #eeeeee;"><td style="padding: 10px; font-weight: bold; color: #555;">Igreja:</td><td style="padding: 10px;">${formData['igreja'] || 'Não informada'}</td></tr>
            <tr style="border-bottom: 1px solid #eeeeee;"><td style="padding: 10px; font-weight: bold; color: #555;">Classe:</td><td style="padding: 10px;">${formData['classe'] || 'Não informada'}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold; color: #555;">Possui Instrumento?</td><td style="padding: 10px;">${formData['possui-instrumento'] || 'N/A'}</td></tr>
          </tbody>
        </table>
        <p>A inscrição já foi adicionada à planilha correspondente.</p>
      </div>
      ${signatureBlob
      ?
      `<div style="
          background-image: url('cid:signatureImage'); 
          background-size: cover; 
          background-position: center; 
          background-repeat: no-repeat; 
          height: 150px; 
          width: 100%;
          ">
          </div>`
      : `<div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <p><strong>Projeto Aprendiz</strong><br>Departamento de Inscrição</p>
          </div>`
    }
    </div>
  `;
  const recipientEmails = [adminEmail, teacher_email].filter((el, i, self) => el && self.indexOf(el) === i).join(',');
  if (recipientEmails) {
    GmailApp.sendEmail(recipientEmails, notificationSubject, '', {
      htmlBody: notificationBody,
      name: 'Projeto Aprendiz',
      inlineImages: inlineImages
    });
  }
}


function createSheetRow(headers, map, formData) {
  return headers.map(header => {
    if (header === "Timestamp") return new Date();
    const formKey = Object.keys(map).find(key => map[key] === header);
    return formKey ? formData[formKey] || "" : "";
  });
}

function isDuplicateCourse(sheet, headers, nome, email, curso) {
  const nomeColIdx = headers.indexOf("Nome Completo");
  const emailColIdx = headers.indexOf("E-mail");
  const cursoColIdx = headers.indexOf("Curso de Interesse");
  if (nomeColIdx === -1 || emailColIdx === -1 || cursoColIdx === -1) return false;
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row[nomeColIdx].toString().trim().toLowerCase() === nome.trim().toLowerCase() &&
      row[emailColIdx].toString().trim().toLowerCase() === email.trim().toLowerCase() &&
      row[cursoColIdx].toString().trim().toLowerCase() === curso.trim().toLowerCase()) {
      return true;
    }
  }
  return false;
}

function countUserCourses(sheet, headers, nome, email) {
  const nomeColIdx = headers.indexOf("Nome Completo");
  const emailColIdx = headers.indexOf("E-mail");
  if (nomeColIdx === -1 || emailColIdx === -1) return 0;
  const data = sheet.getDataRange().getValues();
  let count = 0;
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row[nomeColIdx].toString().trim().toLowerCase() === nome.trim().toLowerCase() &&
      row[emailColIdx].toString().trim().toLowerCase() === email.trim().toLowerCase()) {
      count++;
    }
  }
  return count;
}