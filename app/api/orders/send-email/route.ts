import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/send-email";
import { generateOrderEmailTemplate } from "@/lib/email-template";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nameClient,
      phone,
      dateLivraisonPrevue,
      dateRamassage,
      heureRamassage,
      heureLivraison,
      addressRamassage,
      addressLivraison,
      locationRamassage,
      locationLivraison,
      cartItems = [],
    } = body;

    if (!nameClient || !phone || !dateLivraisonPrevue || !dateRamassage || !heureRamassage || !heureLivraison || !addressRamassage?.trim() || !addressLivraison?.trim()) {
      return NextResponse.json(
        { success: false, error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    const orderId = Date.now();

    const ramassageMapLink = `https://www.google.com/maps?q=${locationRamassage?.latitude},${locationRamassage?.longitude}`;
    const livraisonMapLink = `https://www.google.com/maps?q=${locationLivraison?.latitude},${locationLivraison?.longitude}`;

    const whatsappLink = `https://wa.me/+212${phone.replace(/[^0-9]/g, '')}`;

    let productsHtml = '';
    if (cartItems && cartItems.length > 0) {
      productsHtml = `<table style="width:100%;border-collapse:collapse;">
        <tr style="background:#e3f2fd;">
          <th style="padding:8px;text-align:left;font-size:14px;">Article</th>
          <th style="padding:8px;text-align:center;font-size:14px;">Qté</th>
          <th style="padding:8px;text-align:right;font-size:14px;">Prix</th>
        </tr>
        ${cartItems.map((item: any) => `
          <tr style="border-bottom:1px solid #eee;">
            <td style="padding:8px;font-size:14px;">${item.name}</td>
            <td style="padding:8px;text-align:center;font-size:14px;">${item.quantity}</td>
            <td style="padding:8px;text-align:right;font-size:14px;">${(item.price * item.quantity).toFixed(2)} MAD</td>
          </tr>
        `).join('')}
      </table>`;
    }

    const emailHtml = generateOrderEmailTemplate({
      orderId,
      nameClient,
      phone,
      dateRamassage,
      heureRamassage: heureRamassage || "Non spécifiée",
      dateLivraisonPrevue,
      heureLivraison: heureLivraison || "Non spécifiée",
      addressRamassage: addressRamassage || "Non spécifiée",
      addressLivraison: addressLivraison || "Non spécifiée",
      ramassageMapLink,
      livraisonMapLink,
      productsHtml: productsHtml || undefined,
      whatsappLink,
    });

    const prestataireEmail = process.env.PRESTATAIRE_EMAIL || "chroudiimran@gmail.com";

    await sendEmail(
      prestataireEmail,
      `Nouvelle commande #${orderId} - ${nameClient}`,
      emailHtml
    );

    return NextResponse.json(
      { success: true, message: "Email envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending order email:", error);
    return NextResponse.json(
      { success: false, error: "Échec de l'envoi de l'email" },
      { status: 500 }
    );
  }
}
