// Importa as bibliotecas necessárias
const { google } = require('googleapis');
const SibApiV3Sdk = require('@sendinblue/client');

// ================================================================= //
// SCRIPT FINAL v3.2 - PROJETO APRENDIZ (Netlify + Brevo)           //
// ================================================================= //


// --- Início da Seção de Configuração ---
// Estes valores são lidos das variáveis de ambiente que você configurou na Netlify
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const NOME_DA_ABA = "Página1";
const LIMITE_DE_CURSOS = 3;
const adminEmail = 'icmprojetoaprendizsalvador@gmail.com';

// ATENÇÃO: Copie e cole aqui o seu objeto 'courseData' completo do arquivo codigo.gs
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

// ATENÇÃO: Copie e cole aqui o seu objeto 'map' do arquivo codigo.gs
const map = {
  'nome-completo': 'Nome Completo', 'email-inscricao': 'E-mail', 'telefone-inscricao': 'Telefone', 'tem-experiencia': 'Tem Experiência',
  'experiencia-relate': 'Relato - Experiência', 'igreja': 'Igreja', 'classe': 'Classe', 'instrumento': 'Curso de Interesse', 'local': 'Local do Curso',
  'possui-instrumento': 'Possui Instrumento?'
};
// --- Fim da Seção de Configuração ---


// Função principal que a Netlify irá executar quando o formulário for enviado
exports.handler = async (event) => {
    // Verifica se o método é POST, que é o método de envio de formulários
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        // Pega os dados do formulário enviados pelo script.js
        const formData = JSON.parse(event.body);

        // Configura a autenticação com o Google Sheets
        // DENTRO DO ARQUIVO submit-form.js

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // <--- Adicione esta correção
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        const sheets = google.sheets({ version: 'v4', auth });

        // Pega os dados atuais da planilha para fazer as validações
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: NOME_DA_ABA,
        });
        const allData = response.data.values || [];
        const headers = allData.length > 0 ? allData[0] : [];

        const nomeCompleto = formData['nome-completo'];
        const email = formData['email-inscricao'];
        const cursoInstrumento = formData['instrumento'];

        // VALIDAÇÃO 1: Verifica se o aluno já está inscrito no mesmo curso
        if (isDuplicateCourse(allData, headers, nomeCompleto, email, cursoInstrumento)) {
            return {
                statusCode: 200, // Retorna 200 para o frontend saber que a requisição foi processada
                body: JSON.stringify({ result: "duplicate_course", message: "Você já está inscrito(a) neste curso!" }),
            };
        }
        
        // VALIDAÇÃO 2: Verifica se o aluno já atingiu o limite de cursos
        if (countUserCourses(allData, headers, nomeCompleto, email) >= LIMITE_DE_CURSOS) {
            return {
                statusCode: 200,
                body: JSON.stringify({ result: "limit_reached", message: `Limite atingido! Só é possível se inscrever em até ${LIMITE_DE_CURSOS} cursos.` }),
            };
        }

        // AÇÃO: Salva a inscrição do curso principal na planilha
        await appendRowToSheet(sheets, headers, formData);
        
        // AÇÃO: Envia o e-mail de confirmação para o aluno e notificação para o professor
        await sendConfirmationEmail(email, nomeCompleto, cursoInstrumento, formData['local'], formData);

        // LÓGICA DE TEORIA MUSICAL (mesma do seu Apps Script)
        if (cursoInstrumento !== "Teoria Musical") {
            const cursoTeoria = "Teoria Musical";
            const currentCourses = countUserCourses(allData, headers, nomeCompleto, email); // Conta antes de adicionar a nova inscrição

            if (!isDuplicateCourse(allData, headers, nomeCompleto, email, cursoTeoria)) {
                if (currentCourses + 1 < LIMITE_DE_CURSOS) { // Garante que não vai ultrapassar o limite
                    let formDataTeoria = { ...formData };
                    formDataTeoria['instrumento'] = cursoTeoria;
                    formDataTeoria['local'] = "Remoto";
                    formDataTeoria['possui-instrumento'] = 'N/A';
                    formDataTeoria['experiencia-relate'] = 'Inscrição Automática';

                    await appendRowToSheet(sheets, headers, formDataTeoria);
                    await sendConfirmationEmail(email, nomeCompleto, cursoTeoria, "Remoto", formDataTeoria);
                }
            }
        }

        // Se tudo deu certo, retorna sucesso
        return {
            statusCode: 200,
            body: JSON.stringify({ result: "success" }),
        };

    } catch (error) {
        console.error("Erro na Netlify Function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ result: "error", message: "Ocorreu um erro no servidor: " + error.message }),
        };
    }
};


