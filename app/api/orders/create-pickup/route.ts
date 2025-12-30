import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { sendEmail } from "@/lib/send-email";
import { generateOrderEmailTemplate } from "@/lib/email-template";

export async function POST(request: NextRequest) {
  console.log("create pickup");
  console.log(request);
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
    } = body;

    console.log(body);

    // Validate required fields
    if (!nameClient || !phone || !dateLivraisonPrevue || !dateRamassage || !heureRamassage || !heureLivraison || !locationRamassage || !locationLivraison || !addressRamassage.trim() || !addressLivraison.trim()) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert into order table
    const sqlPickup = `
      INSERT INTO \`order\`
      (nameClient, phone, dateRamassage, heureRamassage, dateLivraisonPrevue, heureLivraison, locationRamassage, locationLivraison, addressRamassage, addressLivraison)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result: any = await query(sqlPickup, [
      nameClient,
      phone,
      dateRamassage,
      heureRamassage,
      dateLivraisonPrevue,
      heureLivraison,
      JSON.stringify(locationRamassage),
      JSON.stringify(locationLivraison),
      addressRamassage,
      addressLivraison,
    ]);

    const orderId = result.insertId;

    // Send email to prestataire
    try {
      const prestataireEmail = process.env.PRESTATAIRE_EMAIL || "chroudiimran@gmail.com";

      const ramassageMapLink = `https://www.google.com/maps?q=${locationRamassage?.latitude},${locationRamassage?.longitude}`;
      const livraisonMapLink = `https://www.google.com/maps?q=${locationLivraison?.latitude},${locationLivraison?.longitude}`;
      
      // Create WhatsApp link with pre-filled message
      const whatsappMessage = encodeURIComponent(`Bonjour ${nameClient}, merci pour votre commande #${orderId}. Nous vous contacterons bientôt pour confirmer les détails.`);
      const whatsappLink = `https://wa.me/+212${phone.replace(/[^0-9]/g, '')}`;

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
        whatsappLink,
      });

      
      await sendEmail(
        prestataireEmail,
        `Nouvelle commande #${orderId} - ${nameClient}`,
        emailHtml
      );
    } catch (emailError) {
      console.error("Error sending email to prestataire:", emailError);
      // Don't fail the order creation if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Pickup created successfully",
        pickupId: orderId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating pickup:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create pickup" },
      { status: 500 }
    );
  }
}
