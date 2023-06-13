import React from 'react'
import "../../style/footer.css"
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import CallIcon from '@mui/icons-material/Call';
import Link from 'antd/es/typography/Link';

export default function foot() {
  return (
    <div className='footer'>
       
       <div className={"footer-logo-medium"}>
                      <div><Link href={"https://github.com/Nesril"}> <GitHubIcon/></Link></div>
                      <div><Link> <InstagramIcon/></Link></div>
                      <div><Link> <TelegramIcon/></Link></div>
                      <div><Link> <CallIcon/></Link></div>                
        </div> 
    </div>
  )
}
