import HomeImage1 from "../images/HMBG 1.webp";
import HomeImage2 from "../images/HMBG 2.webp";
import HomeImage3 from "../images/HMBG 3.webp";

import service1 from "../images/service 1.webp";
import service2 from "../images/service 2.webp";
import service3 from "../images/dental.webp";
import service4 from "../images/xray.webp";
import service5 from "../images/eyecare.webp";
import service6 from "../images/ultrasound.jpg";
import service7 from "../images/pregancy.webp";
import service8 from "../images/skincare.jpg";
import service9 from "../images/brain.webp";
import service10 from "../images/hiv.webp";
import service11 from "../images/Obstetrics.jpg";
import service12 from "../images/adult.png";

const NavBarData = [
  {
    id: 1,
    title: "HOME",
    url: "/",
  },
  {
    id: 2,
    title: "ABOUT US",
    url: "/about",
  },
  {
    id: 3,
    title: "OUR SERVICES",
    url: "/services",
  },
  {
    id: 4,
    title: "CONTACT US",
    url: "/contact",
  },
];
const HomeData = [
  {
    id: 1,
    url: HomeImage1,
    Title: `Welcome to Bonga Gebre Tsadiq`,
    subtitle: "  Shawo Memorial Hospital",
    description:
      "Gebre Tsadik Shawo General Hospital is one of General Hospitals in South West Ethiopia regional state. It’s located in the south western part of Ethiopia, particularly in Bonga, which is the capital city of South West Ethiopia regional state. Currently, the general hospital is serving more than 2 million peoples from the region and the neighboring zones, including Sheka, Dawuro, Konta, Bench-Sheko, Westomo and some parts of Jimma zones.",
    button: "Learn More",
  },
  {
    id: 2,
    url: HomeImage2,
    Title: `Welcome to Bonga Gebre Tsadiq`,
    subtitle: "  Shawo Memorial Hospital",
    description:
      "Gebre Tsadik Shawo General Hospital is one of General Hospitals in South West Ethiopia regional state. It’s located in the south western part of Ethiopia, particularly in Bonga, which is the capital city of South West Ethiopia regional state. Currently, the general hospital is serving more than 2 million peoples from the region and the neighboring zones, including Sheka, Dawuro, Konta, Bench-Sheko, Westomo and some parts of Jimma zones. ",
    button: "Learn More",
  },
  {
    id: 3,
    url: HomeImage3,
    Title: `Welcome to Bonga Gebre Tsadiq`,
    subtitle: "  Shawo Memorial Hospital",
    description:
      "Gebre Tsadik Shawo General Hospital is one of General Hospitals in South West Ethiopia regional state. It’s located in the south western part of Ethiopia, particularly in Bonga, which is the capital city of South West Ethiopia regional state. Currently, the general hospital is serving more than 2 million peoples from the region and the neighboring zones, including Sheka, Dawuro, Konta, Bench-Sheko, Westomo and some parts of Jimma zones. ",
    button: "Learn More",
  },
];

const HomeServiceData = [
  {
    id: 1,
    Title: "General Surgery",
    description:
      "Our General Surgery department offers comprehensive surgical care for a wide range of conditions. Our experienced surgeons utilize the latest techniques and technologies to ensure optimal outcomes and faster recovery times for our patients.",
    url: service1,
  },
  {
    id: 2,
    Title: "Internal Surgery",
    description:
      "Discover precision and expertise with our Internal Surgery services. Our specialists tackle complex internal conditions with meticulous care and innovative surgical solutions, ensuring you receive the highest standard of treatment to enhance your health and vitality.",
    url: service2,
  },
  {
    id: 3,
    Title: "Dental Service",
    description:
      "Achieve a radiant smile with our comprehensive Dental Services. Whether you need a routine cleaning or advanced dental procedures, our skilled team is dedicated to providing top-notch care that keeps your oral health in peak condition and your smile shining bright.",
    url: service3,
  },
  {
    id: 4,
    Title: "X-Ray",
    description:
      "Illuminate the unseen with our state-of-the-art X-Ray services. Our high-resolution imaging technology delivers precise and detailed visuals, empowering your medical team with the insights needed to diagnose and treat conditions effectively.",
    url: service4,
  },
  {
    id: 5,
    Title: "Basic Eye Care",
    description:
      "See the world more clearly with our Basic Eye Care services. From thorough eye exams to effective treatments for common eye conditions, our dedicated professionals are here to protect and improve your vision, helping you enjoy life to the fullest.",
    url: service5,
  },
  {
    id: 6,
    Title: "Ultrasound",
    description:
      "Experience clarity and confidence with our advanced Ultrasound services. Our cutting-edge imaging technology and expert technicians provide accurate diagnostics, helping you and your healthcare team make informed decisions for your health and well-being.",
    url: service6,
  },
];

