import { Property } from '@/types';

export const topProperties: Property[] = [
  {
    id: 'commercial',
    title: 'Commercial Plots',
    description: 'Prime commercial plots in developing areas with high growth potential and excellent connectivity. These plots are strategically located in high-traffic zones with excellent visibility and accessibility. Perfect for businesses looking to establish a strong presence in the market.',
    image: '/images/home-page/Top Properties/image1.jpeg',
    link: '/projects?type=commercial',
    alt: 'Commercial plots for sale in prime locations',
    width: 500,
    height: 300,
    price: 25000000, // 2.5 Cr
    location: 'Hyderabad, Telangana',
    bedrooms: 0,
    bathrooms: 0,
    area: 5000,
    features: [
      'Prime commercial location',
      'Excellent road connectivity',
      'Near to major business hubs',
      'High visibility and accessibility',
      'Approved layouts',
      'Clear titles'
    ]
  },
  {
    id: 'development',
    title: 'Development Plots',
    description: 'Ready-to-build residential plots with all amenities and infrastructure in place.',
    image: '/images/home-page/Top Properties/image2.jpeg',
    link: '/projects?type=development',
    alt: 'Development plots with infrastructure ready for construction',
    width: 500,
    height: 300,
    price: 15000000, // 1.5 Cr
  },
  {
    id: 'residential',
    title: 'Residential Plots',
    description: 'Premium residential plots in gated communities with modern amenities and security.',
    image: '/images/home-page/Top Properties/image3.webp',
    link: '/projects?type=residential',
    alt: 'Premium residential plots in gated communities',
    width: 500,
    height: 300,
    price: 12000000, // 1.2 Cr
  },
  {
    id: 'agriculture',
    title: 'Agriculture Lands',
    description: 'Fertile agricultural lands perfect for farming and long-term investment opportunities.',
    image: '/images/home-page/Top Properties/image4.jpeg',
    link: '/projects?type=agriculture',
    alt: 'Fertile agricultural lands for sale',
    width: 500,
    height: 300,
    price: 8000000, // 80 Lakhs
  },
  {
    id: 'houses',
    title: 'Independent Houses',
    description: 'Luxury independent houses with modern architecture and premium finishes.',
    image: '/images/home-page/Top Properties/image5.jpg',
    link: '/projects?type=houses',
    alt: 'Luxury independent houses with modern design',
    price: 35000000, // 3.5 Cr
    width: 500,
    height: 300,
  },
  {
    id: 'apartments',
    title: 'Residential Apartments',
    description: 'Modern apartments with world-class amenities in prime locations.',
    image: '/images/home-page/Top Properties/image6.jpeg',
    link: '/projects?type=apartments',
    alt: 'Modern residential apartments with amenities',
    price: 5000000, // 50 Lakhs
    width: 500,
    height: 300,
  },
];
