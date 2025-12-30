import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      companyName, 
      responsibleName, 
      email, 
      phone, 
      address, 
      activityType, 
      services, 
      frequency, 
      message 
    } = body;

    // Validation
    if (!email || !companyName) {
      return NextResponse.json(
        { error: 'Email et nom de l\'entreprise sont requis' },
        { status: 400 }
      );
    }

    // Save to database
    try {
      const insertSql = `
        INSERT INTO professional_contacts (companyName, responsibleName, email, phone, address, activityType, services, frequency, message)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      await query(insertSql, [
        companyName,
        responsibleName || null,
        email,
        phone || null,
        address || null,
        activityType || null,
        Array.isArray(services) ? services.join(', ') : (services || null),
        frequency || null,
        message || null
      ]);
    } catch (dbError) {
      console.error('Error saving to database:', dbError);
      // Continue with email sending even if database save fails
    }

    // Validate environment variables for email
    // if (!"smtpjobboard@gmail.com" || !"xmeu iggo enlf vmf") {
    //   console.error('SMTP credentials not configured');
    //   return NextResponse.json(
    //     { success: false, message: 'Configuration email manquante' },
    //     { status: 500 }
    //   );
    // }

    // Configuration du transporteur email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: "smtpjobboard@gmail.com",
        pass: "ynfdnavqhsbgjkbq",
      },
    });


    // Formatage des services
    const servicesList = Array.isArray(services) && services.length > 0 
      ? services.join(', ') 
      : 'Non spécifié';

    // Mapping des types d'activité
    const activityTypeMap: { [key: string]: string } = {
      'hotel': 'Hôtel',
      'restaurant': 'Restaurant',
      'bureau': 'Bureau',
      'salon-beaute': 'Salon de beauté',
      'autre': 'Autre'
    };

    // Mapping des fréquences
    const frequencyMap: { [key: string]: string } = {
      'quotidienne': 'Quotidienne',
      'hebdomadaire': 'Hebdomadaire',
      'mensuelle': 'Mensuelle',
      'ponctuelle': 'Ponctuelle'
    };

    // Contenu de l'email avec un design amélioré
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4DAFEF; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #4DAFEF; }
          .value { margin-top: 5px; padding: 8px; background-color: white; border-radius: 4px; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #4DAFEF; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📧 Nouveau contact professionnel</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">🏢 Nom de l'entreprise:</div>
              <div class="value">${companyName || 'Non spécifié'}</div>
            </div>
            
            <div class="field">
              <div class="label">👤 Responsable:</div>
              <div class="value">${responsibleName || 'Non spécifié'}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Email:</div>
              <div class="value">${email}</div>
            </div>
            
            <div class="field">
              <div class="label">📞 Téléphone:</div>
              <div class="value">${phone || 'Non spécifié'}</div>
            </div>
            
            <div class="field">
              <div class="label">📍 Adresse:</div>
              <div class="value">${address || 'Non spécifié'}</div>
            </div>
            
            <div class="field">
              <div class="label">🏭 Type d'activité:</div>
              <div class="value">${activityTypeMap[activityType] || activityType || 'Non spécifié'}</div>
            </div>
            
            <div class="field">
              <div class="label">🛠️ Services souhaités:</div>
              <div class="value">${servicesList}</div>
            </div>
            
            <div class="field">
              <div class="label">📅 Fréquence souhaitée:</div>
              <div class="value">${frequencyMap[frequency] || frequency || 'Non spécifiée'}</div>
            </div>
            
            ${message ? `
            <div class="field">
              <div class="label">💬 Message:</div>
              <div class="value">${message.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>Ce message a été envoyé depuis le formulaire de contact professionnel de Laundry.ma</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Options de l'email
    const mailOptions = {
      from: `"Laundry.ma" <smtpjobboard@gmail.com>`,
      to: "chroudiimran@gmail.com",
      subject: `Contact Professionnel - ${companyName}`,
      html: emailHtml,
      replyTo: email,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email envoyé avec succès et contact enregistré' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}


