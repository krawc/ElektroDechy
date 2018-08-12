import Link from "next/link";
import Social from "./Social.js";

const footerStyle = {
    background: '#111',
    padding: '2em',
    textAlign: 'center'
};

const Footer = props => (
    <div style={footerStyle}>
      <img src={props.options.acf.main_logo}/>
      <Social links={props.options.acf.social_media_links}/>
    </div>
);

export default Footer;
