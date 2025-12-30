export function generateOrderEmailTemplate(data: {
  orderId: number;
  nameClient: string;
  phone: string;
  dateRamassage: string;
  heureRamassage: string;
  dateLivraisonPrevue: string;
  heureLivraison: string;
  addressRamassage: string;
  addressLivraison: string;
  ramassageMapLink: string;
  livraisonMapLink: string;
  productsHtml?: string;
  whatsappLink?: string;
}) {
  const {
    orderId,
    nameClient,
    phone,
    dateRamassage,
    heureRamassage,
    dateLivraisonPrevue,
    heureLivraison,
    addressRamassage,
    addressLivraison,
    ramassageMapLink,
    livraisonMapLink,
    productsHtml,
    whatsappLink,
  } = data;

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle commande #${orderId}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 5px;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #4dafef 0%, #1e88e5 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                🧺 Nouvelle Commande Reçue
              </h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 18px; opacity: 0.9;">
                Commande #${orderId}
              </p>
            </td>
          </tr>

          <!-- Order Info Card -->
          <tr>
            <td style="padding: 30px 10px;">
              <div style="background-color: #f8f9fa; border-left: 4px solid #4dafef; padding: 20px; border-radius: 4px; margin-bottom: 25px;">
                <h2 style="margin: 0 0 15px; color: #1e88e5; font-size: 20px; font-weight: 600;">
                  📋 Informations Client
                </h2>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #333333; font-size: 15px;">
                      <strong style="color: #666666;">Nom :</strong>
                    </td>
                    <td style="padding: 8px 0; color: #333333; font-size: 15px; font-weight: 600;">
                      ${nameClient}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #333333; font-size: 15px;">
                      <strong style="color: #666666;">Téléphone :</strong>
                    </td>
                    <td style="padding: 8px 0; color: #333333; font-size: 15px;">
                      <a href="tel:${phone}" style="color: #4dafef; text-decoration: none; font-weight: 600; margin-right: 10px;">
                        +212${phone}
                      </a>
                      ${whatsappLink ? `
                      <a href="${whatsappLink}" target="_blank" style="display: inline-block; padding: 6px 12px; background-color: #25D366; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: 600; font-size: 13px; margin-left: 10px;">
                        💬 Contacter sur WhatsApp
                      </a>
                      ` : ''}
                    </td>
                  </tr>
                </table>
              </div>

              ${productsHtml ? `
              <div style="background-color: #f8f9fa; border-left: 4px solid #4dafef; padding: 20px; border-radius: 4px; margin-bottom: 25px;">
                <h2 style="margin: 0 0 15px; color: #1e88e5; font-size: 20px; font-weight: 600;">
                  🛍️ Articles Commandés
                </h2>
                ${productsHtml}
              </div>
              ` : ''}

              <!-- Dates & Times -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #4dafef; padding: 20px; border-radius: 4px; margin-bottom: 25px;">
                <h2 style="margin: 0 0 15px; color: #1e88e5; font-size: 20px; font-weight: 600;">
                  📅 Dates et Heures
                </h2>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #333333; font-size: 15px; width: 50%;">
                      <strong style="color: #666666;">Date de ramassage :</strong>
                    </td>
                    <td style="padding: 8px 0; color: #333333; font-size: 15px; font-weight: 600;">
                      ${dateRamassage}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #333333; font-size: 15px;">
                      <strong style="color: #666666;">Heure de ramassage :</strong>
                    </td>
                    <td style="padding: 8px 0; color: #333333; font-size: 15px;">
                      ${heureRamassage || "Non spécifiée"}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #333333; font-size: 15px;">
                      <strong style="color: #666666;">Date de livraison :</strong>
                    </td>
                    <td style="padding: 8px 0; color: #333333; font-size: 15px; font-weight: 600;">
                      ${dateLivraisonPrevue}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #333333; font-size: 15px;">
                      <strong style="color: #666666;">Heure de livraison :</strong>
                    </td>
                    <td style="padding: 8px 0; color: #333333; font-size: 15px;">
                      ${heureLivraison || "Non spécifiée"}
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Addresses -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #4dafef; padding: 20px; border-radius: 4px; margin-bottom: 25px;">
                <h2 style="margin: 0 0 15px; color: #1e88e5; font-size: 20px; font-weight: 600;">
                  📍 Adresses
                </h2>
                
                <div style="margin-bottom: 20px;">
                  <h3 style="margin: 0 0 10px; color: #333333; font-size: 16px; font-weight: 600;">
                    🚚 Adresse de Ramassage
                  </h3>
                  <p style="margin: 5px 0; color: #333333; font-size: 15px; line-height: 1.6;">
                    ${addressRamassage || "Non spécifiée"}
                  </p>
                  <a href="${ramassageMapLink}" target="_blank" style="display: inline-block; margin-top: 8px; padding: 10px 20px; background-color: #4dafef; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: 600; font-size: 14px;">
                    🗺️ Voir sur Google Maps
                  </a>
                </div>

                <div style="margin-top: 25px;">
                  <h3 style="margin: 0 0 10px; color: #333333; font-size: 16px; font-weight: 600;">
                    📦 Adresse de Livraison
                  </h3>
                  <p style="margin: 5px 0; color: #333333; font-size: 15px; line-height: 1.6;">
                    ${addressLivraison || "Non spécifiée"}
                  </p>
                  <a href="${livraisonMapLink}" target="_blank" style="display: inline-block; margin-top: 8px; padding: 10px 20px; background-color: #4dafef; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: 600; font-size: 14px;">
                    🗺️ Voir sur Google Maps
                  </a>
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px 40px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; color: #666666; font-size: 13px;">
                Cet email a été envoyé automatiquement par le système Laundry.ma
              </p>
              <p style="margin: 10px 0 0; color: #999999; font-size: 12px;">
                &copy; ${new Date().getFullYear()} Laundry.ma - Tous droits réservés
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

