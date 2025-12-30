// import React, { Suspense, lazy, useEffect } from "react";
// import Hero from "./Hero.jsx"; // Le Hero reste en import direct (il s’affiche en premier)

// // Chargement différé des autres sections
// const AboutUsSection = lazy(() => import("./aboutus.jsx"));
// const OurComitements = lazy(() => import("./OurComitements.jsx"));
// const HowWeWork = lazy(() => import("./howWeWork.jsx"));
// const ServicesSection = lazy(() => import("./OurServices.jsx"));
// // const Footer = lazy(() => import("@/user/components/common/FooterComponent.tsx")); // Si tu veux l’inclure ici

// // Composant simple pour afficher un loader léger pendant le chargement
// const Loader = () => (
//   <div className="w-full flex justify-center py-10">
//     <div className="animate-pulse text-gray-400 text-sm">Chargement...</div> {/* Animation CSS légère au lieu d'un spinner JS */}
//   </div>
// );

// // Error Boundary pour gérer les erreurs de chargement lazy
// class LazyErrorBoundary extends React.Component<
//   { children: React.ReactNode },
//   { hasError: boolean }
// > {
//   constructor(props: { children: React.ReactNode }) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }

//   componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
//     console.error("Erreur de chargement lazy :", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="w-full flex justify-center py-10 text-red-500 text-sm">
//           Erreur de chargement. Rechargez la page.
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }

// const Home: React.FC = () => {
//   // Préchargement des sections critiques après le montage initial (pour améliorer LCP sur scroll)
//   useEffect(() => {
//     // Précharge HowWeWork et ServicesSection (ajuste selon tes besoins)
//     import("./howWeWork.jsx");
//     import("./OurServices.jsx");
//   }, []);

//   return (
//     <LazyErrorBoundary>
//       <Hero />
//       <Suspense fallback={<Loader />}>
//         <AboutUsSection />
//       </Suspense>

//       <Suspense fallback={<Loader />}>
//         <OurComitements />
//       </Suspense>

//       <Suspense fallback={<Loader />}>
//         <HowWeWork />
//       </Suspense>

//       <Suspense fallback={<Loader />}>
//         <ServicesSection />
//       </Suspense>

//       {/* <Suspense fallback={<Loader />}>
//         <Testimonials />
//       </Suspense>

//       <Suspense fallback={<Loader />}>
//         <FAQ />
//       </Suspense> */}
//       {/* <Suspense fallback={<Loader />}>
//         <Footer />
//       </Suspense> */}
//     </LazyErrorBoundary>
//   );
// };

// export default React.memo(Home); // Mémoïsation pour éviter les re-renders inutiles