const OurServiceServicesData = [
  {
    id: 1,
    Title: "General Surgery",
    description:
      "Our General Surgery department offers comprehensive surgical care for a wide range of conditions. Our experienced surgeons utilize the latest techniques and technologies to ensure optimal outcomes and faster recovery times for our patients.",
    url: service1,
  },
  {
    id: 2,
    Title: "Internal Surgery",
    description:
      "Discover precision and expertise with our Internal Surgery services. Our specialists tackle complex internal conditions with meticulous care and innovative surgical solutions, ensuring you receive the highest standard of treatment to enhance your health and vitality.",
    url: service2,
  },
  {
    id: 3,
    Title: "Dental Service",
    description:
      "Achieve a radiant smile with our comprehensive Dental Services. Whether you need a routine cleaning or advanced dental procedures, our skilled team is dedicated to providing top-notch care that keeps your oral health in peak condition and your smile shining bright.",
    url: service3,
  },
  {
    id: 4,
    Title: "X-Ray",
    description:
      "Illuminate the unseen with our state-of-the-art X-Ray services. Our high-resolution imaging technology delivers precise and detailed visuals, empowering your medical team with the insights needed to diagnose and treat conditions effectively.",
    url: service4,
  },
  {
    id: 5,
    Title: "Basic Eye Care",
    description:
      "See the world more clearly with our Basic Eye Care services. From thorough eye exams to effective treatments for common eye conditions, our dedicated professionals are here to protect and improve your vision, helping you enjoy life to the fullest.",
    url: service5,
  },
  {
    id: 6,
    Title: "Ultrasound",
    description:
      "Experience clarity and confidence with our advanced Ultrasound services. Our cutting-edge imaging technology and expert technicians provide accurate diagnostics, helping you and your healthcare team make informed decisions for your health and well-being.",
    url: service6,
  },
  {
    id: 7,
    Title: "Pregancy",
    description:
      "Embrace the journey of motherhood with our comprehensive Pregnancy care. Our experienced team provides personalized support and medical expertise to ensure a healthy and joyful experience from conception to delivery, guiding you every step of the way.",

    url: service7,
  },
  {
    id: 8,
    Title: "Skin Care",
    description:
      "Reveal your best skin with our specialized Skin Care services. From treating common skin conditions to advanced dermatological treatments, our experts use the latest techniques to ensure your skin stays healthy, vibrant, and radiant.",
    url: service8,
  },
  {
    id: 9,
    Title: "Brain Health",
    description:
      "Unlock the potential of your mind with our dedicated Brain Health services. Our team of neurologists and specialists offer cutting-edge diagnostics and treatments for a wide range of neurological conditions, helping you maintain cognitive health and function.",
    url: service9,
  },
  {
    id: 10,
    Title: "HIV & AIDS Care",
    description:
      "Empower yourself with our comprehensive HIV & AIDS Care. We provide compassionate support, advanced treatments, and educational resources to help you manage your health effectively, fostering a better quality of life.",
    url: service10,
  },
  {
    id: 11,
    Title: "Obstetrics",
    description:
      "Navigate the journey of childbirth with confidence through our Obstetrics services. Our compassionate and skilled team is here to provide exceptional care, from prenatal visits to postpartum support, ensuring a safe and fulfilling experience for you and your baby. ",
    url: service11,
  },
  {
    id: 12,
    Title: " Adult & Children Care",
    description:
      "Experience top-tier healthcare for all ages with our Children & Adult Care services. Our dedicated providers offer personalized medical attention for both children and adults, ensuring every member of your family receives the highest quality care at every stage of life.",
    url: service12,
  },
];

const HomeCountData = [
  {
    id: 1,
    title: "YEARS",
    value: "000",
    dataValue: 10,
    suffix: "+",
  },

  {
    id: 2,
    title: "OUR EXPRETS",
    value: "000",
    dataValue: 100,
    suffix: "+",
  },
  {
    id: 3,
    title: "CLIENTS PER YEAR",
    value: "000",
    dataValue: 100,
    suffix: "K+",
  },
  {
    id: 4,
    title: "SATISFACTION RATE",
    value: "000",
    dataValue: 100,
    suffix: "%",
  },
];
export default {
  NavBarData,
  HomeData,
  HomeServiceData,
  OurServiceServicesData,
  HomeCountData,
};
