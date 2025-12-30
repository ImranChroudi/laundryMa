import React, { useState } from 'react';
import { ChevronDown, Clock, Truck, Leaf, Sparkles, Home } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Quels types de vêtements pouvez-vous nettoyer ?",
      answer: "Nous prenons en charge tous types de vêtements, y compris les tissus délicats : soie, cachemire, alpaga, lin, ainsi que les vêtements du quotidien.",
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      id: 2,
      question: "Proposez-vous un service de collecte et livraison ?",
      answer: "Oui, nous assurons la collecte et la livraison gratuites de 9h à 21h, 7 jours sur 7.",
      icon: <Truck className="w-5 h-5" />
    },
    {
      id: 3,
      question: "Quels produits utilisez-vous pour le nettoyage ?",
      answer: "Nous utilisons uniquement des solvants et produits écologiques, non irritants et sûrs pour vos vêtements et la peau.",
      icon: <Leaf className="w-5 h-5" />
    },
    {
      id: 4,
      question: "En combien de temps puis-je récupérer mon linge ?",
      answer: "La plupart des services sont prêts en 24 heures. Pour les tapis 48 heures et plus selon le type du tapis et la quantité du travail qu'on a. Un service express est disponible pour vos urgences.",
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 5,
      question: "Traitez-vous également les tapis, canapés et literie ?",
      answer: "Oui, nous proposons des services spécialisés pour tapis, canapés, matelas, couettes et rideaux, directement à domicile si nécessaire.",
      icon: <Home className="w-5 h-5" />
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Questions Fréquentes
          </h1>
          <p className="text-lg text-gray-600">
            Tout ce que vous devez savoir sur nos services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(item.id)}
                className="w-full px-6 py-5 flex items-start gap-4 text-left transition-colors hover:bg-gray-50"
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  openId === item.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {item.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.question}
                    </h3>
                    <ChevronDown
                      className={`flex-shrink-0 w-5 h-5 text-gray-500 transition-transform duration-300 ${
                        openId === item.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openId === item.id 
                        ? 'max-h-40 opacity-100 mt-3' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Vous avez d'autres questions ?
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
            Contactez-nous
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;