// ================================================================= //
//                           FUNÇÕES AUXILIARES                      //
// ================================================================= //

async function appendRowToSheet(sheets, headers, formData) {
    // Mapeia os dados do formulário para a ordem correta das colunas da planilha
    const newRow = headers.map(header => {
        if (header === "Timestamp") return new Date().toISOString();
        const formKey = Object.keys(map).find(key => map[key] === header);
        return formKey ? formData[formKey] || "" : "";
    });

    // Adiciona a nova linha no final da planilha
    await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: NOME_DA_ABA,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [newRow],
        },
    });
}

async function sendConfirmationEmail(email, nomeCompleto, curso, local, formData) {
    if (!email || !curso || !local || !courseData[curso] || !courseData[curso][local]) {
        console.log(`Dados insuficientes para enviar e-mail para ${email} no curso ${curso}`);
        return;
    }

    // Inicializa o cliente da Brevo
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const { link: whatsappLink, teacher_email } = courseData[curso][local];

    // --- E-MAIL PARA O ALUNO ---
    const subjectAluno = `Confirmação de Inscrição: Curso de ${curso}`;
    // ATENÇÃO: Copie e cole aqui o HTML completo do e-mail para o aluno
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
            <p><strong>Projeto Aprendiz</strong><br>Departamento de Inscrição</p>
          </div>
        </div>
    `;

    const sendSmtpEmailAluno = new SibApiV3Sdk.SendSmtpEmail();
    Object.assign(sendSmtpEmailAluno, {
        to: [{ email: email, name: nomeCompleto }],
        sender: { name: "Projeto Aprendiz", email: "nao-responda@seu-dominio-verificado.com" }, // IMPORTANTE: Mude para seu e-mail verificado na Brevo
        subject: subjectAluno,
        htmlContent: emailBodyAluno,
    });
    
    await apiInstance.sendTransacEmail(sendSmtpEmailAluno);

    // --- E-MAIL DE NOTIFICAÇÃO PARA PROFESSOR/ADMIN ---
    const notificationSubject = `Nova Inscrição: ${curso} (${local}) - ${nomeCompleto}`;
    // ATENÇÃO: Copie e cole aqui o HTML completo do e-mail de notificação
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
        </div>
    `;

    const sendSmtpEmailNotif = new SibApiV3Sdk.SendSmtpEmail();
    const recipients = [{ email: adminEmail }, { email: teacher_email }]
        .filter((v, i, a) => a.findIndex(t => (t.email === v.email)) === i); // Remove e-mails duplicados

    Object.assign(sendSmtpEmailNotif, {
        to: recipients,
        sender: { name: "Sistema de Inscrição", email: "nao-responda@seu-dominio-verificado.com" }, // IMPORTANTE: Mude para seu e-mail verificado na Brevo
        subject: notificationSubject,
        htmlContent: notificationBody,
    });

    await apiInstance.sendTransacEmail(sendSmtpEmailNotif);
}

function isDuplicateCourse(allData, headers, nome, email, curso) {
    const nomeColIdx = headers.indexOf("Nome Completo");
    const emailColIdx = headers.indexOf("E-mail");
    const cursoColIdx = headers.indexOf("Curso de Interesse");
    if (nomeColIdx === -1 || emailColIdx === -1 || cursoColIdx === -1) return false;

    for (let i = 1; i < allData.length; i++) {
        const row = allData[i];
        if (row[nomeColIdx] && row[emailColIdx] && row[cursoColIdx] &&
            row[nomeColIdx].trim().toLowerCase() === nome.trim().toLowerCase() &&
            row[emailColIdx].trim().toLowerCase() === email.trim().toLowerCase() &&
            row[cursoColIdx].trim().toLowerCase() === curso.trim().toLowerCase()) {
            return true;
        }
    }
    return false;
}

function countUserCourses(allData, headers, nome, email) {
    const nomeColIdx = headers.indexOf("Nome Completo");
    const emailColIdx = headers.indexOf("E-mail");
    if (nomeColIdx === -1 || emailColIdx === -1) return 0;

    let count = 0;
    for (let i = 1; i < allData.length; i++) {
        const row = allData[i];
        if (row[nomeColIdx] && row[emailColIdx] &&
            row[nomeColIdx].trim().toLowerCase() === nome.trim().toLowerCase() &&
            row[emailColIdx].trim().toLowerCase() === email.trim().toLowerCase()) {
            count++;
        }
    }
    return count;
}