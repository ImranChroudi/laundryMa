import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/send-email";
import { generateOrderEmailTemplate } from "@/lib/email-template";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nameClient,
      phone,
      dateRamassage,
      heureRamassage,
      dateLivraisonPrevue,
      heureLivraison,
      addressRamassage,
      addressLivraison,
      locationRamassage,
      locationLivraison,
      cartItems,
    } = body;

    // Validate required fields
    if (!nameClient || !phone) {
      return NextResponse.json(
        { error: "Nom et téléphone sont requis" },
        { status: 400 }
      );
    }

    // Generate Google Maps links
    const ramassageMapLink = locationRamassage
      ? `https://www.google.com/maps?q=${locationRamassage.latitude},${locationRamassage.longitude}`
      : "";
    const livraisonMapLink = locationLivraison
      ? `https://www.google.com/maps?q=${locationLivraison.latitude},${locationLivraison.longitude}`
      : "";

    // Generate WhatsApp link
    const cleanPhone = phone.replace(/\s/g, "");
    const whatsappLink = `https://wa.me/212${cleanPhone}`;

    // Build products HTML for email
    let productsHtml = "";
    if (cartItems && cartItems.length > 0) {
      const rows = cartItems
        .map(
          (item: { name: string; price: number; quantity: number }) => `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-size: 14px; color: #333;">
            ${item.name}
          </td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-size: 14px; color: #333; text-align: center;">
            ${item.quantity}
          </td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-size: 14px; color: #333; text-align: right;">
            ${item.price} DH
          </td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-size: 14px; color: #333; text-align: right; font-weight: 600;">
            ${(item.price * item.quantity).toFixed(2)} DH
          </td>
        </tr>`
        )
        .join("");

      const total = cartItems.reduce(
        (sum: number, item: { price: number; quantity: number }) =>
          sum + item.price * item.quantity,
        0
      );

      productsHtml = `
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f0f7ff;">
              <th style="padding: 10px 12px; text-align: left; font-size: 13px; color: #666; font-weight: 600;">Article</th>
              <th style="padding: 10px 12px; text-align: center; font-size: 13px; color: #666; font-weight: 600;">Qté</th>
              <th style="padding: 10px 12px; text-align: right; font-size: 13px; color: #666; font-weight: 600;">Prix unit.</th>
              <th style="padding: 10px 12px; text-align: right; font-size: 13px; color: #666; font-weight: 600;">Total</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
          <tfoot>
            <tr style="background-color: #f0f7ff;">
              <td colspan="3" style="padding: 12px; font-size: 15px; font-weight: 700; color: #1e88e5; text-align: right;">
                Total estimé :
              </td>
              <td style="padding: 12px; font-size: 15px; font-weight: 700; color: #1e88e5; text-align: right;">
                ${total.toFixed(2)} DH
              </td>
            </tr>
          </tfoot>
        </table>`;
    } else {
      productsHtml = `
        <p style="padding: 12px; color: #666; font-size: 14px; font-style: italic;">
          ℹ️ Demande de ramassage sans articles pré-sélectionnés — le client souhaite que nous récupérions son linge directement.
        </p>`;
    }

    // Generate order ID
    const orderId = Date.now();

    // Generate email HTML
    const emailHtml = generateOrderEmailTemplate({
      orderId,
      nameClient,
      phone,
      dateRamassage: dateRamassage || "Non spécifiée",
      heureRamassage: heureRamassage || "Non spécifiée",
      dateLivraisonPrevue: dateLivraisonPrevue || "Non spécifiée",
      heureLivraison: heureLivraison || "Non spécifiée",
      addressRamassage: addressRamassage || "Non spécifiée",
      addressLivraison: addressLivraison || "Non spécifiée",
      ramassageMapLink,
      livraisonMapLink,
      productsHtml,
      whatsappLink,
    });

    // Send email
    await sendEmail(
      "chroudiimran@gmail.com",
      `🧺 Nouvelle commande #${orderId} — ${nameClient}`,
      emailHtml
    );

    return NextResponse.json(
      { success: true, orderId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending order email:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de la commande" },
      { status: 500 }
    );
  }
}
