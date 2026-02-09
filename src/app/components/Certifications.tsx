import { Award } from "lucide-react";
import { Card } from "./ui/card";
import diplomaImg1 from "../../assets/47e4871dfdcf52eda2d41ab0148447c736f3fc13.png";
import diplomaImg2 from "../../assets/7fe473d72a34ed90722aa724c591177c7f181db2.png";
import diplomaImg3 from "../../assets/267451e4492cdff95369699b046c6c0bb59b9c71.png";
import diplomaImg4 from "../../assets/c6ca3d78c416fc54d92ab6870f41e7de21fb176d.png";
import diplomaImg5 from "../../assets/1bf6375fd35b10b6c3469b5a7418183b6a251928.png";

export function Certifications() {
  const certifications = [
    {
      title: "MBA - MBI Marketing",
      institution: "Moscow Institute of Professional Education",
      year: "2022",
      image: diplomaImg1,
    },
    {
      title: "Mini MBA - Marketing Director",
      institution: "Open European Academy of Economics & Politics",
      year: "2023",
      image: diplomaImg2,
    },
    {
      title: "Google Cloud Certified",
      institution: "Google Cloud - Cloud Digital Leader",
      year: "2023",
      image: diplomaImg3,
    },
    {
      title: "MBA: Управление маркетингом",
      institution: "Eduson",
      year: "2025",
      image: diplomaImg4,
    },
    {
      title: "Master of Business Administration",
      institution: "Grenoble Ecole de Management",
      year: "2021",
      image: diplomaImg5,
    },
  ];

  return (
    <section id="certifications" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <Award size={20} />
            <span className="font-medium">Квалификация</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Дипломы и сертификаты</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Постоянное обучение и сертификации от ведущих мировых институтов
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Водяной знак */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="text-white/20 font-bold text-4xl transform rotate-[-45deg] select-none"
                    style={{
                      textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    MarketVantage
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{cert.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{cert.institution}</p>
                <p className="text-sm text-blue-600 font-medium">{cert.year}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5</div>
              <div className="text-gray-700">Дипломов MBA/Mini MBA</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">3</div>
              <div className="text-gray-700">Страны обучения</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-700">Часов обучения</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
