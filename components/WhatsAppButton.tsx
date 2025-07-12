'use client'

import { useRouter } from 'next/navigation'
import { FaWhatsapp } from 'react-icons/fa6'
import { contactDetails } from '@/data/nav-footer-details'

const WhatsAppButton = () => {
  const router = useRouter();

  const handleClick = async () => {
    const phoneNumber = contactDetails.phoneNumbers[0]; // Use the full phone number with country code
    
    if (navigator.userAgent.includes('WhatsApp')) {
      window.open(`whatsapp://send?phone=${phoneNumber}`)
    } else {
      window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}`, '_blank');
    }
  }

  return (
    <>
      <div className='bg-green-600 w-min p-2 rounded-full fixed 
          bottom-10 right-4 cursor-pointer md:right-8 hover:bg-green-700 transition-colors duration-200 z-50'
          onClick={handleClick}
      >
        <FaWhatsapp color='white' className='w-7 h-7 md:w-10 md:h-10' />
      </div>
    </>
  )
}

export default WhatsAppButton
