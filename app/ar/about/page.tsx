import Link from 'next/link';

export default function ArabicAbout() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24" dir="rtl">
      <div className="z-10 max-w-5xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">
          من نحن
        </h1>
        <p className="text-xl text-center mb-8">
          نحن شركة غسيل ملابس مخصصة لتقديم خدمات عالية الجودة.
        </p>
        <div className="text-center">
          <Link 
            href="/ar"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </main>
  );
}







